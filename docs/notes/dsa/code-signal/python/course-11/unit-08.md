---
title: 'Unraveling Advanced Sorting Algorithm Applications: K-th Ordinal Statistics and Inversion Counting'
date: '2025-09-24'
fullPath: '/notes/dsa/code-signal/python/course-11/unit-08'
sectionSlug: 'notes'
---

## Problem 1: Find the K-th Ordinal Statistic in a List

Our first problem presents a list of integers and the number `k`. The challenge put forth is to find the `k`-th smallest element in that given list. To further elucidate, `k` starts from `1`, so for `k = 1`, you are seeking to find the smallest element; if `k = 2`, you're searching for the second smallest element, and so on.

### Problem 1: Problem Actualization

Such a task can often arise in real-life contexts. Picture yourself as a data analyst working with a healthcare dataset that comprises numerous individual health records. Among these records are the patients' ages, and you're tasked with identifying the _middle-aged_ patient, or the _"median age"_. For an odd-numbered dataset, the median is the `k`-th ordinal statistic, where `k` is at the midpoint of the dataset length. Hence, developing skills to solve this problem can yield direct solutions when tasked with finding a median or any other ordinal statistic in authentic datasets.

### Problem 1: Naive Approaches

A primary instinctive solution could involve iteratively identifying and discarding the smallest element from the list until you reach the `k`-th smallest element. While it sounds straightforward, this approach, unfortunately, incurs high time complexity due to the repetitive scans of the list to locate the smallest element. This solution has a <em class="">O(n<sup>2</sup>)</em> complexity.

Another very simple solution is just to sort the input array and return the `k`-th element:

```python
return sorted(input_array)[k]
```

This approach has <em class="math">O(n * log n)</em> complexity and is as simple as just one line of code. However, it's still not the most efficient approach, as there is an <em class="math">O(n)</em> solution to this problem, using **Quick Sort** techniques that we covered earlier in this course.

### Problem 1: Efficient Approach Explanation

Sorting steps in here to offer an efficient solution! The **Quick Sort** algorithm, a splendid application of divide and conquer, can be used to solve this problem more efficiently. By selecting the right pivot for partitioning, the input list is divided into two: a left partition, which contains elements less than the pivot, and a right partition, which contains elements greater than the pivot.

Now, if the pivot's position after elements repartition is the same as `k`, we have the `k`-th smallest element. If `k` is less than the pivot's position, the task is carried forward on the left partition; otherwise, on the right partition.

### Problem 1: Solution Building

```python
import random


def partition(nums, l_idx, r_idx):
    # Choosing random index to make the algorithm less deterministic
    rand_idx = random.randint(l_idx, r_idx)
    nums[l_idx], nums[rand_idx] = nums[rand_idx], nums[l_idx]
    pivot_idx = l_idx

    for i in range(l_idx + 1, r_idx + 1):
        if nums[i] <= nums[l_idx]:
            pivot_idx += 1
            nums[i], nums[pivot_idx] = nums[pivot_idx], nums[i]
    nums[pivot_idx], nums[l_idx] = nums[l_idx], nums[pivot_idx]
    return pivot_idx


def find_kth_smallest(numbers, k):
    if numbers:
        pos = partition(numbers, 0, len(numbers) - 1)

        if k - 1 == pos:
            # The pivot is the k-th element after partitioning
            return numbers[pos]
        elif k - 1 < pos:
            # The pivot index after partitioning is larger than k
            # We'll keep searching in the left part
            return find_kth_smallest(numbers[:pos], k)
        else:
            # The pivot index after partitioning is smaller than k
            # We'll keep searching in the right part
            return find_kth_smallest(numbers[pos + 1:], k - pos - 1)

```

## Problem 2: Count the Number of Inversions in a List

Our second problem entails a list of integers, and your task is to deduce the number of inversions in the list.

An inversion is a pair of elements where the larger element appears before the smaller one. In other words, if we have two indices `i` and `j`, where `i < j` and the element at position `i` is greater than the element at position `j` (`numbers[i] > numbers[j]`), we have an inversion.

For example, for `numbers = [4, 2, 1, 3]`, there are four inversions: `(4, 2)`, `(4, 1)`, `(4, 3)`, and `(2, 1)`.

### Problem 2: Problem Actualization

The _counting inversions_ problem intertwines with digital signal management and data analysis. For instance, in the era of smart playlists on music streaming platforms like Spotify, inversion counting is utilized to curate personalized playlists.

### Problem 2: Naive Approach

A rudimentary approach consists of a double loop, which leads to a time complexity of <em class="">O(n<sup>2</sup>)</em>, an inefficient allocation of computational resources for larger lists.

### Problem 2: Efficient Approach Explanation

