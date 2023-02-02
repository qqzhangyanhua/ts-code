let activeEffect
class RefImpl {
    constructor(val) {
        this._val = val;
        this.effects = new Set();
    }
    get value() {
        this.depend()
        return this._val;
    }
    set value(newValue) {
        this._val = newValue;
        this.notice()
    }
    //收集依赖
    depend() {
        if (activeEffect) {
            this.effects.add(activeEffect)
        }
    }
    // 更新依赖
    notice() {
        this.effects.forEach(effect => effect())

    }
}

const watchEffect = (effect) => {
    activeEffect = effect;
    effect()
    activeEffect = null;
}

const ref = (val) => {
    return new RefImpl(val);
}

const a = ref(10)
let b
watchEffect(() => {
    b = a.value + 10
})
console.log('bbb-----', b) //20
a.value = 20;
console.log('bbbbbbbb====', b) //30