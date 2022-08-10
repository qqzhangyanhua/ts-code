/*
 * @Author: ZYH
 * @Date: 2022-08-10 08:38:06
 * @LastEditTime: 2022-08-10 08:39:21
 * @Description: 子集2
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    const res =[];
    nums.sort((a,b)=>a-b);
    function backTrack(start,curr){
        res.push([...curr]);
        for(let i =start;i<nums.length;i++){
            if(i>start&& nums[i]===nums[i-1]){
                //元素有相等的时候
                continue;
            }
            curr.push(nums[i]);
            backTrack(i+1,curr);
            curr.pop();
        }
    }
    backTrack(0,[]);
    return res;

};
var nums = [1,2,2]
console.log(subsetsWithDup(nums))