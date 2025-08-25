---
title: 'Neetcode: Climbing Stairs'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/1D-dynamic-programming/question-01'
sectionSlug: 'notes'
---

## Instructions

You are given an integer `n` representing the number of steps to reach the top of a staircase. You can climb with either `1` or `2` steps at a time.

Return the number of distinct ways to climb to the top of the staircase.

**Example 1**:

```Java
Input: n = 2

Output: 2
```

Explanation:

1. `1 + 1 = 2`
2. `2 = 2`

**Example 2**:

```Java
Input: n = 3

Output: 3
```

Explanation:

1. `1 + 1 + 1 = 3`
2. `1 + 2 = 3`
3. `2 + 1 = 3`

**Constraints**:

- `1 <= n <= 30`
