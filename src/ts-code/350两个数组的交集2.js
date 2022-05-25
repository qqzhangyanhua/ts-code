var nums1 = [1, 2, 2, 1],
    nums2 = [2]

var nums1 = [4, 9, 5],
    nums2 = [9, 4, 9, 8, 4]
// var intersect = function (nums1, nums2) {
//     let result = []
//     if (nums1.length > nums2.length) {
//         [nums1, nums2] = [nums2, nums1]
//     }
//     for (let i = 0; i < nums1.length; i++) {
//         if (nums2.includes(nums1[i])) {
//             result.push(nums1[i])
//         }
//     }
//     return result
// };

var intersect = function (nums1, nums2) {
    let result = []
    let map = new Map();
    if (nums1.length < nums2.length) {
        [nums1, nums2] = [nums2, nums1]
    }
    for (const num1 of nums1) {
        if (map.has(num1)) {
            const val = map.get(num1)
            map.set(num1, val + 1)
        } else {
            map.set(num1, 1)
        }
    }
    for (const num2 of nums2) {
        console.log(map)
        const val = map.get(num2)
        if (val > 0) {
            result.push(num2)
            map.set(num2, val - 1)
        }
    }
    return result
}
console.log(intersect(nums1, nums2));