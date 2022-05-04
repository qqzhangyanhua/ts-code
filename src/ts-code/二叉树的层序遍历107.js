/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {

    // 如果是空直接返回空数组
    if (!root) {
        return [];
    }
    // 创建一个队列
    const stack = [];
    stack.push(root);
    const res = [];
    while (stack.length > 0) {
        // 先将根节点放入队列
        let list = [];
        let len = stack.length
        for (let i = 0; i < len; i++) {
            const node = stack.shift();
            list.push(node.val);
            if (node.left) {
                stack.push(node.left);
            }
            if (node.right) {
                stack.push(node.right);
            }

        }

        res.unshift(list);
    }
    return res;
};