---
title: 'Mastering Binary Search: Implementation and Complexity Analysis in Python'
date: '2025-09-23'
fullPath: '/notes/dsa/code-signal/python/course-11/unit-02'
sectionSlug: 'notes'
---

## Overview

**Binary search** is a powerful searching technique that operates seamlessly on _sorted arrays_.

Drawing a parallel with everyday life, **binary search** resembles the process of finding a word in a dictionary. Instead of skimming through every page, we open the dictionary around the middle and compare our words. If our word is in the left half, we discard the right half, and vice versa. This halving process continues until we find our word — essentially, this is a **binary search**.

### Understanding Binary Search

**Binary Search** is a search algorithm operating on a sorted list or array. The strategy employed by **Binary Search** is similar to the process of searching for a name in a telephone directory or a word in the dictionary - you open the book in the middle and determine whether the name or word you're looking for can be found in the left (first half) or the right part (second half). If the name or word you're searching for is smaller than the one in the middle, you continue your search only in the left half. However, if it's larger, you narrow down your search to the right half. This method is iteratively repeated, reducing the search space by half each time, thereby making this search operation highly effective.

In Python terms, imagine you have a sorted list of numbers as: `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`, and you've been tasked with determining if the number 3 is present in the list. With **Binary Search**, it directly jumps to the middle. If the number is equal to the middle element, our search is complete. But if the number is smaller than the middle element, **Binary Search** discards the second half of the list and continues the search only on the first half. This process is repeated until the number is found.

### Binary Search Algorithm

**Binary search** uses a divide-and-conquer approach to find a specific element in a list. Regarding time complexity, this algorithm accomplishes the task in the order of<em class="math">O(log n)</em>, making it a preferable choice for large datasets.

The steps involved in the **binary search** algorithm are as follows:

1. Calculate the middle index of the list. This can be easily done by adding the lowest index and the highest index and dividing the sum by 2.
2. If the middle element is greater than the target, the target must be in the left half of the list. Discard the right partition and rerun the process on the left half.
3. If the middle element is less than the target, discard the left half of the list and continue searching the right half.
4. Repeat these steps until the length of the search interval becomes less than or equal to 1.
5. Once finished, check if `data[left]` equals `target`
    - if yes, we found the target element
    - if not - target doesn't exist in the data array

### Implementation of Binary Search in Python

To translate **binary search** into Python code, devise a function that takes in the sorted list and the target element. Start by establishing the boundaries of your search. Then, repeatedly halve the list until either the element is found or the list is exhausted. Let's implement **binary search** iteratively in Python:

```python
def binary_search_iterative(data, target):
    # We will search in the interval [low, high), where the right border is excluded
    low = 0
    high = len(data)

    while high - low > 1:  # search until the length of the interval > 1
        mid = (low + high) // 2
        if target < data[mid]:
            high = mid  # Continue our search in [low, mid)
        else:
            low = mid  # Continue our search in [mid, high)
    return low if data[low] == target else None


```

In this function, the index of the target in the sorted list is returned. If the target is not found, the function returns `None`.

Similarly, we can implement **binary search** using recursion — a function that calls itself until a base case is met.

```python
def binary_search_recursive(data, target, low, high):
    if high - low <= 1:
        return low if data[low] == target else None
    mid = (low + high) // 2
    if target < data[mid]:
        return binary_search_recursive(data, target, low, mid)
    else:
        return binary_search_recursive(data, target, mid, high)

```

In the recursive version, the while loop is replaced by recursive calls to the function itself. The algorithm remains the same: find the middle, compare it with the target, and determine the next step.

### Analyzing Binary Search Complexity

**Binary search** has excellent performance when it comes to time complexity - <em class="math">O(log n)</em>. This logarithmic time behavior makes **binary search** ideal for large datasets. This is because, with each comparison, **binary search** eliminates half of the elements, reducing the search time exponentially.

Regarding space complexity, the iterative version of **binary search** has a space complexity of <em class="math">O(1)</em> as it only uses a fixed amount of space to store the data. However, the recursive version has higher space complexity — <em class="math">O(log n)</em> — since it uses additional space in the form of a call stack during recursive tasks.

#### Bonus Exercise: Binary Search to Solve an Advanced Problem

With a clear understanding of **binary search**, we can now use it to solve a complex problem — searching for a target element in a rotated sorted list. This involves figuring out the rotation point and applying **binary search** accordingly.

Consider a list like this `[7, 8, 9, 2, 3, 4]`. This list was sorted from `2` to `9`, but then it was rotated to the fourth position. Suppose we want to search for the number `3`. We can see that it's in the latter half, but how does our algorithm determine this?

As a bonus exercise, try to apply **binary search** to solve this question! We will cover the analysis of this question in the next lessons.
