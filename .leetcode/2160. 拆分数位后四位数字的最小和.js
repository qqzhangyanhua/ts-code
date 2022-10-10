var minimumSum = function(num) {
   num = num.toString();
   const res = [];
   for (let i = 0; i < num.length; i++) {
    res.push(num[i])
   }
  res.sort((a, b) => a - b)
   return Number(`${res[0]}${res[2]}`) + Number(`${res[1]}${res[3]}`)

};

console.log(minimumSum(2932))