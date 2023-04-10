const str = "2222222";
const obj = {
  name: "sss",
};
const fn = (input: string) => {
  return input.length > 5;
};
type Obj = typeof obj;
const myObj: Obj = {
  name: "sss",
};
function isString(input: unknown): input is string {
  //input is string
  return typeof input === "string";
}

function foo(input: string | number) {
  if (isString(input)) {
    // 类型“string | number”上不存在属性“replace”。
    input.replace("linbudu", "linbudu599");
  }
  if (typeof input === "number") {
  }
  // ...
}

interface Foo {
  foo: string;
  fooOnly: boolean;
  shared: number;
}

interface Bar {
  bar: string;
  barOnly: boolean;
  shared: number;
}

function handle(input: Foo | Bar) {
  if ("foo" in input) {
    //input is Foo
    input.fooOnly;
  } else {
    input.barOnly;
  }
}

function ensureArray(input: number | number[]): number[] {
  if (Array.isArray(input)) {
    return input;
  } else {
    return [input];
  }
}

interface Foo {
  kind: "foo";
  diffType: string;
  fooOnly: boolean;
  shared: number;
}

interface Bar {
  kind: "bar";
  diffType: number;
  barOnly: boolean;
  shared: number;
}

function handle1(input: Foo | Bar) {
  if (input.kind === "foo") {
    input.fooOnly;
  } else {
    input.barOnly;
  }
}

//泛型的应用
function handle3<T>(input: T): T {
  return input;
}
handle3("sss");
function swap<T, U>([start, end]: [T, U]): [U, T] {
  return [end, start];
}

const swapped1 = swap(["linbudu", 599]);
const swapped2 = swap([null, 599]);
const swapped3 = swap([{ name: "linbudu" }, {}]);


//从原始类型开始
type Result1 = "linbudu" extends string ? 1 : 2; // 1
type Result2 = 1 extends number ? 1 : 2; // 1
type Result3 = true extends boolean ? 1 : 2; // 1
type Result4 = { name: string } extends object ? 1 : 2; // 1
type Result5 = { name: "linbudu" } extends object ? 1 : 2; // 1
type Result6 = [] extends object ? 1 : 2; // 1

export {};
