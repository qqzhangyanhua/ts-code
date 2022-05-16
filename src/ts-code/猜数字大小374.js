      var guess = function (num) {
          return 0;
      };
      var guessNumber = function (n) {
          let l = 1;
          let r = n;
          while (l < r) {
              const mid = (l + (r - l)) >> 1;
              if (guess(mid) === 0) {
                  return mid;
              }
              if (guess(mid) === -1) {
                  r = mid - 1;
              } else {
                  l = mid + 1;
              }
          }
      };