---
title: 'Reverse: Integer'
date: '2024-07-13'
fullPath: '/notes/dsa/algorithm-exercises/algo-casts/reverse-integer'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Given an integer, return an integer that is the reverse ordering of numbers.
- examples:
```js
reverseInt(15) //--> 51
reverseInt(981) //--> 189
reverseInt(500) //--> 5
reverseInt(-15) //--> -15
reverseInt(-90) //--> -9
```

## Solutions

### JS

<details>

<summary>

**My Solution**

</summary>

```javascript
function reverseInt(n) {
    const reversed = n
        .toString()
        .split('')
        .reduce((acc, cur) => cur + acc, '');

    return Math.sign(n) * parseInt(reversed);
}
```

</details>

<details>

<summary>

**SG Solution 1**

</summary>

```javascript
function reverseInt(n) {
    const reversed = n
        .toString()
        .split('')
        .reverse()
        .join('');

    return Math.sign(n) * parseInt(reversed);
}
```

</details>
