---
title: 'Pyramid (Two-sided Steps)'
date: '2024-07-13'
fullPath: '/notes/dsa/algorithm-exercises/algo-casts/pyramid'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Write a function that accepts a positive number `N`.
- The function should console log a pyramid shape with `N` levels using the `#` character.
- Make sure the pyramid has spaces on both the left *and* right hand sides.
- Consider capital letters to be the same as lower case.
- examples:
```js
pyramid(1)
    '#'
pyramid(2)
    ' # '
    '###'
pyramid(3)
    '  #  '
    ' ### '
    '#####'
```

## Solutions

### JS

<details>

<summary>

**My Solution**

</summary>

```javascript
function pyramid(N) {
    if (N === 0) {
        return;
    }

    const calcLevelSize = (n) => n * 2 - 1
    const pyramidBase = calcLevelSize(N);
    let level = 0;
    let leftPadding = 0;

    for (let row = 1; row <= N; row++) {
        level = calcLevelSize(row);

        if (level < pyramidBase) {
            leftPadding = (pyramidBase - level) / 2
            console.log(`"${''.padStart(leftPadding, ' ').padEnd(leftPadding + level, '#').padEnd(pyramidBase, ' ')}"`);
        } else {
            console.log(`"${''.padStart(level, '#')}"`);
        }
    }
}

```

</details>

<details>

<summary>

**SG Solution 1**

</summary>

```javascript
function pyramid(N, row = 0, level = '') {
    if (N === row) {
        return;
    }

    if (level.length === 2 * N - 1) {
        console.log(level);
        return pyramid(N, row + 1);
    }

    const midpoint = Math.floor((2 * N - 1) / 2);
    const char = midpoint - row <= level.length && midpoint + row >= level.length ? '#' : ' ';
    pyramid(N, row, level + char);
}
```

</details>

<details>

<summary>

**SG Solution 2**

</summary>

```javascript
function pyramid(N) {
    const maxLevelSize = 2 * N - 1;
    const midpoint = Math.floor(maxLevelSize / 2);

    for (let row = 0; row < N; row++) {
        let level = '';

        for (let column = 0; column < maxLevelSize; column++) {
            if (midpoint - row <= column && midpoint + row >= column) {
                level += '#';
            } else {
                level += ' ';
            }
        }

        console.log(level);
    }
}
```

</details>
