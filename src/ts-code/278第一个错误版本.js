/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function (n) {
        let l = 1;
        let r = n;
        while (l < r) {
            let mid = l + ((r - l) >> 1);
            if (isBadVersion(mid)) {
                r = mid
            } else if (!(isBadVersion(mid))) {
                l = mid + 1
            }
        }
        return r
    };
};