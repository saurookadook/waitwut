---
title: 'Fibonacci'
date: '2024-07-13'
fullPath: '/notes/algorithm-exercises/algo-casts/fibonacci'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Print out the `n`-th entry in the Fibonacci series.
- The Fibonacci series is an ordering of numbers where each number is the sum of the proceeding two.
- For example, the sequence `[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]` forms the first ten entries of the Fibonacci series.
- examples:
```js
fib(4) //--> 3
```

## Solutions

### JS

<details>

<summary>

**My Solution**

</summary>

```javascript
function fib(n) {
    if (n < 2) {
        return n;
    }

    const resultsInverseQueue = [1, 0];

    for (let i = 2; i <= n; i++) {
        const earliest = resultsInverseQueue.pop();
        resultsInverseQueue.unshift(resultsInverseQueue[0] + earliest);
    }

    return resultsInverseQueue[0]
}

```

</details>

<details>

<summary>

**SG Solution**

</summary>

```javascript
function memoize(fn) {
    const cache = {};
    return function(...args) {
        if (cache[args]) {
            return cache[args];
        }

        cache[args] = fn.apply(this, args);
        return cache[args];
    }
}

function slowFib(n) {
    if (n < 2) {
        return n;
    }

    return fib(n - 1) + fib(n  - 2);
}

const fib = memoize(slowFib);
```

</details>
