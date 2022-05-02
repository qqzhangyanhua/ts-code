 var findBottomLeftValue = function (root) {
     let answer = root.val || 0;
     let maxLevel = 0;
     const dfs = function (root, level) {
         if (!root) return;
         dfs(root.left, level + 1);
         dfs(root.right, level + 1);

         if (level > maxLevel) {
             maxLevel = level;
             answer = root.val;
         }
     };
     dfs(root, 0);
     return answer;
 };
 const textRoot = {
     val: 1,
     left: {
         val: 1
     },
     right: {
         val: 2
     }
 };
 const textValue = {
     val: 1233
 };
 const textRoot1 = {
     val: 2,
     left: {
         val: -1
     }
 };
 const textValue2 = {
     val: "第四个"
 };
 console.log(textRoot);
 console.log(findBottomLeftValue(textRoot));
 console.log(findBottomLeftValue(textValue));
 console.log(findBottomLeftValue(textRoot1));
 console.log(findBottomLeftValue(textValue2));