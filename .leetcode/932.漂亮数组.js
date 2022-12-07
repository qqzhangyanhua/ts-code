/*
 * @lc app=leetcode.cn id=932 lang=javascript
 *
 * [932] 漂亮数组
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[]}
 */
var beautifulArray = function (n) {
  const map = new Map();
  map.set(1, [1]); // 初始化，也是截止条件
  const recursion = (n) => {
    if (map.has(n)) return map.get(n); // 递归的终止条件
    // 奇数放在左侧 -- 按照数组长度排列好漂亮数组后，然后再通过 2N-1 的方式转成当前层的奇数
    const left = recursion((n + 1) >> 1).map((item) => item * 2 - 1);
    console.log("left==", left);
    const right = recursion(n >> 1).map((item) => item * 2);
    const ret = [...left, ...right];
    map.set(n, ret);
    return ret;
  };
  return recursion(n);
};

// @lc code=end
