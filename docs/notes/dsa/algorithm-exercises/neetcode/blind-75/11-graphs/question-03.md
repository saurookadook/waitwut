---
title: 'Neetcode: Pacific Atlantic Water Flow'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/graphs/question-03'
sectionSlug: 'notes'
---

## Instructions

You are given a rectangular island `heights` where `heights[r][c]` represents the **height above sea level** of the cell at coordinate `(r, c)`.

The islands borders the **Pacific Ocean** from the top and left sides, and borders the **Atlantic Ocean** from the bottom and right sides.

Water can flow in **four directions** (up, down, left, or right) from a cell to a neighboring cell with **height equal or lower**. Water can also flow into the ocean from cells adjacent to the ocean.

Find all cells where water can flow from that cell to **both** the Pacific and Atlantic oceans. Return it as a **2D list** where each element is a list `[r, c]` representing the row and column of the cell. You may return the answer in **any order**.

**Example 1**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/3899fae1-ab18-4d6b-15b4-c7f7aa224700/public" alt="Visual representation of 'heights' input for Example 1.">

```Java
Input: heights = [
  [4,2,7,3,4],
  [7,4,6,4,7],
  [6,3,5,3,6]
]

Output: [[0,2],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[2,0]]
```

**Example 2**:

```Java
Input: heights = [[1],[1]]

Output: [[0,0],[0,1]]
```

**Constraints**:

- `1 <= heights.length, heights[r].length <= 100`
- `0 <= heights[r][c] <= 1000`
