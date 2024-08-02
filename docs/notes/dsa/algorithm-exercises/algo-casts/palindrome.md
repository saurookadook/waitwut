---
title: 'Palindrome'
date: '2024-07-13'
fullPath: '/notes/dsa/algorithm-exercises/algo-casts/palindrome'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Given a string, return `true` if the string is a palindrome or `false` if it is not.
- Palindromes are strings that form the same word if it is reversed.
- *Do* include spaces and punctuation in determining if the string is a palindrome.
- examples:
```js
palindrome('abba') //--> true
palindrome('abcdefg') //--> false
```

## Solutions

### JS

<details>

<summary>

**My Solution**

</summary>

```javascript
function palindrome(str) {
    const lastIndex = str.length - 1
    const midPoint = Math.floor(lastIndex / 2);

  for (let i = 0; i <= midPoint; i++) {
    if (str[i] === str[lastIndex - i]) {
        continue
    } else {
        return false
    }
  }

  return true
}
```

</details>

<details>

<summary>

**SG Solution 1**

</summary>

```javascript
function palindrome(str) {
    const reversed = str.split('').reverse().join('');

    return reversed === str;
}
```

</details>

<details>

<summary>

**SG Solution 2**

</summary>

```javascript
function palindrome(str) {
    const strLen = str.length - 1;
    return str.split('').every((char, i) => char === str[strLen - i]);
}
```

</details>
