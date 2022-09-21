
var groupSizes = [3,3,3,3,3,1,3]
var groupThePeople = function(groupSizes) {
    const arr = [];
    const map = new Map();
    for(let i = 0; i < groupSizes.length; i++){
        if(groupSizes[i]===1){
            arr.push([i])
        }else{
            const str = map.get(groupSizes[i])||[];
            str.push(i);
            //如果数组长度等于这个值
            if(str.length===groupSizes[i]){
                arr.push([...str]);
                str.length=0;
            }
            map.set(groupSizes[i],str)
        }
    }
    return arr

};
console.log(groupThePeople(groupSizes))