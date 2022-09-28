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
var canThreePartsEqualSum = function(arr) {
  let result = []
    for(let i =0;i<arr.length;i++){
        let count=0
        if(arr[i]>arr[i+1]){
            count+=arr[i]
        }else{
            result.push(count)
            count=0
        }
    }
    console.log(result)

};
canThreePartsEqualSum([0,2,1,-6,6,-7,9,1,2,0,1])
// @lc code=end

