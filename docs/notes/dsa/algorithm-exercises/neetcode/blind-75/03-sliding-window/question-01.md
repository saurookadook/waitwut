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

```java
Input: prices = [10,1,5,6,7,1]

Output: 6
```

Explanation: Buy `prices[1]` and sell `prices[4]`, `profit = 7 - 1 = 6`.

**Example 2**:

```java
Input: prices = [10,8,7,5,2]

Output: 0
```

Explanation: No profitable transactions can be made, thus the max profit is `0`.

**Constraints**:

- `1 <= prices.length <= 100`
- `0 <= prices[i] <= 100`

## Solutions

### Python

```python
from typing import List


class Solution:
    """Basically just the Brute Force Solution"""

    def maxProfit(self, prices: List[int]) -> int:
        profit = 0

        for i in range(len(prices) - 1):
            for j in range(i + 1, len(prices)):
                sell_day = prices[j]
                buy_day = prices[i]

                if sell_day - buy_day > profit:
                    profit = sell_day - buy_day

        return profit


# ============================= 1 =============================
class BruteForceSolution:
    """1. Solution utilizing Brute Force Algorithm

    ---- Time & Space Complexity ----

    Time complexity:
        - `O(n^2)`
    Space complexity:
        - `O(1)`
    """

    def maxProfit(self, prices: List[int]) -> int:
        res = 0

        for i in range(len(prices)):
            buy = prices[i]
            for j in range(i + 1, len(prices)):
                sell = prices[j]
                res = max(res, sell - buy)

        return res


# ============================= 2 =============================
class TwoPointersSolution:
    """2. Solution utilizing Two Pointers Algorithm

    ---- Time & Space Complexity ----

    Time complexity:
        - `O(n)`
    Space complexity:
        - `O(1)`
    """

    def maxProfit(self, prices: List[int]) -> int:
        left = 0
        right = 1
        maxP = 0

        while right < len(prices):
            if prices[left] < prices[right]:
                maxP = max(maxP, prices[right] - prices[left])
            else:
                left = right
            right += 1

        return maxP


# ============================= 3 =============================
class DynamicProgrammingSolution:
    """3. Solution utilizing Dynamic Programming Algorithm

    ---- Time & Space Complexity ----

    Time complexity:
        - `O(n)`
    Space complexity:
        - `O(1)`
    """

    def maxProfit(self, prices: List[int]) -> int:
        maxP = 0
        minBuy = prices[0]

        for sell in prices:
            maxP = max(maxP, sell - minBuy)
            minBuy = min(minBuy, sell)

        return maxP

```
