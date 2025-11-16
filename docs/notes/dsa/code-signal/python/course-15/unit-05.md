---
title: 'Unveiling the Breadth-First Search Algorithm for Graph Traversal'
date: '2025-10-30'
fullPath: '/notes/dsa/code-signal/python/course-15/unit-05'
sectionSlug: 'notes'
---

## Intro to Breadth-First Search (BFS)

In our daily life, we often encounter situations modeled by **BFS**. For instance, imagine organizing a party and deciding whom to invite. You'd probably start with close friends _(depth 1)_, then consider not-so-close friends _(depth 2)_, and continue this way until you've exhausted your social graph. This eventual guest list could very well mirror a **BFS** traversal of your friend graph, starting with you.

The **BFS** algorithm, like a symbolic torch, sheds light on a **Graph** from a starting **Vertex**, traversing **Nodes** breadthwise before going deeper. It explores all the neighbor **Vertices** before moving on to **Vertices** at the next depth level.

In this lesson, we seek to understand the **BFS** algorithm deeply, learn how to implement a step-by-step **BFS** traversal and a whole-graph **BFS** exploration in Python, as well as to apply **BFS** to solve complex problems.

## Understanding BFS: The Concept

The **Breadth-First Search (BFS)** algorithm provides a systematic method for visiting every **Vertex** in a **Graph**. **BFS** begins at a chosen **Vertex** and systematically visits all the **Vertices** at the current depth before moving to the next depth level.

One can envision **BFS** as a deliberate explorer. For instance, if you are in a maze, unlike **DFS**, that could lead you to branch out into unknown directions recklessly, **BFS** carefully maps out the options at the current level before bravely forging one step ahead. **BFS** explores all reachable **Paths** one step away from you before advancing to **Paths** two steps away, and so on until it either finds the destination or exhausts all **Paths**.

This layer-by-layer approach distinguishes **BFS** from **DFS**. While **DFS** extends as deeply as possible before retracting, **BFS** covers as much ground as possible at the current depth before advancing into deeper parts.

To better understand this concept, consider a simple **Graph** composed of **Nodes** labeled `A`, `B`, `C`, `D`, `E`, and `F`, arranged as follows: `A — B — C`, `A — D — E`, and `B — F`:

```txt
┌───╮    ┌───╮    ┌───╮
│ A │────│ B │────│ C │
└───╯    └───╯    └───╯
    ╲        ╲
    ┌───╮    ┌───╮
    │ D │    │ F │
    └───╯    └───╯
        ╲
        ┌───╮
        │ E │
        └───╯
```

If we initiate **BFS** from **Node** `A`, **BFS** promptly visits all **Nodes** one step away, namely `B` and `D`, before proceeding to **Nodes** two steps away, `C`, `E`, and `F`. As a result, **BFS** visits **Nodes** in the following order: (`A`) -> (`B`, `D`) -> (`C`, `F`, `E`), where **Nodes** from the same step are enclosed in parenthesis.

## BFS vs DFS

While understanding **BFS**, we naturally ask, "How does **BFS** differ from **DFS**?" **DFS** and **BFS** are essential **Graph** traversal algorithms, but their methodologies differ significantly.

**DFS** is often relatable to exploring a dense forest or a complex network of tunnels. It selects a **Path** and ventures deep in that direction within the **Graph** before reverting to explore other **Paths**. In contrast, **BFS** adopts a dissimilar strategy as it examines the entire breadth of a level within the **Graph** before moving forward. This breadth-wise approach of **BFS** explores all **Nodes** closest to or at the same distance from the start **Node** before advancing to **Nodes** at a farther level. If we relate this back to a video game analogy, **BFS** will explore all the rooms on one level of the map before moving to the next level.

## BFS Algorithm: The Mechanism and Python Implementation

Having understood **BFS** conceptually, let's now break down the mechanism of the **BFS** algorithm. At its core, it uses a queue data structure to administer its operations, providing an orderly and systematic method for **Node** traversal.

