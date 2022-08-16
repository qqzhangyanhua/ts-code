/*
 * @Author: ZYH
 * @Date: 2022-08-11 18:27:07
 * @LastEditTime: 2022-08-11 18:36:18
 * @Description: 
 */


var nums = [-2,1,-3,4,-1,2,1,-5,4];
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let pre = nums[0];
    let ans = nums[0];
    for (let i = 1; i < nums.length; i++){
        if(pre>0){
            pre = pre + nums[i];
        }else{
            pre = nums[i];
        }
        ans = Math.max(ans,pre)

    }
    return ans;

};