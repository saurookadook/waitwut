---
title: 'Neetcode: Longest Common Subsequence'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/2D-dynamic-programming/question-01'
sectionSlug: 'notes'
---

## Instructions

Given two strings `text1` and `text2`, return the length of the _longest common subsequence_ between the two strings if one exists, otherwise return `0`.

A **subsequence** is a sequence that can be derived from the given sequence by deleting some or no elements without changing the relative order of the remaining characters.

- For example, `"cat"` is a subsequence of `"crabt"`.

A **common subsequence** of two strings is a subsequence that exists in both strings.

**Example 1**:

```Java
Input: text1 = "cat", text2 = "crabt"

Output: 3
```

Explanation: The longest common subsequence is "cat" which has a length of 3.

**Example 2**:

```Java
Input: text1 = "abcd", text2 = "abcd"

Output: 4
```

**Example 3**:

```Java
Input: text1 = "abcd", text2 = "efgh"

Output: 0
```

**Constraints**:

- `1 <= text1.length, text2.length <= 1000`
- `text1` and `text2` consist of only lowercase English characters.
