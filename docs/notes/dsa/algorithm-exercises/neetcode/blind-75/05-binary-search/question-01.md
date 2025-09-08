---
title: 'Neetcode: Find Minimum in Rotated Sorted Array'
date: '2025-08-23'
fullPath: '/notes/dsa/neetcode/blind-75/binary-search/question-01'
sectionSlug: 'notes'
---

## Instructions

You are given an array of length `n` which was originally sorted in ascending order. It has now been **rotated** between `1` and `n` times. For example, the array `nums = [1,2,3,4,5,6]` might become:

- `[3,4,5,6,1,2]` if it was rotated `4` times.
- `[1,2,3,4,5,6]` if it was rotated `6` times.

Notice that rotating the array `4` times moves the last four elements of the array to the beginning. Rotating the array `6` times produces the original array.

Assuming all elements in the rotated sorted array `nums` are **unique**, return the minimum element of this array.

A solution that runs in `O(n)` time is trivial, can you write an algorithm that runs in `O(log n)` time?

**Example 1**:

```java
Input: nums = [3,4,5,6,1,2]

Output: 1
```

**Example 2**:

```java
Input: nums = [4,5,0,1,2,3]

Output: 0
```

**Example 3**:

```java
Input: nums = [4,5,6,7]

Output: 4
```

**Constraints**:

- `1 <= nums.length <= 1000`
- `-1000 <= nums[i] <= 1000`

## Solutions

### Python

```python
from typing import List


class Solution:

    def findMin(self, nums: List[int]) -> int:
        return self.recursive_binary_search(nums)

    def recursive_binary_search(self, nums_slice: List[int]) -> int:
        if len(nums_slice) <= 2:
            return min(nums_slice)

        left_idx = 0
        mid_idx = len(nums_slice) // 2
        right_idx = len(nums_slice) - 1

        if (
            nums_slice[left_idx] < nums_slice[mid_idx]
            and nums_slice[left_idx] < nums_slice[right_idx]
        ):
            right_idx = mid_idx
        elif (
            nums_slice[right_idx] < nums_slice[mid_idx]
            and nums_slice[right_idx] < nums_slice[left_idx]
        ):
            left_idx = mid_idx
        else:
            left_idx += 1

        new_slice = nums_slice[left_idx : right_idx + 1]

        return self.recursive_binary_search(new_slice)


# ============================= 1 =============================
class BruteForceSolution:
    """1. Solution utilizing Brute Force approach

    Time & Space Complexity

    Time complexity:
        `O(n)`
    Space complexity:
        `O(1)`
    """

    def findMin(self, nums: List[int]) -> int:
        return min(nums)


# ============================= 2 =============================
class BinarySearchSolution:
    """2. Solution utilizing Binary Search algorithm

    Time & Space Complexity

    Time complexity:
        `O(log n)`
    Space complexity:
        `O(1)`
    """

    def findMin(self, nums: List[int]) -> int:
        result = nums[0]
        l, r = 0, len(nums) - 1

        while l <= r:
            if nums[l] < nums[r]:
                result = min(result, nums[l])
                break

            m = (l + r) // 2
            result = min(result, nums[m])
            if nums[m] >= nums[l]:
                l = m + 1
            else:
                r = m - 1

        return result


# ============================= 3 =============================
class BinarySearchLowerBoundSolution:
    """3. Solution utilizing Binary Search (lower bound) algorithm

    Time & Space Complexity

    Time complexity:
        `O(log n)`
    Space complexity:
        `O(1)`
    """

    def findMin(self, nums: List[int]) -> int:
        l, r = 0, len(nums) - 1

        while l < r:
            m = l + (r - l) // 2
            if nums[m] < nums[r]:
                r = m
            else:
                l = m + 1

        return nums[l]


```
