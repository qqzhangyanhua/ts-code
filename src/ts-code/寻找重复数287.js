     var findDuplicate = function (nums) {
         let set = new Set(nums);
         for (let item of nums) {
             if (set.has(item)) {
                 return item;
                 set.add(item);
             }
         }
         return -1;
     };