// 二分法

function branchSearcher(arr: number[], target: number): number {
  const len = arr.length;
  if (len === 0) return -1;
  let startIndex = 0; //开始位置
  let endIndex = len - 1; //结束位置
  while (startIndex <= endIndex) {

    const midIndex = Math.floor((startIndex + endIndex) / 2);
      const midValue = arr[midIndex];
    console.log(startIndex, midValue);
      
    if (target < midValue) {
      // 如果目标值小于
      endIndex = midIndex - 1;
    } else if (target > midValue) {
      // 如果目标值大于
      startIndex = midIndex + 1;
    } else {
      // 如果相当
      return midIndex;
    }
  }
  return -2;
}
const arr = [10, 22,33,44,55,66];
const target = 33;
console.log("二分查找==", branchSearcher(arr, 55));
export {};
