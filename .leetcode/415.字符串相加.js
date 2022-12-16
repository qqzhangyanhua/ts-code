/*
 * @lc app=leetcode.cn id=415 lang=javascript
 *
 * [415] 字符串相加
 */

// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;
  let add = 0;
  let ans = [];
  while (i >= 0 || j >= 0 || add != 0) {
    let x = i >= 0 ? num1.charAt(i) - "0" : 0;
    let y = j >= 0 ? num2.charAt(j) - "0" : 0;
    let result = x + y + add;
    ans.push(result % 10);
    add = Math.floor(result / 10);
    i -= 1;
    j -= 1;
  }
  return ans.reverse().join("");
};
// @lc code=end
