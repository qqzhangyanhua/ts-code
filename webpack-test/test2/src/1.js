let activeEffect=null

class Dep{
    constructor(val){
        this._val = val;
        this.effects =new Set();
    }
    get value(){
        this.deep()
        return this._value;
    }
    set value(newVal){
        this._val =newVal
        this.notify()
    }
    //收集依赖
    deep(){
        if(this.activeEffect){
            this.effects.add(activeEffect)
        }
    }
    //派发依赖大声道
    notify(){
            this.effects.forEach(effect=>effect())
    }
}
const effect=(fn)=>{
    activeEffect = fn
    fn()
    activeEffect =null
}
const ref = (val)=>{
    return new Dep(val)
}
const v =ref(14)