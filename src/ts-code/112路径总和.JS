var hasPathSum = function (root, targetSum) {
    // 空节点
    if (!root) return false;
    // 就一层
    if (!root.left && !root.right) {
        return targetSum === root.val
    };
    return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)

};