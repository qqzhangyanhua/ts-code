var nums = [1, 0, 1, 0, 1];
var numSubarraysWithSum = function (nums, goal) {
    let n = nums.length;
    let count = 0,
        l1 = 0,
        l2 = 0,
        s1 = 0,
        s2 = 0;
    for (let i = 0; i < n; i++) {
        s1 += nums[i];
        s2 += nums[i];
        console.log('s1===', s1);
        while (l1 <= i && s1 > goal) {
            console.log('=======', s1);

            s1 -= nums[l1++]
        }
        while (l2 <= i && s2 >= goal) {
            s2 -= nums[l2++]
        }
        count += l2 - l1
    }
    return count
};

console.log(numSubarraysWithSum(nums, 2));