```txt
initialize an empty Queue Q

Mark the starting vertex as visited and enqueue it into Q

WHILE Q is not empty DO
    Dequeue a vertex (say V) from Q
    FOR each neighbor (say N) of V DO
        IF N is not visited
            Mark N as visited and enqueue it into Q
        END IF
    END FOR
END WHILE
```

Implementing this BFS algorithm in Python requires the `deque` library for queue operations:

```python
from collections import deque


def BFS(graph, start):
    visited = set([start])  # a set to keep track of visited nodes
    queue = deque([start])  # a deque (double-ended queue) to manage BFS operations

    while queue:
        node = queue.popleft()  # dequeue a node
        print(node, end=" ")    # Output the visited node

        for neighbor in graph[node]:  # visit all the neighbors
            if neighbor not in visited:  # enqueue unvisited neighbors
                queue.append(neighbor)
                visited.add(neighbor)  # mark the neighbor as visited

# Use an adjacency list to represent the graph
graph = {
  'A': ['B', 'D'],
  'B': ['A', 'C', 'F'],
  'C': ['B'],
  'D': ['A', 'E'],
  'E': ['D'],
  'F': ['B'],
}
BFS(graph, 'A')
# Output: A B D C F E
```

## Graph Traversal – How BFS Can Explore the Whole Graph

By applying **BFS**, we can explore all reachable **Nodes** from a chosen starting point. As shown in our previous example, if we start our **BFS** from **Node** `A`, we reach all the **Nodes** (`A` -> `B` -> `D` -> `C` -> `F` -> `E`) in the **Graph**.

Moreover, **BFS** proves useful in finding the shortest **Path** between two **Nodes** in an unweighted **Graph**. This property is invaluable across a wide range of applications, from GPS navigation's shortest **Path** issue to the issue of website ranking in internet hyperlink structure.

## BFS Usage: Solving Complex Problems

How about seeing our **BFS** algorithm in action? Consider a grid or a maze where each cell represents a unique **Node**. If a cell is accessible from its neighbor cell, these two cells share an **Edge**. **BFS** excels in such scenarios as it effectively computes the minimum number of steps required to move from a starting point to a goal point within a maze.

For instance, you may be familiar with puzzles involving moving a chess knight from one corner to another in the fewest possible moves. Such puzzles dictate a minimum movement constraint, which, in our **BFS** context, translates as the shortest path. **BFS** adeptly computes the optimum solution and is, therefore, a valuable tool in complex problem-solving.

```txt
┌───┬───┬───┬───┬───┬───┬───┬───╮
│ 2 │ 3 │ 4 │ 1 │ 2 │ 1 │ 4 │ 3 │
├───┼───┼───┼───┼───┼───┼───┼───┤
│ 3 │ 2 │ 1 │ 2 │ 3 │ 2 │ 1 │ 2 │
├───┼───┼───┼───┼───┼───┼───┼───┤
│ 2 │ 3 │ 4 │ 3 │ ♘ │ 3 │ 2 │ 3 │
├───┼───┼───┼───┼───┼───┼───┼───┤
│ 3 │ 2 │ 1 │ 2 │ 3 │ 2 │ 1 │ 2 │
├───┼───┼───┼───┼───┼───┼───┼───┤
│ 2 │ 3 │ 4 │ 1 │ 2 │ 1 │ 4 │ 3 │
├───┼───┼───┼───┼───┼───┼───┼───┤
│ 3 │ 2 │ 3 │ 2 │ 3 │ 2 │ 3 │ 2 │
├───┼───┼───┼───┼───┼───┼───┼───┤
│ 4 │ 3 │ 2 │ 3 │ 2 │ 3 │ 2 │ 3 │
├───┼───┼───┼───┼───┼───┼───┼───┤
│ 3 │ 4 │ 3 │ 4 │ 3 │ 4 │ 3 │ 4 │
└───┴───┴───┴───┴───┴───┴───┴───╯
```

This image presents a chess knight at its starting position, and the number in each cell corresponds to the minimal number of knight moves required to reach this cell. **BFS** can easily calculate this matrix!

