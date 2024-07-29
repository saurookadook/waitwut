---
title: 'DSA Programmiz Course: Graph-based DSA'
date: '2024-07-11'
fullPath: '/notes/dsa/programmiz-course/06-graph-based-dsa'
sectionSlug: 'notes'
---

# [Graph Data Structure](https://www.programiz.com/dsa/graph)

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

<br/>

---


# [Strongly Connected Components](https://www.programiz.com/dsa/strongly-connected-components)

- a strongly connected component is portion of directed graph in which there is path from each vertex to another vertex
    - NOTE: only applicable to a directed graph

_see examples in `examples/06_GRAPH_BASED_DSA/_images/strongly-connected-components`_
- _scc-initial-graph.webp_
- _scc-strongly-connected-components.webp_

- strongly connected components can be found using **Kosaraju's Algorithm**

---

## Kosaraju's Algorithm

- based on [the depth-first search algorithm](https://www.programiz.com/dsa/graph-dfs) implemented twice
- three steps involved:
    1. perform depth-first search on whole graph
        - step 1-1
            a. start from vertex-0
            b. visit all its child vertices
            c. mark visited vertices as done
            d. if a vertex leads to an already-visited vertex, then push that vertex to the stack
            - for example:
                a. starting from vertex-0
                b. go to vertex-1, vertex-2, then vertex-3
                c. vertex-3 leads to already-visited vertex-0, so push source vertex (vertex-3) to the stack
            _see `examples/06_GRAPH_BASED_DSA/_images/kosarajus-algorithm/scc-kosarajus-algo_step-1-1`_
        - step 1-2
            a. go to previous vertex (vertex-2) and visit its child vertices (vertex-4, vertex-5, vertex-6, and vertex-7, sequentially)
            b. since there's nowhere to go from vertex-7, push it to the stack
            _see `examples/06_GRAPH_BASED_DSA/_images/kosarajus-algorithm/scc-kosarajus-algo_step-1-2`_
        - step 1-3
            a. go to previous vertex (vertex-6) and visit its child vertices
            b. all its child vertices are visited so push it to the stack
            _see `examples/06_GRAPH_BASED_DSA/_images/kosarajus-algorithm/scc-kosarajus-algo_step-1-3`_
        - step 1-4
            a. final stack is created
            _see `examples/06_GRAPH_BASED_DSA/_images/kosarajus-algorithm/scc-kosarajus-algo_step-1-4`_
    2. reverse original graph
        _see `examples/06_GRAPH_BASED_DSA/_images/kosarajus-algorithm/scc-kosarajus-algo_reversed-graph`_
    3. perform depth-first search on reversed graph
        - step 2-1
            a. start from top vertex of stack
            b. traverse through all its child vertices
            c. once already-visited vertex is reached, one strongly connected component is formed
            - for example:
                a. pop vertex-0 from stack
                b. starting from vertex-0, traverse through its child vertices (vertex-0, vertex-1, vertex-2, vertex-3 in sequence) and mark them as visited
                c. child of vertex-3 is already-visited, so these visited vertices form one strongly-connected component
                _see `examples/06_GRAPH_BASED_DSA/_images/kosarajus-algorithm/scc-kosarajus-algo_reversed-step-2_1`_
        - step 2-2
            a. go to stack and pop top vertex if already visited
            b. otherwise, choose top vertex from stack and traverse through child vertices
            _see `examples/06_GRAPH_BASED_DSA/_images/kosarajus-algorithm/scc-kosarajus-algo_reversed-step-2_2`_
            _see `examples/06_GRAPH_BASED_DSA/_images/kosarajus-algorithm/scc-kosarajus-algo_reversed-step-2_3`_
    4. finally, you are left with strongly connected components:
        _see `examples/06_GRAPH_BASED_DSA/_images/kosarajus-algorithm/scc-kosarajus-algo_strongly-connected-components`_

### Kosaraju's Algorithm Complexity

- runs in linear time _(i.e. `O(V+E)`)_

### Strongly Connected Components Applications

- vehicle routing applications
- maps
- model-checking in formal verification

## Implementations

<details>

<summary>

**Python**

</summary>

```python
from collections import defaultdict


class Graph:

    def __init__(self, vertex):
        self.V = vertex
        self.graph = defaultdict(list)

    # Add edge into the graph
    def add_edge(self, s, d):
        self.graph[s].append(d)

    # dfs
    def dfs(self, d, visited_vertex):
        visited_vertex[d] = True
        print(d, end='')
        for i in self.graph[d]:
            if not visited_vertex[i]:
                self.dfs(i, visited_vertex)

    def fill_order(self, d, visited_vertex, stack):
        visited_vertex[d] = True
        for i in self.graph[d]:
            if not visited_vertex[i]:
                self.fill_order(i, visited_vertex, stack)
        stack = stack.append(d)

    # transpose the matrix
    def transpose(self):
        g = Graph(self.V)

        for i in self.graph:
            for j in self.graph[i]:
                g.add_edge(j, i)
        return g

    # Print stongly connected components
    def print_scc(self):
        stack = []
        visited_vertex = [False] * (self.V)

        for i in range(self.V):
            if not visited_vertex[i]:
                self.fill_order(i, visited_vertex, stack)

        gr = self.transpose()

        visited_vertex = [False] * (self.V)

        while stack:
            i = stack.pop()
            if not visited_vertex[i]:
                gr.dfs(i, visited_vertex)
                print("")


g = Graph(8)
g.add_edge(0, 1)
g.add_edge(1, 2)
g.add_edge(2, 3)
g.add_edge(2, 4)
g.add_edge(3, 0)
g.add_edge(4, 5)
g.add_edge(5, 6)
g.add_edge(6, 4)
g.add_edge(6, 7)

print("Strongly Connected Components:")
g.print_scc()

```

</details>

<details>

<summary>

**C++**

</summary>

```cpp
#include <iostream>
#include <list>
#include <stack>

using namespace std;

class Graph {
  int V;
  list<int> *adj;
  void fillOrder(int s, bool visitedV[], stack<int> &Stack);
  void DFS(int s, bool visitedV[]);

   public:
  Graph(int V);
  void addEdge(int s, int d);
  void printSCC();
  Graph transpose();
};

Graph::Graph(int V) {
  this->V = V;
  adj = new list<int>[V];
}

// DFS
void Graph::DFS(int s, bool visitedV[]) {
  visitedV[s] = true;
  cout << s << " ";

  list<int>::iterator i;
  for (i = adj[s].begin(); i != adj[s].end(); ++i)
    if (!visitedV[*i])
      DFS(*i, visitedV);
}

// Transpose
Graph Graph::transpose() {
  Graph g(V);
  for (int s = 0; s < V; s++) {
    list<int>::iterator i;
    for (i = adj[s].begin(); i != adj[s].end(); ++i) {
      g.adj[*i].push_back(s);
    }
  }
  return g;
}

// Add edge into the graph
void Graph::addEdge(int s, int d) {
  adj[s].push_back(d);
}

void Graph::fillOrder(int s, bool visitedV[], stack<int> &Stack) {
  visitedV[s] = true;

  list<int>::iterator i;
  for (i = adj[s].begin(); i != adj[s].end(); ++i)
    if (!visitedV[*i])
      fillOrder(*i, visitedV, Stack);

  Stack.push(s);
}

// Print strongly connected component
void Graph::printSCC() {
  stack<int> Stack;

  bool *visitedV = new bool[V];
  for (int i = 0; i < V; i++)
    visitedV[i] = false;

  for (int i = 0; i < V; i++)
    if (visitedV[i] == false)
      fillOrder(i, visitedV, Stack);

  Graph gr = transpose();

  for (int i = 0; i < V; i++)
    visitedV[i] = false;

  while (Stack.empty() == false) {
    int s = Stack.top();
    Stack.pop();

    if (visitedV[s] == false) {
      gr.DFS(s, visitedV);
      cout << endl;
    }
  }
}

int main() {
  Graph g(8);
  g.addEdge(0, 1);
  g.addEdge(1, 2);
  g.addEdge(2, 3);
  g.addEdge(2, 4);
  g.addEdge(3, 0);
  g.addEdge(4, 5);
  g.addEdge(5, 6);
  g.addEdge(6, 4);
  g.addEdge(6, 7);

  cout << "Strongly Connected Components:\n";
  g.printSCC();
}

```

</details>

<details>

<summary>

**Java**

</summary>

```java
import java.util.*;
import java.util.LinkedList;

class Graph {
    private int V;
    private LinkedList<Integer> adj[];

    // Create a graph
    Graph(int s) {
        V = s;
        adj = new LinkedList[s];
        for (int i = 0; i < s; ++i)
            adj[i] = new LinkedList();
    }

  // Add edge
    void addEdge(int s, int d) {
        adj[s].add(d);
    }

    // DFS
    void DFSUtil(int s, boolean visitedVertices[]) {
        visitedVertices[s] = true;
        System.out.print(s + " ");
        int n;

        Iterator<Integer> i = adj[s].iterator();
        while (i.hasNext()) {
            n = i.next();
            if (!visitedVertices[n])
                DFSUtil(n, visitedVertices);
        }
    }

    // Transpose the graph
    Graph Transpose() {
        Graph g = new Graph(V);
        for (int s = 0; s < V; s++) {
            Iterator<Integer> i = adj[s].listIterator();
            while (i.hasNext())
                g.adj[i.next()].add(s);
        }
        return g;
    }

    void fillOrder(int s, boolean visitedVertices[], Stack stack) {
        visitedVertices[s] = true;

        Iterator<Integer> i = adj[s].iterator();
        while (i.hasNext()) {
            int n = i.next();
            if (!visitedVertices[n])
                fillOrder(n, visitedVertices, stack);
        }
        stack.push(new Integer(s));
    }

    // Print strongly connected component
    void printSCC() {
        Stack stack = new Stack();

        boolean visitedVertices[] = new boolean[V];
        for (int i = 0; i < V; i++)
            visitedVertices[i] = false;

        for (int i = 0; i < V; i++)
            if (visitedVertices[i] == false)
                fillOrder(i, visitedVertices, stack);

        Graph gr = Transpose();

        for (int i = 0; i < V; i++)
            visitedVertices[i] = false;

        while (stack.empty() == false) {
            int s = (int) stack.pop();

            if (visitedVertices[s] == false) {
                gr.DFSUtil(s, visitedVertices);
                System.out.println();
            }
        }
    }

    public static void main(String args[]) {
        Graph g = new Graph(8);
        g.addEdge(0, 1);
        g.addEdge(1, 2);
        g.addEdge(2, 3);
        g.addEdge(2, 4);
        g.addEdge(3, 0);
        g.addEdge(4, 5);
        g.addEdge(5, 6);
        g.addEdge(6, 4);
        g.addEdge(6, 7);

        System.out.println("Strongly Connected Components:");
        g.printSCC();
    }
}

```

</details>

<br/>

---

# [Adjacency Matrix](https://www.programiz.com/dsa/graph-adjacency-matrix)

- adjacency matrix is way of representing graph as matrix of booleans (0's and 1's)
- finite graph can be represented in form of a square matrix, where boolean value of matrix indicates if there is a direct path between two vertices

example graph:
_see `examples/06_GRAPH_BASED_DSA/_images/basic-undirected-graph`_

represented as matrix:

```
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
_see `examples/06_GRAPH_BASED_DSA/_images/adjacency-matrix/adjacency-matrix_graph-representation_1`_

- each cell represented as `A[i][j]`, where `i` and `j` are vertices
- value of `A[i][j]` is either 1 or 0 depending on whether there is an edge from vertex `i` to vertex `j`

<br/>

---

## Pros of Adjacency Matrix

- basic operations such as adding edge, removing edge, checking existence of edge from vertex `i` to vertex `j` are extremly time efficient _(constant time operations)_
- if graph is dense and number of edges is large, adjacency matrix should be first choice
    - even if graph and adjacency matrix are sparse, can be represented using data structures for sparse matrices
- biggest advantage comes from use of matrices
    - recent advances in hardware enable performing expensive matrix operations on GPU
- by performing operations on adjacency matrix, can get important insights into nature of graph and relationship between its vertices

## Cons of Adjacency Matrix

- `VxV` space requirement of adjacency matrix makes it a memory hog
    - graphs "out in the wild" usually don't have too many connections, which is major reason why adjacency lists are usually better
- operations like `inEdges` and `outEdges` are expensive when using adjacency matrix representation

<br/>

---

## Implementations

<details>

<summary>

**Python**

</summary>

```python
class Graph(object):

    # Initialize the matrix
    def __init__(self, size):
        self.adjMatrix = []
        for i in range(size):
            self.adjMatrix.append([0 for i in range(size)])
        self.size = size

    # Add edges
    def add_edge(self, v1, v2):
        if v1 == v2:
            print("Same vertex %d and %d" % (v1, v2))
        self.adjMatrix[v1][v2] = 1
        self.adjMatrix[v2][v1] = 1

    # Remove edges
    def remove_edge(self, v1, v2):
        if self.adjMatrix[v1][v2] == 0:
            print("No edge between %d and %d" % (v1, v2))
            return
        self.adjMatrix[v1][v2] = 0
        self.adjMatrix[v2][v1] = 0

    def __len__(self):
        return self.size

    # Print the matrix
    def print_matrix(self):
        for row in self.adjMatrix:
            for val in row:
                print('{:4}'.format(val)),
            print


def main():
    g = Graph(5)
    g.add_edge(0, 1)
    g.add_edge(0, 2)
    g.add_edge(1, 2)
    g.add_edge(2, 0)
    g.add_edge(2, 3)

    g.print_matrix()


if __name__ == '__main__':
    main()

```

</details>

<details>

<summary>

**C++**

</summary>

```cpp
#include <iostream>
using namespace std;

class Graph {
   private:
  bool** adjMatrix;
  int numVertices;

   public:
  // Initialize the matrix to zero
  Graph(int numVertices) {
    this->numVertices = numVertices;
    adjMatrix = new bool*[numVertices];
    for (int i = 0; i < numVertices; i++) {
      adjMatrix[i] = new bool[numVertices];
      for (int j = 0; j < numVertices; j++)
        adjMatrix[i][j] = false;
    }
  }

  // Add edges
  void addEdge(int i, int j) {
    adjMatrix[i][j] = true;
    adjMatrix[j][i] = true;
  }

  // Remove edges
  void removeEdge(int i, int j) {
    adjMatrix[i][j] = false;
    adjMatrix[j][i] = false;
  }

  // Print the martix
  void toString() {
    for (int i = 0; i < numVertices; i++) {
      cout << i << " : ";
      for (int j = 0; j < numVertices; j++)
        cout << adjMatrix[i][j] << " ";
      cout << "\n";
    }
  }

  ~Graph() {
    for (int i = 0; i < numVertices; i++)
      delete[] adjMatrix[i];
    delete[] adjMatrix;
  }
};

int main() {
  Graph g(4);

  g.addEdge(0, 1);
  g.addEdge(0, 2);
  g.addEdge(1, 2);
  g.addEdge(2, 0);
  g.addEdge(2, 3);

  g.toString();
}

```

</details>

<details>

<summary>

**Java**

</summary>

```java
public class Graph {
  private boolean adjMatrix[][];
  private int numVertices;

  // Initialize the matrix
  public Graph(int numVertices) {
    this.numVertices = numVertices;
    adjMatrix = new boolean[numVertices][numVertices];
  }

  // Add edges
  public void addEdge(int i, int j) {
    adjMatrix[i][j] = true;
    adjMatrix[j][i] = true;
  }

  // Remove edges
  public void removeEdge(int i, int j) {
    adjMatrix[i][j] = false;
    adjMatrix[j][i] = false;
  }

  // Print the matrix
  public String toString() {
    StringBuilder s = new StringBuilder();
    for (int i = 0; i < numVertices; i++) {
      s.append(i + ": ");
      for (boolean j : adjMatrix[i]) {
        s.append((j ? 1 : 0) + " ");
      }
      s.append("\n");
    }
    return s.toString();
  }

  public static void main(String args[]) {
    Graph g = new Graph(4);

    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 2);
    g.addEdge(2, 0);
    g.addEdge(2, 3);

    System.out.print(g.toString());
  }
}

