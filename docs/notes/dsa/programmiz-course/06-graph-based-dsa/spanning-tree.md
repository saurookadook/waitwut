---
title: 'DSA Programmiz Course: Graph-based DSA - Spanning Tree'
date: '2024-08-11'
fullPath: '/notes/dsa/programmiz-course/06-graph-based-dsa/spanning-tree'
sectionSlug: 'notes'
---

# [Spanning Tree](https://www.programiz.com/dsa/spanning-tree-and-minimum-spanning-tree)

## Spanning Tree and Minimum Spanning Tree

first need to understand two types of graphs:
- undirected graphs
    - graph in which edges do not point in any direction (i.e. edges are bidirectional)
- connected graphs
    - graph in which there is always a path from a vertex to any other vertex

<br/>

---

## Spanning Tree

- is a sub-graph of undirected connected graph, which includes all vertices of the graph with a minimum possible number of edges
- if vertex is missed, then it's not a spanning tree
- edges may or may not have weights assigned to them
_NOTE: total number of spanning trees with `n` vertices that can be created from complete graph is equal to `n^(n-2)`_
    - with `n = 4`, max possible number of spanning trees equal to `4^(4-2) = 16`

### Example of a Spanning Tree

_original graph:_
```
A - B
|   |
D - C
```

_some possible spanning trees that can be created from above graph:_
```
// 1

A - B
|
D - C


// 2

A - B
    |
D - C


// 3

A   B
|   |
D - C


// 4

A - B
|   |
D   C


// 5

A - B
| \
D   C


// 6

A   B
| / |
D   C
```

---

## Minimum Spanning Tree

- spanning tree in which sum of weight of edges is as minimal as possible

### Example of a Spanning Tree

_original graph:_
```
    4
  A - B
5 |   | 1
  D - C
    2
```

_possible spanning trees from above graph:_
```
// 1
// - sum = 11

    4
  A - B
5 |
  D - C
    2


// 2
// - sum = 8

  A   B
5 |   | 1
  D - C
    2


// 3
// - sum = 10

    4
  A - B
5 |   | 1
  D   C


// 4 (the minimal spanning tree)
// - sum = 7

    4
  A - B
      | 1
  D - C
    2
```

Minimum spanning tree from graph is found using following algorithms:
1. [Prim's Algorithm](https://www.programiz.com/dsa/prim-algorithm)
2. [Kruskal's Algorithm](https://www.programiz.com/dsa/kruskal-algorithm)

<br/>

---

## Spanning Tree Applications

- Computer Network Routing Protocol
- Cluster Analysis
- Civil Network Planning

## Minimum Spanning Tree Applications

- find paths in map (_such as street map?_)
- design networks like telecommunication networks, water supply networks, and electrical grids
