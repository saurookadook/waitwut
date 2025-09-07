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

```java
Input: nums = [1,1,3,3]

Output: 4
```

Explanation: `nums[0] + nums[2] = 1 + 3 = 4`

**Example 2**:

```java
Input: nums = [2,9,8,3,6]

Output: 16
```

Explanation: `nums[0] + nums[2] + nums[4] = 2 + 8 + 6 = 16`

**Constraints**:

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 100`

## Solutions

### Python

```python
from typing import List


# ============================= 1 =============================
class RecursiveSolution:
    """1. Solution utilizing Recursion

    Time & Space Complexity

    Time complexity:
        `O(2^n)`
    Space complexity:
        `O(n)`
    """

    def rob(self, nums: List[int]) -> int:

        def depth_first_search(i):
            if i >= len(nums):
                return 0

            return max(
                depth_first_search(i + 1),
                nums[i] + depth_first_search(i + 2),
            )

        return depth_first_search(0)


# ============================= 2 =============================
class DynamicProgrammingTopDownSolution:
    """2. Solution utilizing Dynamic Programming (top-down)

    Time & Space Complexity

    Time complexity:
        `O(n)`
    Space complexity:
        `O(n)`
    """

    def rob(self, nums: List[int]) -> int:
        n = len(nums)
        memo = [-1] * n

        def depth_first_search(i):
            if i >= n:
                return 0
            elif memo[i] != -1:
                return memo[i]

            memo[i] = max(
                depth_first_search(i + 1),
                nums[i] + depth_first_search(i + 2),
            )
            return memo[i]

        return depth_first_search(0)


# ============================= 3 =============================
class DynamicProgrammingBottomUpSolution:
    """3. Solution utilizing Dynamic Programming (bottom-up)

    Time & Space Complexity

    Time complexity:
        `O(n)`
    Space complexity:
        `O(n)`
    """

    def rob(self, nums: List[int]) -> int:
        if not nums:
            return 0

        n = len(nums)

        if n == 1:
            return nums[0]

        dp_table = [0] * n
        dp_table[0] = nums[0]
        dp_table[1] = max(nums[0], nums[1])

        for i in range(2, n):
            dp_table[i] = max(dp_table[i - 1], nums[i] + dp_table[i - 2])

        return dp_table[-1]

    def rob_with_indices(nums):
        n = len(nums)
        if n == 0:
            return 0, []

        if n == 1:
            return nums[0], [0]

        # dp[i] = max money we can rob from 0..i
        dp_table = [0] * n
        dp_table[0] = nums[0]
        dp_table[1] = max(nums[0], nums[1])

        for i in range(2, n):
            dp_table[i] = max(dp_table[i-1], nums[i] + dp_table[i-2])

        # Backtrack to find which houses were robbed
        robbed_indices = []
        i = n - 1
        while i >= 0:
            if i == 0:
                robbed_indices.append(0)
                break
            if dp_table[i] == dp_table[i-1]:
                # House i not robbed
                i -= 1
            else:
                # House i robbed
                robbed_indices.append(i)
                i -= 2

        robbed_indices.reverse()
        return dp_table[-1], robbed_indices


# ============================= 4 =============================
class DynamicProgrammingSpaceOptimizedSolution:
    """4. Solution utilizing Dynamic Programming (space-optimized)

    Time & Space Complexity

    Time complexity:
        `O(n)`
    Space complexity:
        `O(1)`
    """

    def rob(self, nums: List[int]) -> int:
        rob_1, rob_2 = 0, 0

        for num in nums:
            step = max(num + rob_1, rob_2)
            rob_1 = rob_2
            rob_2 = step

        return rob_2

```

## Explanations

### Dynamic Programming Bottom-Up

For given case:

```python
nums = [5,1,2,10,6,2,7,9,3,1]
```

**Step 1**: build the dynamic programming table

```python
# where `dp` is the 'dynamic programming table'
i=0: dp[0] = 5
i=1: dp[1] = max(5,1) = 5
i=2: dp[2] = max(dp[1], nums[2] + dp[0]) = max(5, 2+5) = 7
i=3: dp[3] = max(dp[2], nums[3] + dp[1]) = max(7, 10+5) = 15
i=4: dp[4] = max(dp[3], nums[4] + dp[2]) = max(15, 6+7) = 15
i=5: dp[5] = max(dp[4], nums[5] + dp[3]) = max(15, 2+15) = 17
i=6: dp[6] = max(dp[5], nums[6] + dp[4]) = max(17, 7+15) = 22
i=7: dp[7] = max(dp[6], nums[7] + dp[5]) = max(22, 9+17) = 26
i=8: dp[8] = max(dp[7], nums[8] + dp[6]) = max(26, 3+22) = 26
i=9: dp[9] = max(dp[8], nums[9] + dp[7]) = max(26, 1+26) = 27
```

**Step 2**: Reconstruct which houses were robbed.

Backtrack from result, `27`.

```txt
-> dp[9] = 27 = (nums[9] + dp[7], 1 + 26)
-> dp[7] = 26 = (nums[7] + dp[5], 9 + 17)
-> dp[5] = 17 = (nums[5] + dp[3], 2 + 15)
-> dp[3] = 15 = (nums[3] + dp[1], 10 + 5)
-> dp[1] = 5 = (nums[0], 5)
```

**Step 3**: Collect indices and values

Robbed houses are:

- index `0` -> value `5`
- index `3` -> value `10`
- index `5` -> value `2`
- index `7` -> value `9`
- index `9` -> value `1`

Max Money = `5 + 10 + 2 + 9 + 1 = 27`
