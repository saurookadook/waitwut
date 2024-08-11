---
title: 'Greedy Algorithms'
date: '2024-07-11'
fullPath: '/notes/dsa/programiz-course/08-greedy-algorithms'
sectionSlug: 'notes'
---

# [Greedy Algorithms](https://www.programiz.com/dsa/greedy-algorithm)

## Overview

- approach for solving problem by selecting best option available
    - doesn't worry whether current best result will bring overall optimal result
    - never reverses earlier decision
    - works in top-down approach
- may not produce best result for all problems because it always goes for **local best choice** to produce **global best result**
- greedy algorithms are a good fit for problems with following properties
    1. **greedy choice property**: optimal solution to problem can be found by choosing best choice at each step without reconsidering previous steps
    2. **optimal substructure**: optimal overall solution to problem corresponds to optimal solution to its subproblems

## Advantages of Greedy Approach

- easier to describe
- can perform better than other algorithms _(though not in every case)_

## Drawback of Greedy Approach

- major disadvantage is that it doesn't always produce optimal and/or feasible solution

## Definition/Steps

1. start with empty solution set
2. at each StereoPannerNode, item added to solution set until solution is reached
3. if solution set is feasible, current item is kept
4. else, item is rejected and never considered again

## Example

### Problem

For a given amount of money, make change using the fewest possible number of coins.

Available coins are
- $5 coin
- $2 coin
- $1 coin

There is no limit to the number of each coin you can use.

### Solution

```python
def greedy_make_change(amount):
    solution_set = dict(_5=0, _2=0, _1=0, change_sum=0)
    coins = [5, 2, 1]

    while solution_set["change_sum"] < amount:
        for coin in coins:
            if solution_set["change_sum"] + coin <= amount:
                coin_key = f"_{coin}"
                solution_set[coin_key] += 1
                solution_set["change_sum"] += coin
                break

    return solution_set


```

## Different Types of Greed Algorithms

- [Selection Sort](https://www.programiz.com/dsa/selection-sort)
- [Knapsack Problem](https://en.wikipedia.org/wiki/Knapsack_problem)
- [Minimum Spanning Tree](https://www.programiz.com/dsa/spanning-tree-and-minimum-spanning-tree)
- [Single-Source Shortest Path Problem](https://en.wikipedia.org/wiki/Shortest_path_problem)
- [Prim's Minimal Spanning Tree Algorithm](/docs/notes/dsa/programiz-course/08-greedy-algorithms/prims-algorithm.md)
- [Kruskal's Minimal Spanning Tree Algorithm](/docs/notes/dsa/programiz-course/08-greedy-algorithms/kruskals-algorithm.md)
- [Dijkstra's Minimal Spanning Tree Algorithm](/docs/notes/dsa/programiz-course/08-greedy-algorithms/dijkstras-algorithm.md)
- [Huffman Coding](/docs/notes/dsa/programiz-course/08-greedy-algorithms/huffman-coding.md)
- [Ford-Fulkerson Algorithm](/docs/notes/dsa/programiz-course/08-greedy-algorithms/ford-fulkerson-algorithm.md)
