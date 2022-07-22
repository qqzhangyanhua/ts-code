/*
 * @Author: ZYH
 * @Date: 2022-07-22 09:07:39
 * @LastEditTime: 2022-07-22 09:19:26
 * @Description: 
 */

console.log( '----------------------------------------------------------------')

var nums = [1, 4, 3, 2];
var arrayPairSum = function (nums) {
let sum = 0;
let i = 0;
let len = nums.length;
nums.sort((a,b) => a - b);
for (; i < len - 1; i += 2) {
    sum += Math.min(nums[i], nums[i + 1]);
}


return sum;


};
console.log(arrayPairSum(nums))