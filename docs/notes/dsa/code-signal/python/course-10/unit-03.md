---
title: 'Mastering Python Sets: Intersection, Non-Repeating Elements, and Unique Elements'
date: '2025-09-22'
fullPath: '/notes/dsa/code-signal/python/course-10/unit-03'
sectionSlug: 'notes'
---

## Problem 1: Array Intersection

Our journey begins with the challenge of identifying the intersection of two arrays. In other words, we aim to pinpoint the elements that appear in both of the given lists. It's important to note that we're interested in locating unique common elements - even if an element appears more than once in both lists, it should only feature once in our output.

### Problem 1: Problem Actualisation

To elucidate how this problem might emerge in a real-world scenario, presume that you're managing a database for a marketing company. You have two customer lists, each obtained through various marketing strategies. Your task is to determine the customers that both strategies successfully targeted. Essentially, these are the common elements in your two lists.

### Problem 1: Naive Approach

Suppose you decide to resolve this problem in the most uncomplicated way possible: for each customer (or element) on the first list, you verify if they’re also present on the second list. Once you identify a match, you must confirm that this customer hasn't previously been added to your output. Though this solution would, in the end, yield the correct list of shared customers, it would demand a lot of computational resources, as you would be operating at a time complexity of **`O(n^2)`** due to the nested lookups – far from ideal!

### Problem 1: Efficient Approach Explanation

Here, the unique functionality of Python's `set` data structure proves beneficial. A set in Python, as you may remember, is an unordered collection of unique objects, ensuring the absence of duplicate values. Furthermore, it allows us to perform several operations on such collections, such as intersection (identifying common elements), union (combining all unique elements), and difference (detecting unique items in a set).

### Problem 1: Solution Building

Let's decompose the solution to this problem:

Initially, we convert our lists into sets using Python's built-in function `set()`. The syntax looks like this: `set1 = set(list1)`. What this operation accomplishes is iterate through `list1`, add each element to `set1`, and ensure that no duplicates are added.

In the next step, we find the intersection of our newly formed sets using the ampersand operator (`&`), akin to this: `intersection = set1 & set2`. This operation sifts through `set1` and `set2` and appends only the common elements to `intersection`.

Finally, we convert our set back into a list employing the list() function and sort it with the sorted() function before returning it: return sorted(list(intersection)).

The final code piece ends up looking like this:

```python
def array_intersection(list1, list2):
    set1 = set(list1)
    set2 = set(list2)
    intersection = set1 & set2
    return sorted(list(intersection))


```

Simple and elegant. This solution runs at a time complexity of **`O(n)`**, a substantial improvement over the naive method.

## Problem 2: Non-Repeating Elements

Our next issue is slightly more complex. We must determine all elements in a given list that appear only once, meaning they don't have any duplicates in the same list.

### Problem 2: Problem Actualisation

To illustrate how this problem might arise in real life, consider analyzing a company's sales transactions. Your aim is to identify the products sold exactly once over a specific period. These could potentially be underperforming products that need investigation.

### Problem 2: Naive Approach

A naive method to resolve this pitfall would involve iterating over the list and, for every item, checking if it occurs anywhere else in the list. This method is not efficient as it results in a time complexity of **`O(n^2)`**.

### Problem 2: Efficient Approach Explanation

A more efficient approach would employ a Python `set`, a built-in data structure that holds an unordered collection of unique elements. Sets provide constant time complexity for the add, remove, and search operations, making this data structure suitable for our problem.

### Problem 2: Solution Building

Here's how you would tackle this predicament:

1. Create two sets, one for keeping track of the elements we've seen and another for the elements that have repeated.
2. Iterate over elements in list, adding new elements to `seen` and elements already in `seen` to `repeated`.
3. Return a list with the elements in the `seen` set but not in the `repeated` set.

```python
def non_repeating_elements(nums):
   seen, repeated = set(), set()
   for num in nums:
       if num in seen:
           repeated.add(num)
       else:
           seen.add(num)
   return list(seen - repeated)

```

This approach results again in a time complexity of **`O(n)`** due to the constant time operations provided by the Python `set`.

## Problem 3: Unique Elements

The third problem compels us to find elements unique to each of the two given lists, i.e. given two lists, `list1` and `list2`, we need to find elements that exist only in `list1` and elements that exist only in `list2`, respectively.

Such a task might be beneficial if you possess two lists of employees from different company departments and you wish to identify the employees unique to each department.

### Problem 3: Naive Approach

An unsophisticated solution might involve combining the two lists and then scrutinizing each element to ascertain if it exists in the other list. However, such an approach would also culminate in a high time complexity, **`O(len(list1)*len(list2))`** in particular.

### Problem 3: Efficient Approach Explanation

We can leverage Python's set operation to solve this problem more efficiently. Here, we'll utilize set difference, which presents us with the elements in the first set but not the second.

### Problem 3: Solution Building

A solution would resemble this:

1. Convert our lists into sets.
2. Perform the difference operation. We use the minus sign (`-`) to ascertain the difference between two sets.
3. Convert results sets back into sorted lists and return them as tuple.

```python
def unique_elements(list1, list2):
    set1 = set(list1)
    set2 = set(list2)
    unique_to_1 = sorted(list(set1 - set2))
    unique_to_2 = sorted(list(set2 - set1))
    return (unique_to_1, unique_to_2)

```

Again, this solution is considerably more efficient than the naive approach, operating at a time complexity of **`O(n)`**, or **`O(max(len(list1), len(list2)))`** to be more precise.

## Closing

Be aware that understanding the underpinning theory of how these operations function at a low level can assist you in making informed decisions about when to employ them and when to refrain from doing so. Coupled with practice, this understanding is crucial to mastering these topics and will eventually yield dividends by enabling you to write more efficient code.
