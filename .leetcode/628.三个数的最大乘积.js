/*
 * @lc app=leetcode.cn id=628 lang=javascript
 *
 * [628] 三个数的最大乘积
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
 var maximumProduct = function(nums) {
    nums.sort(function(a,b){return a-b});
    let result_a = nums[0]*nums[1]*nums[nums.length-1];
    let result_b = nums[nums.length-1]*nums[nums.length-2]*nums[nums.length-3];
    if(result_a > result_b){
        return result_a;
    }
    return result_b;
};




// @lc code=end

