/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
 */

// @lc code=start
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
var levelOrder = function(root) {
    let result  = []; //结果
    let queue = [root]
    if(!root){
        return result
    }
    while (queue.length){
        let len = queue.length  //一层的数据量
        let currentLevel = []
       while(len > 0){
        let node = queue.shift();
        currentLevel.push(node.val)
        node.left && queue.push(node.left)
        node.right && queue.push(node.right)
        len--
       }
        result.push(currentLevel)
    }
    return result


};
// @lc code=end

