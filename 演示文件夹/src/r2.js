let activeEffect
class Dep {
    constructor() {
        this.effects = new Set();
    }
    depend() {
        if (activeEffect) {
            this.effects.add(activeEffect)
        }
    }
    notice() {
        this.effects.forEach(effect => effect())

    }
}
const watchEffect = (effect) => {
    activeEffect = effect;
    effect()
    activeEffect = null;
}
let targetMap = new Map();
const getDeps = (target,key)=>{
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    let dep = depsMap.get(key)
    if (!dep) {
        dep = new Dep()
        depsMap.set(key, dep)
    }
    return dep
}
const baseHandler = {
    get(target, key) {
        const dep = getDeps(target,key)
        dep.depend();
        return Reflect.get(target, key)

    },
    set(target, key, value) {
        const dep = getDeps(target,key)
        const result = Reflect.set(target, key,value)
        dep.notice();
        return result;

    }
}
const reactive = (raw) => {
    return new Proxy(raw,baseHandler )
}

const user = reactive({
    age: 12
})
let double
watchEffect(() => {
    double = user.age * 2
})
console.log('=====', double); //24
user.age++;
console.log('wwwww', double); //26