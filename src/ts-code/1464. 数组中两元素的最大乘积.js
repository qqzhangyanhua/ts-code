
var nums = [3,4,5,2]
var maxProduct = function(nums) {
    nums.sort((a,b)=>b-a)
    return (nums[0]-1)*(nums[1]-1)
};
console.log(maxProduct(nums))