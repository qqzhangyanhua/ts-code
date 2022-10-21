/*
 * @lc app=leetcode.cn id=1013 lang=javascript
 *
 * [1013] 将数组分成和相等的三个部分
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {boolean}
 */

//思路，先累加一个num 然后取余比较
var canThreePartsEqualSum = function(arr) {
    let count = 0;
    let sum = 0;
    let s = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    if(sum%3!=0){
        return false; //边界处理，如果不能被3整除说明不能累加
    }
    for(let i = 0; i < arr.length; i++) {
        s +=arr[i];
        if(s==sum/3){
            count++;
            s=0
        }

    }
    return count>=3

};
console.log(canThreePartsEqualSum([0,2,1,-6,6,-7,9,1,2,0,1]))
// @lc code=end

