/**
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 *
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  // 判断输入是否合法
  if (!height || height.length === 0) {
    return 0;
  }
  // 初始化变量
  const n = height.length;
  let leftMax = 0,
    rightMax = 0;
  let result = 0;
  // 初始化两个指针
  let left = 0,
    right = n - 1;
  while (left <= right) {
    // 更新左边最高柱子的高度
    if (height[left] > leftMax) {
      leftMax = height[left];
    }
    // 更新右边最高柱子的高度
    if (height[right] > rightMax) {
      rightMax = height[right];
    }
    // 计算结果
    if (leftMax < rightMax) {
      result += leftMax - height[left];
      left++;
    } else {
      result += rightMax - height[right];
      right--;
    }
  }
  return result;
};
var height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
console.log(trap(height));
