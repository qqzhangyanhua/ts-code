/*
 * @lc app=leetcode.cn id=1002 lang=javascript
 *
 * [1002] 查找共用字符
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {string[]}
 */
var commonChars = function(words) {
    let res = [];
   let word = words[0];
   for(let i = 0; i < word.length;i++){
      const flag = words.every(item => item.includes(word[i]))
        if(flag){
            //替换掉‘’已经匹配了的字符
            words = words.map(item => item.replace(word[i],''))
            res.push(word[i])
        }
   }

   return res;
};
// @lc code=end

