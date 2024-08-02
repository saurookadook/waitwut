---
title: 'Anagrams'
date: '2024-07-13'
fullPath: '/notes/dsa/algorithm-exercises/algo-casts/anagrams'
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
    return (string.toLowerCase().match(/[a-z]/g) || []).reduce((map, char) => {
        map[char] = map[char] + 1 || 1;

        return map;
    }, {});
}

function anagrams(stringA, stringB) {
    let judgement = false;
    let letterMapMain = null;
    let letterMapSecondary = null;

    if (stringA.length >= stringB.length) {
        letterMapMain = buildLetterCountMap(stringA);
        letterMapSecondary = buildLetterCountMap(stringB);
    } else {
        letterMapMain = buildLetterCountMap(stringB)
        letterMapSecondary = buildLetterCountMap(stringA);
    }

    const mainMapKeys = Object.keys(letterMapMain)
    for (const key of mainMapKeys) {
        judgement = letterMapMain[key] === letterMapSecondary[key]

        if (!judgement) {
            break;
        }

        delete letterMapMain[key];
        delete letterMapSecondary[key];
    }

    return judgement
        && Object.keys(letterMapMain).length === 0
        && Object.keys(letterMapSecondary).length === 0;
}

// 1
function normalizeAndMatchOnlyWordCharacters(str) {
    return str.toLowerCase().match(/[a-z]/g) || [];
}

function buildLetterCountMap(string) {
    return normalizeAndMatchOnlyWordCharacters(string).reduce((map, char) => {
        map[char] = map[char] + 1 || 1;

        return map;
    }, {});
}

function anagrams(stringA, stringB) {
    let judgement = false;
    let letterMapMain = null;
    let letterMapSecondary = null;

    if (stringA.length >= stringB.length) {
        letterMapMain = buildLetterCountMap(stringA);
        letterMapSecondary = buildLetterCountMap(stringB);
    } else {
        letterMapMain = buildLetterCountMap(stringB)
        letterMapSecondary = buildLetterCountMap(stringA);
    }

    const mainMapKeys = Object.keys(letterMapMain)
    for (const key of mainMapKeys) {
        judgement = letterMapMain[key] === letterMapSecondary[key]

        if (!judgement) {
            break;
        }

        delete letterMapMain[key];
        delete letterMapSecondary[key];
    }

    return judgement
        && Object.keys(letterMapMain).length === 0
        && Object.keys(letterMapSecondary).length === 0;
}

// 2
function normalizeAndMatchOnlyWordCharacters(str) {
    return str.toLowerCase().match(/[a-z]/g) || [];
}

function buildLetterCountMap(charMatches) {
    return charMatches.reduce((map, char) => {
        map[char] = map[char] + 1 || 1;

        return map;
    }, {});
}

function anagrams(stringA, stringB) {
    let judgement = false;

    const charMatchesA = normalizeAndMatchOnlyWordCharacters(stringA);
    const charMatchesB = normalizeAndMatchOnlyWordCharacters(stringB);

    if (charMatchesA.length !== charMatchesB.length) {
        return judgement;
    }

    const letterMapA = buildLetterCountMap(charMatchesA);
    const letterMapB = buildLetterCountMap(charMatchesB);

    for (const key of Object.keys(letterMapA)) {
        judgement = letterMapA[key] === letterMapB[key]

        if (!judgement) {
            break;
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
function anagrams(stringA, stringB) {
    const charMapA = buildCharMap(stringA);
    const charMapB = buildCharMap(stringB);

    if (Object.keys(charMapA).length !== Object.keys(charMapB).length) {
        return false;
    }

    for (let char in charMapA) {
        if (charMapA[char] !== charMapB[char]) {
            return false;
        }
    }

    return true;
}

function buildCharMap(str) {
    const charMap = {};

    for (let char of str.replace(/[^\w]/g, '').toLowerCase()) {
        charMap[char] = charMap[char] + 1 || 1;
    }

    return charMap;
}

```

</details>

<details>

<summary>

**SG Solution 2**

</summary>

```javascript
function anagrams(stringA, stringB) {
    return cleanString(stringA) === cleanString(stringB);
}

function cleanString(str) {
    return str
        .replace(/[^\w]/g, '') // I think `/[\W]/g` would accomplish the same thing?
        .toLowerCase()
        .split('')
        .sort()
        .join();
}

```

</details>
