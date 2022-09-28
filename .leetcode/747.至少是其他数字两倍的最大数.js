/*
 * @lc app=leetcode.cn id=747 lang=javascript
 *
 * [747] 至少是其他数字两倍的最大数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var dominantIndex = function(nums) {
    if(nums.length===1)return 0;
    let max = Math.max(...nums);
    let res
    for(let i = 0;i<nums.length;i++){
        if(nums[i]*2>max && nums[i]!==max){
            return -1;
        }
        if(nums[i]===max){
            res = i;
        }
    }
    return res;

};
// @lc code=end

