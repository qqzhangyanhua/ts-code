class Node {
    constructor(val, next) {
        this.val = val !== undefined ? val : -1;
        this.next = next !== undefined ? next : null;
    }
}

function hash(x) {
    return x > 0 ? x : -x;
}

var MyHashSet = function () {
    this.data = [];
    this.capacity = 100;
    for (var i = 0; i < this.capacity; i++) {
        this.data[i] = new Node();
    }
    this.getV = (key) => {
        let index = hash(key) % this.capacity;
        return this.data[index];
    };
};
MyHashSet.prototype.contains = function (key) {
    let v = this.getV(key);
    while (v && v.val != key) {
        v = v.next;
    }
    return v != null;
};
MyHashSet.prototype.add = function (key) {
    if (this.contains(key)) return; //如果存在就return
    let v = this.getV(key);
    let temp = new Node(key);
    temp.next = v.next;
    v.next = temp;
};
MyHashSet.prototype.remove = function (key) {
    if (!this.contains(key)) return; //如果不存在就return
    let v = this.getV(key);
    while (v.next && v.next.val != key) {
        v = v.next;
    }
    v.next = v.next.next;
};