---
title: 'Neetcode: Search in Rotated Sorted Array'
date: '2025-08-23'
fullPath: '/notes/dsa/neetcode/blind-75/binary-search/question-02'
sectionSlug: 'notes'
---

## Instructions

You are given an array of length `n` which was originally sorted in ascending order. It has now been **rotated** between `1` and `n` times. For example, the array `nums = [1,2,3,4,5,6]` might become:

- `[3,4,5,6,1,2]` if it was rotated `4` times.
- `[1,2,3,4,5,6]` if it was rotated `6` times.

Given the rotated sorted array `nums` and an integer `target`, return the index of `target` within `nums`, or `-1` if it is not present.

You may assume all elements in the sorted rotated array `nums` are **unique**.

A solution that runs in `O(n)` time is trivial, can you write an algorithm that runs in `O(log n)` time?

**Example 1**:

```java
Input: nums = [3,4,5,6,1,2], target = 1

Output: 4
```

**Example 2**:

```java
Input: nums = [3,5,6,0,1,2], target = 4

Output: -1
```

**Constraints**:

- `1 <= nums.length <= 1000`
- `-1000 <= nums[i] <= 1000`
- `-1000 <= target <= 1000`

---

## Python

### Solutions

```python
from typing import List


# `l = m + 1` : shift search window right
# `r = m - 1` : shift search window left
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        # return self.solution_1(nums, target)
        return self.solution_2(nums, target)

    def solution_1(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1

        while l <= r:
            m = (l + r) // 2

            if nums[l] == target:
                return l
            elif nums[r] == target:
                return r
            elif nums[m] == target:
                return m

            if nums[l] < target and target < nums[m]:
                r = m - 1
            else:
                l = m + 1

        return -1

    def solution_2(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1

        while l <= r:
            m = (l + r) // 2

            if nums[l] == target:
                return l
            elif nums[r] == target:
                return r
            elif nums[m] == target:
                return m

            # is left half not rotated
            if nums[l] <= nums[m]:
                # is in left side
                if nums[l] > target or target > nums[m]:
                    l = m + 1
                else:
                    r = m - 1
            else:
                # is in right side
                if nums[m] > target or target > nums[r]:
                    r = m - 1
                else:
                    l = m + 1

        return -1


# ============================= 1 =============================
class BruteForceSolution:
    """1. Solution utilizing Brute Force approach

    Time & Space Complexity

    Time complexity:
        `O(n)`
    Space complexity:
        `O(1)`
    """

    def search(self, nums: List[int], target: int) -> int:
        for i in range(len(nums)):
            if nums[i] == target:
                return i

        return -1


# ============================= 2 =============================
class BinarySearchSolution:
    """2. Solution utilizing Binary Search algorithm

    Time & Space Complexity

    Time complexity:
        `O(log n)`
    Space complexity:
        `O(1)`
    """

    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1

        while l < r:
            m = (l + r) // 2
            if nums[m] > nums[r]:
                l = m + 1
            else:
                r = m

        pivot = l

        def binary_search(left: int, right: int) -> int:
            while left <= right:
                mid = (left + right) // 2
                if nums[mid] == target:
                    return mid
                elif nums[mid] < target:
                    left = mid + 1
                else:
                    right = mid - 1
            return -1

        result = binary_search(0, pivot - 1)
        if result != -1:
            return result

        return binary_search(pivot, len(nums) - 1)


# ============================= 3 =============================
class BinarySearchTwoPassSolution:
    """3. Solution utilizing Binary Search (Two Pass) algorithm

    Time & Space Complexity

    Time complexity:
        `O(log n)`
    Space complexity:
        `O(1)`
    """

    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1

        while l < r:
            m = (l + r) // 2
            if nums[m] > nums[r]:
                l = m + 1
            else:
                r = m

        pivot = l
        l, r = 0, len(nums) - 1

        if target >= nums[pivot] and target <= nums[r]:
            l = pivot
        else:
            r = pivot - 1

        while l <= r:
            m = (l + r) // 2
            if nums[m] == target:
                return m
            elif nums[m] < target:
                l = m + 1
            else:
                r = m - 1

        return -1


# ============================= 4 =============================
class BinarySearchOnePassSolution:
    """4. Solution utilizing Binary Search (One Pass) algorithm

    Time & Space Complexity

    Time complexity:
        `O(log n)`
    Space complexity:
        `O(1)`
    """

    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1

        while l <= r:
            m = (l + r) // 2

            if target == nums[m]:
                return m

            if nums[l] <= nums[m]:
                if nums[l] > target or target > nums[m]:
                    l = m + 1
                else:
                    r = m - 1
            else:
                if nums[m] > target or target > nums[r]:
                    r = m - 1
                else:
                    l = m + 1

        return -1

```
