---
title: 'Understanding and Implementing Queues: Exploring Core Concepts, Python Implementation, and Time Complexity'
date: '2025-09-27'
fullPath: '/notes/dsa/code-signal/python/course-12/unit-04'
sectionSlug: 'notes'
---

## Intro

Much like **Stacks**, which operate on the **"Last-In, First-Out" or LIFO principle**, **Queues** function on the opposite principle of **"First-In, First-Out" or FIFO**. Consequently, the first item entered into the queue is also the first one out.

The real-world analogy would be a queue at a grocery store checkout. The person who has been waiting in line the longest is served first, then the next person, and so on. The last person to join the queue will be the last one to be served. In computer science, we utilize the same concept.

## Understanding Queues

At its core, a **Queue** is a sequential collection of elements that follows a **"First-In, First-Out" (FIFO) principle**. It operates much like real-world queues or lines, where the first element inserted is the first one to be removed. For example, consider a line of people waiting to buy tickets at a theater. The person who arrives first gets their ticket first. In computer science, a **Queue** works in exactly the same way.

In Python, we can implement **Queues** using built-in data types. Indeed, the Python `list` datatype comes in handy here. Python lists, however, have a significant drawback: the `pop(0)` method has <em class="math">O(n)</em> time complexity, while we would like it to be <em class="math">O(1)</em>. There is another Python module named `collections` that offers `deque`, a flexible container that serves both as queue and stack implementations. We will use the `deque` data structure to implement the queue in this lesson.

## Queues in Python

With Python, implementing a **Queue** is quite simple. We begin by creating an empty **Queue**, for which we can use Python's built-in `deque`.

```python
from collections import deque


queue = deque()
```

We can add or enqueue elements to the end of the **Queue** using the `append()` method. Similarly, the removal or dequeue of an element from the start of the **Queue** can be done using the `popleft()` method.

```python
# Add elements
queue.append('Alice')
queue.append('Bob')
queue.append('Charlie')

print(queue)  # Output: deque(['Alice', 'Bob', 'Charlie'])

# Remove an element
queue.popleft()

print(queue)  # Output: deque(['Bob', 'Charlie'])
```

## Complexity Analysis of Queue Operations

In order to make smart decisions about data structures, it's important to be mindful of their time and space complexities. In the case of a **Queue** implemented using the collections.deque, the time complexity for both the enqueue _(adding an element at the end of the **Queue**)_ and dequeue _(removing an element from the start of the **Queue**)_ operations is <em class="math">O(1)</em>. This is because dequeue is implemented in a way that is very fast to change the first and the last elements. We will talk about this implementation, called `Doubly Linked Lists`, in further lessons.

## Manipulating Queues in Python

A **Queue** can be very useful when we need to manage tasks according to their arrival. This can be an efficient strategy in certain types of algorithms and, specifically, in a multitasking environment.

For instance, consider a printer **Queue** where print jobs are sent to the printer in the order they were queued. Here's a simple demonstration of this scenario:

```python
from collections import deque


# Printer Queue
printer_queue = deque()

# Send jobs to the printer
printer_queue.append('Document1')
printer_queue.append('Document2')
printer_queue.append('Picture1')

# Start processing jobs
while printer_queue:
    job = printer_queue.popleft()
    print(f'Currently printing: {job}')

# Output:
# Currently printing: Document1
# Currently printing: Document2
# Currently printing: Picture1
```

## Applying Queues to Solve a Complex Problem

**Queues** can be more versatile than they might seem at first glance. For instance, in **Graph theory**, the **Breadth-First Search (BFS) algorithm** makes extensive use of **Queues** to check nodes across levels in the correct order in a graph traversal problem.
