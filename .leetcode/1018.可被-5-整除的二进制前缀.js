/*
 * @lc app=leetcode.cn id=1018 lang=javascript
 *
 * [1018] 可被 5 整除的二进制前缀
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean[]}
 */
var prefixesDivBy5 = function (nums) {
  const res = new Array(nums.length).fill(false);
  let temp = 0;
  for (let i = 0; i < nums.length; i++) {
    temp = ((temp << 1) + nums[i]) % 10;

    // temp = (temp * 2 + nums[i]) % 10;
    if (temp % 5 === 0) {
      res[i] = true;
    }
  }
  return res;
};
// @lc code=end
