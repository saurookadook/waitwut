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

## Solutions

### Python

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def get_last(self):
    if self.next == None:
        return self

    node = self.next

    while node.next is not None:
        node = node.next

    return node


setattr(ListNode, 'get_last', get_last)


class Solution:
    merged_list = None

    def mergeTwoLists(
        self,
        list1: Optional[ListNode],
        list2: Optional[ListNode]
    ) -> Optional[ListNode]:
        if not list1 and not list2:
            return None

        node_1 = list1
        node_2 = list2

        while node_1 or node_2:
            if node_1 and node_2:
                if node_1.val <= node_2.val:
                    self.handle_assignment(node_1)
                    node_1 = node_1.next
                else:
                    self.handle_assignment(node_2)
                    node_2 = node_2.next

            elif node_1:
                self.handle_assignment(node_1)
                node_1 = node_1.next
            else:
                self.handle_assignment(node_2)
                node_2 = node_2.next

        return self.merged_list

    def handle_assignment(self, target_node):
        if self.merged_list is None:
            self.merged_list = ListNode(val=target_node.val)
        else:
            self.merged_list.get_last().next = ListNode(val=target_node.val)


```
