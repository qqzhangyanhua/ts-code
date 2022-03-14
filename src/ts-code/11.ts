// 整数 千位符
function thousandSeparator(num: number): string {
  let res = "";
  const s = num.toString();
  const len = s.length;
  for (let i = len - 1; i >= 0; i--) {
    const j = len - i;
    if (j % 3 === 0) {
      if (i === 0) {
        res = s[i] + res;
      } else {
        res = "," + s[i] + res;
      }
    } else {
      res = s[i] + res;
    }
  }
  return res;
}
console.log(thousandSeparator(1002003))