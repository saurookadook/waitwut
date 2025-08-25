---
title: 'Neetcode: Set Matrix Zeroes'
date: '2025-08-25'
fullPath: '/notes/dsa/neetcode/blind-75/math-and-geometry/question-03'
sectionSlug: 'notes'
---

## Instructions

Given an `m x n` matrix of integers `matrix`, if an element is `0`, set its entire row and column to `0`'s.

You must update the matrix _in-place_.

**Follow up**: Could you solve it using `O(1)` space?

**Example 1**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/49ffd14e-b32b-4ed8-e0d0-9378e5eb9b00/public" alt="Visual representation of input and result output for Example 1.">

```Java
Input: matrix = [
  [0,1],
  [1,0]
]

Output: [
  [0,0],
  [0,0]
]
```

**Example 2**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/04d99cc8-e453-464d-888c-58d0a95daf00/public" alt="Visual representation of input and result output for Example 2.">

```Java
Input: matrix = [
  [1,2,3],
  [4,0,5],
  [6,7,8]
]

Output: [
  [1,0,3],
  [0,0,0],
  [6,0,8]
]
```

**Constraints**:

- `1 <= matrix.length, matrix[0].length <= 100`
- `-2^31 <= matrix[i][j] <= (2^31) - 1`
