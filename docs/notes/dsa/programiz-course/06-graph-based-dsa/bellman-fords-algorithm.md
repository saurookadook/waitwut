---
title: "Bellman Ford's Algorithm"
date: '2024-08-11'
fullPath: '/notes/dsa/programiz-course/06-graph-based-dsa/bellman-fords-algorithm'
sectionSlug: 'notes'
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

### Applications of Bellman Ford's Algorithm

- calculating shortest paths in routing algorithms
- finding shortest path
