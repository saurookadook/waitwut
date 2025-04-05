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

## Mastering Algorithmic Problems with Sets in Python

### Problem 1: Unique String in the List
Our first problem revolves around identifying the first unique string from a list. Imagine you're working on a text analyzing tool that needs to identify the first unique word in a piece of text. This problem simulates such a real-world scenario.

#### Naive Approach
At first glance, a naive approach would be to iterate over the list of words and, for each word, scan the entire list again to count its occurrences. This method of double-pass scanning the list results in an unsightly time complexity of **`O(N^2)`** as each word incurs another full traverse. As the list grows in size, the time taken by this approach grows exponentially, making it impractical for larger datasets.

#### Efficient Approach Explanation
Let's introduce Python sets to the stage! The defining property of a set is that it contains unique elements, making it a perfect fit for our current predicament.

Our strategy consists of two parts, each tailored to leverage the capabilities of sets:
1. We scan through the words, keeping track of the previously encountered words in a set called `seen`. A crucial aspect of our solution comes from an inherent feature of sets: if a word is already in `seen`, adding it again does not change the set. Keeping this in mind, we create a second set, `duplicates`, consisting only of words that we have previously seen.
2. Once we know which words are duplicates, it becomes elementary to find the first word in our original list that isn't a duplicate. We make another pass over the list, checking each word to see if it's in the `duplicates` set. The first word we find that isn't a duplicate is our answer.

By focusing our solution around sets, we've reduced the problem to two single-pass traversals, giving our solution a linear time complexity of **`O(2N)`**, a significant improvement over the naive approach.

#### Solution Building

1. In the initial iteration over `words`, if a `word` already exists in the `seen` set, we identify it as a duplicate and add it to `duplicates`. If not, the `word` is added to `seen`.

This code creates two sets. `seen` contains all words we've come across, and `duplicates` contains words that have appeared more than once. To visualize it, consider `words` as `'apple'`, `'banana'`, `'apple'`. After the above block of code, we'd have seen as `'apple'`, `'banana'`, and `duplicates` as `'apple'`.

2.  In the next phase of our solution, we iterate over words again, checking if a word is in duplicates. The first word that is not in duplicates is our answer as it's the first unique string in the list. If we don't find any unique string, we return an empty string.

```python
def find_unique_string(words):
    seen = set()
    duplicates = set()

    for word in words:
        if word in seen:
            duplicates.add(word)
        seen.add(word)

    for word in words:
        if word not in duplicates:
            return word
    return ""
```
Thanks to two simple traversals, we've efficiently solved a problem that initially seemed complex.

### Problem 2: Anagram Pairs in Two Lists
The task at hand for this problem is to identify all pairs of anagrams where each pair is made up of one word from the first list and one from the second list. For those unfamiliar, an anagram is a word or phrase that is created by rearranging the letters of another word or phrase, using all the original letters exactly once.

#### Problem Actualization
Consider a cryptology scenario. You've intercepted two separate messages, each consisting of a list of coded words. You suspect that there might be some connection between the two messages - specifically, that some words from one list are anagrams of words in the other list. Your goal is to find these pairs of anagram words to decipher the code.

#### Naive Approach
The most straightforward approach to this problem would involve checking each word from the first list against each word from the second list to find anagrams. While this would provide correct results, it's an inefficient method with a time complexity of **`O(n⋅m⋅w)`**, where `n` is the size of the first list of words, `m` is the size of the second list of words, and `w` is the average word length. As you can see, it gets impractically slow for larger inputs.

#### Efficient Approach Explanation
We can achieve a more efficient solution by representing each word from both lists as a sorted tuple of characters. This gives us a unified form for each set of anagram words, making them easy to compare. If the sorted tuples of characters for two words are the same, then those words are anagrams. Once we have these sorted tuples, we can use Python's set methods to find pairs of words that are anagrams of each other.

##### Why Tuples?
Using tuples is generally faster and more efficient than strings for this purpose. Tuples are immutable and have a smaller memory footprint compared to strings. This can lead to better performance, especially when dealing with large datasets.

#### Solution Building
Here's how we fulfill the task:

