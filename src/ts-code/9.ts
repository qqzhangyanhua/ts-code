// 连续出现最多的字符
interface IRES {
  length: number;
  char: string;
}
function getString(key: string) {
  const res: IRES = { length: 0, char: "" };
  const len = key.length;
  if (len === 0) return res;
  let tempLength = 0;
  let i = 0;
  let j = 0;
  for (; i < len; i++) {
    if (key[i] === key[j]) {
      tempLength++; //累加数字
    }
    if (key[i] !== key[j] || i === len - 1) {
      //判断如果两个字符不想等或者循环到底了
      if (tempLength > res.length) {
        res.char = key[j];
        res.length = tempLength;
      }
      tempLength = 0; //重置下累加器   'aaaabcddddd'
      if (i < len - 1) {
        //如果没有到末尾
          j = i;
          i--
      }
    }
    }
    return res;
}
const str = "adfdfdgdfggggggggg"
console.log(getString(str))
export{}
