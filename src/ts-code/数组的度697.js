  var findShortestSubArray = function (nums) {
      let map = new Map();
      let size = 1;
      let distance = nums.length;
      for (let i = 0; i < nums.length; i++) {
          if (map.has(nums[i])) {
              const val = map.get(nums[i]);
              map.set(nums[i], val + 1);
          } else {
              map.set(nums[i], 1);
          }
          size = Math.max(size, map.get(nums[i]));
      }
      // console.log(size, map);
      let h = new Map();
      for (let i = 0; i < nums.length; i++) {
          let cur = nums[i];
          if (h.has(cur)) {
              h.set(cur, h.get(cur) + 1);
          } else {
              h.set(cur, 1);
          }
          if (h.get(cur) == size) {
              let start = nums.indexOf(cur);
              distance = Math.min(distance, i - start + 1);
          }
      }
      return distance;
  };