/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    //边界条件
    //递推公式
    if(amount===0){
        return 0;
    }
    let dp = Array(amount+1).fill(Infinity);
    dp[0] = 0
    for(let i=0; i<coins.length; i++){
        for(let j=coins[i];j<=amount; j++){
            dp[j] = Math.min(dp[j-coins[i]]+1, dp[j])
        }
    }
    return dp[amount] ===Infinity?-1:dp[amount]

};
console.log(coinChange([1,2,5],11));
// @lc code=end