```

</details>

<br/>

---

## Adjacency Matrix Applications

- creating routing table in networks
- navigation tasks


<br/>

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

<br/>

---

# [DFS Algorithm](https://www.programiz.com/dsa/graph-dfs)

- **Depth-First Search** (or **Depth-First Traversal**) is recursive algorithm for searching all vertices in graph or tree data structure
    - _traversal = visiting all nodes of a graph_

## Depth-First Search Algorithm

- standard DFS implementation puts each vertex of graph into one of two categories:
    1. Visited
    2. Not Visited
- purpose of algorithm is to mark each vertex as visited while avoiding cycles
- **DFS algorithm works as follows:**
    1. put any one of graph's vertices on top of a Stack
    2. take top item of Stack and add it to Visited List
    3. create List of that vertex's adjacent nodes, and add ones which aren't in Visited List to top of Stack
    4. repeat steps 2 and 3 until Stack is empty

<br/>

---

## Depth-First Search Example

- Step 0
    - _see `examples/06_GRAPH_BASED_DSA/_images/depth-first-search/graph-dfs-step-0`_
- Step 1
    - start from vertex 0
    - put it in Visited List and put its adjacent vertices in Stack
    - _see `examples/06_GRAPH_BASED_DSA/_images/depth-first-search/graph-dfs-step-1`_
- Step 2
    - visit element at top of Stack and go to its adjacent nodes
    - in this example: since 0 has already been visited, we visit 2 instead
    - _see `examples/06_GRAPH_BASED_DSA/_images/depth-first-search/graph-dfs-step-2`_
- Steps 3 and 4
    - Vertex 2 has unvisited adjacent vertex in 4, so add that to top of Stack and visit it
    - _see `examples/06_GRAPH_BASED_DSA/_images/depth-first-search/graph-dfs-step-3`_
    - _see `examples/06_GRAPH_BASED_DSA/_images/depth-first-search/graph-dfs-step-4`_
- Step 5
    - after visiting last element 3, it doesn't have any unvisited adjacent nodes so we have completed Depth-First Traversal of graph
    - _see `examples/06_GRAPH_BASED_DSA/_images/depth-first-search/graph-dfs-step-5`_

<br/>

---

## DFS Pseudocode (recursive implementation)

- in `init()` function, we run DFS function on every node
    - since graph might have two different disconnected parts, doing this ensures that we cover every vertex

```
// ∈ = "is an element of"

