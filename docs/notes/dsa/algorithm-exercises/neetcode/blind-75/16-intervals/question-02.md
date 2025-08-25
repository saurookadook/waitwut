---
title: 'Neetcode: Merge Intervals'
date: '2025-08-25'
fullPath: '/notes/dsa/neetcode/blind-75/intervals/question-02'
sectionSlug: 'notes'
---

## Instructions

Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

You may return the answer in **any order**.

Note: Intervals are _non-overlapping_ if they have no common point. For example, `[1, 2]` and `[3, 4]` are non-overlapping, but `[1, 2]` and `[2, 3]` are overlapping.

**Example 1**:

```java
Input: intervals = [[1,3],[1,5],[6,7]]

Output: [[1,5],[6,7]]
```

**Example 2**:

```java
Input: intervals = [[1,2],[2,3]]

Output: [[1,3]]
```

**Constraints**:

- `1 <= intervals.length <= 1000`
- `intervals[i].length == 2`
- `0 <= start <= end <= 1000`

## Solutions

### Python

```python
from pprint import pprint as pp
from typing import List


def interval_has_conflict_with_target(interval, target):
    i_start = interval[0]
    i_end = interval[1]
    t_start = target[0]
    t_end = target[1]

    return i_start <= t_start and t_start <= i_end and i_end <= t_end


def find_earliest_interval_with_conflict(source_intervals, target_interval):
    generator = (
        interval
        for interval in source_intervals
        if interval_has_conflict_with_target(interval, target_interval)
    )

    return next(generator, None)


class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        non_overlapping_intervals = []

        sorted_intervals = self.create_sorted_intervals(intervals)

        for i in sorted_intervals:
            i_with_conflict = find_earliest_interval_with_conflict(
                source_intervals=non_overlapping_intervals, target_interval=i
            )

            if i_with_conflict is not None:
                non_overlapping_intervals[-1][1] = i[1]
                continue
            elif (
                len(non_overlapping_intervals) > 0
                and non_overlapping_intervals[-1][0] <= i[0]
                and non_overlapping_intervals[-1][1] >= i[1]
            ):
                continue

            non_overlapping_intervals.append(i)

        return non_overlapping_intervals

    def create_sorted_intervals(self, intervals):
        """Creats new list of `intervals` sorted first by start
        and then by end.
        """

        sorted_intervals_by_start = sorted(intervals, key=lambda i: i[1])
        return sorted(sorted_intervals_by_start, key=lambda i: i[0])


# ============================= 1 =============================
class SortingSolution:
    """1. Solution utilizing Sorting Algorithm

    ---- Time & Space Complexity ----

    Time complexity:
        - `O(n * log n)`
    Space complexity:
        - `O(1)` or `O(n)` depending on the sorting algorithm
        - `O(n)` for the output list
    """

    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        # Sorting in place
        intervals.sort(key=lambda pair: pair[0])
        # Sorting without mutating argument
        sorted_intervals = sorted(intervals, key=lambda i: i[0])
        results = [intervals[0]]

        for start, end in intervals[1:]:
            last_end = results[-1][1]

            if start <= last_end:
                results[-1][1] = max(last_end, end)
            else:
                results.append([start, end])

        return results


# ============================= 2 =============================
from collections import defaultdict


class SweepLineSolution:
    """2. Solution utilizing Sweep Line Algorithm

    ---- Time & Space Complexity ----

    Time complexity:
        - `O(n * log n)`
    Space complexity:
        - `O(n)`
    """

    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        mp = defaultdict(int)
        for start, end in intervals:
            mp[start] += 1
            mp[end] -= 1

        res = []
        interval = []
        have = 0

        for i in sorted(mp):
            if not interval:
                interval.append(i)

            have += mp[i]

            if have == 0:
                interval.append(i)
                res.append(interval)
                interval = []


# ============================= 3 =============================
class GreedySolution:
    """3. Solution utilizing Greedy Algorithm

    ---- Time & Space Complexity ----

    Time complexity:
        - `O(n + m)`
    Space complexity:
        - `O(n)`

    _NOTE: Where `n` is the length of the array and `m` is the maximum start value
    among all the intervals._
    """

    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        max_val = max(interval[0] for interval in intervals)

        mp = [0] * (max_val + 1)
        for start, end in intervals:
            mp[start] = max(end + 1, mp[start])

        res = []
        have = -1
        interval_start = -1

        for i in range(len(mp)):
            if mp[i] != 0:
                if interval_start == -1:
                    interval_start = i
                have = max(mp[i] - 1, have)

            if have == i:
                res.append([interval_start, have])
                have = -1
                interval_start = -1

        if interval_start != -1:
            res.append([interval_start, have])

        return res

```
