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

### Real-life Scenario: Comparing Execution Time in Lists and Hash Sets

Imagine you're working on a large project that handles millions of data entries, and you need to check if certain items exist in your dataset. Would a conventional Python list do the hard job efficiently, or is the Python set a game-changer here?

Run the provided starter code to compare the time it takes to search for an item in both a hash set and a list. Pay careful attention to the exponential notation next to the time calculation of hash set operation. That's the key to seeing the speed of hash sets.

```python
# Define a function to demonstrate the operation and time complexity of a hash set
def hash_set_operations():

    # Importing the necessary libraries
    import time

    # Create a hash set and a list
    hash_set = set()
    list_data = []

    # Setting the range for the data elements
    data_range = 10**7

    # Adding elements to the hash set and the list
    for i in range(data_range):
        hash_set.add(i)
        list_data.append(i)

    # Define a test element (which is out of the data range and thus is not present in both the list and set)
    test_element = data_range + 1

    # Start the clock and check for the presence of the test elements in the set
    start_time = time.time()
    print("Hash Set Test Result:", test_element in hash_set)
    print("Searching in the Hash Set Took:", time.time() - start_time)

    # Start the clock and check for the presence of the test elements in the list
    start_time = time.time()
    print("List Test Result:", test_element in list_data)
    print("Searching in the List Took:", time.time() - start_time)

# Call the function
hash_set_operations()

```

## Mastering Python Sets: Intersection, Non-Repeating Elements, and Unique Elements

### Problem 1: Array Intersection
Our journey begins with the challenge of identifying the intersection of two arrays. In other words, we aim to pinpoint the elements that appear in both of the given lists. It's important to note that we're interested in locating unique common elements - even if an element appears more than once in both lists, it should only feature once in our output.

#### Problem Actualisation
To elucidate how this problem might emerge in a real-world scenario, presume that you're managing a database for a marketing company. You have two customer lists, each obtained through various marketing strategies. Your task is to determine the customers that both strategies successfully targeted. Essentially, these are the common elements in your two lists.

#### Naive Approach
Suppose you decide to resolve this problem in the most uncomplicated way possible: for each customer (or element) on the first list, you verify if they’re also present on the second list. Once you identify a match, you must confirm that this customer hasn't previously been added to your output. Though this solution would, in the end, yield the correct list of shared customers, it would demand a lot of computational resources, as you would be operating at a time complexity of **`O(n^2)`** due to the nested lookups – far from ideal!

#### Efficient Approach Explanation
Here, the unique functionality of Python's `set` data structure proves beneficial. A set in Python, as you may remember, is an unordered collection of unique objects, ensuring the absence of duplicate values. Furthermore, it allows us to perform several operations on such collections, such as intersection (identifying common elements), union (combining all unique elements), and difference (detecting unique items in a set).

#### Solution Building
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

### Problem 2: Non-Repeating Elements
Our next issue is slightly more complex. We must determine all elements in a given list that appear only once, meaning they don't have any duplicates in the same list.

#### Problem Actualisation
To illustrate how this problem might arise in real life, consider analyzing a company's sales transactions. Your aim is to identify the products sold exactly once over a specific period. These could potentially be underperforming products that need investigation.

#### Naive Approach
A naive method to resolve this pitfall would involve iterating over the list and, for every item, checking if it occurs anywhere else in the list. This method is not efficient as it results in a time complexity of **`O(n^2)`**.

#### Efficient Approach Explanation
A more efficient approach would employ a Python `set`, a built-in data structure that holds an unordered collection of unique elements. Sets provide constant time complexity for the add, remove, and search operations, making this data structure suitable for our problem.

#### Solution Building
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

### Problem 3: Unique Elements
The third problem compels us to find elements unique to each of the two given lists, i.e. given two lists, `list1` and `list2`, we need to find elements that exist only in `list1` and elements that exist only in `list2`, respectively.

Such a task might be beneficial if you possess two lists of employees from different company departments and you wish to identify the employees unique to each department.

#### Naive Approach
An unsophisticated solution might involve combining the two lists and then scrutinizing each element to ascertain if it exists in the other list. However, such an approach would also culminate in a high time complexity, **`O(len(list1)*len(list2))`** in particular.

#### Efficient Approach Explanation
We can leverage Python's set operation to solve this problem more efficiently. Here, we'll utilize set difference, which presents us with the elements in the first set but not the second.

#### Solution Building
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

### Closing
Be aware that understanding the underpinning theory of how these operations function at a low level can assist you in making informed decisions about when to employ them and when to refrain from doing so. Coupled with practice, this understanding is crucial to mastering these topics and will eventually yield dividends by enabling you to write more efficient code.

