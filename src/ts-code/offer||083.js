/*
 * @Author: ZYH
 * @Date: 2022-07-23 09:52:05
 * @LastEditTime: 2022-07-23 10:16:44
 * @Description: 剑指 Offer II 083. 没有重复元素集合的全排列
 */
var permute = function (nums) {
    let res = [];
    let arr = []
  const find = function (){
    if(arr.length===nums.length){
        const newLocal = res.push([...arr]);
        return
    }
    for(let i=0; i<nums.length;i++ ){
        if(arr.indexOf(nums[i])===-1){
            arr.push(nums[i])
            find()
            console.log("arr=", arr);
            arr.pop()

        }else{
            continue
        }
    }
  }
  find()
    return res
};
var nums = [1, 2, 3];
console.log(permute(nums))