// var intersection = function (nums1, nums2) {

//     let res = []
//     num1 = Array.from(new Set(nums1)).sort()
//     num2 = Array.from(new Set(nums2)).sort()
//     res = num1.concat(num2).sort()
//     let l = 0;
//     let r = res.length;
//     let minRes = []
//     let map = new Map();
//     for (let i = 0; i < res.length; i++) {
//         if (map.has(res[i])) {
//             minRes.push(res[i])
//         } else {
//             map.set(res[i], i)
//         }
//     }
//     return minRes
// };
var intersection = function (nums1, nums2) {
    let set = new Set();
    for (let i = 0; i < nums1.length; i++) {
        if (nums2.includes(nums1[i])) {
            set.add(nums1[i]);
        }
    }
    return [...set];

}
var nums1 = [4, 9, 5],
    nums2 = [9, 4, 9, 8, 4]

console.log(intersection(nums1, nums2))