---
title: 'Queue'
date: '2024-07-13'
fullPath: '/notes/dsa/algorithm-exercises/algo-casts/queue'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Create a queue data structure.
- The queue should be a class with methods 'add' and 'remove'.
- Adding to the queue should store an element until it is removed.
- examples:
```js
const q = new Queue();
q.add(1);
q.remove(); // returns 1;
```

## Implementation

### JS

<details>

<summary>

**Simple Queue**

</summary>

```javascript
class Queue {
    constructor() {
        this.data = [];
    }

    printData() {
        console.log(JSON.stringify(this.data, null, 4));
    }

    add(record) {
        this.data.unshift(record);
    }

    peek() {
        const lastIndex = this.data.length > 0 ? this.data.length - 1 : 0;
        return this.data[lastIndex];
    }

    remove() {
        return this.data.pop();
    }
}
```

</details>
