---
title: 'Neetcode: Alien Dictionary'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/advanced-graphs/question-01'
sectionSlug: 'notes'
---

## Instructions

There is a foreign language which uses the latin alphabet, but the order among letters is _not_ "a", "b", "c" ... "z" as in English.

You receive a list of _non-empty_ strings `words` from the dictionary, where the words are **sorted lexicographically** based on the rules of this new language.

Derive the order of letters in this language. If the order is invalid, return an empty string. If there are multiple valid order of letters, return **any** of them.

A string `a` is lexicographically smaller than a string `b` if either of the following is true:

- The first letter where they differ is smaller in `a` than in `b`.
- `a` is a prefix of `b` and `a.length < b.length`.

**Example 1**:

```Java
Input: ["z","o"]

Output: "zo"
```

Explanation:
From "z" and "o", we know 'z' < 'o', so return "zo".

**Example 2**:

```Java
Input: ["hrn","hrf","er","enn","rfnn"]

Output: "hernf"
```

Explanation:

- from "hrn" and "hrf", we know 'n' < 'f'
- from "hrf" and "er", we know 'h' < 'e'
- from "er" and "enn", we know get 'r' < 'n'
- from "enn" and "rfnn" we know 'e'<'r'
- so one possibile solution is "hernf"

**Constraints**:

- The input `words` will contain characters only from lowercase `'a'` to `'z'`.
- `1 <= words.length <= 100`
- `1 <= words[i].length <= 100`
