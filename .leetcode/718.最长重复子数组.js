/*
 * @lc app=leetcode.cn id=718 lang=javascript
 *
 * [718] 最长重复子数组
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function (nums1, nums2) {
  if (nums1.length === 0 || nums2.length === 0) {
    return 0;
  }
  const m = nums1.length;
  const n = nums2.length;
  const dp = new Array(n + 1).fill(0);
  let res = 0;
  for (let i = 1; i <= m; i++) {
    for (let j = n; j >= 1; j--) {
      if (nums1[i - 1] === nums2[j - 1]) {
        dp[j] = dp[j - 1] + 1;
        res = Math.max(res, dp[j]);
      } else {
        dp[j] = 0;
      }
    }
    res = Math.max(res, dp[n]);
  }
  return res;
};
console.log(findLength([1, 2, 3, 2, 1], [3, 2, 1, 4, 7]));
// @lc code=end
