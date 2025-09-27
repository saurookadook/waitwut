---
title: 'Mastering Sorting in Python: Practical Problem-Solving with Built-in Functions'
date: '2025-09-24'
fullPath: '/notes/dsa/code-signal/python/course-11/unit-07'
sectionSlug: 'notes'
---

## Problem 1: Sorting Values in a List

As a starting point, let's consider a familiar task where you have a list of integers generated randomly. You need to sort this list in ascending order. In our e-library example, this task could be likened to arranging the books based on their unique ID numbers.

Python has a built-in function called `sorted()` that sorts a given list without modifying the original one. Instead, it returns a new list with the elements of the original list in sorted order.

```python
def sort_list(values):
    return sorted(values)

```

## Problem 2: Sorting Values in a List in Reverse Order

Next, suppose you need to sort a list of integers, but this time in descending order. For instance, you might want to arrange the e-library's books based on their publication year, with the most recent ones appearing first.

The `sorted()` function is again handy here, but we need to set its `reverse` argument to `True`.

```python
def sort_list_descending(values):
    return sorted(values, reverse=True)

```

Setting the `reverse` parameter to `True` instructs Python to sort the elements in descending order, a departure from the default ascending order.

## Problem 3: Sorting Tuples by the Second Element

Next, consider a situation where you need to sort a list of tuples. Each tuple contains two elements — an integer and a string (for instance, the integer might be a unique ID representing a book, and the string is the book's title). You want to arrange these tuples based on the strings.

The `sorted()` function can sort complex data structures like tuples using the `key` parameter. This parameter defines a function that takes an input element and returns a key that Python will use for sorting purposes. To sort the tuples based on the second element (i.e., the string), we'll use a lambda function as the key.

```python
def sort_tuples_list(tuples):
    return sorted(tuples, key=lambda x: x[1])

```

The lambda function `x: x[1]` takes an element from `tuples` and returns its second element _(i.e., `x[1]`)_. The `sorted()` function uses these second elements to sort the tuples.

On top of that, if the second element can include ties we need to eliminate, a `tuple` comes to the rescue, as tuples in Python are automatically comparable:

```python
def sort_tuples_ties(values):
    return values.sort(key=lambda x: (x[1], x[0]))

```

This code will now sort the `values` list, first sorting by the `x[1]` value and, in case of a tie, sorting by the `x[0]` value.

## Problem 4: Sorting a Dictionary Based on Values

For our final case, imagine that you have a dictionary where each key-value pair represents the title of a book _(as a key)_ and its corresponding author's name _(as a value)_. Your task is to sort this dictionary based on the authors' names and return a list of tuples, where each tuple is a key-value pair from the dictionary.

Python provides the `items()` method, converting a dictionary into a list of its key-value pairs as tuples. We can then sort this list using `sorted()` and the `key` parameter.

```python
def sort_dict(dictionary):
    return sorted(dictionary.items(), key=lambda x: x[1])

```
