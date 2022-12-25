/*
 * @lc app=leetcode.cn id=954 lang=javascript
 *
 * [954] 二倍数对数组
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var canReorderDoubled = function (arr) {
  let map = new Map();
  for (let i = 0; i < arr.length; i++) {
    map.set(arr[i], map.get(arr[i]) + 1 || 1);
  }
  arr.sort((a, b) => a - b);
  for (let i = 0; i < arr.length; i++) {
    if (map.get(arr[i]) == 0) continue;
    let target = arr[i] < 0 ? arr[i] / 2 : arr[i] * 2;
    if (map.get(target) > 0) {
      map.set(arr[i], map.get(arr[i]) - 1);
      map.set(target, map.get(target) - 1);
    } else {
      return false;
    }
  }

  return true;
};

// @lc code=end
