var nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
var maxSubArray = function (nums) {

    let pre = nums[0];
    let ans = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (pre > 0) {
            pre = pre + nums[i];
        } else {
            pre = nums[i];
        }
        ans = Math.max(ans, pre);
    }
    return ans
};
console.log(maxSubArray(nums));