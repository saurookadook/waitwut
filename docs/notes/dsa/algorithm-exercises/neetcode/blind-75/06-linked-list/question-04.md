---
title: 'Neetcode: Reorder Linked List'
date: '2025-08-23'
fullPath: '/notes/dsa/neetcode/blind-75/linked-list/question-04'
sectionSlug: 'notes'
---

## Instructions

You are given the head of a singly linked-list.

The positions of a linked list of `length = 7` for example, can intially be represented as:

`[0, 1, 2, 3, 4, 5, 6]`

Reorder the nodes of the linked list to be in the following order:

`[0, 6, 1, 5, 2, 4, 3]`

Notice that in the general case for a list of `length = n` the nodes are reordered to be in the following order:

`[0, n-1, 1, n-2, 2, n-3, ...]`

You may not modify the values in the list's nodes, but instead you must reorder the nodes themselves.

**Example 1**:

```java
Input: head = [2,4,6,8]

Output: [2,8,4,6]
```

**Example 2**:

```java
Input: head = [2,4,6,8,10]

Output: [2,10,4,8,6]
```

**Constraints**:

- `1 <= Length of the list <= 1000`
- `1 <= Node.val <= 1000`