// shorthand
DFS(G, u)
    u.visited = true
    For each v ∈ G.Adj[u]
        if v.visited == false
            DFS(G, v)

init() {
    For each u ∈ G
        u.visited = false
    For each u ∈ G // is this necessary?
        DFS(G, u)
}


// clearer wording
DepthFirstSearch(Graph, u)
    u.visited = true
    For each vertex ∈ Graph.Adj[u]
        if vertex.visited == false
            DepthFirstSearch(Graph, vertex)

init() {
    For each u ∈ G
        u.visited = false
    For each u ∈ G
        DepthFirstSearch(Graph, u)
}
```

<br/>

---

## DFS Implementation in Python, Java, and C++

> **NODE**: code has been simplified in order to focus on algorithm rather than other details

_see `examples/06_GRAPH_BASED_DSA/depth-first-search`_

<details>

<summary>

**Python**

</summary>

```python
def depth_first_search(graph, start, visited=None):
        if visited is None:
            visited = set()
        visited.add(start)

        print(start)

        for next in graph[start] - visited:
            depth_first_search(graph, next, visited)
        return visited


graph = {
    '0': set(['1', '2']),
    '1': set(['0', '3', '4']),
    '2': set(['0']),
    '3': set(['1']),
    '4': set(['2', '3']),
}

