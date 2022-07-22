/*
 * @Author: ZYH
 * @Date: 2022-07-19 08:34:38
 * @LastEditTime: 2022-07-22 09:37:31
 * @Description: 
 */

interface Eg1{
    name: string;
    readonly age:12
}
// T1 当设置为T1时，只能设置name和age，不能设置其他属性
type T1 = keyof Eg1;


class Eg2 {
    private name: string;
    public readonly age: number;
    protected home: string;
}
// T2 被约束为age name和home设置为可读的不能被keyof补货到的
type T2 = keyof Eg2;


interface Eg3 {
    name: string;
    readonly age: number;
}
// string
type V1 = Eg3['name']

// string | number
type V2 = Eg3['age'|'name']




  interface Eg4 {
    name: string;
   }
   interface Eg5 {
    sex: string;
   }
   interface Eg6 extends Eg4,Eg5 {
    age: number;
   }
//    {age: number,sex: string,name: string}

// private 当设置为private时，只能在类的内部访问，不能在类的外部访问
// protected 当设置为protected时,值可以被类的内部以及内部的子类访问，但不能被类的外部访问
