---
title: 'Mastering Merge Sort: Implementation and Complexity Analysis in Python'
date: '2025-09-24'
fullPath: '/notes/dsa/code-signal/python/course-11/unit-05'
sectionSlug: 'notes'
---

## Intro

**Merge Sort** exemplifies an efficient method of sorting information. Imagine receiving an unorganized deck of cards and needing to shuffle them perfectly in a specific order. **Merge Sort** operates in a similar way.

## Understanding Merge Sort

**Merge Sort** is a reliable, stable algorithm that employs the **Divide and Conquer strategy**. It does that by:

- splitting an unsorted list into two sublists
- recursively sorting each of them
- then merging these sorted sublists to create a sorted list

To put it in real-world terms, suppose you have a shuffled deck of playing cards and want to sort it. One approach is to divide the deck into two, sort each half, and then merge the halves to get a sorted deck. That's the fundamental concept behind **Merge Sort**. The idea becomes increasingly clear as we apply it in practice.

## Implementation of Merge Sort in Python

Let's put Merge Sort into action. For the simplest case — an empty list or a list with one element — it's already sorted. If the list has more than one element, we divide it into two lists, each approximately half the size of the original, sort both halves recursively, and merge them into a single sorted list.

```python
def merge(left, right):
    result = []
    i = 0
    j = 0

    # Compare the smallest unused elements in both lists and append the smaller to the result
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(left[j])
            j += 1

    # Once we've exhausted one list, append all remaining elements from the other list to the
    # result. Here, we append both lists, as at least one is an empty list.
    result.extend(left[i:])
    result.extend(right[j:])
    return result


def merge_sort(arr):
    if len(arr) <= 1:
        # If the array contains 0 or 1 element, it has been sorted
        return arr

    # Find middle point
    mid = len(arr) // 2

    # Recursively sort both halves
    left_half = merge_sort(arr[:mid])
    right_half = merge_sort(arr[mid:])

    return merge(left_half, right_half)
```

In the above code, the `merge_sort()` function partitions the list and recursively sorts both halves. The `merge()` function merges two sorted lists into a single sorted list.

To gain a comprehensive understanding of how Merge Sort works, it's beneficial to examine the key operation — merging two sorted lists.

Try to understand the code yourself, and we'll provide more explanations right in the next section!

## The Mechanics of Merge Sort

**Merge Sort's** distinguishing technique is merging two sorted lists. Let's consider two sorted lists: `[1, 5, 6, 8]` and `[2, 3, 7, 9]`. Our objective is to merge them into one sorted list, which allows us to understand how **Merge Sort** operates.

Here's how we do it:

- Maintain two pointers, each initialized to the start of either list.
- Compare the elements each pointer points to. Add the smallest element to our final list and advance that list's pointer by one step - this element is the smallest throughout all remaining elements in both arrays.
- Repeat this process until we've appended all the elements from one of the lists to the final list.

Once we've exhausted the elements of one list, we append the leftover elements from the other list to the resulting list.

This crucial mechanism drives the assembly of **Merge Sort**.

## Time Complexity Analysis of Merge Sort

The time complexity of **Merge Sort** is <em class="math">O(n * log n)</em> in all cases — best, average, and worst. This consistent efficiency is an advantage over other algorithms, such as Quick Sort, which can degrade to a time complexity of <em class="math">O(n<sup>2</sup>)</em> under unfavorable conditions.

To recap, a time complexity of <em class="math">O(n * log n)</em> implies that the running time increases linear-logarithmically with the size of the input. This characteristic makes **Merge Sort** highly efficient at handling large data sets.

## Space Complexity Analysis of Merge Sort

The space complexity of **Merge Sort** is <em class="math">O(n)</em>, due to the auxiliary space used for the temporary arrays while merging the elements. This requirement is crucial to keep in mind and can be a deciding factor when selecting an algorithm in situations with limited memory.

## Applying Merge Sort to a Real-World Problem

Now that we understand **Merge Sort's** mechanics, it's time to apply it to solve a real-world problem. Let's start with a straightforward task: sorting a list of randomly generated numbers. We'll use Python's `random` module to generate the list.

```python
import random


# Generate a list of 100 random numbers between 1 and 1000
random_numbers = [random.randint(1, 1000) for i in range(100)]
print(f"Original List: {random_numbers}")
#=> Original List: [402, 122, 544, ... 362, 101, 109]


sorted_numbers = merge_sort(random_numbers)

print(f"\nSorted List: {sorted_numbers}")
#=> Sorted List: [2, 10, 10, ... 951, 969, 971]
```

### Examples

Sorting fandom strings by first 3 characters only

```python
import random
import string


def merge_sort(data):
    if len(data) <= 1:
        return data

    mid = len(data) // 2
    left = data[:mid]
    right = data[mid:]

    left = merge_sort(left)
    right = merge_sort(right)

    return merge(left, right)


def merge(left, right):
    res = []
    left_index = right_index = 0
    while left_index < len(left) and right_index < len(right):
        if left[left_index][:3] < right[right_index][:3]:
            res.append(left[left_index])
            left_index += 1
        else:
            res.append(right[right_index])
            right_index += 1

    res.extend(left[left_index:])
    res.extend(right[right_index:])

    return res


# Generate random strings
data = [
    ''.join(random.choices(string.ascii_letters + string.digits, k=6))
    for _
    in range(20)
]

print("\nOriginal list of random strings:")
print(data)

sorted_data = merge_sort(data)

print("\nSorted list of random strings:")
print(sorted_data)
```
