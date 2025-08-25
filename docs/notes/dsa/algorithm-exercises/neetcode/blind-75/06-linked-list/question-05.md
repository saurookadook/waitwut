---
title: 'Neetcode: Remove Node from End of Linked List'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/linked-list/question-05'
sectionSlug: 'notes'
---

## Instructions

You are given the beginning of a linked list `head`, and an integer `n`.

Remove the <code>n<sup>th</sup></code> node from the end of the list and return the beginning of the list.

**Example 1**:

```java
Input: head = [1,2,3,4], n = 2

Output: [1,2,4]
```

**Example 2**:

```java
Input: head = [5], n = 1

Output: []
```

**Example 3**:

```java
Input: head = [1,2], n = 2

Output: [2]
```

**Constraints**:

- The number of nodes in the list is `sz`.
- `1 <= sz <= 30`
- `0 <= Node.val <= 100`
- `1 <= n <= sz`
