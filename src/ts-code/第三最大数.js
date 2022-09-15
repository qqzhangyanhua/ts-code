var thirdMax = function (nums) {
    nums.sort((a, b) => b - a);
    for(let i =0;i<nums.length;i++) {
        if(nums[i] === nums[i+1]) {
            nums.splice(i,1);
            i--;
        }   
    }
    console.log(nums);

    if(nums.length<3) {
        return nums[0];
    }
    return nums[2]
};

var nums = [1,2]
console.log(thirdMax(nums))