/*
 * @Author: ZYH
 * @Date: 2022-07-21 09:22:14
 * @LastEditTime: 2022-07-21 09:28:21
 * @Description: 
 */
var nums = [-1, -2, -3, -4, 3, 2, 1];
var arraySign = function (nums) {
    let prd = 1
    for (let i = 0; i < nums.length; i++){
        if(nums[i] == 0){
            return 0
        }else if(nums[i]<0){
            prd = -prd
        }
    }
    return prd
};
console.log(arraySign(nums));
