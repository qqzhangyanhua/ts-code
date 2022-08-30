/*
 * @Author: ZYH
 * @Date: 2022-08-30 09:18:03
 * @LastEditTime: 2022-08-30 09:30:29
 * @Description: 
 */


/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const numberObj = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}
    let res = 0;
    for(let i = 0; i < s.length; i++) {
        let left = numberObj[s[i]]
        let right = numberObj[s[i+1]]
        // if(typeof left === 'number'&&typeof right === 'number') {
            res +=left<right ? -left : left
        // }
    }
    return res;

};
console.log("34545", romanToInt("IV"));