---
title: 'Capitalize'
date: '2024-07-13'
fullPath: '/notes/algorithm-exercises/algo-casts/capitalize'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Write a function that accepts a string.
- The function should capitalize the first letter of each word in the string then return the capitalized string.
- examples:
```js
capitalize('a short sentence') //--> 'A Short Sentence'
capitalize('a lazy fox') //--> 'A Lazy Fox'
capitalize('look, it is working!') //--> 'Look, It Is Working!'
```

## Solutions

### JS

<details>

<summary>

**My Solution**

</summary>

```javascript
function capitalize(str) {
    return str.replace(/(^\w|\s+\w)/g, (match) => match.toUpperCase());
}

```

</details>

<details>

<summary>

**SG Solution**

</summary>

```javascript
function capitalize(str) {
    let result = str[0].toUpperCase();

    for (let i = 1; i < str.length; i++) {
        if (str[i - 1] === ' ') {
            result += str[i].toUpperCase();
        } else {
            result += str[i];
        }
    }

    return result;
}
```

</details>
