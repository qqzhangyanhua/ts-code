/*
 * @lc app=leetcode.cn id=905 lang=javascript
 *
 * [905] 按奇偶排序数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function(nums) {
    const res = [];
    const res2 = [];
    for(let i=0;i<nums.length;i++){
        if(nums[i]%2===0){
            res.push(nums[i]);
        }else{
            res2.push(nums[i]);
        }

};
return [...res,...res2];
}
// @lc code=end

