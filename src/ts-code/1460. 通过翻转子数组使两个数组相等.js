
var canBeEqual = function(target, arr) {
    target = target.sort((a,b)=>a-b)
    arr = arr.sort((a,b)=>a-b);
    for (var i=0; i<arr.length; i++){
        if(arr[i] !== target[i]){
            return false;
        }
    }
    return true;
};
console.log(canBeEqual([1,2,3,4],[2,4,1,3]))