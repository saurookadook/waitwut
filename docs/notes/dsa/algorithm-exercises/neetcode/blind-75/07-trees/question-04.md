---
title: 'Neetcode: Subtree of Another Tree'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/trees/question-04'
sectionSlug: 'notes'
---

## Instructions

Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values of `subRoot` and `false` otherwise.

A subtree of a binary tree `tree` is a tree that consists of a node in `tree` and all of this node's descendants. The tree `tree` could also be considered as a subtree of itself.

**Example 1**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/2991a77a-9664-46ed-528d-019e392f7400/public" alt="Diagram representation of 'root' and 'subroot' inputs for Example 1.">

```Java
Input: root = [1,2,3,4,5], subRoot = [2,4,5]

Output: true
```

**Example 2**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/ae6114cb-23a0-457f-c441-0a82b7a58500/public" alt="Diagram representation of 'root' and 'subroot' inputs for Example 2.">

```Java
Input: root = [1,2,3,4,5,null,null,6], subRoot = [2,4,5]

Output: false
```

**Constraints**:

- `1 <= The number of nodes in both trees <= 100`
- `-100 <= root.val, subRoot.val <= 100`
