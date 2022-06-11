var nums = [4, 3, 2, 7, 8, 2, 3, 1];
var findDisappearedNumbers = function (nums) {
    const res = []
    const len = nums.length
    for (let i = 1; i <= len; i++) {
        if (!nums.includes(i)) {
            res.push(i)
        }
    }
    return res
};
console.log(findDisappearedNumbers(nums));