---
title: 'Neetcode: Merge K Sorted Linked Lists'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/linked-list/question-06'
sectionSlug: 'notes'
---

## Instructions

You are given an array of `k` linked lists `lists`, where each list is sorted in ascending order.

Return the **sorted** linked list that is the result of merging all of the individual linked lists.

**Example 1**:

```Java
Input: lists = [[1,2,4],[1,3,5],[3,6]]

Output: [1,1,2,3,3,4,5,6]
```

**Example 2**:

```Java
Input: lists = []

Output: []
```

**Example 3**:

```Java
Input: lists = [[]]

Output: []
```

**Constraints**:

- `0 <= lists.length <= 1000`
- `0 <= lists[i].length <= 100`
- `-1000 <= lists[i][j] <= 1000`
