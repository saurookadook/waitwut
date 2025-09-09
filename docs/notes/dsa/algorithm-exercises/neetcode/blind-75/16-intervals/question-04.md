---
title: 'Neetcode: Meeting Rooms'
date: '2025-08-25'
fullPath: '/notes/dsa/neetcode/blind-75/intervals/question-04'
sectionSlug: 'notes'
---

## Instructions

Given an array of meeting time interval objects consisting of start and end times `[[start_1,end_1],[start_2,end_2],...] (start_i < end_i)`, determine if a person could add all meetings to their schedule without any conflicts.

**Note**: `(0,8)`, `(8,10)` is not considered a conflict at `8`.

**Example 1**:

```java
Input: intervals = [(0,30),(5,10),(15,20)]

Output: false
```

Explanation:

- `(0,30)` and `(5,10)` will conflict
- `(0,30)` and `(15,20)` will conflict

**Example 2**:

```java
Input: intervals = [(5,8),(9,15)]

Output: true
```

**Constraints**:

- `0 <= intervals.length <= 500`
- `0 <= intervals[i].start < intervals[i].end <= 1,000,000`

---

## Solutions

### Python

```python
from typing import List


class Interval(object):
    def __init__(self, start, end):
        self.start = start
        self.end = end


"""
Definition of Interval:
class Interval(object):
    def __init__(self, start, end):
        self.start = start
        self.end = end
"""


class Solution:
    """Time & Space Complexity

    Time complexity:
        `O(n * log n)`
    Space complexity:
        `O(1)` or `O(n)` depending on the sorting algorithm.
    """

    def canAttendMeetings(self, intervals: List[Interval]) -> bool:
        if len(intervals) == 0:
            return True

        sorted_intervals = sorted(intervals, key=lambda i: i.start)

        final_end = sorted_intervals[0].end

        for interval in sorted_intervals[1:]:
            if interval.start < final_end:
                return False

            final_end = interval.end

        return True

```
