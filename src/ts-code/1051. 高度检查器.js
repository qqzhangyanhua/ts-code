

var heightChecker = function(heights) {
    let  count = 0;
   const arr = [...heights]
   heights.sort((a, b) =>a-b)
   console.log(arr)
   for (let i = 0; i < arr.length; i++){
       if(arr[i]!==heights[i]){
           count++;
       }
   }
    return count;

};
console.log(heightChecker([1,1,4,2,1,3]))