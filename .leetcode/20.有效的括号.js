/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const obj = {'(':")",'{':'}','[':']'};
    let stack = [];
    for(let i = 0; i < s.length; i++) {
        const el = s[i];
        if(el in obj) {
            stack.push(el);
        }else{
            if(el !=obj[stack.pop()]) {
                return false; //不匹配
            }
        }
    }
    return !stack.length;

};
// @lc code=end

