let unknownVar: unknown = "lia";
unknownVar = false;
unknownVar = {
  a: 1,
};
unknownVar = () => {};
const val1: string = unknownVar; // error
const val2: number = unknownVar; // error
// any放弃了所有的类型检查，而known没有

// 需要对unknown属性进行访问的时候可以用类型断言

let unknownVar1: unknown;
(unknownVar1 as { foo: () => {} }).foo();

// 联合类型与交叉类型
interface NameStruct {
  name: string;
}
interface AgeStruct {
  age: number;
}
type ProfilesStruct = NameStruct & AgeStruct; //对象的合并
type TypeAdd = string & number; //类型的合并  never
const profile: ProfilesStruct = {
  name: "2222",
  age: 12,
};


type Struct1 = {
    primitiveProp:string;
    objectProp:{
        name: string;
    }
}
type Struct2 = {
    primitiveProp:number;
    objectProp:{
        age: number;
    }
}
type Composed = Struct1 & Struct2; //合并类型
type PrimitiveProp = Composed["primitiveProp"]; //never
type ObjectProp = Composed["objectProp"];  //{name:string,age:number}

interface AllStruct {
    propsA:number;
    [key:string]:string| number;
}
