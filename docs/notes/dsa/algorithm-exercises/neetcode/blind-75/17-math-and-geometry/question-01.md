---
title: 'Neetcode: Rotate Image'
date: '2025-08-25'
fullPath: '/notes/dsa/neetcode/blind-75/math-and-geometry/question-01'
sectionSlug: 'notes'
---

## Instructions

Given a square `n x n` matrix of integers `matrix`, rotate it by 90 degrees _clockwise_.

You must rotate the matrix _in-place_. Do not allocate another 2D matrix and do the rotation.

**Example 1**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/e13e93ed-4fdb-49e4-f971-de1e30356600/public" alt="Visual representation of input and result output for Example 1.">

```Java
Input: matrix = [
  [1,2],
  [3,4]
]

Output: [
  [3,1],
  [4,2]
]
```

**Example 2**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/a4639809-0754-4eda-221f-a4cd58bd9c00/public" alt="Visual representation of input and result output for Example 2.">

```Java
Input: matrix = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]

Output: [
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
```

**Constraints**:

- `n == matrix.length == matrix[i].length`
- `1 <= n <= 20`
- `-1000 <= matrix[i][j] <= 1000`
