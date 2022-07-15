/*
 * @Author: ZYH
 * @Date: 2022-07-15 08:56:27
 * @LastEditTime: 2022-07-15 09:55:18
 * @Description: 
 */

interface Person {
    firstName: string;
    lastName: string;
}
function getName(person: Person): string {
    return "hello " + person.firstName + " " + person.lastName
}

const list:number[]=[1,2,3]
const list2:Array<number> = [1,2,3]
const list3:Array<Person> = [
    {firstName: "John", lastName: ""}
]
enum Color {Red=1, Green=22, Blue=22}
let c: Color = Color.Red

function warnUser(): void {
    console.log("This is my warning message");
}

let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

// 接口
function printLabel(labelledObj: { label: string }) {
    console.log(labelledObj.label);
}

interface LabelledValue {
    label: string;
    b?: number;
}
function printLabel2(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}
printLabel({ label: "hello"});
printLabel2({ label: "hello",b:2});

// 只读的接口
interface Point{
    readonly x: number;
    readonly y: number;
}
let p1: Point = {x: 10, y: 20};


let a:number[]= [1,2,3,4,5];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12;     // error!只读的


interface StringArray {
    [index: number]: string;
}
let myArray:StringArray = ["Bob", "Fred"];


// 继承接口
interface Shape{
    color: string;
}
interface Square extends Shape{
    sideLength: number;
}
let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
const obj2: Array<Square> = [
  {
    color: "red",
    sideLength: 10,
  },
];


// 一个接口可以继承多个接口
interface PenStroke{
    penWidth: number;
}
interface Square2 extends Shape, PenStroke{
    sideLength: number;
}
let square2: Square2 = {color: "blue", sideLength: 10, penWidth: 5};


// 混合类型
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
function getCounter(): Counter {
    let counter = <Counter>function (start: number) { return ""; };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
export {}