// 会打包什么样子的呢？
// import  {add,minus,multiply,divide} from './text.js';

// console.log('add',add(1,2));

//这种情况下又有哪些代码被打包进去呢

// import {myInfo} from './test2'
// console.log('info==',myInfo.name) 

// 这样又有哪些被打包进去了呢
// var Vue = {}
// // import info from './test3'
// // 如果用require不用importn呢
// const info = require('./test3')

// // Vue.prototype.info = info
// console.log('info==', info.age)





// 这样又有哪些被打包进去了呢

// import {addMapping} from './test4'
// console.log('info==',addMapping(1,2))
// console.log('info==222',addMapping(1,2))




var arr = [1,2,3,4,5,6,7,8,9,10]
console.log('arr',arr.includes(2))