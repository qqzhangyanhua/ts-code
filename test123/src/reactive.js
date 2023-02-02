

let activeEffect
const targetMap =new Map();
class Dep{
    constructor(){
        this.effects = new Set();
    }
    depend(){
        if (activeEffect) {
            this.effects.add(activeEffect)
        }
    }
    notice(){
        this.effects.forEach(effect => effect())

    }
}
const watchEffect = (effect) => {
    activeEffect = effect;
    effect()
    activeEffect = null;
}
const getDep = (target,key) => {
    let depsMap = targetMap.get(target); 
    // 初始化
    if(!depsMap){
        depsMap = new Map();
        targetMap.set(target,depsMap)
    }
    let dep = depsMap.get(key);
    if(!dep){
        dep = new Dep();
        depsMap.set(key,dep)
    }
    return dep
}
const reactive = (raw)=>{
    return new Proxy(raw,{
        get(target,key){
            const dep =getDep(target,key);
            dep.depend()
            return Reflect.get(target,key)
        },
        set(target,key,value){
            const dep =getDep(target,key)
            const result = Reflect.set(target,key,value)
            dep.notice()
            return result
        }
    })
}
const user = reactive({age:18})
let doubled  
watchEffect(()=>{
    doubled =  user.age *2
})
console.log('doubled==',doubled); //36
user.age++
console.log('doubled==',doubled); //38

