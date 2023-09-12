
type T ='a'|'b'|'v'
let foo = 'a'
//  写法1
let bar:T = foo as T

//写法2
let bar2:T =<T>foo

const userName = document.getElementById('userName') 
if(userName){
    console.log((userName as HTMLInputElement).value);
    
}


const value2:unknown = 'value2'
const s1:string = value2 as string

// s双重断言
const s2 =3
const s3 = s2 as unknown as string

export {}