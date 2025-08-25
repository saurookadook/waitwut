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
