---
title: 'Neetcode: Word Break'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/1D-dynamic-programming/question-09'
sectionSlug: 'notes'
---

## Instructions

Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of dictionary words.

You are allowed to reuse words in the dictionary an unlimited number of times. You may assume all dictionary words are unique.

**Example 1**:

```Java
Input: s = "neetcode", wordDict = ["neet","code"]

Output: true
```

Explanation: Return true because "neetcode" can be split into "neet" and "code".

**Example 2**:

```Java
Input: s = "applepenapple", wordDict = ["apple","pen","ape"]

Output: true
```

Explanation: Return true because "applepenapple" can be split into "apple", "pen" and "apple". Notice that we can reuse words and also not use all the words.

**Example 3**:

```Java
Input: s = "catsincars", wordDict = ["cats","cat","sin","in","car"]

Output: false
```

**Constraints**:

- `1 <= s.length <= 200`
- `1 <= wordDict.length <= 100`
- `1 <= wordDict[i].length <= 20`
- `s` and `wordDict[i]` consist of only lowercase English letters.
