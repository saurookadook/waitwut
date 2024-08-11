---
title: 'DSA Programmiz Course: Greedy Algorithms - Ford-Fulkerson Algorithm'
date: '2024-08-10'
fullPath: '/notes/dsa/programmiz-course/08-greedy-algorithms/ford-fulkerson-algorithm'
sectionSlug: 'notes'
---

# Ford-Fulkerson Algorithm

## Overview

- greedy approach for calculating maximum possible flow in network or graph
- the term **flow network** is used to describe network of vertices and edges with a **source (S)** and a **sink (T)**
- each vertex, except **S** and **T**, can receive and send equal amount of stuff through it
- **S** can only send
- **T** can only receive

**Consider**: flow of liquid inside network of pipes, where each pipe has capacity of liquid it can transfer at a point in time

**Flow network graph**
```
            (0/9)
         A  --->  B
 (0/8) /^       /^ \v (0/2)
      S     (0/7)   T
 (0/3) \v  /^      /^ (0/5)
         D  --->  C
           (0/4)
```

### Terminology

- **Augmenting Path**: The path available in flow network
- **Residual Graph**: Represents flow network that has additional possible flow
- **Residual Capacity**: Capacity of the edge after subtracting flow from maximum capacity

### How it works

1. initialize flow in all edges to 0
2. while there is an augmenting path between **source** and **sink**, add that path to flow
3. update residual graph

> **NOTE**: if required, should also consider **reverse path** because because otherwise may never find maximum flow

## Full Example

Start with flow of all edges at 0
```
            (0/9)
         A  --->  B
 (0/8) /^       /^  \v (0/2)
      S     (0/7)    T
 (0/3) \v  /^       /^ (0/5)
         D  --->  C
           (0/4)
```

1. select arbitrary path from **S** to **T** _(in this case, `S-A-B-T`)_

```
            (0/9)
         A  ===>  B
 (0/8) //^      /^ \\v (0/2)
      S     (0/7)    T
 (0/3) \v  /^       /^ (0/5)
         D  --->  C
           (0/4)
```

Update `flow/capacity` for each path with minimum capacity between these edges _(in this case, `2` from edge `B-T`)_.

```
            (2/9)
         A  ===>  B
 (2/8) //^      /^ \\v (2/2)
      S     (0/7)    T
 (0/3) \v   /^      /^ (0/5)
         D  --->  C
           (0/4)
```

2. Select another path from **S** to **T** _(in this case, `S-D-C-T`)_.

```
            (2/9)
         A  --->  B
 (2/8) /^       /^  \v (2/2)
      S     (0/7)    T
 (0/3) \\v  /^     //^ (0/5)
         D  ===>  C
           (0/4)
```

Update `flow/capacity` for each path with minimum capacity between these edges _(in this case, `3` from edge `S-D`)_.

```
            (2/9)
         A  --->  B
 (2/8) /^       /^  \v (2/2)
      S     (0/7)    T
 (3/3) \\v  /^     //^ (3/5)
         D  ===>  C
           (3/4)
```

3. Consider **reverse path** `B-D`.
   - select path `S-A-B-D-C-T`
```
            (2/9)
         A  ===>  B
 (2/8) //^     //^  \v (2/2)
      S     (0/7)    T
 (3/3) \v //^      //^ (3/5)
         D  ===>  C
           (3/4)
```
    - update `flow/capacity` for each path with minimum _residual_ capacity among edges _(in this case, `1` from edge `D-C`)_
```
                (3/9)
         A  ===============>  B
 (3/8) //^                 //^  \v (2/2)
      S    [up: 0/7, down: 1/7]  T
 (3/3) \v  //^                 //^ (4/5)
         D  ===============>  C
                (4/4)
```
> **NOTE**: capacity for forward and reverse paths

4. Adding all flows gets maximum possible flow: `2 + 3 + 1 = 6`
> **NOTE**: if capacity for any edge is full, then that path cannot be used

## Implementations

<details>

<summary>

**Python**

</summary>

```python
from collections import defaultdict


class Graph:
    def __int__(self, graph):
        self.graph = graph
        self.ROW = len(graph)

    def bfs_search(self, S, T, parent):
        visited = [False] * self.ROW
        queue = []

        queue.append(S)
        visited[S] = True

        while queue:
            u = queue.pop(0)

            for i, v in enumerate(self.graph[u]):
                if visited[i] == False and v > 0:
                    queue.append(i)
                    visited[i] = True
                    parent[i] = u

        return visited[T]

    def ford_fulkerson(self, source, sink):
        parent = [-1] * self.ROW
        max_flow = 0

        while self.bfs_search(source, sink, parent):
            path_flow = float("Inf")
            S = sink

            while S != source:
                path_flow = min(path_flow, self.graph[parent[S]][S])
                S = parent[S]

            # Add path flows
            max_flow += path_flow

            # Update residual values of edges
            v = sink
            while v != source:
                u = parent[v]
                self.graph[u][v] -= path_flow
                self.graph[v][u] += path_flow
                v = parent[v]

        return max_flow

# NOTE: I think this is supposed to represent the flow network in the example but it's not exactly clear how it should be interpreted 🙃
graph = [
    [0, 8, 0, 0, 3, 0],
    [0, 0, 9, 0, 0, 0],
    [0, 0, 0, 0, 7, 2],
    [0, 0, 0, 0, 0, 5],
    [0, 0, 7, 4, 0, 0],
    [0, 0, 0, 0, 0, 0]
]

g = Graph(graph)

source = 0
sink = 5

print(f"Max Flow: {g.ford_fulkerson(source, sink)}")

```

