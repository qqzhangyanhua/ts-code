nums = [9, 4, 1, 7], k = 2
// var minimumDifference = function (nums, k) {
//     nums.sort((a, b) => a - b)
//     let ans = Infinity
//     for (let i = 0, j = k - 1; i < j, j < nums.length; i++, j++) {
//         ans = Math.min(ans, nums[j] - nums[i])
//     }
//     return ans
// };


var minimumDifference = function (nums, k) {
    nums = nums.sort((a, b) => a - b)
    let middle = Infinity;
    let i = 0
    for (let j = 0; j < nums.length; j++) {
        if (j - i + 1 === k) {
            middle = Math.min(middle, nums[j] - nums[i])
            i++
        }
    }
    return middle
}
console.log('minimumDifference', minimumDifference(nums, k))