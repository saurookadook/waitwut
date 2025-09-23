---
title: 'Mastering Algorithmic Problems with Sets in Python'
date: '2025-09-22'
fullPath: '/notes/dsa/code-signal/python/course-10/unit-04'
sectionSlug: 'notes'
---

## Problem 1: Unique String in the List

Our first problem revolves around identifying the first unique string from a list. Imagine you're working on a text analyzing tool that needs to identify the first unique word in a piece of text. This problem simulates such a real-world scenario.

### Problem 1: Naive Approach

At first glance, a naive approach would be to iterate over the list of words and, for each word, scan the entire list again to count its occurrences. This method of double-pass scanning the list results in an unsightly time complexity of **`O(N^2)`** as each word incurs another full traverse. As the list grows in size, the time taken by this approach grows exponentially, making it impractical for larger datasets.

### Problem 1: Efficient Approach Explanation

Let's introduce Python sets to the stage! The defining property of a set is that it contains unique elements, making it a perfect fit for our current predicament.

Our strategy consists of two parts, each tailored to leverage the capabilities of sets:

1. We scan through the words, keeping track of the previously encountered words in a set called `seen`. A crucial aspect of our solution comes from an inherent feature of sets: if a word is already in `seen`, adding it again does not change the set. Keeping this in mind, we create a second set, `duplicates`, consisting only of words that we have previously seen.
2. Once we know which words are duplicates, it becomes elementary to find the first word in our original list that isn't a duplicate. We make another pass over the list, checking each word to see if it's in the `duplicates` set. The first word we find that isn't a duplicate is our answer.

By focusing our solution around sets, we've reduced the problem to two single-pass traversals, giving our solution a linear time complexity of **`O(2N)`**, a significant improvement over the naive approach.

### Problem 1: Solution Building

1. In the initial iteration over `words`, if a `word` already exists in the `seen` set, we identify it as a duplicate and add it to `duplicates`. If not, the `word` is added to `seen`.

This code creates two sets. `seen` contains all words we've come across, and `duplicates` contains words that have appeared more than once. To visualize it, consider `words` as `'apple'`, `'banana'`, `'apple'`. After the above block of code, we'd have seen as `'apple'`, `'banana'`, and `duplicates` as `'apple'`.

2. In the next phase of our solution, we iterate over words again, checking if a word is in duplicates. The first word that is not in duplicates is our answer as it's the first unique string in the list. If we don't find any unique string, we return an empty string.

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

## Problem 2: Anagram Pairs in Two Lists

The task at hand for this problem is to identify all pairs of anagrams where each pair is made up of one word from the first list and one from the second list. For those unfamiliar, an anagram is a word or phrase that is created by rearranging the letters of another word or phrase, using all the original letters exactly once.

### Problem 2: Problem Actualization

Consider a cryptology scenario. You've intercepted two separate messages, each consisting of a list of coded words. You suspect that there might be some connection between the two messages - specifically, that some words from one list are anagrams of words in the other list. Your goal is to find these pairs of anagram words to decipher the code.

### Problem 2: Naive Approach

The most straightforward approach to this problem would involve checking each word from the first list against each word from the second list to find anagrams. While this would provide correct results, it's an inefficient method with a time complexity of **`O(n⋅m⋅w)`**, where `n` is the size of the first list of words, `m` is the size of the second list of words, and `w` is the average word length. As you can see, it gets impractically slow for larger inputs.

### Problem 2: Efficient Approach Explanation

We can achieve a more efficient solution by representing each word from both lists as a sorted tuple of characters. This gives us a unified form for each set of anagram words, making them easy to compare. If the sorted tuples of characters for two words are the same, then those words are anagrams. Once we have these sorted tuples, we can use Python's set methods to find pairs of words that are anagrams of each other.

#### Aside: Why Tuples?

Using tuples is generally faster and more efficient than strings for this purpose. Tuples are immutable and have a smaller memory footprint compared to strings. This can lead to better performance, especially when dealing with large datasets.

### Problem 2: Solution Building

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

### Problem 2: Solution with Dictionaries (Optional)

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
