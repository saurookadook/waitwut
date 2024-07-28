---
title: 'Linked List: fromLast'
date: '2024-07-13'
fullPath: '/notes/algorithm-exercises/algo-casts/linkedlist-fromlast'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Given a linked list and integer `n`, return the element `n` spaces from the last node in the list.
- **Do not** call the `size` method of the linked list.
- Assume that `n` will always be less than the length of the list.

- examples:
```js
const list = new List();

list.insertLast('a');
list.insertLast('b');
list.insertLast('c');
list.insertLast('d');

fromLast(list, 2).data // 'b'
```

## Solutions

### JS

<details>

<summary>

**`Node` and `LinkedList` classes**

</summary>

```javascript
class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor(values = []) {
        this.head = null;

        for (let value of values) {
            this.insertLast(value);
        }
    }

    isNodeNullish(targetNode) {
        return targetNode == null;
    }

    getFirst() {
        return this.head;
    }

    getLast() {
        if (this.isNodeNullish(this.head)) {
            return null;
        }

        let node = this.head;

        while (!this.isNodeNullish(node)) {
            if (this.isNodeNullish(node.next)) {
                return node;
            }

            node = node.next;
        }
    }

    getAt(index) {
        let counter = 0;
        let node = this.head;

        while (node) {
            if (counter === index) {
                return node;
            }

            node = node.next;
            counter++;
        }

        return null;
    }

    size() {
        let counter = 0;
        let node = this.head;

        while (node) {
            node = node.next;
            counter++
        }

        return counter;
    }

    removeFirst() {
        if (!this.head) {
            return;
        }

        this.head = this.head.next;
    }

    removeLast() {
        if (!this.head) {
            return;
        }

        if (!this.head.next) {
            this.head = null;
            return;
        }

        let previous = this.head;
        let node = this.head.next;

        while (node.next) {
            previous = node;
            node = node.next;
        }

        previous.next = null;
    }

    removeAt(index) {
        if (!this.head) {
            return;
        }

        if (index === 0) {
            this.head = this.head.next;
            return;
        }

        const previous = this.getAt(index - 1);
        if (!previous || !previous.next) {
            return;
        }

        previous.next = previous.next.next;
    }

    clear() {
        this.head = null;
    }

    insertFirst(data) {
        this.head = new Node(data, this.head);
    }

    insertLast(data) {
        const last = this.getLast();

        if (last) {
            last.next = new Node(data);
        } else {
            this.head = new Node(data);
        }
    }

    insertAt(data, index) {
        if (!this.head) {
            this.head = new Node(data);
            return;
        }

        if (index === 0) {
            this.head = new Node(data, this.head);
            return;
        }

        const previous = this.getAt(index - 1) || this.getLast();
        const node = new Node(data, previous.next);
        previous.next = node;
    }

    forEach(fn) {
        let counter = 0;
        let node = this.head;

        while (node) {
            fn(node, counter);
            node = node.next;
            counter++;
        }
    }

    *[Symbol.iterator]() {
        let node = this.head;

        while (node) {
            yield node;
            node = node.next;
        }
    }
}

```

</details>

<details>

<summary>

**`fromLast` function**

</summary>

```javascript
// SG Solution
// - yeahhhhh, this seems much better lol
function fromLast(list, n) {
    let slow = list.getFirst();
    let fast = list.getFirst();

    while (n > 0) {
        fast = fast.next;
        n--;
    }

    while (fast.next) {
        slow = slow.next;
        fast = fast.next;
    }

    return slow;
}

// My Solution
// - feels like it would be reeeeeaaaaaally slow with large lists...
function fromLast(list, n) {
    if (n === 0) {
        return list.getLast();
    }

    if (isNodeNullish(list.getFirst())) {
        return null;
    }

    let i = 1;
    let previous = list.getFirst();
    let last = list.getLast();

    while (i <= n) {
        if (previous.next === last) {
            last = previous;
            previous = list.getFirst();
            i++;
        } else {
            previous = previous.next;
        }
    }

    return last;
}

function isNodeNullish(targetNode) {
    return targetNode == null;
}

```

</details>
