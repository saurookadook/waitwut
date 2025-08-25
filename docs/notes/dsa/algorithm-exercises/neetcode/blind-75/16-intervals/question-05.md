---
title: 'Neetcode: ??'
date: '2025-08-23'
fullPath: '/notes/dsa/neetcode/blind-75/intervals/question-05'
sectionSlug: 'notes'
---

## Instructions

Given an array of meeting time interval objects consisting of start and end times `[[start_1,end_1],[start_2,end_2],...] (start_i < end_i)`, find the minimum number of days required to schedule all meetings without any conflicts.

**Note**: `(0,8)`, `(8,10)` is not considered a conflict at `8`.

Example 1:

Input: intervals = [(0,40),(5,10),(15,20)]

Output: 2
Explanation:
day1: (0,40)
day2: (5,10),(15,20)

Example 2:

Input: intervals = [(4,9)]

Output: 1
Constraints:

0 <= intervals.length <= 500
0 <= intervals[i].start < intervals[i].end <= 1,000,000

## Solutions

### Python

```python
from pprint import pprint as pp
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


def find_earliest_day_without_conflict(days_list, interval):
    # pp({
    #     "days_list": days_list,
    #     "interval_start": interval.start,
    #     "interval_end": interval.end
    # })

    generator = (
        day_interval for day_interval in days_list if interval.start >= day_interval.end
    )

    return next(generator, None)


class Solution:
    def minMeetingRooms(self, intervals: List[Interval]) -> int:
        if len(intervals) == 0:
            return 0

        sorted_intervals = sorted(intervals, key=lambda i: i.start)
        days_with_intervals = [sorted_intervals[0]]

        for interval in sorted_intervals[1:]:
            earliest_day_without_conflict = find_earliest_day_without_conflict(
                days_list=days_with_intervals, interval=interval
            )

            # pp(earliest_day_without_conflict)

            if earliest_day_without_conflict:
                earliest_day_without_conflict.end = interval.end
            else:
                days_with_intervals.append(interval)

        return len(days_with_intervals)

```
