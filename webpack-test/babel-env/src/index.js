//  const add = (a,b)=>a+b
import JSONbig from 'json-bigint'
//  console.log(add(1,2))
//  console.log(add(2,3))
var json = '{ "value" : 9223372036854775807, "v2": 123 }';
var r1 = JSONbig.parse(json);
console.log('r1====', r1);
var arr =[1,2,3,4,5,6,7,8,9,10]
console.log('arr',arr.at(2))