/*
 * @lc app=leetcode.cn id=680 lang=javascript
 *
 * [680] 验证回文串 II
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */

var validPalindrome = function(s) {
    let l = 0
    let r = s.length - 1
    let flag = true // 记录是否跳过一个字符
    while(l<=r){
        if(s[l]===s[r]){ // 相等的时候，左指针左移，右指针右移
            l++
            r--
        } else if(!flag){ // 已经跳过一次了
            return false
        } else if(s[l]===s[r-1] && s[l+1]!==s[r]) { // 右侧跳过一个字符
            flag = false
            l++
            r-=2
        } else if(s[l+1]===s[r] && s[l]!==s[r-1]) { // 左侧跳过一个字符
            flag = false
            l+=2
            r--
        } else if(s[l+1]===s[r] && s[l]===s[r-1]){ // 当左右都可以跳过的时候，递归下去
            return validPalindrome(s.slice(l+1,r)) || validPalindrome(s.slice(l,r-1))
        } else {
            return false    // 所有情况不符
        }
    }
    return true
};



console.log(validPalindrome('cbbcc'))
// @lc code=end

