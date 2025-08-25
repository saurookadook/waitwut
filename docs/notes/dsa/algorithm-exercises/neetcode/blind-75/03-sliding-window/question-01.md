---
title: 'Neetcode: Best Time to Buy and Sell Stock'
date: '2025-08-23'
fullPath: '/notes/dsa/neetcode/blind-75/sliding-window/question-01'
sectionSlug: 'notes'
---

## Instructions

You are given an integer array `prices` where `prices[i]` is the price of NeetCoin on the <code><em>i<sup>th</sup></em></code> day.

You may choose a **single day** to buy one NeetCoin and choose a **different day in the future** to sell it.

Return the maximum profit you can achieve. You may choose to **not make any transactions**, in which case the profit would be `0`.

**Example 1**:

```Java
Input: prices = [10,1,5,6,7,1]

Output: 6
```

Explanation: Buy `prices[1]` and sell `prices[4]`, `profit = 7 - 1 = 6`.

**Example 2**:

```Java
Input: prices = [10,8,7,5,2]

Output: 0
```

Explanation: No profitable transactions can be made, thus the max profit is `0`.

**Constraints**:

- `1 <= prices.length <= 100`
- `0 <= prices[i] <= 100`
