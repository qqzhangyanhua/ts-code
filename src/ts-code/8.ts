// 移动0到数组末尾
function moveZero(arr: number[]) {
    const len = arr.length;
    if (len === 0) return;
    let j = -1;
    for (let i = 0; i < len; i++) {
        if (arr[i] === 0) {
            if (j < 0) {
                j=i
            }
        }
        if (arr[i] !== 0 && j >= 0) {
            const n = arr[i];
            arr[i] = arr[j];
            arr[j] = n;
            j++;
        }
    }
}
const arr = [1, 2, 0, 0, 9, 0, 4]
moveZero(arr)
console.log(arr)

export{}