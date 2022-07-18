

let unknownVar:unknown='lia';
unknownVar = false;
unknownVar ={
    a:1,
}
unknownVar = ()=>{

}
const val1:string = unknownVar // error
const val2:number = unknownVar // error
// any放弃了所有的类型检查，而known没有


// 需要对unknown属性进行访问的时候可以用类型断言

let unknownVar1:unknown;
(unknownVar1 as {foo:()=>{}}).foo();