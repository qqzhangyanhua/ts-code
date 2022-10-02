/*
 * @lc app=leetcode.cn id=80 lang=javascript
 *
 * [80] 删除有序数组中的重复项 II
 */

const { Result } = require("postcss");

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let slow = 2;
    let fast = 2;
    for(fast; fast < nums.length; fast++) {
        if(nums[slow - 2] !== nums[fast]) {
            nums[slow] = nums[fast];
            slow++;
        }
    }
    return slow;
};
// @lc code=end

