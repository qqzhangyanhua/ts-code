var arr1 = [4, 5, 8],
    arr2 = [10, 9, 1, 8],
    d = 2
var findTheDistanceValue = function (arr1, arr2, d) {
    let result = 0
    for (let i = 0; i < arr1.length; i++) {
        let flag = true
        for (let j = 0; j < arr2.length; j++) {
            if (Math.abs(arr1[i] - arr2[j]) <= d) {
                flag = false
                break
            }
        }
        if (flag) {
            result++
        }
    }
    return result


};
console.log('====', findTheDistanceValue(arr1, arr2, d))