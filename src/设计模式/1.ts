/*
 * @Author: ZYH
 * @Date: 2022-08-05 09:11:34
 * @LastEditTime: 2022-08-05 09:34:47
 * @Description: 设计模式
 */

// 每一个函数都有一个属性叫做prototype
// 封装，继承，多态
/******
 * 面向对象的四个特征
 * 抽象
 */
class User{
    public name:string
    constructor(name:string){
        this.name = name

    }
}
let user = new User('zhufeng');
console.log(user.name)



class Animal{
   name:string;
   age:number;
   eat(){
    console.log('eat')
   }
}
let animal = new Animal();
animal.eat();
class Dog extends Animal{
    constructor(name:string){
        super();
        this.name = name
    }
    eat(){
        console.log('dog eat')
    }
}