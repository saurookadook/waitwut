---
title: 'MaxChar'
date: '2024-07-13'
fullPath: '/notes/algorithm-exercises/algo-casts/maxchar'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Given a string, return the character that is most commonly used in the string. If there is a tie, return `null`.
- examples:
```js
maxChar("abcccccccd") //--> "c"
maxChar("apple 1231111") //--> "1"
maxChar("edededed") // --> null
```

## Solutions

### JS

<details>

<summary>

**My Solution**

</summary>

```javascript
function maxChar(str) {
    const charMap = {};
    let result;
    let hasTie = false;

    for (const char of str) {
        charMap[char] = charMap[char] + 1 || 1;

        if (!result) {
            result = char;
            continue;
        }

        if (charMap[char] > charMap[result] || char === result) {
            result = char;
            hasTie = false;
        } else if (char !== result && charMap[char] === charMap[result]) {
            hasTie = true;
        }
    }

    return hasTie ? -1 : result;
}

```

</details>

<details>

<summary>

**SG Solution 1**

</summary>

```javascript
function maxChar(str) {
    const chars = {};
    let count = 0;
    let favChar = '';

    for (let char of str) {
        chars[char] = chars[char] + 1 || 1;
    }

    Object.keys(chars).forEach((key) => {
        if (chars[key] > count) {
            count = chars[key];
            farChar = key;
        }
    });

    return favChar;
}
```

</details>

<details>

<summary>

**SG Solution 2**

</summary>

```javascript
function maxChar(str) {
    const charMap = {};
    let max = 0;
    let maxChar = '';

    for (let char of str) {
        if (charMap[char]) {
            charMap[char]++;
        } else {
            charMap[char] = 1;
        }
    }

    for (let [char, count] of Object.entries(charMap)) {
        if (charMap[char] > max) {
            max = charMap[char];
            maxChar = char;
        }
    }

    return maxChar;
}
```

</details>
