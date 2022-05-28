var nums = [0, 2, 3, 4, 5]
var findMagicIndex = function (nums) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === i) {
            return i;
        }
    }
};
console.log(findMagicIndex(nums));