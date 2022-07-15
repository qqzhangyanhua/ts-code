

const obj={a:1, b:2, c:3, d:4, e:5}
var flag=true
for(const key in obj) {
    if(obj[key]>6){
      console.log(key, obj[key])
      break;
    }else{
        flag=false
    }
}
console.log(flag)