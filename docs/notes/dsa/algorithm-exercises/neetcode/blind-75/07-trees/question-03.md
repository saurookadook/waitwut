---
title: 'Neetcode: Same Binary Tree'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/trees/question-03'
sectionSlug: 'notes'
---

## Instructions

Given the roots of two binary trees `p` and `q`, return `true` if the trees are **equivalent**, otherwise return `false`.

Two binary trees are considered **equivalent** if they share the exact same structure and the nodes have the same values.

**Example 1**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/e78fc10c-4692-471f-5261-61e9be4f3a00/public" alt="Diagram representation of array inputs for Example 1.">

```java
Input: p = [1,2,3], q = [1,2,3]

Output: true
```

**Example 2**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/0b0ee764-c643-46ff-cb3f-86ce8b58ab00/public" alt="Diagram representation of array inputs for Example 2.">

```java
Input: p = [4,7], q = [4,null,7]

Output: false
```

**Example 3**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/4d811f95-0488-490b-1f4f-fc5489df0f00/public" alt="Diagram representation of array inputs for Example 3.">

```java
Input: p = [1,2,3], q = [1,3,2]

Output: false
```

**Constraints**:

- `0 <= The number of nodes in both trees <= 100`
- `-100 <= Node.val <= 100`
