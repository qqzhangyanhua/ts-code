/*
 * @Author: ZYH
 * @Date: 2022-07-19 08:37:42
 * @LastEditTime: 2022-07-19 08:54:01
 * @Description: 函数
 */

const add = (a: number, b: number): number => a+b;

//return 一个乏型的函数
function returnItem<T>(item: T): T {
    return item;
}
//多个参数的泛型
function swap<T,U>(tup:[T,U]):[U,T]{
    return [tup[1], tup[0]];
}


function getArray<T>(arg:Array<T>): Array<T>{
    return arg;
}
getArray([1,2,3]);

//f泛型的接口
interface ReturnItemFn<T> {
    (item: T): T;}

const returnItemFn1:ReturnItemFn<number> = prea=>prea;
const returnItemFn2:ReturnItemFn<string> = prea=>prea;



function getValue<T extends object ,U extends keyof T>(obj:T,kry:U){
    return obj[kry]
}
getValue({name:'zhang'},'name');




export {}
