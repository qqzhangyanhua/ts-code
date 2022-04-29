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
 * @return {number[]}
 */
var postorderTraversal = function (root) {
    const res = [];
    if (!root) return res;
    const stack = [];
    stack.push(root);
    while (stack.length) {
        const cur = stack.pop();
        res.unshift(cur.val);
        if (cur.left) {
            stack.push(cur.left);
        }
        if (cur.right) {
            stack.push(cur.right);
        }

    }
    return res;
};