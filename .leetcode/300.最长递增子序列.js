/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {

    //动态规划
    // let n  = nums.length;
    // if(n===0){
    //     return 0;
    // }
    // let dp =Array(n).fill(1);
    // for(let i = 0; i <n; i++){
    //     for(let j =0;j<i; j++){
    //         if(nums[i]>nums[j]){

    //             dp[i] = Math.max(dp[i], dp[j]+1);
    //         }
    //     }
    // }
    // return Math.max(...dp)

    //贪心 + 二分
    //让序列尽可能增长的慢
    let n = nums.length;
    if (n === 0) {
        return 0;
    }
    let arr = [nums[0]];
    for (let i = 0; i < n; i++) {
        if (nums[i] > arr[arr.length - 1]) {
            arr.push(nums[i])
        } else {
            let left = 0
            let right = arr.length - 1
            while (left < right) {
                let mid = (left + right) >> 1;
                if (arr[mid] < nums[i]) {
                    left = mid + 1
                } else {
                    right = mid
                }
            }
            arr[left] = nums[i]
        }
    }
    console.log('arr',arr);
    return arr.length

};
// @lc code=end