let a: number, b: number;
a = 2;
b = 2;
//联合类型
let ma: "1111" | "222";
ma = "1111";
ma = "222";
let se: string | boolean;
se = "22222";
se = false;

//设置了any 相当关闭了TS监测
let ay: any;
ay = 1;
ay = "1111";
ay = false;

//unknown 表示未知类型不能赋值给其他已知类型

let e: unknown;
e = 10;
e = "123";
e = false;
let d: string;
// d = e 报错！！

d = e as string; //类型断言可以告诉类型实际类型
d = <string>e //断言的第二种用法

function fn() {
    
}

// {}用来指定包含哪些属性
let aa: { name: string,[key:string]:string }
aa = { name: "dsdsdsds", age: '111' }

let bb: (a: number, b: number) => number
bb = function (a , b) {
    return a + b
}



