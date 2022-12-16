/*
 * @lc app=leetcode.cn id=459 lang=javascript
 *
 * [459] 重复的子字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
// var repeatedSubstringPattern = function (s) {
//   const str = s + s;
//   return str.substring(1, str.length - 1).includes(s);
// };
/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
  let len = s.length;

  let step = 1;
  let initStr = s.substring(0, step);
  while (step <= len / 2) {
    console.log("1111", initStr.repeat(len / step));
    if (initStr.repeat(len / step) === s) {
      return true;
    }
    step++;
    initStr = s.substring(0, step);
  }

  return false;
};

// @lc code=end
