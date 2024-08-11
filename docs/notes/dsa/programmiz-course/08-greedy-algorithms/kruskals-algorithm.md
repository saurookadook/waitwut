---
title: 'DSA Programmiz Course: Greedy Algorithms - Kruskal\'s Algorithm'
date: '2024-08-11'
fullPath: '/notes/dsa/programmiz-course/08-greedy-algorithms/kruskals-algorithm'
sectionSlug: 'notes'
---

# Kruskal's Algorithm

- a [minimum spanning tree algorithm]() that takes a graph as input and finds subset of edges of graph which
    - form a tree including every vertex
    - has minimum sum of weights among all trees that can be formed from the graph

## How it works

- a type of **greedy algorithm**
- start from edges with lowest weight and keep adding edges until reaching the goal
    1. sort edges by weight in ascending order
    2. take edge with lowest weight and add to spanning tree
       1. reject the edge if adding it created a cycle
    3. keep adding edges until we reach all vertices

## Example

1. Start with weighted graph
```
 [ ]       [ ]
  | \    3/   \
  | 4\   /    3\
 4|   [ ] --4-- [ ]
  | 2/   \    3/
  | /    2\   /
 [ ]       [ ]
```
2. Choose edge with least weight _(if there's more than 1, doesn't matter which is chosen)_
```
     [ ]
   2/
   /
[ ]
```
3. Choose next shortest edge and add it
```
     [ ]
   2/   \
   /    2\
[ ]       [ ]
```
4. Choose next shortest edge that doesn't create cycle and add it
```
         [ ]
        3/
        /
     [ ]
   2/   \
   /    2\
[ ]       [ ]
```
5. Again, choose next shortest edge that doesn't create cycle and add it
```
         [ ]
        3/
        /
     [ ]       [ ]
   2/   \    3/
   /    2\   /
[ ]       [ ]
```
6. Repeat until you have a minimum spanning tree
```
 [ ]     [ ]
    \   3/
    4\  /
     [ ]       [ ]
   2/   \    3/
   /    2\   /
[ ]       [ ]
```

## Algorithm in Pseudocode

- any minimum spanning tree algorithm revolves around checking if adding edge creats a loop or not
- most common way to find if that's the case is with a **Union-Find algorithm** which divides verticies into clusters, thereby allowing us to check if two vertices belong to same cluster or not _(in other words, allows us to decide if adding an edge created a cycle)_

```
KRUSKAL(G):
    A = 0
    for each vertex v in G.V:
        MAKE_SET(v)
    for each edge (u, v) in G.E ordered by increasing order by weight (u, v):
        if FIND_SET(u) != FIND_SET(v):
            A = A u {(u, v)}
            UNION(u, v)
    return A
```

## Implementations

<details>

<summary>

**Python**

</summary>

```python
class Graph:
    def __init__(self, vertices):
        self.V = vertices
        self.graph = []

    def add_edge(self, u, v, w):
        self.graph.append([u, v, w])

    # NOTE: this should probably have a condition to prevent infinite recursion :]
    def find(self, parent, i):
        if parent[i] == i:
            return i
        return self.find(parent, parent[i])

    def apply_union(self, parent, rank, x, y):
        x_root = self.find(parent, x)
        y_root = self.find(parent, y)
        if rank[x_root] < rank[y_root]:
            parent[x_root] = y_root
        elif rank[x_root] > rank[y_root]:
            parent[y_root] = x_root
        else:
            parent[y_root] = x_root
            rank[x_root] += 1

    def kruskals_algo(self):
        result = []
        i, e = 0, 0
        self.graph = sorted(self.graph, key=lambda item: item[2])
        parent = []
        rank = []

        for node in range(self.V):
            parent.append(node)
            rank.append(0)

        while e < self.V - 1:
            u, v, w = self.graph[i]
            i += 1
            x = self.find(parent, u)
            y = self.find(parent, v)
            if x != y:
                e += 1
                result.append([u, v, w])
                self.apply_union(parent, rank, x, y)

        for u, v, weight in result
            print(f"{u} - {v}: {weight}")


g = Graph(6)
g.add_edge(0, 1, 4)
g.add_edge(0, 2, 4)
g.add_edge(1, 2, 2)
g.add_edge(1, 0, 4)
g.add_edge(2, 0, 4)
g.add_edge(2, 1, 2)
g.add_edge(2, 3, 3)
g.add_edge(2, 5, 2)
g.add_edge(2, 4, 4)
g.add_edge(3, 2, 3)
g.add_edge(3, 4, 3)
g.add_edge(4, 2, 4)
g.add_edge(4, 3, 3)
g.add_edge(5, 2, 2)
g.add_edge(5, 4, 3)
g.kruskals_algo()

```

</details>

<details>

<summary>

**C++**

</summary>

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

#define edge pair<int, int>

class Graph {
   private:
  vector<pair<int, edge> > G;  // graph
  vector<pair<int, edge> > T;  // mst
  int *parent;
  int V;  // number of vertices/nodes in graph
   public:
  Graph(int V);
  void AddWeightedEdge(int u, int v, int w);
  int find_set(int i);
  void union_set(int u, int v);
  void kruskal();
  void print();
};

Graph::Graph(int V) {
  parent = new int[V];

  //i 0 1 2 3 4 5
  //parent[i] 0 1 2 3 4 5
  for (int i = 0; i < V; i++)
    parent[i] = i;

  G.clear();
  T.clear();
}

