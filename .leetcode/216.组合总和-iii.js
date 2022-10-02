/*
 * @lc app=leetcode.cn id=216 lang=javascript
 *
 * [216] 组合总和 III
 */

// @lc code=start
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
    const result = [];
    //循环1-9
    const helper = (k,n,sum,start,track) => {
        if(track.length ===k){
            if(sum ===n){
                result.push([...track]);
            }
            return;
        }
        for(let i = start;i<=9;i++){
            track.push(i);
            helper(k,n,sum+i,i+1,track);
            track.pop();
        }
    }
    helper(k,n,0,1,[]);
    return result;

};
// @lc code=end

