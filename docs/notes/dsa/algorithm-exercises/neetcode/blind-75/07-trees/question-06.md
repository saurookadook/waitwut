---
title: 'Neetcode: Binary Tree Level Order Traversal'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/trees/question-06'
sectionSlug: 'notes'
---

## Instructions

Given a binary tree `root`, return the level order traversal of it as a nested list, where each sublist contains the values of nodes at a particular level in the tree, from left to right.

**Example 1**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/a4639809-0754-4eda-221f-a4cd58bd9c00/public" alt="Diagram representation of 'root' input for Example 1.">

```Java
Input: root = [1,2,3,4,5,6,7]

Output: [[1],[2,3],[4,5,6,7]]
```

**Example 2**:

```Java
Input: root = [1]

Output: [[1]]
```

**Example 3**:

```Java
Input: root = []

Output: []
```

**Constraints**:

- `0 <= The number of nodes in the tree <= 1000`
- `-1000 <= Node.val <= 1000`
