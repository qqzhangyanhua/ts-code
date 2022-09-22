
var minOperations = function(nums) {
  
    let count =0;
    for (let i = 1; i < nums.length; i++){
       let temp = nums[i-1]-nums[i];
       if(temp>=0){
           count = count + temp+1;
           nums[i]=nums[i-1]+1;
       }
    }
    return count;
};

  

console.log(minOperations([1,3,1]))