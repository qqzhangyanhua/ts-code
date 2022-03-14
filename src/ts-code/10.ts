// 回文数
function findPalindered(number: number) {
  const res = number.toString().split("").reverse().join("");
  return number.toString() === res;
}
var words = ["abc", "car", "ada", "racecar", "cool"];
function findPalindered2(arr: string[]) {
  const len = arr.length;
  if (len === 0) return "";
  for (let i = 0; i < len; i++) {
    const str = arr[i].split("").reverse().join("");
    if (str === arr[i]) {
      return str;
    }
  }
}
function findPalindered3(arr: string[]) {
  const len = arr.length;
  if (len === 0) return "";
  for (let i = 0; i < len; i++) {
    let flag = true;
    let startIndex = 0;
    let endIndex = arr[i].length - 1;
    while (startIndex < endIndex) {
      if (arr[i][startIndex] !== arr[i][endIndex]) {
        flag = false;
        break;
      } else {
        startIndex++;
        endIndex--;
      }
      }
      if (flag) {
          return arr[i]
      }
  }
}
console.log(findPalindered3(words));
// 