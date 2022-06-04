var sumOddLengthSubarrays = function (arr) {
    let ans = 0;
    for (let i = 1; i < arr.length; i++) {
        arr[i] += arr[i - 1];
    }


    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            if ((j - i + 1) & 1) {
                ans += (arr[j] - (arr[i - 1] || 0))
            }
        }
    }
    return ans
};
var arr = [1, 4, 2, 5, 3];
console.log(sumOddLengthSubarrays(arr));