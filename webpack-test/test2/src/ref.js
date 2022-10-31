let activeEffects = null;
//  ref() a.value b.value 
// reactive  ref
class RefImpl {
    constructor(val) {
        this._val = val;
        this.effects = new Set();
    }
    get value() {
        this.depend();
        return this._val;
    }
    set value(newVal) {
        this._val = newVal;
        this.notice();
    }
    //收集依赖
    depend() {
        if (activeEffects) {
            this.effects.add(activeEffects);
        }
    }
    //派发依赖
    notice() {
        this.effects.forEach(effect => effect());
    }
}

const effect = (fn) => {
    activeEffects = fn;
    fn();
    activeEffects = null;
}
const ref = (val) => {
    return new RefImpl(val)
}
var a = ref(10)
let b
effect(() => {
    b = a.value + 10
})

//  console.log('b===',b) //20')
//  a.value = 20
//  console.log('b===',b) //30')');
//  a.value ++
//  console.log('b===',b) //31')');
let targetMap = new Map();
const getDeps = (target, key) => {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
         depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    let deps = depsMap.get(key);
    if (!deps) {
        deps = new RefImpl();
        depsMap.set(key, deps);
    }
    return deps
}
const reactive = (raw) => {
    return new Proxy(raw, {
        get(target, key) {
           const deps = getDeps(target, key);
            deps.depend();
            return Reflect.get(target, key)
        },
        set(target, key, value) {
            const deps = getDeps(target, key);
            const result = Reflect.set(target, key, value)
            deps.notice();
            return result
        }
    })

}
const user = reactive({
    age: 18,
    name: 'xxx'
})
let double
effect(() => {
  const app = document.getElementById('app')
  app.innerHTML=`<h3>${user.age*2}</h3>`
})
console.log('=====', double) //36)
user.age = 20;
console.log('=====', double) //40)');
user.age ++;
console.log('=====', double) //42)');