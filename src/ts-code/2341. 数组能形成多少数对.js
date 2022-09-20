

var numberOfPairs = function(nums) {
    let count = 0;
    let map = new Map();
    for (let i = 0; i < nums.length; i++){
        if(map.has(nums[i])){
            count++;
            map.delete(nums[i]);
        }else{
            map.set(nums[i],nums[i]);
        }
    }
    return [count,map.size]
};

console.log(numberOfPairs( [1,3,2,1,3,2,2]))