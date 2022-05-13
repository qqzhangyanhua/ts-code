      var detectCycle = function (head) {
          if (head === null) return null;
          let slow = head;
          let fast = head;
          let isCycle = false;
          while (fast.next !== null && fast.next.next !== null) {
              slow = slow.next;
              fast = fast.next.next;
              if (slow === fast) {
                  isCycle = true;
                  break;
              }
          }
          if (!isCycle) {
              return null;
          }
          fast = head; //放在头部
          while (fast !== slow) {
              slow = slow.next;
              fast = fast.next;
          }
          return fast;
      };