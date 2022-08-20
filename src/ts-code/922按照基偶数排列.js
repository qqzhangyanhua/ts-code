/*
 * @Author: ZYH
 * @Date: 2022-08-20 09:07:23
 * @LastEditTime: 2022-08-20 09:13:35
 * @Description: 
 */
function sortArrayByParityII(nums){
    let res=new Array(nums.length).fill(0);
    for(let i=0,k=0,j=1;k<nums.length;k++){
        if(nums[k]%2===0){
            res[i] = nums[k];
            i+=2
        }else{
            res[j] = nums[k];
            j+=2
        }
       
    }
     return res
}
console.log(sortArrayByParityII([4,2,5,7]))