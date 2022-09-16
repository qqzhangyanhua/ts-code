

var nums = [12,345,2,6,7896]
var findNumbers = function(nums) {
    let count = 0;
    for (let i = 0; i < nums.length; i++){
        if(nums[i]%2===0&&nums[i].toString().length%2===0){
            count++;
        }
    }
    return count;
};
console.log(findNumbers(nums));