---
title: 'Neetcode: Longest Consecutive Sequence'
date: '2025-08-23'
fullPath: '/notes/dsa/neetcode/blind-75/arrays-and-hashing/question-08'
sectionSlug: 'notes'
---

## Instructions

Given an array of integers `nums`, return _the length_ of the longest consecutive sequence of elements that can be formed.

A _consecutive_ sequence is a sequence of elements in which each element is exactly `1` greater than the previous element. The elements do _not_ have to be consecutive in the original array.

You must write an algorithm that runs in `O(n)` time.

**Example 1**:

```java
Input: nums = [2,20,4,10,3,4,5]

Output: 4
```

Explanation: The longest consecutive sequence is `[2, 3, 4, 5]`.

**Example 2**:

```java
Input: nums = [0,3,2,5,4,6,1,1]

Output: 7
```

**Constraints**:

- `0 <= nums.length <= 1000`
- `-10^9 <= nums[i] <= 10^9`
