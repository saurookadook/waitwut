---
title: 'Neetcode: Jump Game'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/greedy/question-02'
sectionSlug: 'notes'
---

## Instructions

You are given an integer array `nums` where each element `nums[i]` indicates your maximum jump length at that position.

Return `true` if you can reach the last index starting from index `0`, or `false` otherwise.

**Example 1**:

```Java
Input: nums = [1,2,0,1,0]

Output: true
```

Explanation: First jump from index 0 to 1, then from index 1 to 3, and lastly from index 3 to 4.

**Example 2**:

```Java
Input: nums = [1,2,1,0,1]

Output: false
```

**Constraints**:

- `1 <= nums.length <= 1000`
- `0 <= nums[i] <= 1000`
