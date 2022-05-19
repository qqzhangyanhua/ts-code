var nums = [1, 2, 3, 1]
var nums2 = [1, 2, 1, 3, 5, 6, 4]
var findPeakElement = function (nums) {
    let l = 0;
    let r = nums.length - 1;
    while (l < r) {
        let mid = l + ((r - l) >> 1)
        if (nums[mid] > nums[mid + 1]) {
            r = mid
        } else {
            l = mid + 1
        }
    }
    return r

};
// console.log('3333', findPeakElement(nums))
console.log('answer====1', findPeakElement([1, 2]))