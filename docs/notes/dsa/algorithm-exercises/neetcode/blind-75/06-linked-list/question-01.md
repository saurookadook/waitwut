---
title: 'Neetcode: Reverse Linked List'
date: '2025-08-23'
fullPath: '/notes/dsa/neetcode/blind-75/linked-list/question-01'
sectionSlug: 'notes'
---

## Instructions

Given the beginning of a singly linked list `head`, reverse the list, and return the new beginning of the list.

**Example 1**:

```java
Input: head = [0,1,2,3]

Output: [3,2,1,0]
```

**Example 2**:

```java
Input: head = []

Output: []
```

**Constraints**:

- `0 <= The length of the list <= 1000`
- `-1000 <= Node.val <= 1000`

## Solutions

### Solution 1

```Python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:

```
