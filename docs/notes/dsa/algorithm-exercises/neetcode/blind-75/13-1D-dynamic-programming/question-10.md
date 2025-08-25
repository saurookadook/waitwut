---
title: 'Neetcode: Longest Increasing Subsequence'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/1D-dynamic-programming/question-10'
sectionSlug: 'notes'
---

## Instructions

Given an integer array `nums`, return the _length_ of the longest strictly _increasing_ subsequence.

A **subsequence** is a sequence that can be derived from the given sequence by deleting some or no elements without changing the relative order of the remaining characters.

- For example, `"cat"` is a subsequence of `"crabt"`.

**Example 1**:

```java
Input: nums = [9,1,4,2,3,3,7]

Output: 4
```

Explanation: The longest increasing subsequence is [1,2,3,7], which has a length of 4.

**Example 2**:

```java
Input: nums = [0,3,1,3,2,3]

Output: 4
```

**Constraints**:

- `1 <= nums.length <= 1000`
- `-1000 <= nums[i] <= 1000`