1. We first convert every word from both lists to a sorted tuple of its characters to have a unified form for all anagram words.
2. Now those sets themselves have unique character tuples. We find the common tuples between the two, which represent the anagram words.
3. For the final output, we iterate over the words in the original lists again, and for each word, if its sorted character tuple is present in `common_tuples` set, we add it to the respective output list.
4. Finally, we return a list of tuples, where each tuple is an anagram pair from `list_1_output` and `list_2_output`.
```python
def find_anagram_pairs_using_sets(list_1, list_2):
    # Step 1
    sorted_tuples_1 = set(tuple(sorted(word)) for word in list_1)
    sorted_tuples_2 = set(tuple(sorted(word)) for word in list_2)
    # Step 2
    common_tuples = sorted_tuples_1 & sorted_tuples_2
    # Step 3
    list_1_output = [word for word in list_1 if tuple(sorted(word)) in common_tuples]
    list_2_output = [word for word in list_2 if tuple(sorted(word)) in common_tuples]
    # Step 4
    output = []

    for word_1 in list_1_output:
        for word_2 in list_2_output:
            # traversing every pair of words in filtered lists
            if tuple(sorted(word_1)) == tuple(sorted(word_2)):
                # If words in the pair are anagrams, add them to the output list
                output.append((word_1, word_2))
    return output


```

The average time complexity of this method is **`O((n+m)log(n+m)+P)`**, where `n` and `m` are sizes of **`list1`** and **`list2`**, respectively, and `P` is the number of word pairs in `list_1_output` and `list_2_output` lists, which makes this solution much quicker and more scalable than the naive approach.

**NOTE**: As not every pair in `list_1_output` and `list_2_output` is actually an anagram pair, the time complexity of this solution can potentially degrade to quadratic complexity in rare cases while still having not too many anagram pairs in the output.

#### Solution with Dictionaries (Optional)
While this course didn't cover Python dictionaries yet, they are essentially a very powerful tool that can make the solution here even more effective. We are going to dig into Python dictionaries later in this course, but take a moment to go through and try to understand the solution for this problem if dictionaries would be possible to use. This is totally optional; no worries if you don't understand the solution yet; we will learn dictionaries later in this course.

```python
from collections import defaultdict


def find_anagram_pairs_using_dicts(list_1, list_2):
    # Step 1: Create mapping for `list_1`
    # - `mapping_1` stores (sorted anagram) -> list[anagrams] mapping for `list_1`
    mapping_1 = defaultdict(list)
    for word in list_1:
        sorted_tuple = tuple(sorted(word))  # unique identifier of the anagram
        mapping_1[sorted_tuple].append(word)
        # `mapping_1[sorted_tuple]` stores all anagrams under same identifier for `list_1`

    # Step 2: Create mapping for `list_2`
    # - `mapping_2` stores (sorted anagram) -> list[anagrams] mapping for `list_2`
    mapping_2 = defaultdict(list)
    for word in list_2:
        sorted_tuple = tuple(sorted(word))  # unique identifier of the anagram
        mapping_2[sorted_tuple].append(word)
        # `mapping_2[sorted_tuple]` stores all anagrams under same identifier for `list_2`

    # Intersect keys from `mapping_1` and `mapping_2` to get common sorted tuples
    # Every element in `common_tuples` is an anagram identifier that exists in both lists
    common_tuples = set(mapping_1.keys()) & set(mapping_2.keys())

    output = []
    for anagram_tuple in common_tuples:
        for word_1 in mapping_1[anagram_tuple]:
            for word_2 in mapping_2[anagram_tuple]:
                # Since both `word_1` and `word_2` have the same anagram identifier, then are anagrams
                output.append((word_1, word_2))

    return output


```

This solution will only traverse pairs that are actually anagrams, so the complexity will be **`O((n+m)log(n+m)+P)`**, where `n` and `m` are sizes of **`list1`** and **`list2`**, respectively, and `P` is the number of anagram pairs in the output. Note that if you only need to calculate the number of anagram pairs, the time complexity can be decreased up to **`O((n+m)log(n+m))`**.


## Deep Dive into Hash Tables: Implementation and Complexity Analysis in Python

### Topic Overview and Actualization
Sometimes referred to as **hash maps** in various programming languages, **hash tables** play an instrumental role in providing a practical and efficient means of organizing data.

**Hash tables** drive many data storage techniques and in-memory databases, powering large-scale applications such as database indexing, caches, and even some machine learning algorithms. They store data associatively, linking or mapping values to unique keys.

This lesson focuses on understanding the underlying structure and mechanics of **hash tables**, how they handle conflicts or collisions when multiple keys hash to the same index, and how to perform complexity analysis to understand their efficiency. By the end of this lesson, you should understand how **hash tables** operate and how Python dictionaries leverage the principles of **hash tables**.

### Understanding Hash Tables
As we delve into the world of **hash tables**, let's start by understanding their underlying structure. A **hash table** consists of **an array** _(the actual table where data is stored)_, coupled with **a hash function**. The **hash function** plays a crucial role - it takes the keys as input and generates an index, mapping keys to different slots or indices in the table.

