type StatusCode = 200 | 301 | 400 | 500 | 502;
type PossibleDataTypes = string | number | (() => unknown);

const status: StatusCode = 502;

// 泛型
type Factory<T> = T | number | string;
const foo: Factory<boolean> = true;
const foo1: Factory<number> = 123;
type FactoryWithBool = Factory<boolean>;
const foo2: FactoryWithBool = false;

// 基本使用
type MaybeNull<T> = T | null;

function process(input: MaybeNull<{ handelOk: () => {} }>) {
  input?.handelOk();
}

type MaybeArray<T> = T | T[];
function processArray<T>(input: MaybeArray<T>): T[] {
  return Array.isArray(input) ? input : [input];
}

// 交叉类型
interface NameStruct {
  name: string;
}
interface AgeStruct {
  age: number;
}
type ProfileStruct = NameStruct & AgeStruct;
const profiles: ProfileStruct = {
  name: "lisi",
  age: 12,
};

// 交叉不存在的类型
type Struct1 = {
  primitProp: string;
  objectProp: {
    name: string;
  };
};
type Struct2 = {
  primitProp: string;
  objectProp: {
    age: number;
  };
};
type Composed = Struct1 & Struct2;
type PrimitivePropType = Composed["primitProp"]; //never
type ObjectPropType = Composed["objectProp"]; // { name: string; age: number; }
const object1: ObjectPropType = {
  name: "object1",
  age: 12,
};
export {};
