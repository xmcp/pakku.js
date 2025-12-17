#include <unordered_map>
#include <vector>
#include <wasm_simd128.h>

typedef uint8_t uchar;
typedef uint16_t ushort;
typedef uint32_t uint;

struct Config {
    int max_dist = 0;
    int max_cosine = 0;
    bool use_pinyin = false;
    bool cross_mode = false;

    ushort *str_buf = nullptr;
    bool index_r_lock = false;

    int min_danmu_size = 0;
    uint dispose_idx = 0;
} config;

std::unordered_map<ushort, std::pair<uchar, uchar>> pinyin_dict = {
    #include "pinyin_dict.txt"
};

constexpr int PINYIN_BASE = 0xe000; // U+E000 ~ U+F8FF: Private Use Area
constexpr int HASH_MOD = 1007;
constexpr int MAX_HASH = std::max(HASH_MOD*HASH_MOD, 1<<16) + 7;

short ed_a[MAX_HASH], ed_b[MAX_HASH];

template<typename T>
struct UnorderedContainer {
    std::vector<std::pair<T, ushort>> data{};
    int length{}; // use signed type so that we can subtract two lengths easily

    UnorderedContainer(): length(0) {}

    void push(T x) {
        length++;
        if(ed_a[x] == 0) {
            data.emplace_back(x, 1);
            ed_a[x] = data.size();
        } else {
            data[ed_a[x]-1].second++;
        }
    }
    void cleanup() {
        for(auto &p: data) {
            ed_a[p.first] = 0;
        }
    }
    void dispose() {
        data.clear();
    }
};

struct DanmuCacheline {
    uint idx{};
    uint mode{};
    std::vector<ushort> orig{};
    UnorderedContainer<ushort> str{};
    UnorderedContainer<ushort> pinyin{};
    UnorderedContainer<uint> gram{};

    void dispose() {
        orig.clear();
        str.dispose();
        pinyin.dispose();
        gram.dispose();
    }

    explicit DanmuCacheline(const ushort *s, uint mode, uint idx): mode(mode), idx(idx) {
        // gen orig and str
        for(ushort c = *s; c; c = *(++s)) {
            orig.push_back(c);
            str.push(c);
        }
        str.cleanup();

        // gen pinyin
        if(config.use_pinyin) {
            for(ushort c: orig) {
                auto cs = pinyin_dict.find(c);
                if(cs!=pinyin_dict.end()) {
                    pinyin.push(PINYIN_BASE + cs->second.first);
                    if(cs->second.second)
                        pinyin.push(PINYIN_BASE + cs->second.second);
                } else {
                    if(c>='A' && c<='Z') // to lowercase
                        c += 'a' - 'A';
                    pinyin.push(c);
                }
            }
            pinyin.cleanup();
        }

        // gen gram
        if(config.max_cosine<=100) {
            uint clast = (*orig.crbegin()) % HASH_MOD;
            for(uint c: orig) {
                c = c % HASH_MOD;
                gram.push(clast * HASH_MOD + c);
                clast = c;
            }
            gram.cleanup();
        }
    }
};

std::vector<DanmuCacheline> nearby_danmu;

int edit_distance(const UnorderedContainer<ushort> &p, const UnorderedContainer<ushort> &q) {
    // this is NOT the real edit_distance as in a textbook because it would be too slow
    // actually this takes O(n) time

    for(auto [c, x]: p.data) ed_a[c] += x;
    for(auto [c, x]: q.data) ed_a[c] -= x;

    int ans = 0;

    for(auto [c, _]: p.data) {
        ans += std::abs(ed_a[c]);
        ed_a[c] = 0;
    }
    for(auto [c, _]: q.data) {
        ans += std::abs(ed_a[c]);
        ed_a[c] = 0;
    }

    return ans;
}

float cosine_distance(const UnorderedContainer<uint> &p, const UnorderedContainer<uint> &q) {
    for(auto [c, x]: p.data) ed_a[c] += x;
    for(auto [c, x]: q.data) ed_b[c] += x;

    int x=0, y=0, z=0;

    for(auto [c, _]: p.data) {
        int xa = ed_a[c], xb = ed_b[c];
        x += xa*xb;
        y += xa*xa;
        z += xb*xb;
        ed_a[c] = 0;
        ed_b[c] = 0;
    }
    for(auto [c, _]: q.data) {
        int xb = ed_b[c];
        z += xb*xb;
        ed_b[c] = 0;
    }

    return static_cast<float>(x) * x / y / z;
}

enum CombinedReason {
    combined_identical = 0,
    combined_edit_distance = 1,
    combined_pinyin_distance = 2,
    combined_cosine_distance = 3,
};

constexpr uint MAX_IDX_RANGE = (1<<19) - 3;
constexpr uint MAX_DIST = (1<<11) - 3;
uint sim_result(CombinedReason reason, uint dist, uint target_idx) {
    return (reason << 30) | (std::min(dist, MAX_DIST) << 19) | target_idx;
}

