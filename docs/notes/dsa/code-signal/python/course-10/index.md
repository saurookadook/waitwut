---
title: 'Hashing, Dictionaries, and Sets in Python'
date: '2024-09-23'
fullPath: '/notes/dsa/code-signal/python/course-10'
sectionSlug: 'notes'
---

## Intro

Hashing, dictionaries, and sets are crucial for fast and efficient data handling. They form the backbone of many software solutions and algorithms.

## Introduction to Hash Sets

Today, we're going to delve into the world of Hash Sets in Python. These invaluable data structures lie at the heart of many computer science and software engineering solutions. They provide efficient handling of complex algorithmic problems because they offer near-constant time lookups, insertions, and deletion operations. By doing so, hash sets can significantly reduce runtime and smartly manage your memory. Let's dive in and master this wonderful data structure — hash sets!

### Understanding Hash Functions and Hashing

Before we dive into hash sets, we need to understand the magic behind them: hash functions. A **hash function**, in its simplest terms, is a specific function that takes an input (also known as a 'message') and returns a fixed-size string of bytes. The "magic" here is that every unique input will produce a unique output. Therefore, the same input will always yield the same output. However, different inputs usually generate different outputs.

But here's the catch. Because the size of the output is fixed, there's a limit to how many unique outputs we can have. So, different inputs might sometimes yield the same output. We refer to this phenomenon as a collision. Below, you'll find a simple demonstration of a hash function in Python:

```python
def simple_hash(input_string):
    summation = sum(ord(ch) for ch in input_string)
    return summation % 10  # We limit our hash range from 0 to 9

print(simple_hash('Hello'))  # outputs: 0
print(simple_hash('world'))  # outputs: 2

```

### Hash Sets - Structure and Functioning

With hash functions in perspective, let's move on to hash sets. A hash set uses hash functions to point directly to the location of the interaction, making operations efficient and timely, thus making it preferable when you want to prevent duplicates. Order doesn't matter as much as quick retrieval. Here is straightforward Python code that illustrates the functionality of a hash set:

```python
# Define a set
student_ids = set()

# Add elements
student_ids.add(123)
student_ids.add(456)
student_ids.add(789)

# Check existence
print(456 in student_ids)  # Outputs: True
print(111 in student_ids)  # Outputs: False
```

This simple program gives us a basic view of how we can initialize a hash set, add elements to it, and then check if a certain element exists in the set. The important thing to note here is that both `in` operations will run in constant time **`O(1)`** regardless of the size of the set. This is what makes hash sets so powerful.

### Essential Characteristics of Hash Set

1. **Uniqueness of Elements**

Every element added to the hash set is unique. If you try to add a duplicate item, the set won't throw an error, but the item won't be added again. This feature comes in handy when you are working on problems where you need to ensure uniqueness. Here is an example:

```python
hash_set = set()

# Adding elements to the set
hash_set.add("element1")
hash_set.add("element1")

# Check the content of the set
print(hash_set)  # Output: {'element1'}
```

As you can see, even though `"element1"` was added to the set twice, it only appears once in the output because a `set` in Python only allows unique elements.

2. **Inherent Unordered Property**

Hash sets in Python do not maintain the order of elements. Even though we observe that the set prints the elements in the order they were added, it is merely coincidental because of the hash function's behavior. There is no guarantee of the order in a hash set. Here's an example:

```python
hash_set = set()

# Adding elements
hash_set.add("element3")
hash_set.add("element1")
hash_set.add("element2")

#Check the content of the set
print(hash_set)  # Output: {'element1', 'element2', 'element3'}
```

Despite adding the elements in a different order, they are displayed in another order when printed.

#### Complexity Analysis of Hash Sets

We now understand how to use hash sets. Let's examine how efficient our hash set operations are. Suppose we have a hash set with `n` elements. The computational time for different operations in a hash set includes:

- **Lookup**: **`O(1)`** average, **`O(n)`** worst-case.
- **Insertion**: **`O(1)`** average, **`O(n)`** worst-case.
- **Deletion**: **`O(1)`** average, **`O(n)`** worst-case.

The space complexity for hash sets is **`O(n)`**.

The worst-case scenario arises when the hash function does not optimally disperse values, resulting in too many collisions. However, these circumstances are rare. Most of the time, hash sets are fast and efficient.

### Implementing Hash Sets: A Hands-on Example

With the understanding of hash sets and collision strategies in hand, let's use another example. Suppose we're grocery store managers, and we have a shopping list. We don't want to tell our employees to fetch something that's already on the list. Hash sets can come in quite handy in such a situation.

```python
# Grocery list
grocery_list = set()

# Adding items
grocery_list.add('Milk')
grocery_list.add('Cheese')
grocery_list.add('Bread')

# Checking existence
print('Milk' in grocery_list)  # Outputs: True
print('Butter' in grocery_list)  # Outputs: False

# Add a new item
grocery_list.add('Butter')
print('Butter' in grocery_list)  # Outputs: True

# Try removing an item
grocery_list.remove('Bread')
print('Bread' in grocery_list)  # Outputs: False
```

By storing our grocery list items in a hash set, we can check for an item's presence, add new items, or remove existing ones conveniently.

Let's go one step further to demonstrate the other commonly used operations of a hash set: 'clear' and 'copy':

```python
# Clear the grocery list
grocery_list.clear()
print(grocery_list)  # Outputs: set()

# Create a new list and make a copy of it
new_list = set(['Eggs', 'Jam', 'Ham'])
copied_list = new_list.copy()

print(new_list)  # Outputs: {'Eggs', 'Ham', 'Jam'}
print(copied_list)  # Outputs: {'Eggs', 'Ham', 'Jam'}

# Modifying the copied list won't affect the original list
copied_list.remove('Ham')
print(new_list)  # Outputs: {'Eggs', 'Ham', 'Jam'}
print(copied_list)  # Outputs: {'Eggs', 'Jam'}
```

This code demonstrates how you can entirely clear a set or make a copy of it. Note that removing an item from the copied set does not affect the original set.

