var grid = [
    [4, 3, 2, -1],
    [3, 2, 1, -1],
    [1, 1, -1, -2],
    [-1, -1, -2, -3]
]
// 31.34%  21.94%
// var countNegatives = function (grid) {
//     let result = 0;
//     const arr = grid.flat()
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] < 0) {
//             result++
//         }
//     }
//     return result

// };

// 优化后用二分明显速度快多了
var countNegatives = function (grid) {
    let result = 0;
    for (let i = 0; i < grid.length; i++) {
        let l = 0
        let r = grid[i].length - 1
        while (l <= r) {
            const mid = l + ((r - l) >> 1)
            if (grid[i][mid] < 0) {
                result += (r - mid + 1)
                r = mid - 1
            } else {
                l = mid + 1
            }
        }

    }
    return result
}
console.log('====', countNegatives(grid))