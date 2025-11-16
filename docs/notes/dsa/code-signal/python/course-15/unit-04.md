---
title: 'Discovering Connected Components in a Graph Using Depth-First Search'
date: '2025-10-25'
fullPath: '/notes/dsa/code-signal/python/course-15/unit-04'
sectionSlug: 'notes'
---

<!-- Solving Algorithmic Problems with DFS -->

## Understanding the Problem

'Detecting cycles in a graph' is a common problem that has applications in various domains. It is particularly useful in **network routing**, **deadlock detection in operating systems**, and in **mathematical problems such as finding the presence of loops in a mathematical sequence**.

In a **Graph**, a cycle exists if we can start at a **Node**, traverse along the **Edges**, and return to the same **Node** without retracing any **Edge**. Our task is to construct a **DFS** function `has_cycle(graph)`, which will check for a cycle in the given **Graph** and return `True` if a cycle is found and `False` if the **Graph** is acyclic.

**Graphs** can be represented in multiple ways, but for this lesson, we will use **Adjacency List** representation for simplicity and efficiency.

## An Efficient Solution using DFS

We traverse the **Graph** starting from an initial **Node**, and for every visited **Node**, we check if it is being revisited during the **DFS** exploration.

- If it is, then a cycle has been detected and we return `True`.
- If no cycle is found after exploring all the **Nodes**, we return `False`.

This approach has a linear time complexity of <em class="math">O(V+E)</em>, where <em class="math">V</em> is the number of **Vertices** _(**Nodes**)_ and <em class="math">E</em> is the number of **Edges** in the **Graph**.

> **Note**: to avoid finding degenerate cycles (`A -> B -> A`), we will provide a parent **Vertex** _(the **Vertex** we came from)_ to the `dfs` function on top of the current **Vertex** we are at. This way, when reaching the next **Vertex** from the current one, we first check if we're trying to reach the parent.
>
> - If yes, we skip this edge.
> -If not and the **Vertex** is already visited, we indeed found the cycle.

## Building the Solution: DFS

The solution to this problem requires, first and foremost, implementing the **DFS** function. In this function, we mark the current **Node** as visited and then check for each adjacent **Node**. If the adjacent **Node** is visited and it is not the parent of the current **Node**, we find a cycle and return `True`. If the adjacent **Node** is not visited, we recursively call the **DFS** function for that **Node**.

```python
def dfs(vertex, visited, graph, parent):
    visited.add(vertex)

    for neighbor in graph[vertex]:
        if neighbor not in visited:
            if dfs(neighbor, visited, graph, vertex):
                return True
        elif neighbor != parent:
            # The parent is already visited, but the parent -> vertex -> parent cycle is degenerate
            return True

    return False


```

The function adds the current **Vertex** to visited **Nodes**. It then explores neighbors of **Vertex**. If the neighbor was not visited before, the function recursively visits the neighbor, specifying **Vertex** as its parent. If the neighbor is already in the visited and it is not the parent of the current **Vertex**, it means that a cycle has been found, and it returns `True`. If all the neighbor **Nodes** are explored without finding a cycle, it returns `False` _(indicating no cycle found from the **Vertex**)_.

## Building the Solution: Main Function

```python
def has_cycle(graph):
    visited = set()
    # Starting DFS from the first vertex in the graph
    return dfs(next(iter(graph)), visited, graph, None)
```

Note that in case the **Graph** is connected, it is enough to call the **DFS** function from any node just once. Do you have an idea how the above code should be changed to handle **Graphs** consisting of more than one connected component?

## Building the Solution: Complete Code Example

```python
def has_cycle(graph):
    visited = set()
    # Starting DFS from the first vertex in the graph
    return dfs(next(iter(graph)), visited, graph, None)


def dfs(vertex, visited, graph, parent):
    visited.add(vertex)

    for neighbor in graph[vertex]:
        if neighbor not in visited:
            if dfs(neighbor, visited, graph, vertex):
                return True
        elif neighbor != parent:
            # The parent is already visited, but the parent -> vertex -> parent cycle is degenerate
            return True

    return False


graph = {
  'A': ['B', 'C'],
  'B': ['A', 'C'],
  'C': ['A', 'B'],
}
print(has_cycle(graph))
# Output: True
```

## Examples

### Finding Cycle in Disconnected Graphs

```python
from typing import Dict, Set


def dfs(vertex: str, visited: Set, graph: Dict, parent: str):
    print(f"'vertex' --> {vertex}")
    visited.add(vertex)

    for neighbor in graph[vertex]:
        if neighbor not in visited:
            if dfs(neighbor, visited, graph, vertex):
                return True
        elif neighbor != parent:
            return True

    return False


def has_cycle(graph):
    visited = set()

    result = dfs(next(iter(graph)), visited, graph, None)

    while not result and len(visited) < len(graph.keys()):
        print(f"'visited' --> {visited}")
        first_unvisited = next(
            (k for k in graph.keys() if k not in visited),
            None
        )
        result = dfs(first_unvisited, visited, graph, None)

    print(f"{'='*20}  RESULT  {'='*20}")
    print(f"'visited' --> {visited}")
    return result


# Test the function
graph = {
    'A': ['B', 'C'],
    'B': ['A'],
    'C': ['A', 'D'],
    'D': ['C'],
    'E': ['G', 'K'],
    'K': ['G', 'E'],
    'G': ['K', 'E']
}
print(has_cycle(graph))
```
