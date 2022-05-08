 var subdomainVisits = function (cpdomains) {
     let map = new Map();
     for (let i = 0; i < cpdomains.length; i++) {
         let count = 0;
         let str = "";
         count = Number(cpdomains[i].split(" ")[0]);
         str = cpdomains[i].split(" ")[1];
         setMapValue(map, str, count);
         while (str.includes(".")) {
             str = str.substr(str.indexOf(".") + 1);
             setMapValue(map, str, count);
         }
     }
     const arr = [];
     map.forEach((value, key) => {
         let str = value + " " + key;
         arr.push(str);
     });
     console.log(map, arr);
     return arr;
 };

 function setMapValue(map, str, count) {
     if (map.has(str)) {
         const val = map.get(str);
         map.set(str, val + count);
     } else {
         map.set(str, count);
     }
 }
 var cpdomains = ["9001 discuss.leetcode.com"];
 subdomainVisits(cpdomains);