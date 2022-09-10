

var nums = [1,2,2,1]
var countKDifference = function (nums, k) {
    let count = 0;
    let map = new Map();
    for(const num of nums) {
        count += (map.get(num - k) || 0) + (map.get(num + k)||0)
        map.set(num,(map.get(num)||0)+1)
    }
  return count
};
console.log(countKDifference(nums,1))