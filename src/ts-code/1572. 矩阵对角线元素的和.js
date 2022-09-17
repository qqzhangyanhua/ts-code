var mat =[[1,2,3],[4,5,6],[7,8,9]]

var diagonalSum = function(mat) {
    //首先看是都是奇数还是偶素
    let n = mat.length;
    let res =0;
   
    for(let i = 0,  j=n-1; i <n;i++,j--) {
        res=res+mat[i][i]+mat[i][j];

    }  
    if(n%2==0){
        let center =n>>1;
        res-=mat[center][center]
    } 
    console.log(res); 
    return res;
};
console.log(diagonalSum(mat))