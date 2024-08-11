---
title: 'DSA Programiz Course: Graph-based DSA - Breadth-First Search'
date: '2024-08-11'
fullPath: '/notes/dsa/programiz-course/06-graph-based-dsa/breadth-first-search'
sectionSlug: 'notes'
---

# [Breadth-First Search](https://www.programiz.com/dsa/graph-bfs)

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

## Breadth-First Search Example

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

## BFS Implementation in Python, Java, and C++

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

### Complexity of Breadth-First Search

- time complexity of BFS algorithm is `O(V + E)`, where `V` is number of nodes and `E` is number of edges
- space complexity is `O(V)`

### Applications of BFS Algorithm

- build index by search index
- GPS navigation
- path-finding algorithms
- in Ford-Fulkerson algorithm to find maximum flow in network
- cycle detection in an undirected graph
- in [minimum spanning tree](https://www.programiz.com/dsa/spanning-tree-and-minimum-spanning-tree)
