/*
 * @Description: 描述
 * @Autor: Freddie
 * @Date: 2022-03-08 06:54:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-09 06:41:53
 */
// 反正链表

// const n1 = {
//     value: 100,
//     next:n2
// }
// const n2 = { value: 100, next: n3, prev: n1 }
// const n3 = { value: 100, next: n4,prev: n2 }
// const n4 = { value: 100 ,prev: n3}

interface ILinkListNode {
  value: number;
  next?: ILinkListNode;
}
/**
 *根据数组生成单向链表
 *
 * @param {number[]} arr
 * @return {*}  {ILinkListNode}
 */
function crateLinkLit(arr: number[]): ILinkListNode {
  const length = arr.length;
  if (length === 0) throw new Error("数组为空");
  let curNode: ILinkListNode = {
    value: arr[length - 1],
  };
  if (length === 1) return curNode;
  for (let i = length - 2; i >= 0; i--) {
    curNode = { value: arr[i], next: curNode };
  }
  return curNode;
}
const list = crateLinkLit([1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log('creeate===',list);

/**
 *
 *
 * @param {ILinkListNode} litNode
 * @return {*}  {ILinkListNode}
 */
function reserveLinkList(litNode: ILinkListNode): ILinkListNode {
    // 定义三个值
    let prevNode: ILinkListNode | undefined = undefined;
    let nextNode: ILinkListNode | undefined = litNode;
    let curNode: ILinkListNode | undefined = undefined;
    // y以nextNode为主遍历链表
    while (nextNode) {
        if (curNode && !prevNode) {
            // 第一个元素删除next防止循环引用（首位）
            //@ts-ignore
            delete curNode.next
        }
        // 反转指针(中间的)
        if (curNode && prevNode) {
            //@ts-ignore
            curNode.next = prevNode
        }
        //整体向后移动
        prevNode = curNode
        curNode = nextNode
        nextNode = nextNode?.next
    }
    // 当nextNode为空的时候此时curNod尚未设置next
    curNode!.next = prevNode
    return curNode!
}
console.log("反转==", reserveLinkList(list));