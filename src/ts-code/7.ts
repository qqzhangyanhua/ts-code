
// 斐波那契数列

function addNuber(n: number): number{
    if (n === 0) return 0
    if (n === 1) return 1
    let n1 = 1;
    let n2 = 0;
    let result = 0;
    for (let i = 2; i < n; i++){
        result = n1 + n2;
        n2 = n1
        n1=result;
    }
    return result;

}
console.log(addNuber(9))