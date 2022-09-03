/*
 * @Author: ZYH
 * @Date: 2022-09-03 08:40:07
 * @LastEditTime: 2022-09-03 08:43:56
 * @Description: 
 */
var sentences = ["alice and bob love leetcode", "i think so too", "this is great thanks very much"]


var mostWordsFound = function (sentences) {
    let count = 0;
    for (let i = 0; i < sentences.length; i++) {
        const len = sentences[i].split(' ').length;
        console.log(sentences[i].split(" "));
        count = Math.max(count, len);
    }
    return count


};

console.log(mostWordsFound(sentences));