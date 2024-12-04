#include <unordered_map>
#include <vector>

typedef uint8_t uchar;
typedef uint16_t ushort;
typedef uint32_t uint;

struct Config {
    int max_dist = 0;
    int max_cosine = 0;
    bool use_pinyin = false;
    bool cross_mode = false;

    ushort *str_buf = NULL;
    bool index_r_lock = false;
    std::unordered_map<ushort, std::pair<uchar, uchar>> pinyin_dict;
    int min_danmu_size = 0;
} config;

struct PinyinSymbolLine {
    ushort codepoint;
    uchar s1;
    uchar s2;
} pinyin_dict_raw[] = {
#include "pinyin_dict.txt"
};

constexpr int PINYIN_BASE = 0xe000; // U+E000 ~ U+F8FF: Private Use Area
constexpr int HASH_MOD = 1007;
constexpr int MAX_HASH = std::max(HASH_MOD*HASH_MOD, 1<<16) + 7;

struct DanmuCacheline {
    uint idx{};
    ushort length{};
    ushort mode{};
    std::vector<ushort> str{};
    std::vector<ushort> pinyin{};
    std::vector<uint> gram{};

    explicit DanmuCacheline(const ushort *s, ushort mode, uint idx): mode(mode), idx(idx) {
        for(ushort c = *s; c; c = *(++s)) {
            // gen str
            str.push_back(c);

            // gen pinyin
            if(config.use_pinyin) {
                auto cs = config.pinyin_dict.find(c);
                if(cs!=config.pinyin_dict.end()) {
                    pinyin.push_back(PINYIN_BASE + cs->second.first);
                    if(cs->second.second)
                        pinyin.push_back(PINYIN_BASE + cs->second.second);
                } else {
                    if(c>='A' && c<='Z') // to lowercase
                        c += 'a' - 'A';
                    pinyin.push_back(c);
                }
            }
        }

        // gen gram
        if(config.max_cosine<=100) {
            uint clast = (*str.crbegin()) % HASH_MOD;
            for(uint c: str) {
                c = c % HASH_MOD;
                gram.push_back(clast * HASH_MOD + c);
                clast = c;
            }
        }

        length = str.size();
    }
};

std::vector<DanmuCacheline> nearby_danmu;

short ed_a[MAX_HASH], ed_b[MAX_HASH];

int edit_distance(const std::vector<ushort> &p, const std::vector<ushort> &q) {
    // this is NOT the real edit_distance as in a textbook because it would be too slow
    // actually this takes O(n) time

    for(auto c: p) ed_a[c]++;
    for(auto c: q) ed_a[c]--;

    int ans = 0;

    for(auto c: p) {
        ans += std::abs(ed_a[c]);
        ed_a[c] = 0;
    }
    for(auto c: q) {
        ans += std::abs(ed_a[c]);
        ed_a[c] = 0;
    }

    return ans;
}

float cosine_distance(const std::vector<uint> &p, const std::vector<uint> &q) {
    for(auto c: p) ed_a[c]++;
    for(auto c: q) ed_b[c]++;

    int x=0, y=0, z=0;

    for(auto c: p) {
        int xa = ed_a[c], xb = ed_b[c];
        x += xa*xb;
        y += xa*xa;
        z += xb*xb;
        ed_a[c] = 0;
        ed_b[c] = 0;
    }
    for(auto c: q) {
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

    // check identical

    if(p.str==q.str)
        return sim_result(combined_identical, 0, idx_delta);

    // check edit dist

    int edit_dis = edit_distance(p.str, q.str);
    if(
        (p.length + q.length < config.min_danmu_size) ?
        edit_dis < config.max_dist * (p.length + q.length) / config.min_danmu_size:
        edit_dis <= config.max_dist
        ) {
        return sim_result(combined_edit_distance, edit_dis, idx_delta);
    }

    // check pinyin dist

    if(config.use_pinyin) {
        int py_dis = edit_distance(p.pinyin, q.pinyin);
        if(
            (p.length + q.length < config.min_danmu_size) ?
            py_dis < config.max_dist * (p.length + q.length) / config.min_danmu_size:
            py_dis <= config.max_dist
            ) {
            return sim_result(combined_pinyin_distance, py_dis, idx_delta);
        }
    }

    // check cosine similarity

    if(config.max_cosine<=100) {
        if(edit_dis < p.length + q.length) { // they can be similar only if they share some common chars
            int cos = 100 * cosine_distance(p.gram, q.gram);
            if(cos >= config.max_cosine) {
                return sim_result(combined_cosine_distance, cos, idx_delta);
            }
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

        if(config.use_pinyin && config.pinyin_dict.empty()) {
            for(auto &p: pinyin_dict_raw) {
                config.pinyin_dict.emplace(p.codepoint, std::make_pair(p.s1, p.s2));
            }
        }
        config.min_danmu_size = std::max(1, max_dist*2);
        config.index_r_lock = false;

        nearby_danmu.clear();
    }

    void begin_index_lock() {
        config.index_r_lock = true;
    }

    uint check_similar(ushort mode, uint index_l) {
        uint index_r = nearby_danmu.size();
        auto p = DanmuCacheline(config.str_buf, mode, index_r);

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
}