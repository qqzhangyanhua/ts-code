var merge = function (nums1, m, nums2, n) {
    var l = nums1.length
    while (n > 0) {
        if (m > 0 && nums1[m - 1] > nums2[n - 1]) {
            nums1[--l] = nums1[--m]
        } else {
            nums1[--l] = nums2[--n]
        }
    }
    return nums1
};
var nums1 = [1, 2, 3, 0, 0, 0],
    m = 3,
    nums2 = [2, 5, 6],
    n = 3

console.log(merge(nums1, m, nums2, n))