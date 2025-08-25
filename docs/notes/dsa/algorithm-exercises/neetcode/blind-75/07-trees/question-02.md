---
title: 'Neetcode: Maximum Depth of Binary Tree'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/trees/question-02'
sectionSlug: 'notes'
---

## Instructions

Given the `root` of a binary tree, return its **depth**.

The **depth** of a binary tree is defined as the number of nodes along the longest path from the root node down to the farthest leaf node.

**Example 1**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/5ea6da77-7e43-43e0-dd9d-e879ca0b1600/public" alt="Diagram representation of array input for Example 1.">

```Java
Input: root = [1,2,3,null,null,4]

Output: 3
```

**Example 2**:

```Java
Input: root = []

Output: 0
```

**Constraints**:

- `0 <= The number of nodes in the tree <= 100`
- `-100 <= Node.val <= 100`
