var nums = [3,5,2,3]
var minPairSum = function(nums) {
    nums.sort((a, b) => b - a);
    const count = 0;
    let r =nums.length-1
    let l = 0;
    const str = []
    while (l <= r){
        str.push(nums[l] + nums[r])
        l++;
        r--
    }
  
    return Math.max(...str)

};

var minPairSum1 = function(nums) {
    nums.sort((a, b) => b - a);
    let r =nums.length-1
    let l = 0;
    let count = 0;
    while (l <= r){
       count = Math.max(count ,nums[l]+nums[r])
        l++;
        r--
    }
  
    return count;

};
console.log(minPairSum(nums))