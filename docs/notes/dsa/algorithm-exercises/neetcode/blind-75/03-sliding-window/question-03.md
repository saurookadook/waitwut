---
title: 'Neetcode: 3 Sum'
date: '2025-08-23'
fullPath: '/notes/dsa/neetcode/blind-75/sliding-window/question-03'
sectionSlug: 'notes'
---

## Instructions

You are given a string `s` consisting of only uppercase english characters and an integer `k`. You can choose up to `k` characters of the string and replace them with any other uppercase English character.

After performing at most `k` replacements, return the length of the longest substring which contains only one distinct character.

**Example 1**:

```Java
Input: s = "XYYX", k = 2

Output: 4
```

Explanation: Either replace the 'X's with 'Y's, or replace the 'Y's with 'X's.

**Example 2**:

```Java
Input: s = "AAABABB", k = 1

Output: 5
```

**Constraints**:

- `1 <= s.length <= 1000`
- `0 <= k <= s.length`
