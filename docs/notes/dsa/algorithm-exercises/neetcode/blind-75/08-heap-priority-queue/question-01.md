---
title: 'Neetcode: Find Median From Data Stream'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/heap-priority-queue/question-01'
sectionSlug: 'notes'
---

## Instructions

The [median](https://en.wikipedia.org/wiki/Median) is the middle value in a sorted list of integers. For lists of even length, there is no middle value, so the median is the [mean](https://en.wikipedia.org/wiki/Mean) of the two middle values.

For example:

- For `arr = [1,2,3]`, the median is `2`.
- For `arr = [1,2]`, the median is `(1 + 2) / 2 = 1.5`

Implement the MedianFinder class:

- `MedianFinder()` initializes the `MedianFinder` object.
- `void addNum(int num)` adds the integer `num` from the data stream to the data structure.
- `double findMedian()` returns the median of all elements so far.

**Example 1**:

```java
Input:
["MedianFinder", "addNum", "1", "findMedian", "addNum", "3" "findMedian", "addNum", "2", "findMedian"]

Output:
[null, null, 1.0, null, 2.0, null, 2.0]

Explanation:
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.findMedian(); // return 1.0
medianFinder.addNum(3);    // arr = [1, 3]
medianFinder.findMedian(); // return 2.0
medianFinder.addNum(2);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0
```

**Constraints**:

- `-100,000 <= num <= 100,000`
- `findMedian` will only be called after adding at least one integer to the data structure.
