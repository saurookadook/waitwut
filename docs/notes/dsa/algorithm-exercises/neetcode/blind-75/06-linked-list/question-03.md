---
title: 'Neetcode: Linked List Cycle Detection'
date: '2025-08-23'
fullPath: '/notes/dsa/neetcode/blind-75/linked-list/question-03'
sectionSlug: 'notes'
---

## Instructions

Given the beginning of a linked list `head`, return `true` if there is a cycle in the linked list. Otherwise, return `false`.

There is a cycle in a linked list if at least one node in the list can be visited again by following the `next` pointer.

Internally, `index` determines the index of the beginning of the cycle, if it exists. The tail node of the list will set it's `next` pointer to the `index-th` node. If `index = -1`, then the tail node points to `null` and no cycle exists.

**Note**: `index` is **not** given to you as a parameter.

**Example 1**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/3ecdbcfc-70fc-429a-4654-cf4f6a7dbe00/public" alt="Representation of input and explanation of output for Example 1.">

```Java
Input: head = [1,2,3,4], index = 1

Output: true
```

Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

**Example 2**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/89e6716c-9f65-46da-d7b2-f04a93269700/public" alt="Representation of input and explanation of output for Example 2.">

```Java
Input: head = [1,2], index = -1

Output: false
```

**Constraints**:

- `1 <= Length of the list <= 1000`
- `-1000 <= Node.val <= 1000`
- `index` is `-1` or a valid index in the linked list.
