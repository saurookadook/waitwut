---
title: 'DSA Programmiz Course: Graph-based DSA - Adjacency List'
date: '2024-08-11'
fullPath: '/notes/dsa/programmiz-course/06-graph-based-dsa/adjacency-list'
sectionSlug: 'notes'
---

# [Adjacency List](https://www.programiz.com/dsa/graph-adjacency-list)

- adjacency list represents graph as array of linked lists
- index of array represents vertex
- each element index's linked list represents other vertices that form an edge with that vertex

example graph:
_see `examples/06_GRAPH_BASED_DSA/_images/basic-undirected-graph`_

```
// Graph adjacency list representation

| V |
| 0 | -> 1 -> 2 -> 3
| 1 | -> 0 -> 2
| 2 | -> 0 -> 1
| 3 | -> 0
```

_see `examples/06_GRAPH_BASED_DSA/_images/adjacency-list/adjacency-list_graph-representation`_

<br/>

---

## Pros of Adjacency List

- efficient in terms of storage, since you only need to store values for edges
- for sparse graph with millions of vertices and edges, this can mean a lot of saved space
- easy to find all vertices adjacent to a vertex

## Cons of Adjacency List

- finding adjacent list is not quicker than adjacency matrix since all connected nodes must be explored to find them

<br/>

---

## Adjacency List Structure

- simplest:
    - needs node data structure to store vertex
    - graph data structure to organize nodes

> _asides:_
> - _stay close to basic definition of graph: collection of vertices and edges_
> - _use unlabeled graph (i.e. vertices identified by their indices) as opposed to a labeled one_

{/*
    TODO: specifying C++ for the block seems to break
    syntax highlighting for rest of file?
*/}

```c
struct node {
    int vertex;
    struct node* next;
}

struct Graph {
    int numVertices;
    struct node** adjLists;
}
```

_see site for explanation of `struct node** adjLists`_

<br/>

---

### Adjacency List in C++

- same structure but can make it cleaner by using built-in list STL data structure of C++

```cpp
class Graph {
    int numVertices;
    list<int> *adjLists;

    public:
        Graph(int V);
        void addEdge(int src, int dest);
};
```

### Adjacency List in Java

- use Java Collections to store Array of LinkedLists
```java
class Graph {
    private int numVertices;
    private LinkedList<integer> adjLists[];
}
```

### Adjacency List in Python

- simple dictionary of vertices and its edges is sufficient representation of graph
```py
graph = {
    'A': set(['B', 'C']),
    'B': set(['A', 'D', 'E']),
    'C': set(['A', 'F']),
    'D': set(['B']),
    'E': set(['B', 'F']),
    'F': set(['C', 'E'])
}
```

<br/>

---

## Implementations

> **NOTE**: THESE ARE INCOMPLETE

<details>

<summary>

**Python**

</summary>

```python
class AdjNode:
    def __init__(self, value):
        self.vertex = value
        self.next = None


class Graph:
    def __init__(self, num):
        self.V = num
        self.graph = [None] * self.V

    # Add edges
    def add_edge(self, src, dest):
        node = AdjNode(dest)
        node.next = self.graph[src]
        self.graph[src] = node

        node = AdjNode(src)
        node.next = self.graph[dest]
        self.graph[dest] = node

    # Print the graph
    def print_graph(self):
        for i in range(self.V):
            print("Vertex " + str(i) + ":", end="")
            temp = self.graph[i]
            while temp:
                print(" -> {}".format(temp.vertex), end="")
                temp = temp.next
            print(" \n")


if __name__ == "__main__":
    V = 5

    # Create graph and edges
    graph = Graph(V)
    graph.add_edge(0, 1)
    graph.add_edge(0, 2)
    graph.add_edge(0, 3)
    graph.add_edge(1, 2)

    graph.print_graph()

```

</details>

<details>

<summary>

**C++**

</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;

// Add edge
void addEdge(vector<int> adj[], int s, int d) {
  adj[s].push_back(d);
  adj[d].push_back(s);
}

// Print the graph
void printGraph(vector<int> adj[], int V) {
  for (int d = 0; d < V; ++d) {
    cout << "\n Vertex "
       << d << ":";
    for (auto x : adj[d])
      cout << "-> " << x;
    printf("\n");
  }
}

int main() {
  int V = 5;

  // Create a graph
  vector<int> adj[V];

  // Add edges
  addEdge(adj, 0, 1);
  addEdge(adj, 0, 2);
  addEdge(adj, 0, 3);
  addEdge(adj, 1, 2);
  printGraph(adj, V);
}

```

</details>

<details>

<summary>

**Java**

</summary>

```java
import java.util.*;

class Graph {
    private int numVertices;
    private LinkedList<integer> adjLists[];

    public static void main(String[] args) {
        int V = 5;
        ArrayList<ArrayList<Integer>> am = new ArrayList<ArrayList<Integer>>(V);

        for (int i = 0; i < V; i++) {
            am.add(new ArrayList<Integer>());
        }

        addEdge(am, 0, 1);
        addEdge(am, 0, 2);
        addEdge(am, 0, 3);
        addEdge(am, 1, 2);

        printGraph(am);
    }

    // seems like this should use LinkedLists?
    static void addEdge(
        ArrayList<ArrayList<Integer>> adjMatrix,
        int src,
        int dest
    ) {
        am.get(s).add(d);
        am.get(d).add(s);
    }

    static void printGraph(ArrayList<ArrayList<Integer>> am) {
        for (int i = 0; i < am.size(); i++) {
            System.out.println("\nVertex " + i + ":");
            for (int j = 0; j < am.get(i).size(); j++) {
                System.out.print(" -> " + am.get(i).get(j));
            }
            System.out.println();
        }
    }
}

```

</details>

<br/>

---

## Adjacency List Applications

- faster to use adjacency lists for graphs having fewer number of edges
- _others??_
