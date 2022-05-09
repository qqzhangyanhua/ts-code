   var longestConsecutive = function (nums) {
       if (nums.length === 0) {
           return 0;
       }
       let longest = 0;
       const set = new Set(nums);
       const len = nums.length;
       for (let i = 0; i < len; i++) {
           if (!set.has(nums[i] - 1)) {
               let current = nums[i];
               let count = 1;
               while (set.has(current + 1)) {
                   current++;
                   count++;
               }
               longest = Math.max(longest, count);
           }
       }
       return longest;
   };