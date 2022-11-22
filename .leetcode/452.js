
// 452. 用最少数量的箭引爆气球
var findMinArrowShots = function(points) {
    // 默认大小排序
    if(points.length<=1){
        return points.length;
    }
    points.sort((a,b)=>a[1]-b[1])
// 气球重叠的部分，一起用一直箭

// 一开始就是一支箭
    let result = 1
    let right = points[0][1]
    for (let i = 1; i < points.length; i++) {
        if(points[i][0] <=right) {
            //没有交集了只能什么也不做
           continue
            // 之间有交叉
        }else{
            result++
            // 尽可能找到重叠最多的
           right = points[i][1]
        }
    }
    return result

};

console.log(findMinArrowShots([[10,16],[2,8],[1,6],[7,12]]));