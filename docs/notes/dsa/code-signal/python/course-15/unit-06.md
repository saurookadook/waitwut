---
title: 'Finding the Shortest Path in Graphs with BFS Algorithm'
date: '2025-11-01'
fullPath: '/notes/dsa/code-signal/python/course-15/unit-06'
sectionSlug: 'notes'
---

## Shortest Path: Problem Statement

Our problem involves developing a minimum-cost route planner by using the **BFS** algorithm for a logistics company. The company operates in a bustling urban environment where:

- There are multiple pickup and drop-off points, represented as **Nodes** in a **Graph**.
- The paths between these points, represented as **Edges** in the **Graph**, are bidirectional.

In other words, the **Graph** is undirected.

Your task is to find the shortest path from a source **Node** to a destination **Node** in this **Graph**.

## Shortest Path: Naive Approach

One possible approach to this problem is to use the so-called brute-force approach, where you calculate all the possible **Paths** from the source to the destination and then determine the shortest **Path** among them. While this strategy might sound like it solves the problem, in reality, it can be very inefficient, especially when the number of **Nodes** and **Edges** is large. Storing all possible **Paths** could lead to overflowing memory and sluggish time complexity. In fact, the time complexity for this algorithm is exponential, meaning it wouldn't perform well for even medium-sized **Graphs**.

## Shortest Path: Efficient Approach

A much more efficient way to address this problem is by using the **Breadth-First Search (BFS)** algorithm. **BFS** is perfect for finding the shortest **Path** in an unweighted **Graph** because it explores all **Nodes** at the current 'depth' before moving on to **Nodes** at the next 'depth level'.

So, the starting **Vertex** lies at depth `0`, and the minimal distance to it is also `0`. All starting **Vertex**'s neighbors will be processed at depth `1`, and the minimal distance to them is also `1`. Continuing the pattern, when **BFS** processes the **Vertex** at depth `d`, we can be sure the minimal distance to this **Vertex** is `d`. As **BFS** doesn't visit the same **Vertex** twice, we will eventually visit all **Vertices** and set a minimal distance for each of them.

## Shortest Path: Solution Building

```python
from collections import deque


def shortest_path(n, graph, start, end):
    # The queue stores tuples `(distance, path)` where:
    # - `distance` is the minimal distance to the current vertex
    # - `path` is the shortest path from the starting vertex to the current vertex
    queue = deque([(0, [start])])
    visited = set([start])
    min_distances = { start: 0 }  # if `start` is `'A'`, will evaluate to { 'A': 0 }

    while queue:
        distance, path = queue.popleft()
        node = path[-1]
        min_distances[node] = distance

        if node == end:
            return distance, path

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((distance + 1, path + [neighbor]))

    return float('inf'), []

```

This Python solution uses the **Breadth First Search** algorithm to find the shortest **Path** between two **Nodes** in a bidirectional unweighted **Graph**.

1. It initializes a **Queue** and visited **Set** with the start **Node**.
2. Then it explores all its neighboring **Nodes**.
3. For each neighboring **Node**, if it's not visited yet, the solution adds it to the visited **Set** and enqueues a new distance and **Path**.

The solution ensures that the first **Path** found to reach the end **Node** is the shortest due to the structure of **BFS**.

## Examples

### Get Dictionary of Shortest Paths from Start Planet to Every Other Planet

```python
from collections import deque


def shortest_paths(n, graph, start):
    queue = deque([[start]])
    visited = set([start])
    shortest_paths = {start: [start]}

    while queue:
        path = queue.popleft()
        start_node, node = path[0], path[-1]
        shortest_paths[node] = path

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(path + [neighbor])

    return shortest_paths


# Test cases:

# We describe a simple graph with 3 nodes and 3 edges.
graph = {1: [2, 3], 2: [1, 3], 3: [1, 2]}
print(shortest_paths(3, graph, 1))
# Expected output: {1: [1], 2: [1, 2], 3: [1, 3]}
# Explanation: The paths from node 1 to nodes 2 and 3 are direct edges.

graph = {1: [2], 2: [1, 3], 3: [2]}
print(shortest_paths(3, graph, 1))
# Expected output: {1: [1], 2: [1, 2], 3: [1, 2, 3]}
# Explanation: The path from node 1 to node 3 includes node 2, as there's no direct edge to node 3.

graph = {1: [2, 3, 4], 2: [1, 3], 3: [1, 2, 4], 4: [1, 3]}
print(shortest_paths(4, graph, 1))
# Expected output: {1: [1], 2: [1, 2], 3: [1, 3], 4: [1, 4]}
# Explanation: There are direct edges from node 1 to all other nodes.
```
