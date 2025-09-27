---
title: 'Mastering Quick Sort: Implementation and Complexity Analysis in Python'
date: '2025-09-24'
fullPath: '/notes/dsa/code-signal/python/course-11/unit-05'
sectionSlug: 'notes'
---

## Intro

**Quick Sort** is generally regarded as one of the fastest and most efficient algorithms for sorting large data sets.

## Conceptual Understanding of Quick Sort

The **Quick Sort** algorithm is notable for its approach to sorting an array — or a Python list. **Quick Sort** begins by selecting a pivot from the provided list, then separates the remaining elements into two groups — those less than the pivot and those greater than it, keeping their order in the initial array. This process is replicated recursively until the entire list is sorted.

For instance, consider a task like sorting books on a shelf alphabetically. You can think of **Quick Sort** as picking one book — let's call it the pivot book. You then move all books that come before it alphabetically to its left and those that come after it to its right. The same process is applied to the group of books on the left and the right of the pivot book continuously until all books are arranged in order.

Let's visualize this with a short list to gain a clearer understanding:

```txt
===============================================================================
Initial List: [9, 7, 5, 11, 12, 2, 14, 3, 10, 6]
===============================================================================

Select 7 as a pivot:
---- [5, 2, 3, 6, 7, 9, 11, 12, 14, 10]
// 5, 2, 3, and 6 have been moved to the left, keeping their initial order

Recursively executing sort for the left sub-array
---- [5, 2, 3, 6]
Selecting 5 as a pivot, moving 2 and 3 to the left as smaller elements:
---- [2, 3, 5, 6]

Recursively executing sort for the right sub-array
---- [9, 11, 12, 14, 10]
Selecting pivot = 9, there are no elements less than 9, so no changes:
---- [9, 11, 12, 14, 10]

Recursively executing sorting for smaller sub-arrays:
---- [2, 3], [6], [], and [11, 12, 14, 10]

...

Eventually, all elements become sorted.
```

## Implementation of Quick Sort in Python

Understanding the theory is excellent, but the understanding becomes profound when we put the theory into practice. Therefore, let's dive in and write the Python code for **Quick Sort**, making it as clear and understandable as possible.

First, we'll define a function named `quick_sort` that will take a list as input and return a sorted version of that list. The elements lesser than the pivot will move to its left, and the elements greater than the pivot will move to its right. Let's translate this into Python code:

```python
def quick_sort(arr):
    if len(arr) <= 1:
        # If the array contains 0 or 1 element, it has been sorted
        return arr

    mid_idx = len(arr) // 2
    pivot = arr[mid_idx]  # select a pivot as a middle element

    left = [x for x in arr if x < pivot]  # elements less than `pivot`
    middle = [x for x in arr if x == pivot]  # elements equal to `pivot`
    right = [x for x in arr if x > pivot]  # elements larger than `pivot`

    return quick_sort(left) + middle + quick_sort(right)


print(quick_sort([9, 7, 5, 11, 12, 2, 14, 3, 10, 6]))
# Outputs: [2, 3, 5, 6, 7, 9, 10, 11, 12, 14]
```

Upon executing the script, the function will return `[2, 3, 5, 6, 7, 9, 10, 11, 12, 14]`, which is a sorted version of the input list. This result aligns with the sorted list we obtained when we manually went through the sorting process.

## Analyzing the Time Complexity of Quick Sort

The time complexity of an algorithm gives us an idea of how the runtime will increase relative to the input size. For **Quick Sort**, the time complexity can be described as <em class="math">O(n * log n)</em> for average and best-case scenarios and <em class="math">O(n<sup>2</sup>)</em> for the worst-case scenario. The worst-case scenario arises when the pivot divides the array predominantly into one large sub-array and one small sub-array instead of equal halves. However, the efficient partitioning scheme ensures the average case is much more likely in practice, making **Quick Sort** one of the most efficient sorting algorithms in practical use.

As a workaround to achieve a higher probability of <em class="math">O(n * log n)</em> complexity, the pivot can be chosen as a random element, not always as a middle one, to make the choice less deterministic:

```python
import random


pivot = arr[random.randint(0, len(arr) - 1)]
```

## Analyzing the Space Complexity of Quick Sort

Space complexity refers to the amount of memory an algorithm needs to complete its run. With **Quick Sort**, the space complexity stems primarily from its recursive nature. Each recursive call requires additional space on the call stack, proportional to the depth of recursion. However, **Quick Sort** averages an excellent space complexity of <em class="math">O(log n)</em>.

It is possible to implement **Quick Sort** without using recursion; in that case, the additional space complexity will be <em class="math">O(1)</em>.

## Discussion of Quick Sort's Practical Applications

Owing to its efficiency, **Quick Sort** is extensively used in real-world applications. In computing sciences, it is commonly employed for tasks like sorting a list of names, sorting a list of numbers, or similar tasks where sorting data is essential. Efficient sorting of data is integral to areas such as database management, resource allocation tasks, and many more scientific computations.

### Examples

```python
# Import required libraries
import random


def partition(arr, low, high):
    # this method partitions arr[low..high] to move all elements <= arr[high] to the left
    # and returns the index of `pivot` in the updated array
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1


def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)


# Generate a list of random numbers between 1 and 100
random_list = random.sample(range(1, 101), 20)
print('Unsorted list:', random_list)

quick_sort(random_list, 0, len(random_list) - 1)
print('Sorted list with Quick Sort:', random_list)
```

```python
import random


# Generate a list of random numbers between 10 and 50
random_list = [random.randint(10, 50) for i in range(15)]
print("Original List: ", random_list)


def partition(arr, low, high):
    # print(" partition call START ".center(120, "="))
    # print("arr: ", arr)
    # print("low: ", low)
    # print("high: ", high)
    pivot = arr[low]
    i = low
    j = high
    done = False
    while not done:
        while i <= j and arr[i] <= pivot:
            i += 1
        while arr[j] >= pivot and j >= i:
            j -= 1
        if j < i:
            done = True
        else:
            arr[i], arr[j] = arr[j], arr[i]
    arr[low], arr[j] = arr[j], arr[low]
    # print(" partition call END ".center(120, "="))
    # print("arr: ", arr)
    # print("low: ", low)
    # print("high: ", high)
    return j


def quick_sort(arr, low, high):
    # print(" partition call START ".center(120, "="))
    # print("arr: ", arr)
    # print("low: ", low)
    # print("high: ", high)
    if low < high:
        split_point = partition(arr, low, high)
        # print(f"{'-' * 8} split_point for ({low},{high}): ", split_point)
        quick_sort(arr, low, split_point - 1)
        quick_sort(arr, split_point + 1, high)


quick_sort(random_list, 0, len(random_list) - 1)
print("List After Quick Sort: ", random_list)

```

```python
import random


def partition_desc(arr, low, high):
    pivot = arr[high]
    i = low - 1

    for j in range(low, high):
        if arr[j] >= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1


def quick_sort_desc(arr, low, high):
    if low < high:
        pivot = partition_desc(arr, low, high)
        quick_sort_desc(arr, low, pivot - 1)
        quick_sort_desc(arr, pivot + 1, high)


# Generate a list of 20 random numbers between 50 and 100
random_numbers = [random.randint(50, 100) for _ in range(20)]
print("Unsorted List: ", random_numbers)

quick_sort_desc(random_numbers, 0, len(random_numbers) - 1)
print("Sorted List: ", random_numbers)
```
