---
title: 'DSA Programiz Course: Graph-based DSA - Adjacency Matrix'
date: '2024-08-11'
fullPath: '/notes/dsa/programiz-course/06-graph-based-dsa/adjacency-matrix'
sectionSlug: 'notes'
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
