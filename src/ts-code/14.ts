// 输入: nums = [-1,0,3,5,9,12], target = 9
// 输出: 4
// 解释: 9 出现在 nums 中并且下标为 4
// leetcode 704题目
function search(nums: number[], target: number) {
    const len = nums.length;
    if (len === 0) return -1;
    let left = 0;
    let right = len - 1
    let mid:number
    while (left <= right) {
        mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) {
            return mid;
        } else if (target < nums[mid]) {
            right=mid-1
        } else {
            left =mid +1
        }
    }
    return -1
}