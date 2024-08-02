---
title: 'Find The Vowels'
date: '2024-07-13'
fullPath: '/notes/dsa/algorithm-exercises/algo-casts/find-the-vowels'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Write a function that returns the number of vowels used in a string
- Vowels are the characters 'a', 'e', 'i', 'o', and 'u'.
- examples:
```js
vowels('Hi There!') //--> 3
vowels('Why do you ask?') //--> 4
vowels('Why?') //--> 0
```

## Solutions

### JS

<details>

<summary>

**My Solution**

</summary>

```javascript
function vowels(str) {
    return (str.match(/[aeiou]/gi) || []).length;
}
```

</details>

<details>

<summary>

**SG Solution 1**

</summary>

```javascript
function vowels(str) {
    const matches = str.match(/[aeiou]/gi);
    return matches ? matches.length : 0;
}
```

</details>

<details>

<summary>

**SG Solution 2**

</summary>

```javascript
function vowels(str) {
    let count = 0;
    const checker = ['a', 'e', 'i', 'o', 'u'];

    for (let char of str.toLowerCase()) {
        if (checker.includes(char)) {
            count++;
        }
    }

    return count;
}

```

</details>
