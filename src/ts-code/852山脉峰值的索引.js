var arr = [0, 2, 1, 0, -1]
var arr1 = [24, 69, 100, 99, 79, 78, 67, 36, 26, 19]
var arr2 = [0, 1, 0]
var arr3 = [40, 48, 61, 75, 100, 99, 98, 39, 30, 10]
var arr4 = [12, 13, 19, 41, 55, 69, 70, 71, 96, 72]
var peakIndexInMountainArray = function (arr) {
    let l = 0
    let r = arr.length - 1
    while (l <= r) {
        let mid = l + ((r - l) >> 1)
        if (arr[mid] < arr[mid + 1]) {
            // 如果小于他的时候右查找
            l = mid + 1
        } else if (arr[mid] > arr[mid + 1]) {
            // 大于的时候左查找
            if (arr[mid] > arr[mid - 1]) {
                return mid
            }
            r = mid - 1
        }
    }
    return l
};
console.log(peakIndexInMountainArray(arr3));