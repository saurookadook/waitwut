---
title: 'Graph-based DSA'
date: '2024-07-11'
fullPath: '/notes/dsa/programiz-course/06-graph-based-dsa'
sectionSlug: 'notes'
---

# [Graph Data Structure](https://www.programiz.com/dsa/graph)

## Subsections
- [Spanning Tree](/docs/notes/dsa/programiz-course/06-graph-based-dsa/spanning-tree.md)
- [Strongly Connected Components and Kosarajus Algorithm](/docs/notes/dsa/programiz-course/06-graph-based-dsa/kosarajus-algorithm.md)
- [Adjacency Matrix](/docs/notes/dsa/programiz-course/06-graph-based-dsa/adjacency-matrix.md)
- [Adjacency List](/docs/notes/dsa/programiz-course/06-graph-based-dsa/adjacency-list.md)
- [Depth-First Search](/docs/notes/dsa/programiz-course/06-graph-based-dsa/depth-first-search.md)
- [Breadth-First Search](/docs/notes/dsa/programiz-course/06-graph-based-dsa/breadth-first-search.md)
- [Bellman Ford's Algorithm](/docs/notes/dsa/programiz-course/06-graph-based-dsa/bellman-fords-algorithm.md)

## Overview

- collection of nodes that have data and are connected to other nodes
- graph is a data structure (V, E) that consists of:
    - collection of vertices V
    - collection of edges E, represented as ordered pairs of vertices (u,v)

```
// vertices and edges

0 --- 3
| \
|  2
| /
1


// Graph

V = {0, 1, 2, 3}
E = {(0,1), (0,2), (0,3), (1,2)}
G = {V, E}
```

<br/>

---

## Graph Terminology

- **Adjacency:** vertex is said to be adjacent to another vertex if they are connected by an edge
- **Path:** sequence of edges which allows going from vertex A to vertex B
- **Directed Graph:** graph in which an edge (u,v) doesn't necessarily mean that there is also an edge (v,u); edges in this type of graph represented by arrows to show directionj

<br/>

---

## Graph Representation

### 1. Adjacency Matrix

- 2D array of V x V vertices, each row and column representing a vertex
- if value of any element `a[i][j]` is 1, it represents that there is an edge connecting vertex `i` and vertex `j`

```
// vertices and edges

0 --- 3
| \
|  2
| /
1


// Graph adjacency matrix

    0   1   2   3
  -----------------
0 | 0 | 1 | 1 | 1 |
  -----------------
1 | 1 | 0 | 1 | 0 |
  -----------------
2 | 1 | 1 | 0 | 0 |
  -----------------
3 | 1 | 0 | 0 | 0 |
  -----------------

```

- edge lookup is extremely fast in adjacency matrix representation
- requires more space, since we _must_ reserve space for every possible link between all vertices (V x V)

### 2. Adjacency List

- represents graph as array of linked lists
- index of array represents vertex and each element in linked list represents other vertices that form an edge with that vertex

```
// vertices and edges

0 --- 3
| \
|  2
| /
1


// Graph adjacency list representation

| V |
| 0 | -> 1 -> 2 -> 3
| 1 | -> 0 -> 2
| 2 | -> 0 -> 1
| 3 | -> 0
```

- adjacency list is efficient in terms of storage because only need to store values of edges

<br/>

---

## Graph Operations

most common are:
- check if element is present in graph
- graph traversal
- add elements(vertex, edges) to graph
- finding path from one vertex to another

<br/>

---

