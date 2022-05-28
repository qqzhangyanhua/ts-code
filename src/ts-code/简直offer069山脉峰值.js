var arr = [1, 3, 5, 4, 2]
var peakIndexInMountainArray = function (arr) {
    let l = 0;
    let r = arr.length - 1;
    while (l < r) {
        let mid = l + ((r - l) >> 1);
        if (arr[mid] > arr[mid + 1]) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    return l;
};

console.log(peakIndexInMountainArray(arr));