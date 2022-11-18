/*
 * @lc app=leetcode.cn id=150 lang=javascript
 *
 * [150] 逆波兰表达式求值
 */

// @lc code=start
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
    let stack = [];
    let i = 0;
    let temp
    while (i < tokens.length) {
        const t = tokens[i]
        if (t === '+') {
            temp = stack.pop() + stack.pop();
            stack.push(temp)
        } else if (t === '-') {
            let num1 =stack.pop()
            temp = stack.pop() - num1;
            stack.push(temp)
        } else if (t === '*') {
            temp = stack.pop() * stack.pop()
            stack.push(temp)
        } else if (t === '/') {
            const num2 = stack.pop()
            temp = Math.trunc(stack.pop()/num2)
            stack.push(temp)
        } else {
            stack.push(Number(t))
        }
        i++
    }
    return stack.pop()
};
// @lc code=end