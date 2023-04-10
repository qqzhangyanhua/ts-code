function effect(){
    document.body.innerHTML = obj.text
}

const bucket = new Set();
const data = {text:'hello vue3'};
const obj = new Proxy(data,{
    get(target,key){
        bucket.add(effect);
        return target[key];
    },
    set(target,key,value){
        target[key] = value;
        bucket.forEach(effect=>effect());
        return true;
    }
})
effect();
let num = 0;
setInterval(()=>{
        obj.text = 'hello world'+num++;
  
},1000)