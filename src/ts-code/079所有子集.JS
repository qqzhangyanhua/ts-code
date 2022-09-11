
var nums = [1,2,3]
var subsets = function (nums) {
   let res = [];
   let track = [];
   const backTrack=(nums,start,track)=>{
    res.push([...track]);
    for(let i = start;i<nums.length;i++){
        track.push(nums[i]);
        backTrack(nums,i+1,track);
        track.pop();
    }
   }
   backTrack(nums,0,track);
   return res;
};
console.log(subsets(nums))