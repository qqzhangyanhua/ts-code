/*
 * @lc app=leetcode.cn id=560 lang=javascript
 *
 * [560] 和为 K 的子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    const n = nums.length;
    let ans = 0;
    let pre =0;
    const map = new Map();
    for (let i = 0; i < n; i++) {
        pre += nums[i];
        if (pre == k) ans++;
        if (map.has(pre - k)) ans += map.get(pre - k);
        map.set(pre, (map.get(pre) || 0) + 1);
    }

    return ans

};
// @lc code=end