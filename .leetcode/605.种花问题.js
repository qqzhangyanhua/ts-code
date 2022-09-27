/*
 * @lc app=leetcode.cn id=605 lang=javascript
 *
 * [605] 种花问题
 */

// @lc code=start
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
 function canPlaceFlowers(flowerbed, n) {
    let ans = 0
    for (let i = 0; i < flowerbed.length; i++) {
        if (flowerbed[i] == 0 && (flowerbed[i - 1] ?? 0) == 0 && (flowerbed[i + 1] ?? 0) == 0) {
            flowerbed[i] = 1
            ans++
        }
    }
    return ans >= n
};


// @lc code=end