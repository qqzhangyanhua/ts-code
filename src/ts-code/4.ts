// 链表实现队列
interface listNode {
  value: number;
  next: listNode | null;
}
export class MyQueue {
  private head: listNode | null = null;
  private tail: listNode | null = null;
  private len = 0;

  add(value: number): void {
    const newNode: listNode = {
      value: value,
      next: null,
    };
    if (this.head == null) {
      this.head = newNode;
    }
    const tailNode = this.tail;
    if (tailNode) {
      tailNode.next = newNode;
    }
    this.tail = newNode;
    this.len++;
  }
  delete(): number | null {
    const headNode = this.head;
    if (headNode === null) {
      return null;
    }
    if (this.length == 0) {
      return null;
    }
    const val = headNode.value;
    this.len--;
    this.head = headNode.next;
    return val;
  }
  get length(): number {
    // len要单独存储不能遍历不然复杂度增加了
    return this.len;
  }
}

const queue = new MyQueue()
console.time("timer start");

queue.add(12)
queue.add(14)
queue.add(15)
queue.delete()
console.log('链表===',queue)
console.timeEnd("timer end");