depth_first_search(graph, '0')

```

</details>

<details>

<summary>

**C++**

</summary>

```cpp
#include <iostream>
#include <list>
using namespace std;

class Graph {
  int numVertices;
  list<int> *adjLists;
  bool *visited;

   public:
  Graph(int V);
  void addEdge(int src, int dest);
  void DFS(int vertex);
};

// Initialize graph
Graph::Graph(int vertices) {
  numVertices = vertices;
  adjLists = new list<int>[vertices];
  visited = new bool[vertices];
}

// Add edges
void Graph::addEdge(int src, int dest) {
  adjLists[src].push_front(dest);
}

// DFS algorithm
void Graph::DFS(int vertex) {
  visited[vertex] = true;
  list<int> adjList = adjLists[vertex];

  cout << vertex << " ";

  list<int>::iterator i;
  for (i = adjList.begin(); i != adjList.end(); ++i)
    if (!visited[*i])
      DFS(*i);
}

int main() {
  Graph g(4);
  g.addEdge(0, 1);
  g.addEdge(0, 2);
  g.addEdge(1, 2);
  g.addEdge(2, 3);

  g.DFS(2);

  return 0;
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
    private LinkedList<Integer> adjLists[];
    private boolean visited[];

    // Graph creation
    Graph(int vertices) {
        adjLists = new LinkedList[vertices];
        visited = new boolean[vertices];

        for (int i = 0; i < vertices; i++) {
            adjLists[i] = new LinkedList<Integer>();
        }
    }

    // Add edges
    void addEdge(int src, int dest) {
        adjLists[src].add(dest);
    }

    // DFS Algorithm
    void depthFirstSearch(int vertex) {
        visited[vertex] = true;
        System.out.print(vertex + " ");

        Iterator<Integer> iterator = adjLists[vertex].listIterator();
        while (iterator.hasNex()) {
            int adjacent = iterator.next();
            if (!visited[adjacent]) {
                depthFirstSearch(adjacent);
            }
        }
    }

    public static void main(String args[]) {
        Graph g = new Graph(4);

        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 2);
        g.addEdge(2, 3);

        System.out.println("Following is Depth First Traversal for 2");

        g.depthFirstSearch(2);
    }
}

