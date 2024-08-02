---
title: 'Reverse: String'
date: '2024-07-13'
fullPath: '/notes/algorithm-exercises/algo-casts/reverse-string'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Given a string, return a new string with the reversed order of characters.
- examples:
```js
reverse('apple') //--> elppa
reverse('hello') //--> olleh
reverse('Greetings!') //--> !sgniteerG
```

## Solutions

### JS

<details>

<summary>

**My Solution(s)**

</summary>

```javascript
function reverse(str) {
    return str.split('').reduce((result, char) => {
        return character + reversed;
    }, '')
}

// as one-liner:
const reverse = (str) => str.split('').reduce((result, char) => char + result, '');

```

</details>

<details>

<summary>

**SG Solution 1 _(w/ `reverse()`)_**

</summary>

```javascript
function reverse(str) {
    return str.split('').reverse().join('');
}
```

</details>

<details>

<summary>

**SG Solution 2 _(w/o `reverse()`)_**

</summary>

```javascript
function reverse(str) {
    let reversed = '';

    for (const character of str) {
        reversed = character + reversed;
    }

    return reversed;
}
```

</details>
