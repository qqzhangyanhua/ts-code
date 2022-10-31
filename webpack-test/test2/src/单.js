import { createElementAccess } from "typescript"


 class Stroge{
   getInstance(){
        
        if(!Stroge.instance){
            Stroge.instance = new Stroge()
        }
        return Stroge.instance
   }
    setItem(key,value){
       localStorage.setItem(key,value)
    }
    getItem(key){
       return localStorage.getItem(key)
    }

 }

// 全局弹框



let stroge1 = Stroge.getInstance();
let stroge2 = Stroge.getInstance();
stroge1.setItem('name','zyh')
console.log(stroge2.getItem('name')) 

console.log(stroge1 === stroge2); //true