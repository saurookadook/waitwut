---
title: 'Unraveling Linked Lists: Mastering Traversal and Length Calculation in Python'
date: '2025-09-27'
fullPath: '/notes/dsa/code-signal/python/course-12/unit-07'
sectionSlug: 'notes'
---

## Problem 1: Reverse Linked List Traversal

While walking down a street, imagine you had to document each house but in reverse order. This presents a similar scenario, but instead, we are dealing with a **Linked List**. The task is to traverse the list in reverse form and print all the elements.

### Problem 1: Application

Traversing a list in a reverse manner is often encountered when you need to know the last state or the most recent actions in a scenario. For instance, in a browser history, the most recent web pages are usually at the top of your browsing history. In such a situation, you would need to traverse the list from the tail to the head.

### Problem 1: Efficient Approach Explanation

To traverse a **Linked List** in reverse, we start from the tail node and move up to the previous node until we reach the head. However, because **Linked Lists** are generally singly **Linked Lists** and do not provide a direct way to access previous nodes, we must take a different approach. We can push all nodes onto a stack and then pop them out. This will give us the nodes in reverse order.

### Problem 1: Solution Building

Unlike a book where you can quickly flip to the previous page, we have to navigate through the 'book' once _(in other words, traverse the **Linked List** from head to tail)_, but 'mark' every page we visit _(push every node on a stack)_. We then revisit the marked pages in reverse order _(pop each node from the stack)_.

```python
class Node:
    def __init__(self, data=None):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def LinkedList_reverse_traversal(self):
        node = self.head
        stack = []

        while node is not None:
            stack.append(node.data)
            node = node.next

        while stack:
            print(stack.pop())

```

In this Python code, we start at the head of our **Linked List** and use a `while` loop to push every node into our stack until we have reached the tail. We then use another `while` loop to pop each element from the stack until it's empty, effectively printing the data in reverse order.

> **Note**: Both using an array and a stack involve similar space and time complexities _(<em class="math">O(n)</em> for both)_, so the choice between them may depend on specific use cases or preferences.

## Problem 2: Linked List Length

The second problem in our journey is about finding the length of our **Linked List**. If our **Linked List** were a playlist, our task would be to determine the number of songs in it.

### Problem 2: Application

In many real-world scenarios, one might need to evaluate the length of a **Linked List**. For instance, if you run a call center and have a queue of calls waiting to be addressed, knowing the number of pending calls helps manage your resources more effectively.

### Problem 2: Naive Approach

One might think of using Python's `len()` function to find the length of our custom **Linked List** object. However, `len()` only works with Python's built-in list type, so our **Linked List** would be beyond its capabilities.

### Problem 2: Efficient Approach Explanation

To determine the length of a **Linked List**, we employ a strategy similar to our traversal. The difference, however, is that we use a counter during our 'journey' from the head to the tail and increment it each time we visit a new node. This counter then gives us the total number of nodes in the **Linked List**, hence, its length.

### Problem 2: Solution Building: `LinkedList_length`

```python
class Node:
    def __init__(self):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def LinkedList_length(self):
        current_node = self.head
        length = 0

        while current_node is not None:
            length += 1
            current_node = current_node.next

        return length

```
