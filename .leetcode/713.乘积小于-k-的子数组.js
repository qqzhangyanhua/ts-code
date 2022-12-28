/*
 * @lc app=leetcode.cn id=713 lang=javascript
 *
 * [713] 乘积小于 K 的子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
  const helper = (nums, k) => {
    if (k <= 1) return 0;
    let prod = 1,
      ans = 0,
      left = 0;
    for (let right = 0; right < nums.length; right++) {
      prod *= nums[right];
      while (prod >= k) {
        prod /= nums[left++];
        console.log("prod==", prod, left);
      }
      ans += right - left + 1;
    }
    return ans;
  };
  return helper(nums, k);
};
console.log(numSubarrayProductLessThanK([10, 5, 2, 6], 100));
// @lc code=end
