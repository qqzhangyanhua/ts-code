var nums = [5, 7, 7, 8, 8, 10]
// var searchRange = function (nums, target) {
//     const res = []
//     if (!nums.includes(target)) {
//         return [-1, -1]
//     }
//     let l = 0;
//     let r = nums.length - 1;
//     while (l <= r) {
//         let mid = l + ((r - l) >> 1)
//         if (nums[mid] === target) {
//             res.push(mid)
//             if (nums[mid - 1] === target) {
//                 res.unshift(mid - 1);
//                 l = mid + 1;
//             } else if (nums[mid + 1] === target) {
//                 res[1] = (mid + 1);
//                 break;
//             }
//             r = mid - 1;
//             res.push(mid);

//         } else if (nums[mid] < target) {
//             l = mid + 1
//         } else {
//             r = mid - 1
//         }
//     }

//     return res
// };

var searchRange = function (nums, target) {
    const res = []
    if (!nums.includes(target)) {
        return [-1, -1]
    }
    let l = 0;
    let r = nums.length - 1;
    let mid
    while (l <= r) {
        mid = l + ((r - l) >> 1)
        if (nums[mid] < target) {
            l = mid + 1
        } else if (nums[mid] > target) {
            r = mid - 1
        } else {

            break;
        }
    }
    if (l > r) {
        return [-1, -1]
    }
    const result = nums.slice(l, r + 1)
    for (let i = 0; i < result.length; i++) {
        if (result[i] == target) {
            res.push(l + i)
        }
    }
    if (res.length == 1) {
        res[1] = res[0]
    }
    const arr = []
    if (res.length > 2) {
        res[1] = res[res.length - 1]

    }

    return res.slice(0, 2)
};

console.log('22ddd2', searchRange([3, 3, 3], 3))
console.log('22ddd2', searchRange([1], 1))
console.log('22ddd2', searchRange(nums, 8))