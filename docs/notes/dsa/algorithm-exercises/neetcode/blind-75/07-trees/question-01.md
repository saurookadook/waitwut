---
title: 'Neetcode: Invert Binary Tree'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/trees/question-01'
sectionSlug: 'notes'
---

## Instructions

You are given the root of a binary tree `root`. Invert the binary tree and return its root.

**Example 1**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/ac124ee6-207f-41f6-3aaa-dfb35815f200/public" alt="Representation of input and output for Example 1.">

```Java
Input: root = [1,2,3,4,5,6,7]

Output: [1,3,2,7,6,5,4]
```

**Example 2**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/e39e8d4f-9946-4f99-ee3d-0d4df08d4d00/public" alt="Representation of input and output for Example 2.">

```Java
Input: root = [3,2,1]

Output: [3,1,2]
```

**Example 3**:

```Java
Input: root = []

Output: []
```

**Constraints**:

- `0 <= The number of nodes in the tree <= 100`
- `-100 <= Node.val <= 100`
