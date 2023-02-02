let activeEffect = null;
class Dep {
    constructor(val) {
        this._val = val;
        this.effects = new Set();
    }
    get value() {
        this.depend()
        return this._val;
    }
    set value(val) {
        this._val = val;
        this.notice()

    }
    //收集依赖
    depend() {
        if (activeEffect) {
            this.effects.add(activeEffect);
        }
    }

    //派发依赖
    notice() {
        //当发生改变的时候就把依赖执行一遍
        this.effects.forEach(effect => effect())

    }
}


const ref = (value) => {
    return new Dep(value)
}
const effect = (fn) => {
    activeEffect = fn;
    fn()
    activeEffect = null;

}
const a = ref(10);
let b
effect(() => {
    b = a.value + 10;
})
// console.log('bbb', b); //20
// a.value = 20;
// console.log('bbb', b); //30
// a.value = 40;
// console.log('bbb',b); //50
let targetMap = new Map();
const getDeps = (target, key) => {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    let deps = depsMap.get(key);
    if (!deps) {
        deps = new Dep();
        depsMap.set(key, deps)
    }
    return deps
}
const reactive = (raw) => {
    return new Proxy(raw, {
        get(target, key) {
            const deps = getDeps(target,key);
            deps.depend()
            return Reflect.get(target, key)
        },
        set(target, key, value) {
            const deps = getDeps(target,key)
            const result = Reflect.set(target, key, value)
            deps.notice()
            console.log(targetMap);
            return result

        },
    })
}

const user = reactive({
    age: 18,
    name:'zyh'
})
let double
effect(() => {
    double = user.age * 2
})
console.log('double===', double); //36
user.age = 30;
user.name = 'zyh111'
console.log('double===', double); //60