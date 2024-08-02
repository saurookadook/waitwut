---
title: 'Weave'
date: '2024-07-13'
fullPath: '/notes/dsa/algorithm-exercises/algo-casts/weave'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Implement the 'weave' function
- Weave receives two queues as arguments and combines the contents of each into a new, third queue.
- The third queue should contain the *alternating* content of the two queues.
- The function should handle queues of different lengths without inserting 'undefined' into the new one.
- *Do not* access the array inside of any queue; only use the 'add', 'remove', and 'peek' functions.
- examples:
```js
const queueOne = new Queue();
queueOne.add(1);
queueOne.add(2);
const queueTwo = new Queue();
queueTwo.add('Hi');
queueTwo.add('There');
const q = weave(queueOne, queueTwo);
q.remove() // 1
q.remove() // 'Hi'
q.remove() // 2
q.remove() // 'There'

```

## Solutions

### JS

<details>

<summary>

**My Solution**

</summary>

```javascript
// probably conflicts with SG's tests
const queueSingleton = (function (){
    var _this = this || {};

    _this.data = [];

    _this.add = function() {
        _this.data.unshift(record);
    }

    _this.peek = function() {
        const lastIndex = _this.data.length > 0 ? _this.data.length - 1 : 0;
        return _this.data[lastIndex];
    }

    _this.remove = function() {
        return _this.data.pop();
    }

    _this.printData = function() {
        console.log(` data length: ${_this.data} `.padStart(50, '=').padEnd(100, '='));
        console.log(JSON.stringify(_this.data, null, 4));
        console.log(''.padEnd(100, '='));
    }

    return {
        add: _this.add,
        peek: _this.peek,
        remove: _this.remove,
        printData: _this.printData
    }
})();

// Queue as class
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

// Queue as function
function Queue() {
    this.data = [];
    this.add = function() {
        this.data.unshift(record);
    }

    this.peek = function() {
        const lastIndex = this.data.length > 0 ? this.data.length - 1 : 0;
        return this.data[lastIndex];
    }

    this.remove = function() {
        return this.data.pop();
    }

    this.printData = function() {
        console.log(` data length: ${this.data} `.padStart(50, '=').padEnd(100, '='));
        console.log(JSON.stringify(this.data, null, 4));
        console.log(''.padEnd(100, '='));
    }
}

function weave(sourceOne, sourceTwo) {
    // const resultQ = queueSingleton;
    const resultQ = new Queue();

    while (
        sourceOne.peek() != null
        && sourceTwo.peek() != null
    ) {
        if (sourceOne.peek()) {
            resultQ.add(sourceOne.pop());
        }

        if (sourceTwo.peek()) {
            resultQ.add(sourceTwo.pop());
        }
    }

    return resultQ;
}


```

</details>
