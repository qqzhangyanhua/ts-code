/*
 * @lc app=leetcode.cn id=455 lang=javascript
 *
 * [455] 分发饼干
 */

// @lc code=start
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {

    s = s.sort((a,b) => a - b)
    g = g.sort((a,b) => a-b)
    let res = 0
    let index = s.length-1
    for (let i = g.length-1; i >= 0; i--)  {
        if(index>=0 &&s[index]>=g[i]){
            index--;
            res++
        }

    }
    return res

};
// @lc code=end

