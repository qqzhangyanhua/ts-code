/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
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
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {
    // 定义一个哨兵节点
    let dummy = {
        next:head
    }
    let temp =dummy
    for (let i = 0; i <left-1;i++){
        temp =temp.next  //找到left的节点
    }
    let prev = temp.next; //left 的下个节点
    let cur = prev.next; //lef的下下节点
    // 找到区间
    for (let j = 0; j < right-left; j++){
        let next = cur.next
        cur.next = prev //交换
        prev = cur
        cur = next
    }
    temp.next.next = cur
    temp.next = prev
    return dummy.next


};
// @lc code=end

