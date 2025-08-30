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

### Python

```Python
from pprint import pprint as pp


# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next


def from_last(self, n):
    if self.next == None:
        return self

    slow_crawl = self
    fast_crawl = self

    while n > 0:
        fast_crawl = fast_crawl.next
        n -= 1

    while fast_crawl.next is not None:
        slow_crawl = slow_crawl.next
        fast_crawl = fast_crawl.next

    return slow_crawl


def get_last(self):
    if self.next == None:
        return self

    node = self.next

    while node.next is not None:
        node = node.next

    return node


def size(self):
    counter = 0
    node = self

    while node is not None:
        node = node.next
        counter += 1

    return counter



setattr(ListNode, 'from_last', from_last)
setattr(ListNode, 'get_last', get_last)
setattr(ListNode, 'size', size)


class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        reversed_linked_list = None

        if head == None:
            return reversed_linked_list

        i = 0

        for i in range(head.size()):
            if reversed_linked_list == None:
                reversed_linked_list = ListNode(val=head.from_last(i).val)
            else:
                reversed_linked_list.get_last().next = ListNode(
                    val=head.from_last(i).val
                )

        return reversed_linked_list


```
