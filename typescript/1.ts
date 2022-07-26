/*
 * @Author: ZYH
 * @Date: 2022-07-26 08:37:46
 * @LastEditTime: 2022-07-26 09:32:16
 * @Description: 
 */

let arr1:number[] = [1,2,3,4,5];
let arr2:Array<number> = [1, 2, 3];
let arr3 :[string, number] =['aa',1];

enum Gender{
    Girl,
    Boy
}

// 常量枚举
const enum Color{
    RED,YELLOW,GREEN,
}
let myColor = [Color.GREEN,Color.RED,Color.YELLOW];
//eleement l类型 strictNullChecks为true的时候会检查非null
let element:(HTMLElement| null) = document.getElementById('root');
// 非空断言
element!.style.color = 'red';


let y:number |undefined|null;
y=1;
y=undefined;
y=null;


// never 代表不会出现的值
// 
function error(msg:string):never{
    throw  new Error('error')
}
// 类型保护
function fn(x:number|string){
    if(typeof x === 'string'){
        console.log(x)
    }else if(typeof x === 'number'){
        console.log(x);
    }else{
        console.log('never',x);
    }
}

// void代表没有任何返回值
 function name():void {
    return undefined
 }
// 类型推导
let uname;  //自动推导 成any
uname = 1;


//包装对象
let name1 = 'dfasdfas'
console.log(name1.toLowerCase());

// 联合类型
let name3:string|number;






 const S1 = Symbol('key')
export {}
