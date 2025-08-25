---
title: 'Neetcode: Palindromic Substrings'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/1D-dynamic-programming/question-05'
sectionSlug: 'notes'
---

## Instructions

Given a string `s`, return the number of substrings within `s` that are palindromes.

A **palindrome** is a string that reads the same forward and backward.

**Example 1**:

```java
Input: s = "abc"

Output: 3
```

Explanation: "a", "b", "c".

**Example 2**:

```java
Input: s = "aaa"

Output: 6
```

Explanation: "a", "a", "a", "aa", "aa", "aaa". Note that different substrings are counted as different palindromes even if the string contents are the same.

**Constraints**:

- `1 <= s.length <= 1000`
- `s` consists of lowercase English letters.
