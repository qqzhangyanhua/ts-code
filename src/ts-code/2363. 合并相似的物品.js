var items1 = [[1,1],[4,5],[3,8]], items2 = [[3,1],[1,5]]
var mergeSimilarItems = function(items1, items2) {
    const map = new Map();
    for(const [i,v] of items1) {
       map.set(i, v)
    }
    for(const [i,v] of items2) {
        if(map.has(i)) {
            map.set(i, map.get(i)+v)
        }else{
            map.set(i,v)
        }
    }
    const res = [...map];
   return  res.sort((a,b)=>a[0]-b[0])
};
console.log(mergeSimilarItems(items1, items2));