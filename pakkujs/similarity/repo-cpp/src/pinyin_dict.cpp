#include <unordered_map>

typedef uint8_t uchar;
typedef uint16_t ushort;

std::unordered_map<ushort, std::pair<uchar, uchar>> pinyin_dict = {
#include "pinyin_dict.txt"
};