---
title: 'Cracking Advanced Interview Problems with Binary Search'
date: '2025-09-24'
fullPath: '/notes/dsa/code-signal/python/course-11/unit-04'
sectionSlug: 'notes'
---

## Problem 1: Search in a Rotated Sorted Array

Imagine a sorted array of integers that has been rotated at an unknown pivot point. This list maintains its sorted order but now starts from a random position. Your task is to find a specific target value within this array and return its index. If the target isn't present, return `-1`.

For example, the initial sorted array could be `[1, 2, 4, 5, 8, 9, 11, 15]`, but after a single rotation it'd become `[8, 9, 11, 15, 1, 2, 4, 5]`.

**Example Application**: Picture a server system where processes are listed in ascending order based on their IDs. Suppose a disruption rotates this list. Now, the system needs to find a process using a specific ID. A standard **binary search** isn't sufficient as the list, though sorted, starts at an arbitrary point.

**Naive Approach**: A straightforward solution involves scanning each element in the array until we find a match or exhaust the list. This linear search approach is simple but computationally expensive for large lists - its time complexity is <em class="math">O(n)</em>.

### Problem 1: Efficient Approach

Instead of linear search, **binary search** can provide a faster solution with a logarithmic time complexity of <em class="math">O(log n)</em>. This approach narrows down the search space by half at each step. The challenge in this case, caused by the array rotation, is determining which half of the list to contract at each step.

Defining the search area borders with `left` and `right` pointers (both inclusive, i.e. the `[left, right]` interval), we calculate and examine the midpoint. If the midpoint equals our target - success! However, if not, we have four scenarios for updating `left` and `right` pointers to narrow down the search space:

- Midpoint value is equal to the target - our job is done, return the midpoint.
- Both the target and midpoint are in the first half of the array (before the rotation point) - the target lies within the left half (from `left` to `mid - 1`).
  - To check whether both the target and midpoint lie in the first half, we check that `nums[left] <= nums[mid]` and `nums[left] <= target < nums[mid]`.
- The target and midpoint are in the second half (after the rotation point) - the target lies within the right half (`mid + 1` to `right`).
  - To check whether both the target and midpoint lie in the second half, we check that `nums[mid] <= nums[right]` and `nums[mid] < target <= nums[right]`.
