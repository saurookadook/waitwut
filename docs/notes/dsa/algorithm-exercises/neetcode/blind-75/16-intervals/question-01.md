---
title: 'Neetcode: Insert Interval'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/intervals/question-01'
sectionSlug: 'notes'
---

## Instructions

You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [start_i, end_i]` represents the start and the end time of the <code>i<sup>th</sup></code> interval. `intervals` is initially sorted in ascending order by `start_i`.

You are given another interval `newInterval = [start, end]`.

Insert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by `start_i` and also `intervals` still does not have any overlapping intervals. You may merge the overlapping intervals if needed.

Return `intervals` after adding `newInterval`.

Note: Intervals are _non-overlapping_ if they have no common point. For example, `[1,2]` and `[3,4]` are non-overlapping, but `[1,2]` and `[2,3]` are overlapping.

**Example 1**:

```Java
Input: intervals = [[1,3],[4,6]], newInterval = [2,5]

Output: [[1,6]]
```

**Example 2**:

```Java
Input: intervals = [[1,2],[3,5],[9,10]], newInterval = [6,7]

Output: [[1,2],[3,5],[6,7],[9,10]]
```

**Constraints**:

- `0 <= intervals.length <= 1000`
- `newInterval.length == intervals[i].length == 2`
- `0 <= start <= end <= 1000`
