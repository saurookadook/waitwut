---
title: 'Anagrams'
date: '2024-07-13'
fullPath: '/notes/algorithm-exercises/algo-casts/anagrams'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Check to see if two provided strings are anagrams of each other.
- One string is an anagram of another if it uses the same characters in the same quantity.
- Only consider characters, not spaces or punctuation.
- Consider capital letters to be the same as lower case.
- examples:
```js
anagrams('rail safety', 'fairy tales') //--> true
anagrams('RAIL! SAFETY!', 'fairy tales') //--> true
anagrams('Hi there', 'Bye there') //--> false
```

## Solutions

### JS

<details>

<summary>

**My Solution(s)**

</summary>

```javascript
function buildLetterCountMap(string) {
    return string.match(/[A-Z]/gi).reduce((map, char) => {
        map[char] = map[char] + 1 || 1;

        return map;
    }, {});
}

function anagrams(stringA, stringB) {
    let judgement = false; // lol

    if (stringA.length === stringB.length) {
        const letterMapOne = stringA.length >= stringB.length ? buildLetterCountMap(stringA) : buildLetterCountMap(stringB);
        const letterMapTwo = stringA.length <= stringB.length ? buildLetterCountMap(stringB) : buildLetterCountMap(stringA);

        for (const key of Object.keys(letterMapOne)) {
            judgement = letterMapOne[key] === letterMapTwo[key]

            if (!judgement) {
                break;
            }
        }
    }

    return judgement;
}
```

</details>

<details>

<summary>

**SG Solution 1**

</summary>

```javascript

```

</details>

<details>

<summary>

**SG Solution 2**

</summary>

```javascript

```

</details>

---

<!--

<details>

<summary>

**?**

</summary>

```javascript

```

</details>

-->
