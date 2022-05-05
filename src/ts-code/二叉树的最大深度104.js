    var maxDepth = function (root) {
        let level = 0;
        if (!root) {
            return level;
        }
        const stack = [root];
        while (stack.length) {
            let len = stack.length;
            for (let i = 0; i < len; i++) {
                const node = stack.shift();
                if (node.left) {
                    stack.push(node.left);
                }
                if (node.right) {
                    stack.push(node.right);
                }
            }
            level++;
        }
        return level;
    };