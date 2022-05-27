var nums = [1, 2, 5, 2, 3]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var targetIndices = function (nums, target) {
    nums = nums.sort((a, b) => a - b)
    console.log(nums)
    let l = 0
    let r = nums.length - 1
    if (nums.length === 1 && target === nums[0]) {
        res.push(0)
    }
    const set = new Set()
    while (l <= r) {
        let mid = l + ((r - l) >> 1) //取mid
        if (nums[mid] < target) {
            l = mid + 1
        } else if (nums[mid] > target) {
            r = mid - 1
        } else if (nums[mid] === target) {
            set.add(mid)
            if (nums[mid] === nums[r]) {
                set.add(r)
                r--
            } else if (nums[mid] === nums[l]) {
                set.add(l)
                l++
            } else if (nums[mid] > nums[mid - 1]) {
                l = mid + 1
            } else if (nums[mid] < nums[mid + 1]) {
                r = mid - 1
            }
        }
    }
    return [...set]
};
var nums2 = [11, 34, 78, 38, 8, 41, 97, 15, 16, 18, 97, 36, 21, 11, 85, 83, 36, 11, 45, 17, 93, 95, 70, 12, 16, 18, 13, 89, 97, 20, 86, 46, 24, 50, 45, 94, 89, 25, 61, 59, 51, 72, 74, 55, 4, 41, 47, 46, 45, 75, 93, 2, 61, 99, 39, 74, 49, 83, 53, 54, 22, 55, 89, 98, 48, 44, 87, 74, 25]

console.log('22222', targetIndices(nums2, 45));