Each index of the **array** holds a bucket that ultimately contains the key-value pair. The pairing of keys with values enhances the data retrieval process. The efficiency of retrieving values depends on the **hash function's** ability to distribute data across the array uniformly.

![Graphic example of how a hash table works](/src/images/dsa/code-signal/python/hash-table-example.webp)

You can also think of **hash tables** as 'hash sets storing tuples of `(key, value)`', but this particular interface makes it less easy to use, so Python has a concept of dictionaries we will cover below.

Let's visualize this with a Python dictionary, which operates on the same principle. Suppose we have a dictionary containing student names as keys and their corresponding scores as values:

```python
# A simple dictionary illustrating the principle of hashing
student_scores = { 'Tom': 85, 'Serena': 92, 'Alex': 78, 'Nina': 88 }

# printing the scores
for student, score in student_scores.items():
    print(f"{student}: {score}")

# Outputs:
# Tom: 85
# Serena: 92
# Alex: 78
# Nina: 88
```

In this example, `'Tom'`, `'Serena'`, `'Alex'`, and `'Nina'` are keys, while `85`, `92`, `78`, and `88` are their associated values. Under the hood, the Python interpreter uses a hash function to assign each key-value pair to a unique address in memory.

### Collision Handling in Hash Tables
There are instances when two different keys produce the same index after being processed through the **hash function**. This situation is known as a collision. When a collision occurs, we are faced with a dilemma - where do we store the new key-value pair since that index is already occupied?

Here are two common strategies to handle such scenarios:

1. **Chaining**: In this method, each index _(or `bucket`)_ in the **array** hosts a linked list of all key-value pairs that hash to the same index. When a collision occurs, we simply go to the collided index and append the new key-value pair to the existing linked list.

2. **Open Addressing**: Upon encountering a collision, the **hash table** searches for another free slot or index in the table _(possibly the next available empty slot)_ and assigns that location to the new key-value pair. This approach requires a suitable probing strategy to ensure efficient use of table space.

The image below provides a visual example of **Chaining** collision resolving method - `John Smith` and `Sandra Dee` have the same **hash function** result, so their entries are organized in a linked list in the corresponding bucket.

![A diagram exemplifying the chaining collision resolving method](/src/images/dsa/code-signal/python/hash-table-collision-handling-chaining.png)

### Time and Space Complexity Analysis for Hash Tables
**Hash tables** are renowned for their efficiency and speed when it comes to data storage and retrieval. They boast constant time complexity **`O(1)`** for the operations on key-value pairs - insertion, deletion, and retrieval. This efficiency comes from a good **hash function**, which allows for keys to be uniformly distributed across the table and accessed directly via their indices, eliminating the need to scan through unnecessary slots.

Although **hash tables** generally perform robustly, situations may arise where frequent collisions occur. Such situations could deteriorate the table's efficiency and extend the time complexity to a worst-case scenario of **`O(n)`**, where `n` is the number of keys hashing to the same index.

### Working with Hash Tables in Python – Dictionaries
Python provides a built-in implementation of **hash tables**, known as **dictionaries**. **Dictionaries** in Python work similarly to **hash tables**. They allow the use of arbitrary keys to access values and handle collisions seamlessly behind the scenes, ensuring consistent and quick access to stored data.

You can create a **dictionary** with key-value pairs, access values using keys, and perform various operations such as adding new key-value pairs and deleting them, as demonstrated below:

```python
# Create a Python dictionary similar to a Hash Table
book_ratings = {
    "Moby-Dick": 8,
    "The Great Gatsby": 9,
    "War and Peace": 10,
    "The Catcher in the Rye": 8
}

# Access a value with its key. This happens in O(1) time
print(book_ratings["Moby-Dick"])   # Outputs: 8
# Another way to access a value with its key is by providing the default value if the key is not there. Complexity is also O(1).
print(book_ratings.get("Moby-Dick", 0)) # Outputs: 8
print(book_ratings.get("Moby Dick", 0)) # Outputs: 0

# Add a new key-value pair. The addition operation is also O(1)
book_ratings["To Kill a Mockingbird"] = 9
book_ratings["The Great Gatsby"] = 8
print(book_ratings)
# Outputs: {"Moby-Dick": 8, "The Great Gatsby": 8, "War and Peace": 10, "The Catcher in the Rye": 8, "To Kill a Mockingbird": 9}

# Remove a key-value pair. Deletion is also a constant time operation
del book_ratings["War and Peace"]
print(book_ratings)
# Outputs: {"Moby-Dick": 8, "The Great Gatsby": 9, "The Catcher in the Rye": 8, "To Kill a Mockingbird": 9}
```

## Mastering Python Dictionaries Through Practical Exercises
🚧 _TODO_ 🚧
