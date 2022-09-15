
var nums = [1,2,3];
var subsets = function(nums) {
    const arr = [];
    const search= (path,index) => {
        arr.push(path.slice());
        for(let i=index;i<nums.length; i++){
            path.push(nums[i]);
            search(path,i+1);
            path.pop();
        }
    }
    search([],0);
    return arr

};
console.log(subsets(nums))