```

</details>

### Complexity of Depth-First Search

- time complexity of DFS algorithm is `O(V + E)`, where `V` is number of nodes and `E` is number of edges
- space complexity is `O(V)`

### Applications of DFS Algorithm

- finding the path (of what...?)
- test if graph is [bipartite](https://mathworld.wolfram.com/BipartiteGraph.html#:~:text=A%20bipartite%20graph%2C%20also%20called,the%20same%20set%20are%20adjacent.)
- finding strongly connected components of graph
- detecting cycles in graph

<br/>

---

# [Breadth-first Search](https://www.programiz.com/dsa/graph-bfs)

- **Breadth-First Search** (or **Breadth-First Traversal**) is recursive algorithm for searching all vertices of graph or tree data structure

## Breadth-First Search Algorithm

- standard BFS implementation puts each vertex of graph into one of two categories:
    1. Visited
    2. Not Visited
- purpose of algorithm is to mark each vertex as visited while avoiding cycles
- **BFS algorithm works as follows:**
    1. put any one of graph's vertices at back of Queue
    2. take front item of Queue and add it to Visited List
    3. create List of that vertex's adjacent nodes, and add ones which aren't in Visited List to back of Queue
    4. repeat steps 2 and 3 until queue is empty
- since graph might have two different disconnected parts, should run BFS algorithm on every node to ensure that we cover all vertices

<br/>

---

## Depth-First Search Example

- Step 0
    - _see `examples/06_GRAPH_BASED_DSA/_images/breadth-first-search/graph-bfs-step-0`_
- Step 1
    - start from vertex 0
    - put it in Visited List and put its adjacent vertices in Queue
    - _see `examples/06_GRAPH_BASED_DSA/_images/breadth-first-search/graph-bfs-step-1`_
- Step 2
    - visit element at front of Queue and go to its adjacent nodes
    - in this example: since 0 has already been visited, we visit 2 instead
    - _see `examples/06_GRAPH_BASED_DSA/_images/breadth-first-search/graph-bfs-step-2`_
- Steps 3 and 4
    - Vertex 2 has unvisited adjacent vertex in 4, so add that to back of Queue and visit 3, which is at front of Queue
    - _see `examples/06_GRAPH_BASED_DSA/_images/breadth-first-search/graph-bfs-step-3`_
    - _see `examples/06_GRAPH_BASED_DSA/_images/breadth-first-search/graph-bfs-step-4`_
- Step 5
    - since only adjacent node of 3 (i.e. 0) has already been visited and only 4 remains in Queue, visit 4
    - queue is empty, which means Breadth-First Traversal of graph is complete
    - _see `examples/06_GRAPH_BASED_DSA/_images/breadth-first-search/graph-bfs-step-5`_

## BFS pseudocode

```
create a queue Q
mark vertex as visited and put vertex into Q
while Q is non-empty
    remove head of u of Q
    mark and enqueue all (unvisited) neighbors of u
