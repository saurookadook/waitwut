---
title: 'Array Chunking'
date: '2024-07-13'
fullPath: '/notes/dsa/algorithm-exercises/algo-casts/array-chunking'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Given an array and chunk size, divide the array into many subarrays where each subarray is of length size
- examples:
```js
chunk([1, 2, 3, 4], 2) //--> [[ 1, 2], [3, 4]]
chunk([1, 2, 3, 4, 5], 2) //--> [[ 1, 2], [3, 4], [5]]
chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) //--> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
chunk([1, 2, 3, 4, 5], 4) //--> [[ 1, 2, 3, 4], [5]]
chunk([1, 2, 3, 4, 5], 10) //--> [[ 1, 2, 3, 4, 5]]
```

## Solutions

### JS

<details>

<summary>

**My Solution**

</summary>

```javascript
function chunk(array, size) {
    const chunked = [];

    for (let i = 0; i < array.length; i += size) {
        chunked.push(array.slice(i, i + size));
    }

    return chunked;
}
```

</details>

<details>

<summary>

**SG Solution 1**

</summary>

```javascript
function chunk(array, size) {
    const chunked = [];
    let index = 0;

    while (index < array.length) {
        chunked.push(array.slice(i, i + size));
        index += size;
    }

    return chunked;
}
```

</details>

<!--
<details>

<summary>

**?**

</summary>

```javascript

```

</details>
-->
