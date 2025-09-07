---
title: 'Neetcode: Non-overlapping Intervals'
date: '2025-08-25'
fullPath: '/notes/dsa/neetcode/blind-75/intervals/question-03'
sectionSlug: 'notes'
---

## Instructions

Given an array of intervals `intervals` where `intervals[i] = [start_i, end_i]`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

Note: Intervals are _non-overlapping_ if they have no common point. For example, `[1, 2]` and `[3, 4]` are non-overlapping, but `[1, 2]` and `[2, 3]` are overlapping.

**Example 1**:

```java
Input: intervals = [[1,2],[2,4],[1,4]]

Output: 1
```

Explanation: After [1,4] is removed, the rest of the intervals are non-overlapping.

**Example 2**:

```java
Input: intervals = [[1,2],[2,4]]

Output: 0
```

**Constraints**:

- `1 <= intervals.length <= 1000`
- `intervals[i].length == 2`
- `-50000 <= starti < endi <= 50000`

## Solutions

### Python

```python
from typing import List


class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        sorted_intervals = sorted(intervals, key=lambda x: x[0])

        result = 0
        previous_end = sorted_intervals[0][1]

        for start, end in sorted_intervals[1:]:
            if previous_end <= start:
                previous_end = end
            else:
                result += 1
                previous_end = min(end, previous_end)

        return result


# ============================= 1 =============================
class RecursiveSolution:
    """1. Solution utilizing Recursion

    Time & Space Complexity

    Time complexity:
        `O(2^n)`
    Space complexity:
        `O(n)`
    """

    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort()

        def depth_first_search(i, previous_i):
            if i == len(intervals):
                return 0

            result = depth_first_search(i + 1, previous_i)
            previous_end = intervals[previous_i][1]
            current_start = intervals[i][0]

            if previous_i == -1 or previous_end <= current_start:
                # NOTE: not sure what `1 + depth_first_search(i + 1, i)` logically represents
                result = max(result, 1 + depth_first_search(i + 1, i))

            return result

        return len(intervals) - depth_first_search(0, -1)


# ============================= 2 =============================
class DynamicProgrammingTopDownSolution:
    """2. Solution utilizing Dynamic Programming (top-down)

    Time & Space Complexity

    Time complexity:
        `O(n^2)`
    Space complexity:
        `O(n)`
    """

    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda x: x[1])  # sort by end time
        n = len(intervals)
        memo = {}  # as in "memoized results"

        def depth_first_search(i):
            if i in memo:
                return memo[i]

            result = 1
            for j in range(i + 1, n):
                current_end = intervals[i][1]
                next_start = intervals[j][0]

                if current_end <= next_start:
                    result = max(result, 1 + depth_first_search(j))

            memo[i] = result
            return result

        return n - depth_first_search(0)


# ============================= 3 =============================
class DynamicProgrammingBottomUpSolution:
    """3. Solution utilizing Dynamic Programming (bottom-up)

    Time & Space Complexity

    Time complexity:
        `O(n^2)`
    Space complexity:
        `O(n)`
    """

    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda x: x[1])
        n = len(intervals)
        dp_table = [0] * n

        for i in range(n):
            dp_table[i] = 1
            for j in range(i):
                next_end = intervals[j][1]
                current_start = intervals[i][0]

                if next_end <= current_start:
                    dp_table[i] = max(dp_table[i], 1 + dp_table[j])

        max_non_overlapping = max(dp_table)
        return n - max_non_overlapping


# ============================= 4 =============================
class DynamicProgrammingBinarySearchSolution:
    """4. Solution utilizing Dynamic Programming (binary search)

    Time & Space Complexity

    Time complexity:
        `O(n * log n)`
    Space complexity:
        `O(n)`
    """

    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda x: x[1])
        n = len(intervals)
        dp_table = [0] * n
        dp_table[0] = 1

        def binary_search(right, target):
            left = 0

            while left < right:
                # NOTE:
                # this is using the bitwise right-shift operator to basically
                # divide by 2 and round down if result isn't exact
                mid = (left + right) >> 1
                mid_end = intervals[mid][1]
                if mid_end <= target:
                    left = mid + 1
                else:
                    right = mid

            return left

        for i in range(1, n):
            current_start = intervals[i][0]
            idx = binary_search(i, current_start)

            if idx == 0:
                dp_table[i] = dp_table[i - 1]
            else:
                dp_table[i] = max(dp_table[i - 1], 1 + dp_table[idx - 1])

        # NOTE: wouldn't this _always_ be comparing the last item in the table?
        # Why not just this? `n - dp[-1]`
        return n - dp_table[n - 1]


# ============================= 5 =============================
class GreedySortByStartSolution:
    """5. Solution utilizing Greedy Algorithm, sorting by start

    Time & Space Complexity

    Time complexity:
        `O(n * log n)`
    Space complexity:
        `O(1)` or `O(n)` depending on the sorting algorithm.
    """

    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda pair: pair[1])
        previous_end = intervals[0][1]
        result = 0

        for start, end in intervals[1:]:
            if previous_end <= start:
                previous_end = end
            else:
                result += 1
                previous_end = min(end, previous_end)

        return result


# ============================= 6 =============================
class GreedySortByEndSolution:
    """6. Solution utilizing Greedy Algorithm, sorting by end

    Time & Space Complexity

    Time complexity:
        `O(n * log n)`
    Space complexity:
        `O(1)` or `O(n)` depending on the sorting algorithm.
    """

    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda pair: pair[1])
        previous_end = intervals[0][1]
        result = 0

        for start, end in intervals[1:]:
            if previous_end > start:
                result += 1
            else:
                previous_end = end

        return result

```
