 var removeElement = function (num, val) {
     let i = 0;
     while (i < num.length) {
         if (val === num[i]) {
             num.splice(i, 1);
         } else {
             i++;
         }
     }
     return num;
 };


 var removeElement1 = function (num, val) {
     let slow = 0;
     let fast = 0;
     while (fast < num.length) {
         if (num[fast] === val) {
             fast++;
             continue;
         }
         console.log(slow, fast)
         num[slow++] = num[fast++];
         console.log(num)
     }
     return slow;
 }
 console.log(removeElement1([3, 2, 2, 3], 2));