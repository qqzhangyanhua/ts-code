
const add = (a, b) =>a+b;
const msg ='hello world'
console.log(add(1,2),'fffffffffffffffffff');
console.log(msg,add(4,2),'3333333333');
let promies = new Promise((resolve, reject) => {
    resolve(); //异步处理 
   });
   
console.log('promise===',promies);
// const arr = [1,2,3,4,5,6,7,8]
// console.log('dfsdfsdfsdfsdfsfsdf',arr.at(2))
// function getA(){
//     return new Promise((resolve, reject) =>{
//         resolve(1234)
//     })
// }
// getA.then(res=>{
//     console.log(msg)
// })