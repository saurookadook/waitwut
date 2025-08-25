---
title: 'Neetcode: Construct Binary Tree from Preorder and Inorder Traversal'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/trees/question-09'
sectionSlug: 'notes'
---

## Instructions

You are given two integer arrays `preorder` and `inorder`.

- `preorder` is the preorder traversal of a binary tree
- `inorder` is the inorder traversal of the same tree
- Both arrays are of the same size and consist of unique values.

Rebuild the binary tree from the preorder and inorder traversals and return its root.

**Example 1**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/938c14d3-6669-47ab-924b-a1a08640f200/public" alt="Diagram representation of 'preorder' and 'inorder' inputs for Example 1.">

```java
Input: preorder = [1,2,3,4], inorder = [2,1,3,4]

Output: [1,2,3,null,null,null,4]
```

**Example 2**:

```java
Input: preorder = [1], inorder = [1]

Output: [1]
```

**Constraints**:

- `1 <= inorder.length <= 1000`
- `inorder.length == preorder.length`
- `-1000 <= preorder[i], inorder[i] <= 1000`
