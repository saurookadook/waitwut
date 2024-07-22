---
title: 'Midpoint'
date: '2024-07-13'
fullPath: '/notes/algorithm-exercises/algo-casts/midpoint'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Return the 'middle' `Node` of a `LinkedList`.
- If the list has an even number of elements, return the `Node` at the end of the first half of the list.
- **Do not** use a counter variable, **do not** retrieve the size of the list, and only iterate through the list one time.
- examples:
```js
const l = new LinkedList();
l.insertLast('a');
l.insertLast('b');
l.insertLast('c');
midpoint(l); // return { data: 'b' }
```

## Solutions

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

**JS**

</summary>

```javascript
function isNodeNullish(targetNode) {
    return targetNode == null;
}

function midpoint(list) {
    let slow = list.head;
    let fast = list.head;

    while (!isNodeNullish(fast.next)) {
        if (isNodeNullish(fast.next.next)) {
            return slow;
        }

        slow = slow.next;
        fast = fast.next.next;

        if (isNodeNullish(fast.next) || isNodeNullish(fast.next.next)) {
            return slow;
        }
    }
}

```

</details>
