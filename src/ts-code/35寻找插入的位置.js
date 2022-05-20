/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    let l = 0;
    let r = nums.length - 1;
    while (l < r) {
        let mid = l + ((r - l) >> 1)
        if (nums[mid] === target) {
            return mid;
        }
        if (nums[mid] < target) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return nums[l] < target ? l + 1 : l;
};
var nums = [1, 3, 5, 6, 7]

console.log(searchInsert(nums, 4))