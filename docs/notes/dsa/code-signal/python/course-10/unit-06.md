---
title: 'Mastering Python Dictionaries Through Practical Exercises'
date: '2025-09-22'
fullPath: '/notes/dsa/code-signal/python/course-10/unit-06'
sectionSlug: 'notes'
---

## Intro

In this hands-on lesson, we'll delve into three rich examples that require us to operate Python dictionaries. We will be tackling tasks that involve the manipulation and analysis of strings, validating password strengths, and managing personnel data. As we work through each problem, we'll highlight how Python dictionaries offer a clear, efficient solution. To make this journey more relatable, let's picture ourselves as software developers in a tech firm tasked with solving these specific problems.

## Problem 1: Frequent Words Finder

Let's start with an interesting task. Imagine being asked to construct a simple word frequency analyzer. Given a large body of text, we need to identify the three most frequently occurring words. Imagine working with large documents, such as news articles, thesis manuscripts, or even books. Identifying the most common words could give us an overview of the main themes or topics in the text.

### Problem 1: Naive Approach

An initial thought might be to iterate over the entire set of words, count each word's occurrences, and then compare the counts. However, this method would involve repetitive and redundant operations and is, therefore, inefficient. If we think back to the theory of computational complexity from our earlier lessons, this 'brute force' approach is known to have a time complexity of <code>O(N<sup>2</sup>)</code>, where `N` is the total number of words. That's not very appealing, right? Hence, we need to find an alternative approach that's more time-efficient.

### Problem 1: Efficient Approach Explanation

This is where Python dictionaries shine. A Python dictionary allows us to store data in key-value pairs. In this case, we can use each unique word in the text as a key and the frequency of the word as its corresponding value. As we traverse the document once, we can record the count of each word on the go, avoiding the need for multiple full-document checks. Hence, using a dictionary would drastically reduce our algorithm's time complexity and boost its efficiency.

### Problem 1: Solution Building

```python
from collections import defaultdict


def frequent_words_finder(text: str):
    text = text.lower()
    word_counts = defaultdict(int)
    word_list = text.split()
    for word in word_list:
        word_counts[word] += 1
    top_three = sorted(word_counts.items(), key=lambda x: x[1], reverse=True)[:3]
    return top_three

```

The time complexity of this solution is `O(N)`, which is much better than the naive approach we discussed at the beginning.

## Problem 2: Password Strength Counter

As an application developer, ensuring the security of user data is pivotal. A common measure to ensure robust security is testing the strength of passwords. A 'strong' password is usually defined as one that is long (at least 8 characters) and includes a mix of uppercase characters, lowercase characters, and digits.

### Problem 2: Naive Approach

Initially, you might think of checking each condition separately. For example, you could use four separate 'for' loops to iterate over the password string to check for each condition, i.e., length and the presence of digits, lowercase letters, and uppercase letters. But we know that this approach doesn't scale well. Imagine having a password that's hundreds of characters long. Iterating over it four times is unnecessary and, therefore, inefficient.

### Problem 2: Efficient Approach Explanation

A more polished and less time-consuming solution would be to traverse the password string just once while checking for all conditions. As we check each character, we can update a dictionary where each condition is a key, and its fulfillment (`True` or `False`) is the corresponding value. This approach enables us to keep the code both elegant and efficient, making the best use of Python dictionaries.

### Problem 2: Solution Building

```python
def password_strength_counter(password: str):
    strength = {
        "digit": False,
        "length": False,
        "lowercase": False,
        "uppercase": False,
    }

    if len(password) >= 8:
        strength['length'] = True

    for char in password:
        if char.isdigit():
            strength['digit'] = True
        if char.islower():
            strength['lowercase'] = True
        if char.isupper():
            strength['uppercase'] = True

    return strength

```

## Problem 3: Bonus Calculator

As a software developer in an HR or Finance team, you might need to work on tasks related to personnel management. For instance, suppose your firm has just approved a new policy to give all developers a bonus equal to 10% of their salary. Your task is to update the database to reflect this new policy.

### Problem 3: Naive Approach

An initial thought might be to create a new list of dictionaries, where each dictionary contains an employee's information and the calculated bonus if the employee's role is `'developer'`. However, creating a new list and new dictionaries would represent an unnecessary allocation of extra memory. Besides, copying data may risk data inconsistency if the original data is updated during the process. Therefore, we need to find a method that doesn't involve duplicating our data.

### Problem 3: Efficient Approach Explanation

An efficient approach here is to add a `'bonus'` field to the dictionary of each employee who is a developer, updating the ones we already have instead of creating new dictionaries. Therefore, we can avoid duplicating the data list.

### Problem 3: Solution Building

```python
from typing import Any, Dict


def bonus_calculator(employees: List[Dict[str, Any]]):
    for employee in employees:
        bonus = 0
        if employee['role'] == 'developer':
            bonus = employee['salary'] * 0.1
        employee['bonus'] = bonus

    return employees


```
