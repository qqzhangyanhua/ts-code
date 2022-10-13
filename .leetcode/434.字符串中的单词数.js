/*
 * @lc app=leetcode.cn id=434 lang=javascript
 *
 * [434] 字符串中的单词数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var countSegments = function(s) {
   let count = 0;
    for(let i = 0; i < s.length; i++) {
        if(s[i] !== ' ' && (i === 0 || s[i - 1] === ' ')) {
            count++;
        }
    }
    return count;

};
// @lc code=end

