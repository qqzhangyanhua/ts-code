/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
    var sum = 0;
    for (var i = 0; i < nums.length; i++) {
        sum += nums[i];
    }
    var leftSum = 0;
    for (var i = 0; i < nums.length; i++) {
        if (leftSum == sum - leftSum - nums[i]) {
            return i;
        }
        leftSum += nums[i];
    }

    return -1
};
var nums = [1, 7, 3, 6, 5, 6]

console.log(pivotIndex(nums));