var nums = [3, 1, 2]
var findMin = function (nums) {
    let l = 0;
    let r = nums.length - 1;
    while (l <= r) {
        let mid = l + ((r - l) >> 1);
        if (nums[mid] > nums[r]) {
            l = mid + 1;
        } else if (nums[mid] < nums[r]) {
            r = mid;
        } else {
            r = mid - 1;
        }
    }

    return nums[l];
};
console.log("cccccc", findMin(nums))