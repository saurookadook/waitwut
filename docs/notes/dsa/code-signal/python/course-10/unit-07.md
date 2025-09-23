---
title: 'Mastering Interview Problems Using Python Dictionaries'
date: '2025-09-22'
fullPath: '/notes/dsa/code-signal/python/course-10/unit-07'
sectionSlug: 'notes'
---

## Problem 1: Majority Vote Problem with Dictionaries

Our first problem is about identifying the "majority" element in a list. The "majority element" in a list is an element that appears more than `n / 2` times. Given a list of integers, our aim is to identify the majority element.

### Problem 1: Problem Actualization

This problem could arise on numerous occasions. Imagine running a survey where each participant selects a number from `1` to `n` to rate a product. After the survey, you want to find out if there is a feature that received more than `n / 2` votes. Or, consider an internet voting system for an online event. You may need to identify if a candidate is leading by more than half the total votes.

### Problem 1: Naive Approach

One naive approach is for each element, iterate over the entire list, and count the number of occurrences. However, this approach could lead to <em>O(N<sup>2</sup>)</em> time complexity, which is not suitable for a large dataset, where <em>N</em> is the size of the list.

### Problem 1: Efficient Approach Explanation

A more efficient approach is to use a Python dictionary to count the occurrences of each element in the list. If the count of any element exceeds `n / 2` at any point during our iteration, we immediately return that element as the "majority element". If no such element is found, we return `-1` after we've iterated through all elements.

### Problem 1: Solution

```python
# Witout defaultdict
def majority_vote(listA):
    n = len(listA)
    count_dict = {}

    for element in listA:
        count_dict[element] = count_dict.get(element, 0) + 1
        if count_dict[element] > n // 2:
            return element

    return -1


# With defaultdict
from collections import defaultdict


def majority_vote(listA):
    n = len(listA)
    count_dict = defaultdict(int)

    for element in listA:
        count_dict[element] += 1
        if count_dict[element] > n // 2:
            return element

    return -1


```

## Problem 2: Implement a Keyword Index

Moving on from counting pair frequencies, we arrive at our second problem: creating a keyword index. In this situation, we are given a list of strings, with each string representing a document. Our task is to generate an index of all the distinct words in the documents for quick reference. We need to create a dictionary where each unique word is a key, and the corresponding value is a list of indices pointing to the documents where the word can be found.

### Problem 2: Problem Actualization

Imagine you are building a search feature for an app, and you need a function that quickly retrieves all documents where a certain keyword is present. If you have ever searched for something using your browser's `Ctrl+F` or `Command+F` function, you have utilized such an index! Our task is to create a dictionary that behaves like such an index, mapping a keyword to all the documents where it can be found.

### Problem 2: Naive Approach

A naive solution to this problem could involve iterating through the entire list for each word storing document indices for each word. While this approach does yield the outcome we are looking for, it is inefficient with a time complexity of <em>O(N<sup>2</sup>)</em>.

### Problem 2: Efficient Approach Explanation

Again, dictionaries provide an efficient solution. As we pass through each document, we update our dictionary — each word becomes a key, and every time we encounter it, we append the current document's index to the list of values for that key. This approach requires only linear time in the total number of words in all documents — a significant improvement on the previous method.

### Problem 2: Step-By-Step Solution

Let's work through the solution. We first initialize an empty dictionary `index`. Then, we start looping through our list of documents. For each document we split each document into words, and for each word, we check if it is already in our dictionary `index`. If it's in the dictionary, we append the current document's index to the list of indices for that word. If the word is not in the dictionary, then it's the first time we've seen this word, and we add it to the index with a list that contains the current document's index as the value. Here's how to do it:

```python
def keyword_index(docs):
    index = dict()
    for doc_idx, doc in enumerate(docs):
        for word in doc.split():
            if word in index:
                index[word].append(doc_idx)
            else:
                index[word] = [doc_idx]
    return index


```

As evident from the function, the keyword_index function runs in <em>O(N)</em> time, achieving the task efficiently with the help of dictionaries.

### Problem 2:
