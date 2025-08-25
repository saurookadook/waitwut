---
title: 'Neetcode: Number of Connected Components in an Undirected Graph'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/graphs/question-06'
sectionSlug: 'notes'
---

## Instructions

There is an undirected graph with `n` nodes. There is also an `edges` array, where `edges[i] = [a, b]` means that there is an edge between node `a` and node `b` in the graph.

The nodes are numbered from `0` to `n - 1`.

Return the total number of connected components in that graph.

**Example 1**:

```java
Input:
n=3
edges=[[0,1], [0,2]]

Output:
1
```

**Example 2**:

```java
Input:
n=6
edges=[[0,1], [1,2], [2,3], [4,5]]

Output:
2
```

**Constraints**:

- `1 <= n <= 100`
- `0 <= edges.length <= n * (n - 1) / 2`
