---
title: 'Neetcode: Kth Smallest Integer in BST'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/trees/question-08'
sectionSlug: 'notes'
---

## Instructions

Given the `root` of a binary search tree, and an integer `k`, return the <code>k<sup>th</sup></code> smallest value (**1-indexed**) in the tree.

A binary search tree satisfies the following constraints:

- The left subtree of every node contains only nodes with keys **less than** the node's key.
- The right subtree of every node contains only nodes with keys **greater than** the node's key.
- Both the left and right subtrees are also binary search trees.

**Example 1**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/02eca3db-f72f-4277-7134-faec4f02e500/public" alt="Diagram representation of 'root' input for Example 1.">

```Java
Input: root = [2,1,3], k = 1

Output: 1
```

**Example 2**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/dca6c42d-2327-4036-f7f2-3e99d8203100/public" alt="Diagram representation of 'root' input for Example 2.">

```Java
Input: root = [4,3,5,2,null], k = 4

Output: 5
```

**Constraints**:

- `1 <= k <= The number of nodes in the tree <= 1000`
- `0 <= Node.val <= 1000`
