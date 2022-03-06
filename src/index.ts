/**
 *
 *旋转数组K歩
 * @param {number[]} arr
 * @param {number} k
 * @return {*}  {number[]}
 */
function rotate(arr: number[], k: number): number[] {
  const length = arr.length;
  if (!k || length == 0) return arr;
  const step = Math.abs(k % length); //abs取绝对值
  for (let i = 0; i < step; i++) {
    const n = arr.pop();
    if (n) {
      arr.unshift(n);
    }
  }
  return arr;
}

function rotate1(arr: number[], k: number): number[] {
  const length = arr.length;
  if (!k || length == 0) return arr;
  const step = Math.abs(k % length); //abs取绝对值
  const part1 = arr.slice(-step);
  const part2 = arr.slice(0, length - step);
  const part3 = part1.concat(part2);
  return part3;
}
const arr = [1, 2, 3, 4, 5, 6, 7]
const arr1 = rotate1(arr, 3)
console.log(arr1)