- The midpoint falls into the first half while the target is in the second half - the target is located in the right half.
  - To check whether the midpoint falls into the first half and the target falls into the second half, we check that `nums[mid] > nums[right]` (the target can't fall into the first half anymore, as this scenario is covered in case 3).
- Otherwise, the midpoint falls into the second half, and the target lies in the first - our target should be in the left half.

```python
def search_rotated(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid

        if nums[left] <= nums[mid] and nums[left] <= target < nums[mid]:
            right = mid - 1
        elif nums[mid] <= nums[right] and nums[mid] < target <= nums[right]:
            left = mid + 1
        elif nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid - 1

    return -1

```

## Problem 2: Locate the First and Last Position of an Element in a Sorted Array

In this problem, you are tasked with finding both the first and last positions of a certain target value in a sorted array. If the target is not found within the array, your function should return `[-1, -1]`.

**Example Application**: To make this problem more relatable, picture a situation involving time-series analysis. For instance, you have a sorted array filled with timestamps of user activities. A user could perform the same activity multiple times, and your task is to determine the first and last instance that a particular activity was performed.

**Simplistic Approach**: An immediate solution could involve scanning the entire array while taking note of the first and last appearances of the target. Although this method is sound and would yield the correct result, it is far from efficient. This linear search approach could result in a worst-case time complexity of <em class="math">O(n)</em>.

### Problem 2: Efficient Approach

A more efficient technique utilizes **Binary Search** to find both ends of the target presence. It essentially involves two separate runs of **Binary Search** — the first one locates the initial occurrence of the target, and the second finds the final occurrence. Each of these **binary searches** operates in <em class="math">O(log n)</em> time, delivering a significantly more efficient solution.

To instantiate this solution, we create a helper function that carries out a specific type of **binary search**.

- When searching for the _first instance_, if our midpoint is the same as or higher than our target, we focus on the array's left half.
- Contrastingly, for the _last instance_, if the midpoint is lower than our target, our attention turns to the right half.

```python



def get_first_last_pos(nums, target)
    def binary_search(left, right, find_first):
        if left <= right:
            mid = (left + right) // 2
            if nums[mid] > target or (find_first and target == nums[mid]):
                return binary_search(left, mid - 1, find_first)
            else:
                return binary_search(mid + 1, right, find_first)
        return left if find_first else left - 1

    last_index = len(nums) - 1
    first_occurrence = binary_search(0, last_index, True)
    last_occurrence = binary_search(first_occurrence, last_index, False)  # Alternatively, could start from `0`

    if first_occurrence <= last_occurrence:
        return [first_occurrence, last_occurrence]
    else:
        return [-1, -1]

```

This function optimally utilizes binary search to locate the first and last appearance of a value in a sorted array.

> **Note**: The implementation could be a little bit easier if we make it in two steps:
>
> - Find the largest index `left` such that `nums[left] < target` - that would be the index before the first occurrence of `target`.
> - Find the largest index `right` such that `nums[left] <= target` - that would be the last occurrence of `target`.
>
> The leftmost occurrence of `target` in that case will be left + 1, and the rightmost - right. Can you manage to implement this alternative approach yourself?

```python
# TODO
```

## Problem 3: Find or Define Insert Position in a Sorted List

Our task is to find or determine the index where a target should be inserted in a sorted integer list. Visualize a librarian's task of adding a new book to a properly arranged shelf. We'll do a similar thing but with numbers in a sorted list.

**Example Application**: To give this problem real-world relevance, picture a document management system where reports are sorted based on their IDs. Suppose a new report comes in, and it has to be placed in the correct position based on its ID. Here, our task mirrors the system's behavior - placing a number correctly in a sorted list.

**Simplistic Approach**: A basic solution might involve a left-to-right scan of the array, comparing each element with the target until we encounter an element that matches the target (where we return the index), or one that's larger (where we return the current index as that's the insertion point of our target). This approach, however, is inefficient as it demands a full scan of the array in worst-case scenarios (when the target is larger than every existing item). This results in a linear time complexity of <em class="math">O(n)</em>, undesirable for gargantuan arrays.

### Problem 3: Efficient Approach

The optimal solution to this problem lies in a modified binary search, which is beneficial due to the sorted nature of our array. Binary search operates by continuously dividing our search space until the target is located or the optimal insertion point is determined.

We use the interval `[left, right)` with `right` being excluded. Within this interval, we repeatedly calculate the mid (`mid`) index. If the target is equal to the mid element, we have our position, and we return `mid`. If the target is larger, it is destined for the right half, so we update `left` to `mid`, switching to the interval `[mid, right)`. Conversely, if the target is smaller, it is destined for the left half, so we update `right` to `mid` (switching to the range `[left, mid)`).

The process repeats as long as `right - left` is greater than 1, indicating the position where our target should be inserted.

```python
def binary_search_insert(nums, target):
    nums.append(float('inf'))  # append an infinite number element to handle edge case
    left, right = 0, len(nums)

    while right - left > 1:
        mid = (left + right) // 2
        if nums[mid] <= target:
            left = mid
        else:
            right = mid

    return left

```

This modified binary search function returns our desired result in a fast and efficient manner. It determines the optimal position for a value in a sorted array, whether or not the value is present in the array.

## Examples

### Example 1: Searching sorted descending rotated array

```python
def search_dec_rotated(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid

        if nums[left] >= nums[mid] and nums[left] >= target > nums[mid]:
            right = mid - 1
        elif nums[mid] >= nums[right] and nums[mid] > target >= nums[right]:
            left = mid + 1
        elif nums[mid] < nums[right]:
            left = mid + 1
        else:
            right = mid - 1

    return -1


print(search_dec_rotated([4, 3, 2, 1, 8, 7, 6, 5], 1))  # Expected output: 3
print(search_dec_rotated([9, 8, 7, 6, 5, 4, 3, 2, 1], 4))  # Expected output: 5
print(search_dec_rotated([5, 4, 3, 2, 1], 8))  # Expected output: -1

```
