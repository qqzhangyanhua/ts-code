var nums = [0, 1, 4, 6, 7, 10]

// var arithmeticTriplets = function (nums, diff) {
//     let count = 0;
//     let map = new Map();
//     for (let i = 0; i < nums.length; i++) {
//         for (let j = i + 1; j < nums.length; j++) {
//             if (nums[j] - nums[i] === diff) {
//                 for (let k = j + 1; k < nums.length; k++) {
//                     if (nums[k] - nums[j] === diff) {
//                         count++;

//                     }
//                 }
//             }
//         }
//     }
//     return count;
// };


var arithmeticTriplets = function (nums, diff) {
    // 我们只需要返回true/false代表能否找到即可。因为严格递增，找到k的索引一定在j之后
    const search = (left, target) => {
        let l = left,
            r = nums.length - 1;
        while (l <= r) {
            let mid = l + ((r - l) >> 1);
            if (nums[mid] === target) {
                return true;
            } else if (nums[mid] > target) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return false;
    }

    let ans = 0

    for (let i = 0; i < nums.length - 2; i++) {
        if (search(i + 1, nums[i] + diff) && search(i + 1, nums[i] + diff + diff)) {
            ans++;
        }
    }
    return ans;
};


var arithmeticTriplets1 = function (nums, diff) {
    const search = (left, target) => {
        let l = left,
            r = nums.length - 1
        while (l <= r) {
            let mid = l + ((r - l) >> 1);
            if (nums[mid] === target) {
                return true
            } else if (nums[mid] > target) {
                r = mid - 1

            } else {
                l = mid + 1;
            }
        }
        return false
    }
    let ans = 0;
    for (let i = 0; i < nums.length - 2; i++) {
        if (search(i + 1, nums[i] + diff) && search(i + 1, nums[i] + diff + diff)) {
            ans++
        }
    }
    return ans
}

console.log(arithmeticTriplets1(nums, 3))