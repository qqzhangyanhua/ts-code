/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {

    let list = []
    backTrack(list, [], nums)
    // 递归逻辑
    return list


};

function backTrack(list, temp, nums) {
    //终止条件--push
    if (temp.length === nums.length) {
        return list.push([...temp])
    }
    for (let i = 0; i < nums.length; i++) {
        //找到一个不在temp里的数字
        if (temp.includes(nums[i])) {
            continue
        }
        temp.push(nums[i])
        backTrack(list, temp, nums)
        temp.pop() //如果没找到就pop 比如第一次【1，2，3】
        // 已经push进去了这个时候就需要pop了【1，2】
        //继续pop[1,2]
        //[1]
        // [1,3]
        //[1,3,2]
        //[]
    }

}


// 流程

console.log(permute([1,2,3]));
// @lc code=end