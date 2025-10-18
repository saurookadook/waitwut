---
title: 'Solving Real-World Problems with Heaps in Python'
date: '2025-10-04'
fullPath: '/notes/dsa/code-signal/python/course-14/unit-05'
sectionSlug: 'notes'
---

## Problem: Heap-based Median Finder

Consider this scenario: You're working on an algorithm for a real-time analytics engine that calculates the median value of a continuously growing dataset. For instance, an ad tech company might need to analyze click-stream data in real time. Our first problem is to create a data structure that supports adding a number while ensuring efficient retrieval of the median at any given point.

> **Note**: A median value is the middle number in a data set when arranged in ascending order. If there is an even number of data points, the median is the average of the two numbers in the middle. It is a measure of central tendency used in statistics.

### Problem: Naive Approach and its Limitations

One initial approach could be to save each incoming number in a Python list. Whenever we need the median, we can sort the list and compute it. However, as the list length increases, the time to sort the list also grows as sorting has a time complexity of <em class="math">O(n * log n)</em> per each median search request. Thus, this approach becomes less efficient when we want to add and retrieve the median frequently.

### Problem: Efficient Approach

A smarter way to solve this problem is to maintain two **Heaps** - a **Max Heap** to store the smaller half of the numbers and a **Min Heap** for the larger half.

If the **Heaps** are kept balanced in their size, finding the median can be done in <em class="math">O(1)</em> time - you need just the maximal value from the first half (**Max Heap**), and the minimal value from the second half (**Min Heap**) - these two elements should be enough to calculate the median value.

New element addition at the same time can be done in <em class="math">O(log n)</em> time: the new element can be just added to the first half heap (**Max Heap**), but after that **Heaps** should potentially be rebalanced to keep their sizes differ by at most `1`. However, due to the fact that after new element addition heap sizes differ by at most `2`, moving just a single element from one heap to another should be enough, and this balancing can be done in <em class="math">O(log n)</em> time.

### Problem: Implementing the Solution

Let's delve into the implementation specifics. We'll use Python's built-in module `heapq`, which allows us to create a standard **Min Heap**. By storing numbers as negatives, we can simulate a **Max Heap**.

```python
import heapq

# 1. initialize 2 empty lists which will serve as heaps
class MedianFinder:
    def __init__(self):
        self.heaps = ([], [])

    def add_num(self, num: int) -> None:
        """Process is as follows:

        1. When a new number arrives, we store the number in `large` heap (`MinHeap`).
        2. We maintain balance between the heaps by removing the smallest element from
            `large` and pushing it into `small` _(our simulated `MaxHeap`)_.
        3. If `large` has fewer elements than `small`, we balance it by pushing the
            largest element from `small` to `large`.
        """
        small, large = self.heaps
        heapq.heappush(small, -heapq.heappushpop(large, num))
        if len(large) < len(small):
            heapq.heappush(large, -heapq.heappop(small))

    def find_median(self):
        """Since `large` contains the larger elements, if `large` has more elements than
            `small`, the median is the smallest element in large.
            Otherwise, the median is the average of the smallest element in `large` and
            the largest in `small`.
        """
        small, large = self.heaps
        if len(large) > len(small):
            return float(large[0])
        # We subtract `small[0]` from `large[0]` because `small` consists of negative values
        return float((large[0] - small[0]) / 2.0)

```

## Example

### Finding Middle Element

Suppose you're working with a big stream of data, and your task is to support two operations on it:

- Add a new integer number to the stream
- Calculate the middle element value: in case the number of elements in the stream is odd, that's the middle element if stream elements are sorted, in case the number of elements is even, that's the largest element out of two middle stream elements.
  - For example, `middleEl([1, 2, 3, 4, 5]) = 3` and `middleEl([1, 2, 3, 4, 5, 6]) = 4`

```python
import heapq


class MiddleElementFinder:
    def __init__(self):
        self.heaps = ([], [])

    def add_num(self, num: int) -> None:
        small_MaxHeap, large_MinHeap = self.heaps
        heapq.heappush(small_MaxHeap, -heapq.heappushpop(large_MinHeap, num))
        if len(large_MinHeap) < len(small_MaxHeap):
            heapq.heappush(large_MinHeap, -heapq.heappop(small_MaxHeap))

    def middle_element(self) -> int:
        small_MaxHeap, large_MinHeap = self.heaps
        return (
            large_MinHeap[0]
            if len(large_MinHeap) < len(small_MaxHeap)
            else max(large_MinHeap[0], -small_MaxHeap[0])
        )


# Let's test the code
estimate_finder = MiddleElementFinder()
estimate_finder.add_num(5)
estimate_finder.add_num(10)
estimate_finder.add_num(3)
estimate_finder.add_num(1)
estimate_finder.add_num(7)

print(estimate_finder.middle_element())  # Expected output: 5
```
