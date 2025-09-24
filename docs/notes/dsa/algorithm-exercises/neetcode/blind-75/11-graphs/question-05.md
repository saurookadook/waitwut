---
title: 'Neetcode: Graph Valid Tree'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/graphs/question-05'
sectionSlug: 'notes'
---

## Instructions

Given `n` nodes labeled from `0` to `n - 1` and a list of **undirected** edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.

**Example 1**:

```java
Input:
n = 5
edges = [[0, 1], [0, 2], [0, 3], [1, 4]]

Output:
true
```

**Example 2**:

```java
Input:
n = 5
edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]

Output:
false
```

**Note**:

- You can assume that no duplicate edges will appear in edges. Since all edges are `undirected`, `[0, 1]` is the same as `[1, 0]` and thus will not appear together in edges.

**Constraints**:

- `1 <= n <= 100`
- `0 <= edges.length <= n * (n - 1) / 2`

---

## Solutions

### Python

```python
from typing import Dict, List


class Solution:

    class CircularReferenceException(Exception):
        def __init__(
            self, message="ERROR :: Circular reference detected!", *args, **kwargs
        ):
            self.message = message
            super().__init__(self.message, *args, **kwargs)

    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        return self.valid_tree_impl(n, edges)

    def valid_tree_impl(self, n: int, edges: List[List[int]]) -> bool:
        if len(edges) > n - 1:
            return False

        edge_map = self.create_edge_map(n, edges)

        visited = set()

        def dfs(vertice: int, parent_vertice: int) -> bool:
            if vertice in visited:
                return False

            visited.add(vertice)
            for neighbor_vertice in edge_map[vertice]:
                if neighbor_vertice == parent_vertice:
                    continue
                if not dfs(neighbor_vertice, vertice):
                    raise Solution.CircularReferenceException

            return True

        try:
            return dfs(0, -1) and len(visited) == n
        except Solution.CircularReferenceException:
            return False

    def create_edge_map(self, n: int, edges: List[List[int]]) -> Dict[int, List[int]]:
        edge_map = {i: [] for i in range(n)}

        for a, b in edges:
            edge_map[a].append(b)
            edge_map[b].append(a)

        return edge_map


# ============================= 1 =============================
class CycleDetectionDFSSolution:
    """1. Solution utilizing a Cycle Detection algorithm using a Depth-First Search approach

    Time & Space Complexity

    Time complexity:
        `O(V + E)`
    Space complexity:
        `O(V + E)`

    _NOTE: Where `V` is the number of vertices and `E` is the number of edges in the graph.
    """

    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        if len(edges) > n - 1:
            return False

        adjacency_list = [[] for _ in range(n)]
        for u, v in edges:
            adjacency_list[u].append(v)
            adjacency_list[v].append(u)

        visited = set()

        def dfs(node, parent):
            if node in visited:
                return False

            visited.add(node)
            for neighbor in adjacency_list[node]:
                if neighbor == parent:
                    continue
                if not dfs(neighbor, node):
                    return False
            return True

        return dfs(0, -1) and len(visited) == n


# ============================= 2 =============================
from collections import deque


class BreadthFirstSearchSolution:
    """2. Solution utilizing a Breadth-First Search algorithm

    Time & Space Complexity

    Time complexity:
        `O(V + E)`
    Space complexity:
        `O(V + E)`

    _NOTE: Where `V` is the number of vertices and `E` is the number of edges in the graph.
    """

    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        if len(edges) > n - 1:
            return False

        adjacency_list = [[] for _ in range(n)]
        for u, v in edges:
            adjacency_list[u].append(v)
            adjacency_list[v].append(u)

        visited = set()
        q = deque([0, -1])  # (current_node, parent_node)
        visited.add(0)

        while q:
            node, parent = q.popleft()
            for neighbor in adjacency_list[node]:
                if neighbor == parent:
                    continue
                if neighbor in visited:
                    return False
                visited.add(neighbor)
                q.append((neighbor, node))

        return len(visited) == n


# ============================= 3 =============================
class DSU:
    def __init__(self, n):
        self._components = n
        self.Parent = list(range(n + 1))
        self.Size = [1] * (n + 1)

    def find(self, node):
        if self.Parent[node] != node:
            self.Parent[node] = self.find(self.Parent[node])
        return self.Parent[node]

    def union(self, u, v):
        pu = self.find(u)
        pv = self.find(v)
        if pu == pv:
            return False

        self._components -= 1
        if self.Size[pu] < self.Size[pv]:
            pu, pv = pv, pu

        self.Size[pu] += self.Size[pv]
        self.Parent[pv] = pu
        return True

    def components(self):
        return self._components


class DisjointSetUnionSolution:
    """3. Solution utilizing a Disjoint Set Union algorithm

    Time & Space Complexity

    Time complexity:
        `O(V + (E * ∝(V)))`
    Space complexity:
        `O(V)`

    _NOTE: Where `V` is the number of vertices and `E` is the number of edges in the graph. `∝()` is used for amortized complexity._
    """

    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        if len(edges) > n - 1:
            return False

        dsu = DSU(n)
        for u, v in edges:
            if not dsu.union(u, v):
                return False
        return dsu.components() == 1


```
