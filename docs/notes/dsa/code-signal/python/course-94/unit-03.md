---
title: 'Processing Arrays with Conditional Interruption'
date: '2025-11-11'
fullPath: '/notes/dsa/code-signal/python/course-94/unit-03'
sectionSlug: 'notes'
---

## Task Statement

Our mission for today is to generate a unique encoded message for a book club. Here's the fun part: to create a cryptic message, we will process a string and an array of numbers simultaneously and stop once a given condition is satisfied.

- For the string, our task is to _replace each letter with the next alphabetical letter and then reverse the entire updated string_.
- For the array of numbers, our task is to _divide each number by 2, round the result, and accumulate the rounded numbers until their total exceeds 20_.
  - When the accumulated total exceeds 20, we immediately stop the process and return the updated string and the as yet unprocessed numbers in their original order.

### Example

Consider the input string `"books"` and array `[10, 20, 30, 50, 100]`.

We start our process with an empty string and a sum of `0`.

- For the first character 'b' in 'books', we replace it with the next alphabet 'c'. For the corresponding number 10 in the array, we divide it by 2 and round it. The result is 5. The sum after first operation is 5 which is less than 20, so we continue to the next character.
- For the next character 'o', we replace it with 'p'. And for the corresponding number 20 in the array, half and rounded is 10. The sum after the second operation is 15 (5 + 10). The sum still doesn't exceed 20, so we move to third character.
- For the next character 'o', we replace it with 'p'. And for the corresponding number 30 in the array, half and rounded is 15. When we add this '15' to our previously calculated sum 15, it totals to 30 which is more than 20. So, we stop the process here.
- We have processed 'b', 'o', and 'o' from the word 'books' and replaced them with 'c', 'p', and 'p' respectively to get "cpp". After reversing, we get "ppc".
- For the array, we exclude any numbers that we have processed. Hence, we exclude the first three numbers and the array becomes [50, 100].

So the output should be `('ppc', [50, 100])`.

## Solution Building

### Step 1 - String and Array Initialization

Let's begin our journey by setting up two crucial components: our resultant string and a variable to keep track of the cumulative sum.

```python
from typing import List


def solution(input_string: str, numbers: List[int]):
    result = ''
    sum_so_far = 0

```

### Step 2 - Iteration and Updates

With the setup complete, it's time to roll up our sleeves and process the string and array. We need to iterate over the `input_string` and update each character to its next alphabetical character. Simultaneously, we'll keep tabs on our array condition - if the sum of half of the numbers crosses our threshold of 20, we should stop the process.

```python
from typing import List


def solution(input_string: str, numbers: List[int]):
    result = ''
    sum_so_far = 0
    i = 0

    while i < len(input_string) and sum_so_far <= 20:
        result += 'a' if input_string[i] == 'z' else chr(ord(input_string[i]) + 1)
        half_number = round(numbers[i] / 2)
        sum_so_far += half_number
        i += 1

```

### Step 3 - Final Touch Up and Return

With the updates complete, we're one step away from solving this mystery. We must reverse our string to generate the final encoded message! At the end, we return the processed string and the remaining array.

```python
from typing import List


def solution(input_string: str, numbers: List[int]):
    result = ''
    sum_so_far = 0
    i = 0

    while i < len(input_string) and sum_so_far <= 20:
        result += 'a' if input_string[i] == 'z' else chr(ord(input_string[i]) + 1)
        half_number = round(numbers[i] / 2)
        sum_so_far += half_number
        i += 1

    return result[::-1], numbers[i:]

```
