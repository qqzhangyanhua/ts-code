let activeEffect;
function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = fn;
    fn();
  };
  effectFn.deps=[]
  effectFn()
}

const bucket = new WeakMap();
const data = { text: "hello vue32222" };
const obj = new Proxy(data, {
  get(target, key) {
    track(target, key);
    return target[key];
  },
  set(target, key, value) {
    console.log("set======", key, value);
    target[key] = value;
    trigger(target, key);
    return true;
  },
});

function track(target, key) {
  if (!activeEffect) return target[key];
  let depsMap = bucket.get(target);

  if (!depsMap) {
    depsMap = new Map();
    bucket.set(target, depsMap);
  }

  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }
  deps.add(activeEffect);
//   activeEffect.deps.push(deps)  //会报错,先等会
}

function trigger(target, key) {
  const depsMap = bucket.get(target);
  console.log("bucket", bucket);
  if (!depsMap) return true;
  const effects = depsMap.get(key);
  console.log("effects", effects);

  effects && effects.forEach((effect) => effect());
}

function cleanup(effectFn){
    const deps = effectFn.deps
    deps.forEach(dep=>{
        dep.delete(effectFn)
    })
    effectFn.deps=[]
}
effect(() => {
  document.body.innerText = obj.text;
});
let num = 0;
setInterval(() => {
  obj.text = "hello world" + num++;
}, 4000);