In our quest for efficiency, the **Merge Sort** algorithm comes into play. At its core, **Merge Sort** is a divide-and-conquer-based sorting algorithm, providing an optimal efficiency of <em class="math">O(n \* log n)</em>. However, we can cleverly modify this algorithm to also count the number of inversions in the array while sorting it. This additional functionality doesn't impact the time complexity, and therefore, it still remains <em class="math">O(n \* log n)</em>. So, how does this work?

The process starts by dividing the array into two halves, similar to how **Merge Sort** operates. Then, we recursively sort both halves of the array and merge them back. Here comes the twist in the tale: while merging these sorted halves, we add some additional counting logic to keep track of inversions.

As the halves are already sorted, if an element of the right half is smaller than an element of the left half, it's inversion. This is because the element from the right half should have been after 'all' the remaining elements of the left half in a sorted array. Thus, we don't just have a single inversion here, we have as many inversions as there are remaining elements in the left half.

By counting these inversions at each merge and adding them up, we get the total number of inversions in the array.

### Problem 2: Solution Building

```python
def merge_count_inversion(x, y):
    count = 0
    i, j = 0, 0
    merged = []

    while i < len(x) and j < len(y):
        if x[i] <= y[j]:
            merged.append(x[i])
            i += 1
        else:
            merged.append(y[j])
            j += 1
            # Here, we update the number of inversions
            # Every element from x[i:] and y[i] forms an inversion
            count += len(x) - i

    merged += x[i:]
    merged += y[j:]
    return merged, count


def count_inversions(arr):
    # The code is very similar to the merge_sort implementation
    # The main difference lies in the merge_count_inversions function
    if len(arr) <= 1:
        return arr, 0

    middle = len(arr) // 2
    left, a = count_inversions(arr[:middle])
    right, b = count_inversions(arr[middle:])
    result, c = merge_count_inversions(left, right)
    return result, (a + b + c)

```

## Examples

### Example 1

Suppose you've got a list of integers, and you're hunting for the `k`-th largest cosmic gem — I mean integer — in that list. Now, remember, we're space-trotters, so when we say `k = 1`, we're looking for the largest gem. For `k = 2`, we're after the second largest, and so forth.

Your mission, should you choose to accept it, is to accept two parameters: the list of integers and the index `k`. The list may contain duplicates, and `k` will always be between 1 and the size of the list.

Your output should be the `k`-th largest value.

```python
import random


def partition(nums, l_idx, r_idx):
    rand_idx = random.randint(l_idx, r_idx)
    nums[l_idx], nums[rand_idx] = nums[rand_idx], nums[l_idx]
    pivot_idx = l_idx

    for i in range(l_idx + 1, r_idx + 1):
        if nums[i] >= nums[l_idx]:
            pivot_idx += 1
            nums[i], nums[pivot_idx] = nums[pivot_idx], nums[i]

    nums[pivot_idx], nums[l_idx] = nums[l_idx], nums[pivot_idx]
    return pivot_idx


def find_kth_largest(numbers, k):
    if not numbers:
        return None

    pos = partition(numbers, 0, len(numbers) - 1)

    if k - 1 == pos:
        return numbers[pos]
    elif k - 1 > pos:
        return find_kth_largest(numbers[pos + 1:], k - pos - 1)
    else:
        return find_kth_largest(numbers[:pos], k)


print(find_kth_largest([3, 2, 1, 5, 6, 4], 2))  # Expected output: 5
print(find_kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4))  # Expected output: 4
```

### Example 2

Imagine this - you are surveying a list of whole numbers (it could be any integer between − <em class="math">−10<sup>9</sup></em> and <em class="math">10<sup>9</sup></em>).

Here's the twist: your task is to count anti-inversion pairs. More specifically, the anti-inversion is a pair of indices `(i,j)` that fulfill the specific condition: `i < j` and `nums[i] < nums[j]`.

Consider both the positive and negative numbers as well as repetitions, and keep in mind: your list could be as small as 1 number or as large as <em class="math">10<sup>5</sup></em> numbers!

Cook up a function that takes this list as an input and returns the total count of such inversion pairs.

```python
def merge_count_anti_inversions(x, y):
    count = 0
    i, j = 0, 0
    merged = []

    while i < len(x) and j < len(y):
        if x[i] >= y[j]:
            merged.append(x[i])
            i += 1
        else:
            merged.append(y[j])
            j += 1
            count += len(x) - i

    merged.extend(x[i:])
    merged.extend(y[j:])
    return merged, count


def count_anti_inversions(arr):
    if len(arr) <= 1:
        return arr, 0

    mid = len(arr) // 2
    left, a = count_anti_inversions(arr[:mid])
    right, b = count_anti_inversions(arr[mid:])
    result, c = merge_count_anti_inversions(left, right)
    return result, (a + b + c)


# Testing the function
test_array = [2, 4, 1, 3, 5]
_, inv_count = count_anti_inversions(test_array)
print(f'Number of anti-inversions in {test_array} is {inv_count}')  # Expected Output: 7
```
