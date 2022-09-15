
var constructMaximumBinaryTree= (nums)=>{
    if(nums.length==0)return null;
    let maxIndex=0;
    for(let i=0; i<nums.length; i++){
        if(nums[i]>nums[maxIndex]){
            maxIndex = i;
        }
    }
    let leftTree = constructMaximumBinaryTree(nums.slice(0,maxIndex));
    let rightTree = constructMaximumBinaryTree(nums.slice(maxIndex+1));
    return new TreeNode(nums[maxIndex], leftTree, rightTree);

}