uint check_similar_single(const DanmuCacheline &p, const DanmuCacheline &q) {
    uint idx_delta = p.idx - q.idx;
    // assert 0 < idx_delta <= MAX_IDX_RANGE

    uint len_p = p.orig.size(), len_q = q.orig.size();
    uint len_sum = len_p + len_q;

    // check identical

    if(p.orig == q.orig)
        return sim_result(combined_identical, 0, idx_delta);

    // check edit dist

    int edit_dis;
    bool calc_edit_dis = std::abs(p.str.length - q.str.length) <= config.max_dist;
    if(calc_edit_dis) {
        edit_dis = edit_distance(p.str, q.str);
        if(
            (len_sum < config.min_danmu_size) ?
                edit_dis < config.max_dist * len_sum / config.min_danmu_size:
                edit_dis <= config.max_dist
        ) {
            return sim_result(combined_edit_distance, edit_dis, idx_delta);
        }
    }

    // check pinyin dist

    bool calc_py_dis = config.use_pinyin && std::abs(p.pinyin.length - q.pinyin.length) <= config.max_dist;
    if(calc_py_dis) {
        int py_dis = edit_distance(p.pinyin, q.pinyin);
        if(
            (len_sum < config.min_danmu_size) ?
                py_dis < config.max_dist * len_sum / config.min_danmu_size:
                py_dis <= config.max_dist
        ) {
            return sim_result(combined_pinyin_distance, py_dis, idx_delta);
        }
    }

    // check cosine similarity

    bool calc_cosine_sim = config.max_cosine <= 100 && !(
        // if edit_dis shows that p and q share no common char, they have no way to be cosine-similar
        calc_edit_dis && edit_dis >= len_sum
    );
    if(calc_cosine_sim) {
        int cosine_sim = 100 * cosine_distance(p.gram, q.gram);
        if(cosine_sim >= config.max_cosine) {
            return sim_result(combined_cosine_distance, cosine_sim, idx_delta);
        }
    }

    return 0;
}

extern "C" {
    void begin_chunk(ushort *str_buf, int max_dist, int max_cosine, bool use_pinyin, bool cross_mode) {
        config.str_buf = str_buf;

        config.max_dist = max_dist;
        config.max_cosine = max_cosine;
        config.use_pinyin = use_pinyin;
        config.cross_mode = cross_mode;

        config.min_danmu_size = std::max(1, max_dist*2);
        config.index_r_lock = false;
        config.dispose_idx = 0;

        nearby_danmu.clear();
    }

    void begin_index_lock() {
        config.index_r_lock = true;
    }

    uint check_similar(uint mode, uint index_l) {
        uint index_r = nearby_danmu.size();
        auto p = DanmuCacheline(config.str_buf, mode, index_r);

        for(;config.dispose_idx<index_l; config.dispose_idx++) {
            nearby_danmu[config.dispose_idx].dispose();
        }

        if(index_l + MAX_IDX_RANGE < index_r)
            index_l = index_r - MAX_IDX_RANGE;

        for(uint idx=index_l; idx<index_r; idx++) {
            const auto &q = nearby_danmu[idx];
            if(!config.cross_mode && p.mode!=q.mode)
                continue;

            uint res = check_similar_single(p, q);
            if(res)
                return res;
        }

        if(!config.index_r_lock)
            nearby_danmu.push_back(std::move(p));
        return 0;
    }

    uint test_speed_sim() {
        std::vector<float> emb_i, emb_j;
        float sz_i=0, sz_j=0;
        for(int i=0; i<512; i++) {
            emb_i.push_back(float(i) / 512);
            sz_i += emb_i.back()*emb_i.back();
            emb_j.push_back(1 - float(i) / 512);
            sz_j += emb_j.back()*emb_j.back();
        }
        sz_i = std::sqrt(sz_i);
        sz_j = std::sqrt(sz_j);
        for(int i=0; i<512; i++) {
            emb_i[i] /= sz_i;
            emb_j[i] /= sz_j;
        }

        constexpr int N_TRIES = 30000000;
        float sum = 0;

        for(int tr=0; tr<N_TRIES; tr++) {
            v128_t acc1 = wasm_f32x4_const_splat(0);
            v128_t acc2 = wasm_f32x4_const_splat(0);
            v128_t acc3 = wasm_f32x4_const_splat(0);
            v128_t acc4 = wasm_f32x4_const_splat(0);
            for(int i=0; i<512; i+=16) {
                acc1 = wasm_f32x4_add(acc1, wasm_f32x4_mul(wasm_v128_load(&emb_i[i]), wasm_v128_load(&emb_j[i])));
                acc2 = wasm_f32x4_add(acc2, wasm_f32x4_mul(wasm_v128_load(&emb_i[i+4]), wasm_v128_load(&emb_j[i+4])));
                acc3 = wasm_f32x4_add(acc3, wasm_f32x4_mul(wasm_v128_load(&emb_i[i+8]), wasm_v128_load(&emb_j[i+8])));
                acc4 = wasm_f32x4_add(acc4, wasm_f32x4_mul(wasm_v128_load(&emb_i[i+12]), wasm_v128_load(&emb_j[i+12])));
            }
            acc1 = wasm_f32x4_add(acc1, acc2);
            acc3 = wasm_f32x4_add(acc3, acc4);
            acc1 = wasm_f32x4_add(acc1, acc3);
            sum += wasm_f32x4_extract_lane(acc1, 0) + wasm_f32x4_extract_lane(acc1, 1) + wasm_f32x4_extract_lane(acc1, 2) + wasm_f32x4_extract_lane(acc1, 3);
        }

        return sum * 10000 / N_TRIES;
    }
}