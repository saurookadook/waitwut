---
title: 'Queue From Stacks'
date: '2024-07-13'
fullPath: '/notes/dsa/algorithm-exercises/algo-casts/queue-from-stacks'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Implement a Queue data structure using two Stacks.
- **Do not** create an array inside of the 'Queue' class.
- Queue should implement the methods 'add', 'remove', and 'peek'.
- examples:
```js
const q = new Queue();
q.add(1);
q.add(2);
q.peek();  // returns 1
q.remove(); // returns 1
q.remove(); // returns 2
```

## Solutions

<details>

<summary>

**My Implementation**

</summary>

```javascript
function Stack() {
    this.data = [];

    push(record) {
        this.data.push(record);
    }

    pop() {
        return this.data.pop();
    }

    peek() {
        const lastIndex = this.data.length > 0 ? this.data.length - 1 : 0;
        return this.data[this.data.length - 1];
    }
}

function Queue() {
    this.first = new Stack();
    this.second = new Stack();

    add(record) {
        this.first.push(record);
    }

    remove() {
        while (this.first.peek() != null) {
            this.second.push(this.first.pop());
        }

        const removedRecord = this.second.pop();

        while (this.second.peek() != null) {
            this.first.push(this.second.pop());
        }

        return removedRecord;
    }

    peek() {
        const lastIndex = this.first.length > 0 ? this.first.length - 1 : 0;
        return this.first[this.first.length - 1];
    }
}
```

</details>
