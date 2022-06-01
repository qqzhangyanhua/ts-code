var arrangeCoins = function (n) {
    let l = 0;
    let r = n;
    while (l <= r) {
        let mid = l + ((r - l) >> 1)
        let sum = (1 + mid) * mid / 2
        if (sum === n) {
            return mid
        }
        if (sum < n) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return r

};
console.log(arrangeCoins(8));