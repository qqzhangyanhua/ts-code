/*
 * @lc app=leetcode.cn id=58 lang=javascript
 *
 * [58] 最后一个单词的长度
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLastWord = function (s) {

    let len = s.length - 1
    let count = 0
    for (let i = len; i >=0; i--) {
        if(s[i] ===' ' &&count===0)continue;
        if (s[i] != ' ') {
           count++
        }
        if (s[i] == ' ') {
           break
         }
    }
    return count
};
// @lc code=end