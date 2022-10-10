/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */

 var minSubArrayLen = function(s, nums) {
    let L=0, R = 0, minLen = Infinity, sum = 0
    while(R < nums.length){
        sum += nums[R++]
        while(sum >= s){
            minLen = Math.min(minLen, R - L + 1)
            sum -= nums[L++]
        }
    }
    if(minLen == Infinity) return 0
    return minLen - 1
};
console.log(minSubArrayLen(7, [2,3,1,2,4,3]))

// @lc code=end