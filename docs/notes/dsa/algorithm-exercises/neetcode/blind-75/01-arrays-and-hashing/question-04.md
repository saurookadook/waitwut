---
title: 'Neetcode: Group Anagrams'
date: '2025-08-23'
fullPath: '/notes/dsa/neetcode/blind-75/arrays-and-hashing/question-04'
sectionSlug: 'notes'
---

## Instructions

Given an array of strings `strs`, group all _anagrams_ together into sublists. You may return the output in **any order**.

An **anagram** is a string that contains the exact same characters as another string, but the order of the characters can be different.

**Example 1**:

```java
Input: strs = ["act","pots","tops","cat","stop","hat"]

Output: [["hat"],["act", "cat"],["stop", "pots", "tops"]]
```

**Example 2**:

```java
Input: strs = ["x"]

Output: [["x"]]
```

**Example 3**:

```java
Input: strs = [""]

Output: [[""]]
```

**Constraints**:

- `1 <= strs.length <= 1000`
- `0 <= strs[i].length <= 100`
- `strs[i]` is made up of lowercase English letters.

## Solutions

### JavaScript

```javascript
class Solution {
  wordSortedCharMap = new Map();
  groupedResults = [];
  anagramGroup = [];

    /**
     * @param {string[]} strs
     * @return {string[][]}
     */
    groupAnagrams(strs) {
      this.populatedSortedCharMap(strs);

      return [...this.wordSortedCharMap.values()];
    }

    populatedSortedCharMap(strs) {
      for (const word of strs) {
        const sortedChars = this.getSortedCharacters(word);
        if (!this.wordSortedCharMap.has(sortedChars)) {
          this.wordSortedCharMap.set(sortedChars, [word]);
          continue;
        }

        this.wordSortedCharMap.get(sortedChars).push(word);
      }
    }

    getSortedCharacters(input) {
        return [...input].sort().join('');
    }
}

```
