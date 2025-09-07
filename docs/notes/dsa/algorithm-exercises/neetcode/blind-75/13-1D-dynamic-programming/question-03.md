---
title: 'Neetcode: House Robber II'
date: '2025-08-23'
fullPath: '/notes/dsa/neetcode/blind-75/1D-dynamic-programming/question-03'
sectionSlug: 'notes'
---

## Instructions

You are given an integer array `nums` where `nums[i]` represents the amount of money the <code>i</code><sup>th</sup> house has. The houses are arranged in a circle, i.e. the first house and the last house are neighbors.

You are planning to rob money from the houses, but you cannot rob **two adjacent houses** because the security system will automatically alert the police if two adjacent houses were _both_ broken into.

Return the _maximum_ amount of money you can rob **without** alerting the police.

**Example 1**:

```java
Input: nums = [3,4,3]

Output: 4
```

Explanation: You cannot rob `nums[0] + nums[2] = 6` because `nums[0]` and `nums[2]` are adjacent houses. The maximum you can rob is `nums[1] = 4`.

**Example 2**:

```java
Input: nums = [2,9,8,3,6]

Output: 15
```

Explanation: You cannot rob `nums[0] + nums[2] + nums[4] = 16` because `nums[0]` and `nums[4]` are adjacent houses. The maximum you can rob is `nums[1] + nums[4] = 15`.

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
        n = len(nums)

        if n == 1:
            return nums[0]

        def depth_first_search(i, flag):
            if i >= n or (flag and i == n - 1):
                return 0

            return max(
                depth_first_search(i + 1, flag),
                nums[i] + depth_first_search(i + 2, flag or i == 0),
            )

        return max(depth_first_search(0, True), depth_first_search(1, False))


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

        if n == 1:
            return nums[0]

        # for each index, store both possibilities for `flag` logic
        dp_table = [[-1] * 2 for _ in range(n)]

        # `flag` is ???
        def depth_first_search(i: int, flag: bool):
            if i >= n or (flag and i == n - 1):
                return 0
            elif dp_table[i][flag] != -1:
                return dp_table[i][flag]

            dp_table[i][flag] = max(
                depth_first_search(i + 1, flag),
                nums[i] + depth_first_search(i + 2, flag or i == 0),
            )
            return dp_table[i][flag]

        return max(depth_first_search(0, True), depth_first_search(1, False))


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
        if len(nums) == 1:
            return nums[0]

        return max(
            self.helper(nums[1:]),  # all but first element
            self.helper(nums[:-1]),  # all but last element
        )

    def helper(self, nums: List[int]) -> int:
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
        return max(
            nums[0],  # only first item
            self.helper(nums[1:]),  # all but first element
            self.helper(nums[:-1]),  # all but last element
        )

    def helper(self, nums: List[int]) -> int:
        rob_1, rob_2 = 0, 0

        for num in nums:
            new_rob = max(num + rob_1, rob_2)
            rob_1 = rob_2
            rob_2 = new_rob

        return rob_2

```
