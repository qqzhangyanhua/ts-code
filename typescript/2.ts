type A = string;
type StatusCode = 200 | 300 | 400 | 500;

const code: StatusCode = 200;
type Handel = (e: Event) => void;

const clickHandel: Handel = (e) => {};

type ObjType = {
  name: string;
  age: number;
};

type Factory<T> = T | number;
const foo: Factory<number> = 1;

interface NumberStruct {
  name: string;
}
interface AgeStruct {
  age: number;
}
type NumberOrAge = NumberStruct & AgeStruct; //& 交叉类型同事满足两个接口类型
const person: NumberOrAge = {
  age: 1,
  name: "1",
};

type Struct1 = {
  name: string;
  objProp: {
    name: string;
  };
};
type Struct2 = {
  name: number;
  objProp: {
    age: number;
  };
};
type Composed = Struct1 & Struct2;

type PName = Composed["name"]; //never
type ObjType1 = Composed["objProp"]; //{name:string;age:number}

const objType: ObjType1 = {
  name: "1",
  age: 1,
};

interface Foo {
  name: string;
  333: 22;
  pac:string
}
type Foo1 = keyof Foo & {}; //name | 333
type Foo2 = keyof Foo & string; //name | pac
type Foo3 = Foo[keyof Foo]; //string | 22