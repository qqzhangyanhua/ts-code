

var nums = [5, 6, 2, 7, 4]
var maxProductDifference = function (nums) {
    nums.sort((a, b) => b - a)
    console.log(nums)
    return (nums[0]*nums[1])-(nums[nums.length-1]*nums[nums.length-2])
};

console.log(maxProductDifference(nums))