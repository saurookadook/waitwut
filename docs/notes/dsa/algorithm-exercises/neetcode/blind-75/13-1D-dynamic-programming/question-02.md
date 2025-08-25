---
title: 'Neetcode: House Robber'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/1D-dynamic-programming/question-02'
sectionSlug: 'notes'
---

## Instructions

You are given an integer array `nums` where `nums[i]` represents the amount of money the <code>i</code><sup>th</sup> house has. The houses are arranged in a straight line, i.e. the <code>i</code><sup>th</sup> house is the neighbor of the <code>(i-1)</code><sup>th</sup> and <code>(i+1)</code><sup>th</sup> house.

You are planning to rob money from the houses, but you cannot rob **two adjacent houses** because the security system will automatically alert the police if two adjacent houses were _both_ broken into.

Return the _maximum_ amount of money you can rob **without** alerting the police.

**Example 1**:

```Java
Input: nums = [1,1,3,3]

Output: 4
```

Explanation: `nums[0] + nums[2] = 1 + 3 = 4`

**Example 2**:

```Java
Input: nums = [2,9,8,3,6]

Output: 16
```

Explanation: `nums[0] + nums[2] + nums[4] = 2 + 8 + 6 = 16`

**Constraints**:

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 100`
