

// function add(a, b) {
//     return a + b;
// }
// function getValue(fn, a, b) {
//     return fn(a, b);
// }
// console.log(getValue(add, 1, 2));

// const getRest = (a,  ...rest) => {
//     console.log(rest);

// }
// getRest(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);


var nums1 = [1,2,3,0,0,0], m = 3 ,nums2 = [2,5,6], n = 3
var merge = function(nums1, m, nums2, n) {
    let i = m - 1, j = n - 1, k = m + n - 1;
    debugger
    while (i >= 0 && j >= 0) {
        // nums1[k--] = nums1[i] > nums2[j] ? nums1[i--] : nums2[j--];
        if(nums1[i]>nums2[j]){
            nums1[k--] = nums1[i--]
        }else{
            nums1[k--] = nums2[j--]
        }
    }
    while (j >= 0) {
        nums1[k--] = nums2[j--];
    }
    return nums1
}
console.log(merge(nums1,m,nums2,n))