/*
 * @Author: ZYH
 * @Date: 2022-09-02 09:05:11
 * @LastEditTime: 2022-09-02 09:12:29
 * @Description: 
 */


interface User{
    /**
     * 用户
     */
    name:string;
    age:number;
}
let user:User={
    name: 'John',
    age:11
}
//会自动类型推导
function add(a: number, b: number) {
  return a + b;
}


// 有时候我们需要复用一个类型，但是又不需要此类型内的全部属性，因此需要剔除某些属性，这个时候 Omit 就派上用场了。
interface User2 {
  username: string;
  id: number;
  token: string;
  avatar: string;
  role: string;
}
type UserWithoutToken = Omit<User2, "token">;


//学会用record
type Car = 'Audio'|'BMW'|'ME'
type CarList = Record<Car,{age: number}>
const cars:CarList={
    BMW:{age:12},
    Audio:{age:11},
    ME:{age:111}
}
export {}