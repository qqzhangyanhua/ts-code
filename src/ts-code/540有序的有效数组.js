var nums = [1, 1, 2, 3, 3, 4, 4, 8, 8];
var singleNonDuplicate = function (nums) {
    let l = 0;
    let r = nums.length - 1;
    while (l <= r) {
        let mid = l + ((r - l) >> 1)
        // 如果中间点相等，则说明是重复的，那么只能向右边找
        if (nums[mid] === nums[mid + 1]) {
            (mid % 2 === 0) ? l = mid + 1: r = mid
            // if (mid % 2 === 0) {
            //     // 偶数
            //     l = mid + 1
            // } else {
            //     r = mid
            // }
        } else if (nums[mid] == nums[mid - 1]) {
            (mid % 2 !== 0) ? l = mid + 1: r = mid
            // if (mid % 2 !== 0) {
            //     // 偶数
            //     l = mid + 1
            // } else {
            //     r = mid
            // }
        } else {
            l = mid;
            break;
        }
    }
    return nums[l]
};
var nums2 = [3, 3, 7, 7, 10, 11, 11]
var nums3 = [1, 1, 2]
var nums4 = [1, 1, 2, 2, 3]
console.log(singleNonDuplicate(nums4))