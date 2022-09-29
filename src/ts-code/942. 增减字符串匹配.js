
var diStringMatch = function(s) {
    let res = [];
    let min = 0;
    let max = s.length;
    for (let i = 0; i <=s.length; i++){
       if(s[i]==='I'){
           res.push(min++)
       }else{
           res.push(max--)
       }
    }
    return res;
};
console.log(diStringMatch('DDI'))