---
title: 'Neetcode: Decode Ways'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/1D-dynamic-programming/question-06'
sectionSlug: 'notes'
---

## Instructions

A string consisting of uppercase english characters can be encoded to a number using the following mapping:

```java
'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
```

To **decode** a message, digits must be grouped and then mapped back into letters using the reverse of the mapping above. There may be multiple ways to decode a message. For example, `"1012"` can be mapped into:

- `"JAB"` with the grouping `(10 1 2)`
- `"JL"` with the grouping `(10 12)`

The grouping `(1 01 2)` is invalid because `01` cannot be mapped into a letter since it contains a leading zero.

Given a string `s` containing only digits, return the number of ways to **decode** it. You can assume that the answer fits in a **32-bit** integer.

**Example 1**:

```java
Input: s = "12"

Output: 2
```

Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).

**Example 2**:

```java
Input: s = "01"

Output: 0
```

Explanation: "01" cannot be decoded because "01" cannot be mapped into a letter.

**Constraints**:

- `1 <= s.length <= 100`
- `s` consists of digits
