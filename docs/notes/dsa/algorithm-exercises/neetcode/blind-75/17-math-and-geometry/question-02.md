---
title: 'Neetcode: Spiral Matrix'
date: '2025-08-25'
fullPath: '/notes/dsa/neetcode/blind-75/math-and-geometry/question-02'
sectionSlug: 'notes'
---

## Instructions

Given an `m x n` matrix of integers `matrix`, return a list of all elements within the matrix in _spiral order_.

**Example 1**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/fe678b92-8606-4e07-ce70-08ec3479aa00/public" alt="Visual representation of input and result output for Example 1.">

```Java
Input: matrix = [[1,2],[3,4]]

Output: [1,2,4,3]
```

**Example 2**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/8a460616-db14-4ccf-068b-00aa6d398400/public" alt="Visual representation of input and result output for Example 2.">

```Java
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]

Output: [1,2,3,6,9,8,7,4,5]
```

**Example 3**:

```Java
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]

Output: [1,2,3,4,8,12,11,10,9,5,6,7]
```

**Constraints**:

- `1 <= matrix.length, matrix[i].length <= 10`
- `-100 <= matrix[i][j] <= 100`
