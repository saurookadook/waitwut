---
title: 'Neetcode: Clone Graph'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/graphs/question-02'
sectionSlug: 'notes'
---

## Instructions

Given a node in a connected undirected graph, return a deep copy of the graph.

Each node in the graph contains an integer value and a list of its neighbors.

```java
class Node {
    public int val;
    public List<Node> neighbors;
}
```

The graph is shown in the test cases as an adjacency list. An **adjacency list** is _a mapping of nodes to lists, used to represent a finite graph_. Each list describes the set of neighbors of a node in the graph.

For simplicity, nodes values are numbered from `1` to `n`, where `n` is the total number of nodes in the graph. The index of each node within the adjacency list is the same as the node's value (1-indexed).

The input node will always be the first node in the graph and have `1` as the value.

**Example 1**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/96c7fb34-26e8-42e0-5f5d-61b8b8c96800/public" alt="Diagram representation of 'adjList' input for Example 1.">

```java
Input: adjList = [[2],[1,3],[2]]

Output: [[2],[1,3],[2]]
```

Explanation: There are 3 nodes in the graph.
Node 1: val = 1 and neighbors = [2].
Node 2: val = 2 and neighbors = [1, 3].
Node 3: val = 3 and neighbors = [2].

**Example 2**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/96c7fb34-26e8-42e0-5f5d-61b8b8c96800/public" alt="Diagram representation of 'adjList' input for Example 2.">

```java
Input: adjList = [[]]

Output: [[]]
```

Explanation: The graph has one node with no neighbors.

**Example 3**:

```java
Input: adjList = []

Output: []
```

Explanation: The graph is empty.

**Constraints**:

- `0 <= The number of nodes in the graph <= 100`
- `1 <= Node.val <= 100`
- There are no duplicate edges and no self-loops in the graph.

---

## Solutions

### Python

```python
from typing import List, Optional


"""
# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
"""

class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

    def __repr__(self):
        return f"<Node // val: {self.val}, neighbors: {[n.val for n in self.neighbors]}>"


class Solution:
    def cloneGraph(self, node: Optional["Node"]) -> Optional["Node"]:
        if not node:
            return None

        visited = dict()

        def get_or_create_node_clone(node: Node) -> Node | None:
            nonlocal visited

            if node in visited:
                return visited[node]

            cloned = Node(val=node.val)
            visited[node] = cloned

            for neighbor in node.neighbors:
                cloned.neighbors.append(get_or_create_node_clone(neighbor))

            return cloned

        return get_or_create_node_clone(node)


# ============================= 1 =============================
class DepthFirstSearchSolution:
    """1. Solution utilizing a Depth-First Search algorithm

    Time & Space Complexity

    Time complexity:
        `O(V * E)`
    Space complexity:
        `O(V)`

    _NOTE: Where `V` is the number of vertices and `E` is the number of edges.
    """

    def cloneGraph(self, node: Optional[Node]) -> Optional[Node]:
        cloned_node_lookup = {}

        def dfs(node):
            if node in cloned_node_lookup:
                return cloned_node_lookup[node]

            copy = Node(node.val)
            cloned_node_lookup[node] = copy

            for neighbor in node.neighbors:
                copy.neighbors.append(dfs(neighbor))

            return copy

        return dfs(node) if node else None


# ============================= 2 =============================
from collections import deque


class BreadthFirstSearchSolution:
    """2. Solution utilizing a Breadth-First Search algorithm

    Time & Space Complexity

    Time complexity:
        `O(V * E)`
    Space complexity:
        `O(V)`

    _NOTE: Where `V` is the number of vertices and `E` is the number of edges.
    """

    def cloneGraph(self, node: Optional[Node]) -> Optional[Node]:
        if not node:
            return None

        cloned_node_lookup = {}
        cloned_node_lookup[node] = Node(val=node.val)
        q = deque([node])

        while q:
            current = q.popleft()

            for neighbor in current.neighbors:
                if neighbor not in cloned_node_lookup:
                    cloned_node_lookup[neighbor] = Node(neighbor.val)
                    q.append(neighbor)
                cloned_node_lookup[current].neighbors.append(
                    cloned_node_lookup[neighbor]
                )

        return cloned_node_lookup[node]


```
