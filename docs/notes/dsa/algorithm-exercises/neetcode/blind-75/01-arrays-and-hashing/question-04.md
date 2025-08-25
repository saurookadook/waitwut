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

```Java
Input: strs = ["act","pots","tops","cat","stop","hat"]

Output: [["hat"],["act", "cat"],["stop", "pots", "tops"]]
```

**Example 2**:

```Java
Input: strs = ["x"]

Output: [["x"]]
```

**Example 3**:

```Java
Input: strs = [""]

Output: [[""]]
```

**Constraints**:

- `1 <= strs.length <= 1000`
- `0 <= strs[i].length <= 100`
- `strs[i]` is made up of lowercase English letters.
