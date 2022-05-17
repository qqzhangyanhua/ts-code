var nums = [1, 1, 4, 2, 3]
var minOperations = function (nums, x) {
    // 边界判断
    if (nums[0] > x && nums[nums.length - 1] > x) {
        return -1
    }
    // 初始化
    let res = 10085
    let map = new Map();
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i]
        map.set(sum, i)
        if (sum > x) break; //及时break
        if (sum === x) {
            res = Math.min(res, i + 1)
            break;
        };
    }
    console.log('map==', map)
    sum = 0;
    let j = nums.length - 1
    for (; j >= 0; j--) {
        sum += nums[j]
        console.log('sum=', sum, j, x)
        const leftIndx = map.get(x - sum);
        console.log('leftIndex', map.get(x - sum))
        if (leftIndx != 0 && j > leftIndx) {
            res = Math.min(res, leftIndx + 1 + nums.length - j)
            console.log('rs', res)
        }
        if (sum > x) break; //及时break
        if (sum === x) {
            res = Math.min(res, nums.length - j)
            break;
        }

    }
    return res === 1085 ? -1 : res
};
console.log('i want result===2', minOperations([1, 1], 3))