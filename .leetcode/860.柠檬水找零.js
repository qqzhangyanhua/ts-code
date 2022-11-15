/*
 * @lc app=leetcode.cn id=860 lang=javascript
 *
 * [860] 柠檬水找零
 */

// @lc code=start
/**
 * @param {number[]} bills
 * @return {boolean}
 */

// 1 给5直接揣兜里
//给10 兜里有5就给他

var lemonadeChange = function (bills) {
    let fiveNum = 0;
    let tenNum = 0;
    for (let i = 0; i < bills.length; i++) {
        let bill = bills[i]
        if (bill === 5) {
            fiveNum += 1;
        } else if (bill === 10) {
            //如果等于10的时候先看看手里有没有5快的
            if (fiveNum > 0) {
                fiveNum -= 1;
                tenNum += 1;
            } else {
                return false;
            }
        } else {
            //这个时候是20
            if (tenNum > 0 && fiveNum > 0) {
                tenNum -= 1;
                fiveNum -= 1;
            } else if (fiveNum > 2) {
                fiveNum -= 3;
            } else {
                return false;
            }
        }
    }
    return true;
};
// @lc code=end