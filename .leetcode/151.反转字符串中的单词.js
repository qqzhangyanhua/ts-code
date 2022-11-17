/*
 * @lc app=leetcode.cn id=151 lang=javascript
 *
 * [151] 反转字符串中的单词
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    // let left = 0
    // let right = s.length-1
    // let stack = []
    // let temp = ''
    // while (s.charAt[left] === ' ') {
    //     left++;
    // }
    // while (s.charAt(right) === ' ') {
    //     right--;
    // }
    // while (left <= right) {
    //     let cn = s.charAt(left)
    //     if (cn == ' ' && temp) {
    //         stack.unshift(temp)
    //         temp = ''
    //     } else if (cn !== ' ') {
    //         temp += cn
    //     }
    //     left++
    // }
    // stack.unshift(temp)
    // return stack.join(' ')

    let stack = [];
    let temp = ''
    for (let i = 0; i < s.length; i++) {
        if (s[i] !== ' ') {
            temp += s[i]
        } else if (temp && s[i] == ' ') {
            stack.unshift(temp)
            temp = ''
        }
    }
    if (temp) {

        stack.unshift(temp)
    }
    return stack.join(' ')
};
// @lc code=end