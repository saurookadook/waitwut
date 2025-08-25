---
title: 'Neetcode: Graph Valid Tree'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/graphs/question-05'
sectionSlug: 'notes'
---

## Instructions

Given `n` nodes labeled from `0` to `n - 1` and a list of **undirected** edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.

**Example 1**:

```Java
Input:
n = 5
edges = [[0, 1], [0, 2], [0, 3], [1, 4]]

Output:
true
```

**Example 2**:

```Java
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
