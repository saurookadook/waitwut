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

```Java
Input: intervals = [[1,2],[2,4],[1,4]]

Output: 1
```

Explanation: After [1,4] is removed, the rest of the intervals are non-overlapping.

**Example 2**:

```Java
Input: intervals = [[1,2],[2,4]]

Output: 0
```

**Constraints**:

- `1 <= intervals.length <= 1000`
- `intervals[i].length == 2`
- `-50000 <= starti < endi <= 50000`