```

<br/>

---

## DFS Implementation in Python, Java, and C++

> **NOTE**: code has been simplified in order to focus on algorithm rather than other details

<details>

<summary>

**Python**

</summary>

```python
import collections

# BFS algorithm
def bfs(graph, root):

    visited, queue = set(), collections.deque([root])
    visited.add(root)

    while queue:

        # Dequeue a vertex from queue
        vertex = queue.popleft()
        print(str(vertex) + " ", end="")

        # If not visited, mark it as visited, and
        # enqueue it
        for neighbour in graph[vertex]:
            if neighbour not in visited:
                visited.add(neighbour)
                queue.append(neighbour)


if __name__ == '__main__':
    graph = {0: [1, 2], 1: [2], 2: [3], 3: [1, 2]}
    print("Following is Breadth First Traversal: ")
    bfs(graph, 0)

```

</details>

<details>

<summary>

**C++**

</summary>

```cpp
#include <iostream>
#include <list>

using namespace std;

class Graph {
  int numVertices;
  list<int>* adjLists;
  bool* visited;

   public:
  Graph(int vertices);
  void addEdge(int src, int dest);
  void BFS(int startVertex);
};

// Create a graph with given vertices,
// and maintain an adjacency list
Graph::Graph(int vertices) {
  numVertices = vertices;
  adjLists = new list<int>[vertices];
}

// Add edges to the graph
void Graph::addEdge(int src, int dest) {
  adjLists[src].push_back(dest);
  adjLists[dest].push_back(src);
}

// BFS algorithm
void Graph::BFS(int startVertex) {
  visited = new bool[numVertices];
  for (int i = 0; i < numVertices; i++)
    visited[i] = false;

  list<int> queue;

  visited[startVertex] = true;
  queue.push_back(startVertex);

  list<int>::iterator i;

  while (!queue.empty()) {
    int currVertex = queue.front();
    cout << "Visited " << currVertex << " ";
    queue.pop_front();

    for (i = adjLists[currVertex].begin(); i != adjLists[currVertex].end(); ++i) {
      int adjVertex = *i;
      if (!visited[adjVertex]) {
        visited[adjVertex] = true;
        queue.push_back(adjVertex);
      }
    }
  }
}

int main() {
  Graph g(4);
  g.addEdge(0, 1);
  g.addEdge(0, 2);
  g.addEdge(1, 2);
  g.addEdge(2, 0);
  g.addEdge(2, 3);
  g.addEdge(3, 3);

  g.BFS(2);

  return 0;
}

```

</details>

<details>

<summary>

**Java**

</summary>

```java
import java.util.*;

public class Graph {
  private int V;
  private LinkedList<Integer> adj[];

  // Create a graph
  Graph(int v) {
    V = v;
    adj = new LinkedList[v];
    for (int i = 0; i < v; ++i)
      adj[i] = new LinkedList();
  }

  // Add edges to the graph
  void addEdge(int v, int w) {
    adj[v].add(w);
  }

  // BFS algorithm
  void BFS(int s) {

    boolean visited[] = new boolean[V];

    LinkedList<Integer> queue = new LinkedList();

    visited[s] = true;
    queue.add(s);

    while (queue.size() != 0) {
      s = queue.poll();
      System.out.print(s + " ");

      Iterator<Integer> i = adj[s].listIterator();
      while (i.hasNext()) {
        int n = i.next();
        if (!visited[n]) {
          visited[n] = true;
          queue.add(n);
        }
      }
    }
  }

  public static void main(String args[]) {
    Graph g = new Graph(4);

    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 2);
    g.addEdge(2, 0);
    g.addEdge(2, 3);
    g.addEdge(3, 3);

    System.out.println("Following is Breadth First Traversal " + "(starting from vertex 2)");

    g.BFS(2);
  }
}

