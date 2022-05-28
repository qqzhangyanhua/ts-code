var nums = [3, 5]
var specialArray = function (nums) {
    nums = nums.sort((a, b) => a - b)
    let len = nums.length
    for (let i = 0; i < len; i++) {
        if (nums[i] >= len - i) {
            if (!i || nums[i - 1] < len - i) {
                return len - i
            }

        }
    }
    return -1
};
console.log('1608特殊数组的特殊值111', specialArray(nums));