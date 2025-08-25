---
title: 'Neetcode: Serialize and Deserialize Binary Tree'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/trees/question-11'
sectionSlug: 'notes'
---

## Instructions

Implement an algorithm to serialize and deserialize a binary tree.

Serialization is the process of converting an in-memory structure into a sequence of bits so that it can be stored or sent across a network to be reconstructed later in another computer environment.

You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure. There is no additional restriction on how your serialization/deserialization algorithm should work.

**Note**: The input/output format in the examples is the same as how NeetCode serializes a binary tree. You do not necessarily need to follow this format.

**Example 1**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/a9dfb17f-70e9-42a3-ba97-33cfd82f6100/public" alt="Diagram representation of 'root' input for Example 1.">

```java
Input: root = [1,2,3,null,null,4,5]

Output: [1,2,3,null,null,4,5]
```

**Example 2**:

```java
Input: root = []

Output: []
```

**Constraints**:

- `0 <= The number of nodes in the tree <= 1000`
- `-1000 <= Node.val <= 1000`
