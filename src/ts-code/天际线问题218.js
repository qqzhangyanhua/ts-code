    function arrSort(arr) {
        return arr.sort((a, b) => (a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]));
    }
    var getSkyline = function (buildings) {
        if (buildings.length === 0) {
            return [];
        }
        let result = [],
            flatRes = [],
            pre = null;
        for (let val of buildings) {
            flatRes.push([val[0], -val[2]]); //为了区别左端点存的是负数
            flatRes.push([val[1], val[2]]);
        }
        arrSort(flatRes);
        let heights = [0];
        for (let val of flatRes) {
            console.log(val);
            if (val[1] < 0) {
                heights.push(-val[1]); //左侧端点负负得正
            } else {
                const index = heights.findIndex((el) => el === val[1]);
                heights.splice(index, 1);
            }
            let maxHeight = Math.max(...heights);
            if (pre !== maxHeight) {
                result.push([val[0], maxHeight]);
                pre = maxHeight;
            }
        }
        return result;
    };