void Graph::AddWeightedEdge(int u, int v, int w) {
  G.push_back(make_pair(w, edge(u, v)));
}

int Graph::find_set(int i) {
  // If i is the parent of itself
  if (i == parent[i])
    return i;
  else
    // Else if i is not the parent of itself
    // Then i is not the representative of his set,
    // so we recursively call Find on its parent
    return find_set(parent[i]);
}

void Graph::union_set(int u, int v) {
  parent[u] = parent[v];
}

void Graph::kruskal() {
  int i, uRep, vRep;
  sort(G.begin(), G.end());  // increasing weight
  for (i = 0; i < G.size(); i++) {
    uRep = find_set(G[i].second.first);
    vRep = find_set(G[i].second.second);
    if (uRep != vRep) {
      T.push_back(G[i]);  // add to tree
      union_set(uRep, vRep);
    }
  }
}

void Graph::print() {
  cout << "Edge :"
     << " Weight" << endl;
  for (int i = 0; i < T.size(); i++) {
    cout << T[i].second.first << " - " << T[i].second.second << " : "
       << T[i].first;
    cout << endl;
  }
}

int main() {
  Graph g(6);
  g.AddWeightedEdge(0, 1, 4);
  g.AddWeightedEdge(0, 2, 4);
  g.AddWeightedEdge(1, 2, 2);
  g.AddWeightedEdge(1, 0, 4);
  g.AddWeightedEdge(2, 0, 4);
  g.AddWeightedEdge(2, 1, 2);
  g.AddWeightedEdge(2, 3, 3);
  g.AddWeightedEdge(2, 5, 2);
  g.AddWeightedEdge(2, 4, 4);
  g.AddWeightedEdge(3, 2, 3);
  g.AddWeightedEdge(3, 4, 3);
  g.AddWeightedEdge(4, 2, 4);
  g.AddWeightedEdge(4, 3, 3);
  g.AddWeightedEdge(5, 2, 2);
  g.AddWeightedEdge(5, 4, 3);
  g.kruskal();
  g.print();
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
    class Edge implements Comparable<Edge> {
        int src, dest, weight;

        public int compareTo(Edge compareEdge) {
            return this.weight - compareEdge.weight;
        }
    };

    // Union
    class subset {
        int parent, rank;
    };

    int vertices, edges;
    Edge edge[];

    // Graph creation
    Graph(int v, int e) {
        vertices = v;
        edges = e;
        edge = new Edge[edges];
        for (int i = 0; i < e; ++i) {
            edge[i] = new Edge();
        }
    }

    int find(subset subsets[], int i) {
        if (subsets[i].parent != i) {
            subsets[i].parent = find(subsets, subsets[i].parent);
        }
        return subsets[i].parent;
    }

    void Union(subset subsets[], int x, int y) {
        int xroot = find(subsets, x);
        int yroot = find(subsets, y);

        if (subsets[xroot].rank < subsets[yroot].rank) {
            subsets[xroot].parent = yroot;
        } else if (subsets[xroot].rank > subsets[yroot].rank) {
            subsets[yroot].parent = xroot;
        } else {
            subsets[yroot].parent = xroot;
            subsets[xroot].rank++;
        }
    }

    // Applying Krushkal Algorithm
    void KruskalAlgo() {
        Edge result[] = new Edge[vertices];
        int e = 0;
        int i = 0;
        for (i = 0; i < vertices; ++i) {
            result[i] = new Edge();
        }

        // Sorting the edges
        Arrays.sort(edge);
        subset subsets[] = new subset[vertices];
        for (i = 0; i < vertices; ++i) {
            subsets[i] = new subset();
        }

        for (int v = 0; v < vertices; ++v) {
            subsets[v].parent = v;
            subsets[v].rank = 0;
        }

        i = 0;
        while (e < vertices - 1) {
            Edge next_edge = new Edge();
            next_edge = edge[i++];
            int x = find(subsets, next_edge.src);
            int y = find(subsets, next_edge.dest);
            if (x != y) {
                result[e++] = next_edge;
                Union(subsets, x, y);
            }
        }

        for (i = 0; i < e; ++i) {
            System.out.println(result[i].src + " - " + result[i].dest + ": " + result[i].weight);
        }
    }

    public static void main(String[] args) {
        int vertices = 6; // Number of vertices
        int edges = 8; // Number of edges
        Graph G = new Graph(vertices, edges);

        G.edge[0].src = 0;
        G.edge[0].dest = 1;
        G.edge[0].weight = 4;

        G.edge[1].src = 0;
        G.edge[1].dest = 2;
        G.edge[1].weight = 4;

        G.edge[2].src = 1;
        G.edge[2].dest = 2;
        G.edge[2].weight = 2;

        G.edge[3].src = 2;
        G.edge[3].dest = 3;
        G.edge[3].weight = 3;

        G.edge[4].src = 2;
        G.edge[4].dest = 5;
        G.edge[4].weight = 2;

        G.edge[5].src = 2;
        G.edge[5].dest = 4;
        G.edge[5].weight = 4;

        G.edge[6].src = 3;
        G.edge[6].dest = 4;
        G.edge[6].weight = 3;

        G.edge[7].src = 5;
        G.edge[7].dest = 4;
        G.edge[7].weight = 3;
        G.KruskalAlgo();
    }
}

```

</details>

## Complexity

**Time Complexity**: `O(E log E)`

## Applications

- for things like laying out electrical wiring
- computer network (LAN connection)
