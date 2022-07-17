const arr2: (number | string)[] = [1, "2", 3];
const arr3: Array<number> = [1, 2, 3];

// 元组 内容固定 类型固定
const tuple: [string, number, boolean] = ["1", 2, true]; //初始值必须按照这种
tuple.push(2); //可以push 进去定义的任何类型的值
let r = tuple.pop();
// tuple[5] = "111"; //报错的

// 枚举，大写是规范(Z正举反举都可以)
enum ROLE {
  USER,
  ADMIN,
  MANAGER,
}

//  null 与undefined 是任何类型的子类型
// strictNullChecks 严格模式下这玩意为false才可以赋值undefined
// let str111: number = undefined;

// never  从不代码无法达到终点
// 出错 ，死循环，永远走不到的判断

// 联合类型
let strNumber: number | string = 111;

const ele: HTMLElement | null = document.getElementById("app");
// 非空断言！！
ele!.innerHTML = "hello world";

let a1: undefined | number | string;
// 强转
(<string>a1).indexOf("");

// 字面量类型 只能用于枚举
// 类型过于复杂可以把类型提取出来
type IType = "a" | "v" | "c";
const enumType: IType = "a";
const enumValue: IType = "v";

type IFn = (a: number, b: number) => number;
const fn1: IFn = (a, b) => a + b;
fn1(1, 2);

const sum = (a: number, b?: number, ...args: number[]): number => {
  return a + b!;
};
sum(1, 2, 3, 4, 5);

// 函数的重载

// function add(name: string, value: string): string;
// function add(name: number, value: number): number;
function add(name: any, value: any) {
  return name + value;
}
add("string1", "string2"); //ok
add(1, 2); //ok
// add(1, "string");  //报错

// 类
class Pointer {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

//类型 联合类型
interface IObj {
  name: string;
  age: number;
}
function addObj(obj: IObj | string) {
  if (typeof obj === "string") {
    return obj;
  } else {
    return obj?.name;
  }
}
addObj({ name: "11", age: 11 });
addObj("1233");