```

</details>

### Complexity of Depth-First Search

- time complexity of DFS algorithm is `O(V + E)`, where `V` is number of nodes and `E` is number of edges
- space complexity is `O(V)`

### Applications of BFS Algorithm

- build index by search index
- GPS navigation
- path-finding algorithms
- in Ford-Fulkerson algorithm to find maximum flow in network
- cycle detection in an undirected graph
- in [minimum spanning tree](https://www.programiz.com/dsa/spanning-tree-and-minimum-spanning-tree)

<br/>

---

# [Bellman Ford's Algorithm](https://www.programiz.com/dsa/bellman-ford-algorithm)

- helps find shortest path from vertex to all other vertices of weighted graph
- similar to [Dijkstra's algorithm](https://www.programiz.com/dsa/dijkstra-algorithm) but can work with graphs in which edges can have negative weights

## Why would one ever have edges with negative weights in real life?

- can explain phenomena like cashflow, heat released/absorbed in chemical reaction, etc.
    - example: if there are different ways to reach from one chemical A to another chemical B, each method will have sub-reactions involving heat dissipation and absorption
    - if we want to find set of reactions where minimum energy is required, need to be able to factor in heat absorption as negative weights and heat dissipation as positive weights

## Why do we need to be careful with negative weights?

- negative weight edges can create negative weight cycles
    - _i.e. cycle that will reduce total path distance by coming back to same point_
    - _see `examples/06_GRAPH_BASED_DSA/_images/bellman-fords-algorithm/negative-weight-cycle_1`_
- shortest path algorithms like Dijkstra's Algorithm that aren't able to detect such a cycle can give incorrect result because they can go through negative weight cycle and reduce path length

<br/>

---

## How Bellman Ford's Algorithm Works

- works by:
    - overestimating length of path from starting vertex to all other vertices
    - then iteratively relaxes those estimates by finding new paths that are shorter than previously overestimated paths
- by doing this repeatedly for all vertices, can guarantee result is optimized

- Step 1:
    - start with weighted graph
![Bellman Ford Algorithm: Step 1](./examples/06_GRAPH_BASED_DSA/_images/bellman-fords-algorithm/Bellman-Ford-Algorithm-1)
- Step 2:
    - choose starting vertex and assign infinity path values to all other vertices
![Bellman Ford Algorithm: Step 2](./examples/06_GRAPH_BASED_DSA/_images/bellman-fords-algorithm/Bellman-Ford-Algorithm-2)
- Step 3:
    - visit each edge and relax the path distances if they are inaccurate
![Bellman Ford Algorithm: Step 3](./examples/06_GRAPH_BASED_DSA/_images/bellman-fords-algorithm/Bellman-Ford-Algorithm-3)
- Step 4:
    - need to do this V times because in worst case, vertex's path length might need to be readjusted V times
![Bellman Ford Algorithm: Step 4](./examples/06_GRAPH_BASED_DSA/_images/bellman-fords-algorithm/Bellman-Ford-Algorithm-4)
- Step 5:
    - notice how vertex at top right corner had its path length adjusted
![Bellman Ford Algorithm: Step 5](./examples/06_GRAPH_BASED_DSA/_images/bellman-fords-algorithm/Bellman-Ford-Algorithm-5)
- Step 6:
    - after all vertices have their path lengths, we check if negative cycle is present
![Bellman Ford Algorithm: Step 6](./examples/06_GRAPH_BASED_DSA/_images/bellman-fords-algorithm/Bellman-Ford-Algorithm-6)

<br/>

---

## Bellman Ford Pseudocode

- need to maintain path distance of every vertex
- can store that in array of size v, where v is number of vertices
- also want to be able to get shortest path, not only know length of shortest path
    - for this, map each vertex to the vertex that last updated its path lengths
- once algorithm is over, can backtrack from destination vertex to source vertex to find path

```
// G = graph
// S = source
// V = vertex
// U = edge

function bellmanFord(G, S)
    for each vertex V in G
        distance[V] <- infinite
        previous[V] <- NULL
    distance[S] <- 0

    for each vertex V in G
        for each edge (U, V) in G
            tempDistance <- distance[U] + edge_weight(U, V)
            if tempDistance < distance[V]
                distance[V] <- tempDistance
                previous[V] <- U

    for each edge (U, V) in G
        if distance[U] + edge_weight(U, V) < distance[V]
            Error: Negative Cycle Exists

    return distance[], previous[]
```

<br/>

---

## Bellman Ford vs Dijkstra

- both very similar in structure
- Dijkstra's only looks to immediate neighbors of vertex
- Bellman Ford's goes through each edge in every iteration
![Bellman Ford's Algorithm vs Dijkstra's Algorithm](./examples/06_GRAPH_BASED_DSA/_images/bellman-fords-algorithm/bellman-ford-vs-dijkstra)

## Bellman Ford's Algorithm Implementation in Python, Java, and C++

_see `examples/06_GRAPH_BASED_DSA/bellman-fords-algorithm`_

<details>

<summary>

**Python**

</summary>

```python
```

</details>

<details>

<summary>

**C++**

</summary>

```cpp
#include <bits/stdc++.h>

// Struct for the edges of the graph
struct Edge {
  int u;  //start vertex of the edge
  int v;  //end vertex of the edge
  int w;  //w of the edge (u,v)
};

// Graph - it consists of edges
struct Graph {
  int V;        // Total number of vertices in the graph
  int E;        // Total number of edges in the graph
  struct Edge* edge;  // Array of edges
};

// Creates a graph with V vertices and E edges
struct Graph* createGraph(int V, int E) {
  struct Graph* graph = new Graph;
  graph->V = V;  // Total Vertices
  graph->E = E;  // Total edges

  // Array of edges for graph
  graph->edge = new Edge[E];
  return graph;
}

// Printing the solution
void printArr(int arr[], int size) {
  int i;
  for (i = 0; i < size; i++) {
    printf("%d ", arr[i]);
  }
  printf("\n");
}

