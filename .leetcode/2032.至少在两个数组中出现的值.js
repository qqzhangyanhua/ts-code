/*
 * @lc app=leetcode.cn id=2032 lang=javascript
 *
 * [2032] 至少在两个数组中出现的值
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @return {number[]}
 */
var twoOutOfThree = function (nums1, nums2, nums3) {
  const map = new Map();
  const set = new Set();
  for (const num of new Set(nums1)) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  for (const num of new Set(nums2)) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  for (const num of new Set(nums3)) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  for (const [key, value] of map) {
    if (value >= 2) {
      set.add(key);
    }
  }
  return [...set];
};
// @lc code=end
