// 回文数
function findPalindered(number: number) {
    if (number <= 10) {
        return false;
    }
    const res = number.toString().split('').reverse().join('');
   return number.toString()===res
    
}