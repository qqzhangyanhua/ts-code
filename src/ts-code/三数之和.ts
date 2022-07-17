/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums: number[]): number[][] {
  const res: number[][] = []; //先定义result
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      return res;
    }
    if (nums[i] === nums[i - 1]) {
      continue;
    }
    let left: number = i + 1;
    let right: number = nums.length - 1;
    while (left < right) {
      let sum: number = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        while (left < right && nums[right] === nums[right--]) {
          right--;
        }
        res.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return res;
};
var arr = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(arr));
export {};
