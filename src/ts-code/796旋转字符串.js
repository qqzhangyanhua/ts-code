/*
 * @Author: ZYH
 * @Date: 2022-08-03 08:21:58
 * @LastEditTime: 2022-08-03 08:22:00
 * @Description: 
 */
/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var rotateString = function(s, goal) {
    if(s.length!==goal.length){
        return false;
    }
    const str = s+s;
    return str.includes(goal);

};