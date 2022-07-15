 ## ts 安装
 - tsx --init 生成tsconfig.json
 - 所有类型都在：后面
    - 全局安装：npm install -g typescript

- number 与Number的区别
```
let num2:Number=3 //用来描述实例的
let number:number=1;
let str:string='1';
let bool:boolean=true;
let any:any='1'; //anyScript

```
### 数组集合
   - 数组类型数组的概念

   ```
    let arr:number[]=[1,2,3];
    const arr2:(number|string)[]=[1,'2',3];
   ```
- 你可以在any类型上进行任何操作，因为此时类型推导和检查是完全被禁用的
- any表示了一个无拘无束的类型，它能兼容所有类型，也能被所有类型兼容
- 如果类型不兼容报错，可以使用断言处理，少用any

````javascript
      type UnioWithNever = 'lisi'| 599 | true | never | void;

````
 ### 非空断言
   ````js
    obj!.foo!.fn()
   ````