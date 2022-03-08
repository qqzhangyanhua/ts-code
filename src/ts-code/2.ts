function isMatch(left: string, right: string): boolean {
  if (left === "(" && right === ")") return true;
  if (left === "[" && right === "]") return true;
  if (left === "{" && right === "}") return true;
  return false;
}
/**
 *
 *
 * @param {string} str
 * @return {*}  {boolean}
 */
function matchBracket(str: string): boolean {
  const length = str.length;
  if (length === 0) return true;
  const stack = [];
  const leftStr = "{([";
  const rightStr = "]})";
  for (let i = 0; i < length; i++) {
    const s = str[i];
    if (leftStr.includes(s)) {
      stack.push(s);
    } else if (rightStr.includes(s)) {
      const top = stack[stack.length - 1];
      if (isMatch(top, s)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
}
const str = "(){}}{";
console.log("1111111ss", matchBracket(str));