void BellmanFord(struct Graph* graph, int u) {
  int V = graph->V;
  int E = graph->E;
  int dist[V];

  // Step 1: fill the distance array and predecessor array
  for (int i = 0; i < V; i++)
    dist[i] = INT_MAX;

  // Mark the source vertex
  dist[u] = 0;

  // Step 2: relax edges |V| - 1 times
  for (int i = 1; i <= V - 1; i++) {
    for (int j = 0; j < E; j++) {
      // Get the edge data
      int u = graph->edge[j].u;
      int v = graph->edge[j].v;
      int w = graph->edge[j].w;
      if (dist[u] != INT_MAX && dist[u] + w < dist[v])
        dist[v] = dist[u] + w;
    }
  }

  // Step 3: detect negative cycle
  // if value changes then we have a negative cycle in the graph
  // and we cannot find the shortest distances
  for (int i = 0; i < E; i++) {
    int u = graph->edge[i].u;
    int v = graph->edge[i].v;
    int w = graph->edge[i].w;
    if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
      printf("Graph contains negative w cycle");
      return;
    }
  }

  // No negative weight cycle found!
  // Print the distance and predecessor array
  printArr(dist, V);

  return;
}

int main() {
  // Create a graph
  int V = 5;  // Total vertices
  int E = 8;  // Total edges

  // Array of edges for graph
  struct Graph* graph = createGraph(V, E);

  //------- adding the edges of the graph
  /*
        edge(u, v)
        where 	u = start vertex of the edge (u,v)
                v = end vertex of the edge (u,v)

        w is the weight of the edge (u,v)
    */

  //edge 0 --> 1
  graph->edge[0].u = 0;
  graph->edge[0].v = 1;
  graph->edge[0].w = 5;

  //edge 0 --> 2
  graph->edge[1].u = 0;
  graph->edge[1].v = 2;
  graph->edge[1].w = 4;

  //edge 1 --> 3
  graph->edge[2].u = 1;
  graph->edge[2].v = 3;
  graph->edge[2].w = 3;

  //edge 2 --> 1
  graph->edge[3].u = 2;
  graph->edge[3].v = 1;
  graph->edge[3].w = 6;

  //edge 3 --> 2
  graph->edge[4].u = 3;
  graph->edge[4].v = 2;
  graph->edge[4].w = 2;

  BellmanFord(graph, 0);  //0 is the source vertex

  return 0;
}

```

</details>

<details>

<summary>

**Java**

</summary>

```java
class CreateGraph {

    // CreateGraph - it consists of edges
    class CreateEdge {
        int s;
        int d;
        int w;

        CreateEdge() {
            s = 0;
            d = 0;
            w = 0;
        }
    };

    int V;
    int E;
    CreateEdge edge[];

    // Creates a graph with V vertices and E edges
    CreateGraph(int v, int e) {
        V = v;
        E = e;
        edge = new CreateEdge[e];
        for (int i = 0; i < e; i++) {
            edge[i] = new CreateEdge();
        }
    }

    void BellmanFord(CreateGraph graph, int s) {
        int V = graph.V;
        int E = graph.E;
        int dist[] = new int[V];

        // Step 1: fill distance array and predecessor array
        for (int i = 0; i < V; ++i) {
            dist[i] = Integer.MAX_VALUE;

            // Mark source vertex
            dist[s] = 0;
        }

        // Step 2: relax edges |V| - 1 times
        for (int i = 1; i < V; ++i) {
            for (int j = 0; j < E; ++j) {
                // Get edge data
                int u = graph.edge[j].s;
                int v = graph.edge[j].d;
                int w = graph.edge[j].w;
                if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }
            }
        }

        // Step 3: detect negative cycle
        // if value changes then we have a negative cycle in the graph
        // and we cannot find shortest distances
        for (int j = 0; j < E; ++j) {
            int u = graph.edge[j].s;
            int v = graph.edge[j].d;
            int w = graph.edge[j].w;
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                System.out.println("CreateGraph contains negative w: " + w + " cycle");
                return;
            }
        }

        // No negative 'w' cycle found!
        // Print distance and predecessor array
        printSolution(dist, V);
    }

    // Print solution
    void printSolution(int dist[], int V) {
        System.out.println("Vertex Distance from Source");
        for (int i = 0; i < V; ++i) {
            System.out.println(i + "\t\t" + dist[i]);
        }
    }

    public static void main(String[] args) {
        int V = 5; // Total vertices
        int E = 8; // Total Edges

        CreateGraph graph = new CreateGraph(V, E);

        // edge 0 --> 1
        graph.edge[0].s = 0;
        graph.edge[0].d = 1;
        graph.edge[0].w = 5;

        // edge 0 --> 2
        graph.edge[1].s = 0;
        graph.edge[1].d = 2;
        graph.edge[1].w = 4;

        // edge 1 --> 3
        graph.edge[2].s = 1;
        graph.edge[2].d = 3;
        graph.edge[2].w = 3;

        // edge 2 --> 1
        graph.edge[3].s = 2;
        graph.edge[3].d = 1;
        graph.edge[3].w = 6;

        // edge 3 --> 2
        graph.edge[4].s = 3;
        graph.edge[4].d = 2;
        graph.edge[4].w = 2;

        graph.BellmanFord(graph, 0); // 0 is source vertex
    }
}

```

</details>

---

### Complexity of Bellman Ford's

- time complexity:
    - best case: `O(E)`
    - average case: `O(VE)`
    - worst case: `O(VE)`
- space complexity is `O(V)`

### Applications of BFS Algorithm

- calculating shortest paths in routing algorithms
- finding shortest path
