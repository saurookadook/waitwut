---
title: 'Depth-First Search'
date: '2024-08-11'
fullPath: '/notes/dsa/programiz-course/06-graph-based-dsa/depth-first-search'
sectionSlug: 'notes'
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

    # difference_between_start_and_visited === graph[start] - visited
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
