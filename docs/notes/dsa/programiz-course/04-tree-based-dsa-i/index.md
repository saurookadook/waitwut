---
title: 'Tree-based DSA I'
date: '2024-07-11'
fullPath: '/notes/dsa/programiz-course/04-tree-based-dsa-i'
sectionSlug: 'notes'
---

- [Tree Traversal](/notes/dsa/programiz-course/04-tree-based-dsa-i/tree-traversal)
- [Binary Tree](/notes/dsa/programiz-course/04-tree-based-dsa-i/binary-tree)

## [Tree Data Structure](https://www.programiz.com/dsa/trees)

- non-linear, hierarchical data structure consisting of nodes connected by edges

## Why [use a] Tree Data Structure?

- different tree data structures allow quicker and easier access to data

<br />

---

## Tree Terminologies

### Node

- entity that contains key or value and pointers to child nodes
- last nodes of each path called **leaf nodes** or **external nodes**
    - do not contain link/pointer to child nodes
- any node having at least 1 child node called **internal node**

### Edge

- link between any two nodes

### Root

- topmost node of tree

### Height of a Node

- number of edges from the node to the deepest leaf (i.e. the longest path from the node to a leaf node)

### Depth of a Node

- number of edges from root to the node

### Height of a Tree

- height of root node (or depth of deepest node)

### Degree of a Node

- total number of branches of that node

### Forest

- collection of disjoint trees

<br />

---

## Types of Tree

- [Binary Tree](https://www.programiz.com/dsa/binary-tree)
- [Binary Search Tree](https://www.programiz.com/dsa/binary-search-tree)
- [AVL Tree](https://www.programiz.com/dsa/avl-tree)
- [B-Tree](https://www.programiz.com/dsa/b-tree)

## Tree Traversal

- tree traversal algorithm helps visit required node in tree
- see [tree traversal](https://www.programiz.com/dsa/tree-traversal)

## Tree Applications

- Binary Search Trees used to quickly check whether element is present in a set or not
- Heap is kind of tree used for heap sort
- modified version of tree called Tries used in modern routers to store routing information
- Most popular databases use B-Trees and T-Trees to store data
- Compilers use a syntax tree to validate syntax of every program you write
