---
title: 'Neetcode: Minimum Window Substring'
date: '2025-08-23'
fullPath: '/notes/dsa/neetcode/blind-75/sliding-window/question-04'
sectionSlug: 'notes'
---

## Instructions

Given two strings `s` and `t`, return the shortest **substring** of `s` such that every character in `t`, including duplicates, is present in the substring. If such a substring does not exist, return an empty string `""`.

You may assume that the correct output is always unique.

**Example 1**:

```Java
Input: s = "OUZODYXAZV", t = "XYZ"

Output: "YXAZ"
```

Explanation: `"YXAZ"` is the shortest substring that includes `"X"`, `"Y"`, and `"Z"` from string `t`.

**Example 2**:

```Java
Input: s = "xyz", t = "xyz"

Output: "xyz"
```

**Example 3**:

```Java
Input: s = "x", t = "xy"

Output: ""
```

**Constraints**:

- `1 <= s.length <= 1000`
- `1 <= t.length <= 1000`
- `s` and `t` consist of uppercase and lowercase English letters.
