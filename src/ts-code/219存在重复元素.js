var nums = [1, 2, 3, 1],
    k = 3
var containsNearbyDuplicate = function (nums, k) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            if (i - map.get(nums[i]) <= k) {
                return true;
            }
        }
        map.set(nums[i], i);
    }
    return false;
};
console.log(containsNearbyDuplicate(nums, k));