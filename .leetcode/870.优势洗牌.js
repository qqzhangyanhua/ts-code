/*
 * @lc app=leetcode.cn id=870 lang=javascript
 *
 * [870] 优势洗牌
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
// var advantageCount = function (nums1, nums2) {
//   let res = [];
//   for (let i = 0; i < nums2.length; i++) {
//     const item = nums2[i];
//     const larger = nums1.filter((num) => num > item);
//     let min;
//     if (larger.length) {
//       min = Math.min(...larger);
//     } else {
//       min = Math.min(...nums1);
//     }
//     nums1.splice(nums1.indexOf(min), 1);
//     res.push(min);
//   }
//   return res;
// };
var advantageCount = function (nums1, nums2) {
  let res = [];
  nums1.sort((a, b) => a - b);
  for (let i = 0; i < nums2.length; i++) {
    const item = nums2[i];
    const index = nums1.findIndex((num) => num > item);
    if (index > -1) {
      res.push(nums1[index]);
      nums1.splice(index, 1);
    } else {
      res.push(nums1.shift());
    }
  }
  return res;
};
// @lc code=end
