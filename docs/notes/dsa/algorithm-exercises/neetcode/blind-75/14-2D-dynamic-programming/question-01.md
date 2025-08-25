---
title: 'Neetcode: Unique Paths'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/2D-dynamic-programming/question-01'
sectionSlug: 'notes'
---

## Instructions

There is an `m x n` grid where you are allowed to move either down or to the right at any point in time.

Given the two integers `m` and `n`, return the number of possible unique paths that can be taken from the top-left corner of the grid (`grid[0][0]`) to the bottom-right corner (`grid[m - 1][n - 1]`).

You may assume the output will fit in a **32-bit** integer.

**Example 1**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/7eddce4e-2fc4-4c3a-bb0f-9d1060243500/public" alt="Visual representation of inputs for Example 1: a 3-by-6 checkered board with a hiker (you) in the top-left corner and a trophy (goal) in the bottom-right corner.">

```java
Input: m = 3, n = 6

Output: 21
```

**Example 2**:

```java
Input: m = 3, n = 3

Output: 6
```

**Constraints**:

- `1 <= m, n <= 100`
