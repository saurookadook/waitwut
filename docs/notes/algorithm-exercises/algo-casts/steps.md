---
title: 'Anagrams'
date: '2024-07-13'
fullPath: '/notes/algorithm-exercises/algo-casts/anagrams'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Write a function that accepts a positive number N.
- The function should console log a step shape with N levels using the # character.
- _Make sure the step has spaces on the right-hand side!
- examples:
```js
steps(2)
    '# '
    '##'
steps(3)
    '#  '
    '## '
    '###'
steps(4)
    '#   '
    '##  '
    '### '
    '####'
```

## Solutions

<details>

<summary>

**My Solution**

</summary>

```javascript
function steps(n) {
    if (n === 0) {
        return;
    }

    for (let row = 1; row <= n; row++) {
        console.log(''.padStart(row, '#').padEnd(n, ' '));
    }
}

```

</details>

<details>

<summary>

**SG Solution 1**

</summary>

```javascript
function steps(n, row = 0, stair = '') {
    if (n === row) {
        return;
    }

    if (n === stair.length) {
        console.log(stair);
        return steps(n, row + 1);
    }

    const char = stair.length <= row ? '#' : ' ';
    steps(n, row, stair + char)
}
```

</details>

<details>

<summary>

**SG Solution 2**

</summary>

```javascript
function steps(n) {
    for (let row = 0; row < n; row++) {
        let stair = '';

        for (let column = 0; column < n; column++) {
            if (column <= row) {
                stair += '#';
            } else {
                stair += ' ';
            }
        }

        console.log(stair);
    }
}
```

</details>

