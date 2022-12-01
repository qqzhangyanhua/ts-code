/*
 * @lc app=leetcode.cn id=23 lang=javascript
 *
 * [23] 合并K个升序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  if (lists.length === 0) {
    return null;
  }
  //爆力解
  const list = [];
  for (let i = 0; i < lists.length; i++) {
    let node = lists[i];
    while (node) {
      list.push(node.val);
      node = node.next;
    }
  }
  if (list.length === 0) {
    return null;
  }
  list.sort((a, b) => a - b);
  //   let head = (cur = list[0] || null);

  let head = new ListNode(list[0]) || null;
  let cur = head;
  for (let i = 1; i < list.length; i++) {
    cur = cur.next = new ListNode(list[i]);
  }
  return head;
};

// var mergeKLists = function (lists) {
//   if (!lists.length) {
//     return null;
//   }
//   return mergeLists(lists, 0, lists.length - 1);
// };
// function mergeLists(lists, left, right) {
//   if (left === right) {
//     return lists[left];
//   }
//   let mid = (left + right) >> 1;
//   let l1 = mergeLists(lists, left, mid);
//   let l2 = mergeLists(lists, mid + 1, right);
//   return merge(l1, l2);
// }
// function merge(head1, head2) {
//   let head = new ListNode(0);
//   let p = head;
//   while (head1 && head2) {
//     if (head1.val < head2.val) {
//       p.next = head1;
//       head1 = head1.next;
//     } else {
//       p.next = head2;
//       head2 = head2.next;
//     }
//     p = p.next;
//   }
//   p.next = head1 ? head1 : head2;
//   return head.next;
// }
// @lc code=end
