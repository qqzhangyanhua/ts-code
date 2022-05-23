var str = 'abcabcbb'
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (str) {
    let i = 0;
    let j = 0;
    if (str.length === 0) {
        result = 0
    }
    let result = 0
    const set = new Set(); //存set
    for (i; i < str.length; i++) {
        if (!set.has(str[i])) {
            set.add(str[i]); //如果不存在这个set里就添加
            result = Math.max(result, set.size)
        } else {
            while (set.has(str[i])) {
                set.delete(str[j]); //如果存在就删除
                j++
            }
            set.add(str[i]); //
        }
    }
    return result;
};
console.log('lengthOfLongestSubstring', lengthOfLongestSubstring(str))