</details>

<details>

<summary>

**C++**

</summary>

```cpp
#include <limits.h>
#include <string.h>

#include <iostream>
#include <queue>
using namespace std;

#define V 6

// Using BFS as a searching algorithm
bool bfs(int rGraph[V][V], int s, int t, int parent[]) {
    bool visited[V];
    memset(visited, 0, sizeof(visited));

    queue<int> q;
    q.push(s);
    visited[s] = true;
    parent[s] = -1;

    while (!q.empty()) {
        int u = q.front();
        q.pop();

        for (int v = 0; v < V; v++) {
            if (visited[v] == false && rGraph[u][v] > 0) {
                q.push(v);
                parent[v] = u;
                visited[v] = true;
            }
        }
    }

    return (visited[t] == true);
}

// Applying fordfulkerson algorithm
int fordFulkerson(int graph[V][V], int s, int t) {
    int u, v;

    int rGraph[V][V];
    for (u = 0; u < V; u++)
        for (v = 0; v < V; v++)
            rGraph[u][v] = graph[u][v];

    int parent[V];
    int max_flow = 0;

    // Updating the residual values of edges
    while (bfs(rGraph, s, t, parent)) {
        int path_flow = INT_MAX;
        for (v = t; v != s; v = parent[v]) {
            u = parent[v];
            path_flow = min(path_flow, rGraph[u][v]);
        }

        for (v = t; v != s; v = parent[v]) {
            u = parent[v];
            rGraph[u][v] -= path_flow;
            rGraph[v][u] += path_flow;
        }

        // Adding the path flows
        max_flow += path_flow;
    }

    return max_flow;
}

int main() {
    int graph[V][V] = {
        {0, 8, 0, 0, 3, 0},
        {0, 0, 9, 0, 0, 0},
        {0, 0, 0, 0, 7, 2},
        {0, 0, 0, 0, 0, 5},
        {0, 0, 7, 4, 0, 0},
        {0, 0, 0, 0, 0, 0}
    };

    cout << "Max Flow: " << fordFulkerson(graph, 0, 5) << endl;
}

```

</details>

<details>

<summary>

**Java**

</summary>

```java
import java.util.LinkedList;

class FordFulkerson {
    static final int V = 6;

    // Using BFS as a searching algorithm
    boolean bfs(int Graph[][], int s, int t, int p[]) {
        boolean visited[] = new boolean[V];
        for (int i = 0; i < V; ++i)
            visited[i] = false;

        LinkedList<Integer> queue = new LinkedList<Integer>();
        queue.add(s);
        visited[s] = true;
        p[s] = -1;

        while (queue.size() != 0) {
            int u = queue.poll();

            for (int v = 0; v < V; v++) {
                if (visited[v] == false && Graph[u][v] > 0) {
                    queue.add(v);
                    p[v] = u;
                    visited[v] = true;
                }
            }
        }

        return (visited[t] == true);
    }

    // Applying fordfulkerson algorithm
    int fordFulkerson(int graph[][], int s, int t) {
        int u, v;
        int Graph[][] = new int[V][V];

        for (u = 0; u < V; u++)
            for (v = 0; v < V; v++)
                Graph[u][v] = graph[u][v];

        int p[] = new int[V];

        int max_flow = 0;

        // Updating the residual calues of edges
        while (bfs(Graph, s, t, p)) {
            int path_flow = Integer.MAX_VALUE;
            for (v = t; v != s; v = p[v]) {
                u = p[v];
                path_flow = Math.min(path_flow, Graph[u][v]);
            }

            for (v = t; v != s; v = p[v]) {
                u = p[v];
                Graph[u][v] -= path_flow;
                Graph[v][u] += path_flow;
            }

            // Adding the path flows
            max_flow += path_flow;
        }

        return max_flow;
    }

    public static void main(String[] args) throws java.lang.Exception {
        int graph[][] = new int[][] { { 0, 8, 0, 0, 3, 0 }, { 0, 0, 9, 0, 0, 0 }, { 0, 0, 0, 0, 7, 2 },
        { 0, 0, 0, 0, 0, 5 }, { 0, 0, 7, 4, 0, 0 }, { 0, 0, 0, 0, 0, 0 } };
        FordFulkerson m = new FordFulkerson();

        System.out.println("Max Flow: " + m.fordFulkerson(graph, 0, 5));

    }
}

```

</details>

## Applications

- water distribution pipeline
- bipartite matching problems
- circulation with demands
