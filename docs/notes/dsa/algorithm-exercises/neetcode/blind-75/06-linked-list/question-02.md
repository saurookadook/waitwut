---
title: 'Neetcode: Merge Two Sorted Linked Lists'
date: '2025-08-23'
fullPath: '/notes/dsa/neetcode/blind-75/linked-list/question-02'
sectionSlug: 'notes'
---

## Instructions

You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists into one **sorted** linked list and return the head of the new sorted linked list.

The new list should be made up of nodes from `list1` and `list2`.

**Example 1**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/51adfea9-493a-4abb-ece7-fbb359d1c800/public" alt="Representation of input and output for Example 1.">

```java
Input: list1 = [1,2,4], list2 = [1,3,5]

Output: [1,1,2,3,4,5]
```

**Example 2**:

```java
Input: list1 = [], list2 = [1,2]

Output: [1,2]
```

**Example 3**:

```java
Input: list1 = [], list2 = []

Output: []
```

**Constraints**:

- `0 <= The length of the each list <= 100`
- `-100 <= Node.val <= 100`
