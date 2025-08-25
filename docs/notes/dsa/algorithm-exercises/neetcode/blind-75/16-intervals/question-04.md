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
