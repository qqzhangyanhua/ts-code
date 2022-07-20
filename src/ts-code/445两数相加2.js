/*
 * @Author: ZYH
 * @Date: 2022-07-20 08:41:41
 * @LastEditTime: 2022-07-20 08:54:59
 * @Description: 链表两数相加
 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const stack1 = [];
  const stack2 = [];
  while (l1 != null) {
    stack1.push(l1.val);
    l1 = l1.next;
  }
  while (l2 != null) {
    stack2.push(l2.val);
    l2 = l2.next;
  }

  let carry = 0;
  let curr = null;
  while (stack1.length != 0 || stack2.length != 0) {
    let sum = 0;
    if (stack1.length != 0) {
      sum += ck1.pop();
    }

    if (stack2.length != 0) {
      sum += stack2.pop();
    }
    sum += carry;
    const node = new ListNode(sum % 10);
    carry = Math.floor(sum / 10);
    node.next =curr;
    curr = node;
  }
  if(carry!==0){
    const node = new ListNode(carry); 
    node.next = curr;
    curr = node;
  }
  return curr;
};