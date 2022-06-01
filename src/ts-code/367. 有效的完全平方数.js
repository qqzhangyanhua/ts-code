var isPerfectSquare = function (num) {
    if (num === 1) {
        return true;
    }
    let l = 0;
    let r = num;
    while (l <= r) {
        let mid = l + ((r - l) >> 1)
        if (mid * mid === num) {
            return true;
        }
        if (mid * mid < num) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return false
};
console.log(isPerfectSquare(16))