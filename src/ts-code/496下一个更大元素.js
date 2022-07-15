
var nums=[1,3,5,2,4]
var nums2=[6,5,4,3,2,1,7]
// 太暴力了
// var nextGreaterElement = function (nums1, nums2) {
//     const res=[]
//     for (let i = 0; i < nums1.length; i++) {
//         const idx=nums2.findIndex(item=>item===nums1[i])
//         const newArr=nums2.slice(idx+1)
//         const next=checkNext(nums1[i],newArr)
//         res.push(next)
//         }
    
//     return res
// };
// function checkNext(num,arr){
//     console.log(num,arr)
//     for (let i = 0; i < arr.length; i++) {
//         if(arr[i]>num){
//             return arr[i]
//         }
//     }
//     return -1
// }


var nextGreaterElement = function (nums1, nums2) {
let n=nums1.length;
let m=nums2.length ;
let res=[];
for (let i = 0; i <n; i++) {
    let j=0;
    while(j<m&&nums1[i]!=nums2[j])j++;
    while(j<m&&nums1[i]>=nums2[j])j++;
    res[i]=j<m?nums2[j]:-1;

}
return res;

}
console.log(nextGreaterElement(nums,nums2))