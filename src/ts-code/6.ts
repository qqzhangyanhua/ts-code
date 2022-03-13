// 找出一个数组中的两数之和（递增数组）
// 可以采用二分思想
function findTwoNumbers(arr: number[], n: number): number[]{
    const result: number[] = [];
    const len: number = arr.length;
    if (len === 0) return result;
    let i = 0;
    let j = len - 1;
    while (i < j) {
        const n1 = arr[i]
        const n2 = arr[j]
        const sum = n1 + n2;
        if (sum > n) {
            j--
            // sum大于n 则J向前移动
        }else if (sum < n) {
            i++;
            // sum<n则i向后挪动
        } else {
            result.push(n1);
            result.push(n2);
            break;
        }
    }
    
    return result
}
const arr = [1, 2, 3, 4, 5, 6, 7, 11, 23, 45]
console.log(findTwoNumbers(arr,29))
export{}
