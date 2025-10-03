---
title: 'Applying Queue Operations: Tackling Interview Questions in Python'
date: '2025-09-27'
fullPath: '/notes/dsa/code-signal/python/course-12/unit-05'
sectionSlug: 'notes'
---

## Problem 1: Queue Interleaving

In the domain of data structure manipulation, understanding how we can handle `queue` operations efficiently is fundamental. For our first problem, consider a `queue` of integers. Our task is to reorganize the elements by interleaving the first half of the queue with the second half. Essentially, if our queue initially is `[1, 2, 3, 4, 5, 6]`, after interleaving it becomes `[1, 4, 2, 5, 3, 6]`. The problem tests how we can shrewdly manipulate a `queue` data structure to reorder its elements in a specific manner.

### Problem 1: Naive Approach and Its Pitfalls

A naive approach to solving this problem might be to dequeue all the elements into another data structure like a list or a stack, perform the reordering operation, and then enqueue the elements back into the queue. However, this method introduces non-optimal time and space complexity due to the extensive use of auxiliary space, and it doesn't adhere to the spirit of the queue data structure, which typically only allows **FIFO (First-In-First-Out)** operations.

### Problem 1: Efficient Approach – Explanation

The most efficient way to solve this problem involves exploiting advanced `queue` operations to our advantage. Specifically, the idea is to split the queue into two halves, then repeatedly dequeue an element from each half and enqueue it back into the queue until all elements from both halves are exhausted. This procedure accomplishes the interleaving using only a constant amount of additional space and in linear time, adhering to the **FIFO** spirit of the queue.

### Problem 1: Solution Algorithm

The solution to the problem can be built as follows:

1. Create a function `interleave_queue` that takes a queue as an argument.
2. Calculate the midpoint. If the queue's length is odd, round down to make sure the second half is larger.
3. Perform the interleaving operation by repeatedly dequeuing one element from the first half and one from the second half, then enqueue the two elements back into the queue in the original order.
4. The function should return the interleave queue.

### Problem 1: Solution Building

```python
from collections import deque


def interleave_queue(queue):
    if queue is not deque:
        queue = deque(x for x in list(queue))

    n = len(queue)
    half_size = n // 2
    first_half = deque()

    for _ in range(half_size):
        first_half.append(queue.popleft())

    # NOTE: I'm not so sure these line are necessary...?
    # If there is an odd number of elements, we move the middle element to the end
    if n % 2 == 1:
        queue.append(queue.popleft())

    while first_half:
        queue.append(first_half.popleft())

        if queue:
            queue.append(queue.popleft())

    return queue

```

## Problem 2: Moving Average from Data Stream

Moving on to the next problem, we step into the domain of real-time data analysis, where we encounter a continuous stream of data rather than isolated pieces of data. Here, you are given a stream of integers and are required to calculate a moving average of a specific window size `m` for each number in the stream. This is a classic problem in financial programming and data science, and understanding this problem will enable you to build more advanced data analysis models. While the problem is not directly related to queues, it requires manipulating a queue in a complex scenario and can be faced during a technical interview.

### Problem 2: Naive Approach and Its Pitfalls

A naive approach to this problem would involve continually updating the list with every new data point, removing the oldest data point if the window size is exceeded, and recalculating the average for every new data point. However, recalculating the average again and again can be computationally expensive, particularly when dealing with large data streams.

### Problem 2: Efficient Approach – Explanation

We can optimize this process by maintaining a sum that accumulates with every new data point added to the window. When the window size reaches our predetermined size `m`, the oldest data point is automatically removed from the window as a new data point enters. Thus, with each new data point entering the window, we simply subtract the oldest data point removed and add the new data point to our maintained sum.

### Problem 2: Solution Building

To solve this problem:

1. Instantiate your `queue` and set it up to retain the last `m` numbers. Initialize a `total` variable that will help keep track of the sum of the numbers in the window, and also set up an instance variable `size` that will keep track of the value `m` provided at the start of the analysis.
2. For every incoming number, keep adding it to your `queue`. Every time a number is added to the queue, subtract the oldest number from the total sum if the size of the queue has reached `m`.
3. Return the moving average, calculated by dividing the total sum by the current size of the window.

The function has a time complexity of <em class="math">O(1)</em> and a space complexity of <em class="math">O(m)</em> because it stores m numbers.

```python
from collections import deque


class MovingAverage:
    def __init__(self, size):
        self.queue = deque()
        self.size = size
        self.total = 0

    def calculate_moving_average(self, val):
        if len(self.queue) == self.size:
            self.total -= self.queue.popleft()
        self.queue.append(val)
        self.total += val
        return round(self.total / len(self.queue), 2)

```
