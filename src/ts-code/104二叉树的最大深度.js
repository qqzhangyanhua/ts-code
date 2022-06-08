var maxDepth = function (root) {
    let res = 0
    if (!root) return res
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))

};