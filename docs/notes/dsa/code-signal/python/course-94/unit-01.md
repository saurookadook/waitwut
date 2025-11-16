---
title: 'Array Hopping Adventures: Exploring Index-Based Traversals'
date: '2025-11-02'
fullPath: '/notes/dsa/code-signal/python/course-94/unit-01'
sectionSlug: 'notes'
---

## Leaping Between 2 Arrays

### Task Statement: Find Highest Value in 2nd Array Visited During Leaps

Gloria's quest unravels with two arrays, both brimming with non-negative integers. Starting at the first element of `arrayA`, she leaps to `arrayB` based on the index she discovers in `arrayA`. She then bounces back to `arrayA` according to the index she stumbles upon in `arrayB`. Gloria repeats these hops until she returns to where she started in `arrayA`. What an adventure!

Your challenge is to craft a Python function that aids Gloria on her trip. The function will take two lists of integers as inputs, representing `arrayA` and `arrayB`. The objective is to find the highest value from `arrayB` that Gloria jumps to during her voyage.

It is guaranteed that at some point Gloria returns at the starting position.

#### Example

If `arrayA = [2, 4, 3, 1, 6]` and `arrayB = [4, 0, 3, 2, 0]`, the output should be `3`.

In this scenario, Gloria starts from the first element of `arrayA`, which is `2`. Then, she jumps to `arrayB` at index `2`, where she discovers `3`. She then bounces back to `arrayA` at index `3`, where she arrives at `1`. From there, she leaps back to `arrayB` at index `1`, stumbling upon a `0`. Finally, she bounces back to `arrayA` at index `0`, a location where she started her adventure. Hence she stops here and during this journey, she came across the highest value `3` from `arrayB`.

### Solution Building

#### Step 1 - Initialization

Before we make headway with our code, let's kickstart with the initialization of variables. Let `indexA` and `indexB` denote the last positions of Gloria in `arrayA` and `arrayB` respectively. We will also use `max_value` for tracking the highest value encountered in `arrayB`. Her quest starts from `arrayA`, so we also maintain a Boolean flag `in_arrayA`.

#### Step 2 - Array Hopping

Our assistant for Gloria’s hopping challenge will be a `while` loop! This keeps iterating until Gloria returns to her starting position in `arrayA`.

If Gloria is in `arrayA`, we check if the value in `arrayB` where she is going to land is greater than `max_value`, and update `max_value` if it is. We also switch Gloria's position to the other array in each iteration.

```python
def solution(arrayA, arrayB):
    # Step 1
    indexA = 0
    indexB = None
    in_arrayA = True
    max_value = float('-inf')

    # Step 2
    while True:
        if in_arrayA:
            indexB = arrayA[indexA]
            if arrayB[indexB] > max_value:
                max_value = arrayB[indexB]
        else:
            indexA = arrayB[indexB]
            if indexA == 0:
                return max_value
        in_arrayA = not in_arrayA


```

### Example: Novel Game

You're assisting in the creation of an algorithm for a novel game where a character hops between two arrays following certain rules. The game starts at position `1` of `arrayA` (which corresponds to array index `0` in Python).

The value at the character's current position in `arrayA` determines the index it jumps to on the second array, `arrayB`. Upon landing on `arrayB`, it does the same thing: the value at the current position specifies the index it jumps to in `arrayA`. This iteration continues until the character lands on an index in `arrayA` that it has already visited, at which point the game concludes.

Your task is to develop a Python function simulating this gameplay. The function receives two equal-length arrays of integers, `arrayA` and `arrayB`, each containing `n` elements <em class="math">(1 ≤ n ≤ 100)</em>. It should return an array consisting of the `1`-based indices on `arrayB` that the character visited before a position on `arrayA` was repeated.

Each element in the input arrays ranges from `1` to `n`, indicating the next `1`-based index that the character will jump to in the other array. The function guarantees that each jump always results in a valid position within the same-length arrays, and a position in `arrayA` will inevitably be revisited.

**Important Notes**:

- Python arrays use `0`-based indexing (`arrayA[0]`, `arrayA[1]`, etc.)
- The values stored in the arrays represent `1`-based position numbers (`1`, `2`, `3`, etc.)
- To jump to a position, convert the `1`-based value to a `0`-based array index by subtracting `1`
- The result should contain the `1`-based position numbers you jumped to in `arrayB`

Can you devise a function that proficiently simulates this gameplay?

**Example**:

For `arrayA = [1, 3, 2, 5, 4]` and `arrayB = [5, 4, 3, 2, 1]` the output should be `[1, 4, 3, 2, 5]` since it first lands at the first position in `arrayB` (the resulting array is `[1]`), then goes to the fifth position in `arrayA`, then returns to the fourth position in `arrayB` (the resulting array becomes `[1, 4]`), etc.

```python
def solution(arrayA, arrayB):
    indexA = 1
    indexB = None
    in_arrayA = True
    arrayB_visited = []

    while True:
        if in_arrayA:
            indexB = arrayA[indexA - 1]
            arrayB_visited.append(indexB)
        else:
            indexA = arrayB[indexB - 1]
            if indexA - 1 == 0:
                return arrayB_visited
        in_arrayA = not in_arrayA

```
