var removeDuplicates = function (nums) {
    if (nums.length === 0) return 0;
    let slow = 0;
    let fast = 1;
    while (fast < nums.length) {
        if (nums[fast] !== nums[slow]) {
            slow++
            nums[slow] = nums[fast];
        }
        fast++
    }
    return slow + 1;
};
console.log(removeDuplicates([1, 1, 2]))