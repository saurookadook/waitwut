---
title: "DSA Programiz Course: Greedy Algorithms - Dijkstra's Algorithm"
date: '2024-08-10'
fullPath: '/notes/dsa/programiz-course/08-greedy-algorithms/dijkstras-algorithm'
sectionSlug: 'notes'
---

# Dijkstra's Algorithm

**Consider**: shortest distance between two vertices might not include all vertices of graph

## How it works

- built on basis that any subpath `B -> D` of shortest path `A -> D` between verticies `A` and `D` is also shortest path between vertices `B` and `D`
- Dijkstra used this property in opposite direction:
    - overestimate distance of each vertex from starting vertex
    - visit each node and its neighbors to find shortest subpath to those neighbors
- algorithm uses **greedy approach** in that it finds next best solution hoping that end result is best solution for entire problem

## Example

1. Start with weighted graph
```
 [ ]      [ ]
  | \    3/  \
  | 4\   /   2\
 4|   [ ] -6-- [ ]
  | 2/   \   3/
  | /    1\  /
 [ ]       [ ]
```
2. Choose a starting vertex and assign infinity path values to all other vertices
```
 [0]      [∞]
  | \    3/  \
  | 4\   /   2\
 4|   [∞] -6-- [∞]
  | 2/   \   3/
  | /    1\  /
 [∞]       [∞]
```
3. From starting vertex, go to each connected vertex and update path value
```
 [0]      [∞]
  | \    3/  \
  | 4\   /   2\
 4|   [4] -6-- [∞]
  | 2/   \   3/
  | /    1\  /
 [4]       [∞]
```
4. If path value of adjacent vertex is less than new path value, don't update it
```
 [0]      [∞]
  | \    3/  \
  | 4\   /   2\
 4|   [4] -6-- [∞]
  | 2/   \   3/
  | /    1\  /
 [4]       [∞]

Bottom vertex with 4 would be visited next. Then for middle vertex with 4, it won't get updated since the path of adjacent vertex is 4 and is less than the new path value which would be 6 (4 + 2)
```
5. Update next path values for vertices while avoiding updating path values of already visited vertices
```
         4 + 3
 [0]      [7]
  | \    3/  \
  | 4\   /   2\
 4|   [4] -6-- [10] 4 + 6
  | 2/   \   3/
  | /    1\  /
 [4]       [5]
          4 + 1
```
6. After each iteration, pick unvisited vertex with least path value. _(in this case, `5`)_
```
 [0]      [7]
  | \    3/  \
  | 4\   /   2\
 4|   [4] -6-- [8] 5 + 3 < 10 (refer to step 4)
  | 2/   \   3/
  | /    1\  /
 [4]       [5]
```
7. Then visit other unvisited vertex _(in this case, `7`)_
```
 [0]      [7]
  | \    3/  \
  | 4\   /   2\
 4|   [4] -6-- [8] 7 + 2 < 8
  | 2/   \   3/
  | /    1\  /
 [4]       [5]
```
8. Repeat until all vertices have been visited.

## Algorithm in Pseudocode

- need to maintain path distance of every vertex, which can be stored in array of size `v` where `v` is number of vertices
- also want **to be able to get** shortest path, not only **know the length of** shortest path
    - for this, map each vertex to vertex that last updated its path value
- once algorithm is over, can backtrack from destination vertex to source vertex to find path
- **minimum priority queue** can be used to efficiently receive vertex with least path distance

```
function dijkstra(G, S)
    for each vertex V in G
        distance[V] <- infinite
        previous[V] <- NULL
        if V != S, add V to priority queue Q
    distance[S] <- 0

    while Q IS NOT EMPTY
        U <- extract MIN from Q
        for each unvisited neighbor V of U
            tempDistance <- distance[U] + edge_weight(U, V)
            if tempDistance < distance[V]
                distance[V] <- tempDistance
                previous[V] <- U
    return distance[], previous[]
```

## Implementations

<details>

<summary>

**Python**

</summary>

```python
import sys


# providing the graph
vertices = [
    [0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0],
    [1, 1, 0, 1, 1, 0, 0],
    [1, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 1],
    [0, 0, 0, 1, 0, 1, 0]
]

edges = [
    [0, 0, 1, 2, 0, 0, 0],
    [0, 0, 2, 0, 0, 3, 0],
    [1, 2, 0, 1, 3, 0, 0],
    [2, 0, 1, 0, 0, 0, 1],
    [0, 0, 3, 0, 0, 2, 0],
    [0, 3, 0, 0, 2, 0, 1],
    [0, 0, 0, 1, 0, 1, 0]
]

num_of_vertices = len(vertices[0])

visited_and_distance = [[0, 0]]
for i in range(num_of_vertices - 1):
    visited_and_distance.append([0, sys.maxsize])

def find_next_vertex_to_be_visited():
    global visited_and_distance
    global num_of_vertices
    v = -10
    for index in range(num_of_vertices):
        if (
            visited_and_distance[index][0] == 0
            and (v < 0 or visited_and_distance[index][1] <= visited_and_distance[v][1])
        ):
            v = index
    return v


for vertex in range(num_of_vertices):
    to_visit = find_next_vertex_to_be_visited()

    for neighbor_index in range(num_of_vertices):
        # Update new distances
        if vertices[to_visit][neighbor_index] == 1 and visited_and_distance[neighbor_index][0] == 0:
            new_distance = visited_and_distance[to_visit][1] + edges[to_visit][neighbor_index]
            if visited_and_distance[neighbor_index][1] > new_distance:
                visited_and_distance[neighbor_index][1] = new_distance

        visited_and_distance[to_visit][0] = 1


for i, distance in enumerate(visited_and_distance, start=0):
    print(f"Distance of {chr(ord('a') + i)} from source vertex: {distance[1]}")


```

</details>

<details>

<summary>

**C++**

</summary>

```cpp
#include <iostream>
#include <vector>

#define INT_MAX 10000000

using namespace std;

void DijkstrasTest();

int main() {
  DijkstrasTest();
  return 0;
}

class Node;
class Edge;

void Dijkstras();
vector<Node*>* AdjacentRemainingNodes(Node* node);
Node* ExtractSmallest(vector<Node*>& nodes);
int Distance(Node* node1, Node* node2);
bool Contains(vector<Node*>& nodes, Node* node);
void PrintShortestRouteTo(Node* destination);

vector<Node*> nodes;
vector<Edge*> edges;

class Node {
    public:
  Node(char id)
    : id(id), previous(NULL), distanceFromStart(INT_MAX) {
    nodes.push_back(this);
  }

    public:
  char id;
  Node* previous;
  int distanceFromStart;
};

class Edge {
    public:
  Edge(Node* node1, Node* node2, int distance)
    : node1(node1), node2(node2), distance(distance) {
    edges.push_back(this);
  }

  bool Connects(Node* node1, Node* node2) {
    return (
      (node1 == this->node1 &&
       node2 == this->node2) ||
      (node1 == this->node2 &&
       node2 == this->node1));
  }

    public:
  Node* node1;
  Node* node2;
  int distance;
};

///////////////////
void DijkstrasTest() {
  Node* a = new Node('a');
  Node* b = new Node('b');
  Node* c = new Node('c');
  Node* d = new Node('d');
  Node* e = new Node('e');
  Node* f = new Node('f');
  Node* g = new Node('g');

  Edge* e1 = new Edge(a, c, 1);
  Edge* e2 = new Edge(a, d, 2);
  Edge* e3 = new Edge(b, c, 2);
  Edge* e4 = new Edge(c, d, 1);
  Edge* e5 = new Edge(b, f, 3);
  Edge* e6 = new Edge(c, e, 3);
  Edge* e7 = new Edge(e, f, 2);
  Edge* e8 = new Edge(d, g, 1);
  Edge* e9 = new Edge(g, f, 1);

  a->distanceFromStart = 0;  // set start node
  Dijkstras();
  PrintShortestRouteTo(f);
}

///////////////////

void Dijkstras() {
  while (nodes.size() > 0) {
    Node* smallest = ExtractSmallest(nodes);
    vector<Node*>* adjacentNodes =
      AdjacentRemainingNodes(smallest);

    const int size = adjacentNodes->size();
    for (int i = 0; i < size; ++i) {
      Node* adjacent = adjacentNodes->at(i);
      int distance = Distance(smallest, adjacent) +
               smallest->distanceFromStart;

      if (distance < adjacent->distanceFromStart) {
        adjacent->distanceFromStart = distance;
        adjacent->previous = smallest;
      }
    }
    delete adjacentNodes;
  }
}

// Find the node with the smallest distance,
// remove it, and return it.
Node* ExtractSmallest(vector<Node*>& nodes) {
  int size = nodes.size();
  if (size == 0) return NULL;
  int smallestPosition = 0;
  Node* smallest = nodes.at(0);
  for (int i = 1; i < size; ++i) {
    Node* current = nodes.at(i);
    if (current->distanceFromStart <
      smallest->distanceFromStart) {
      smallest = current;
      smallestPosition = i;
    }
  }
  nodes.erase(nodes.begin() + smallestPosition);
  return smallest;
}

// Return all nodes adjacent to 'node' which are still
// in the 'nodes' collection.
vector<Node*>* AdjacentRemainingNodes(Node* node) {
  vector<Node*>* adjacentNodes = new vector<Node*>();
  const int size = edges.size();
  for (int i = 0; i < size; ++i) {
    Edge* edge = edges.at(i);
    Node* adjacent = NULL;
    if (edge->node1 == node) {
      adjacent = edge->node2;
    } else if (edge->node2 == node) {
      adjacent = edge->node1;
    }
    if (adjacent && Contains(nodes, adjacent)) {
      adjacentNodes->push_back(adjacent);
    }
  }
  return adjacentNodes;
}

// Return distance between two connected nodes
int Distance(Node* node1, Node* node2) {
  const int size = edges.size();
  for (int i = 0; i < size; ++i) {
    Edge* edge = edges.at(i);
    if (edge->Connects(node1, node2)) {
      return edge->distance;
    }
  }
  return -1;  // should never happen
}

// Does the 'nodes' vector contain 'node'
bool Contains(vector<Node*>& nodes, Node* node) {
  const int size = nodes.size();
  for (int i = 0; i < size; ++i) {
    if (node == nodes.at(i)) {
      return true;
    }
  }
  return false;
}

///////////////////

void PrintShortestRouteTo(Node* destination) {
  Node* previous = destination;
  cout << "Distance from start: "
     << destination->distanceFromStart << endl;
  while (previous) {
    cout << previous->id << " ";
    previous = previous->previous;
  }
  cout << endl;
}

// these two not needed
vector<Edge*>* AdjacentEdges(vector<Edge*>& Edges, Node* node);
void RemoveEdge(vector<Edge*>& Edges, Edge* edge);

vector<Edge*>* AdjacentEdges(vector<Edge*>& edges, Node* node) {
  vector<Edge*>* adjacentEdges = new vector<Edge*>();

  const int size = edges.size();
  for (int i = 0; i < size; ++i) {
    Edge* edge = edges.at(i);
    if (edge->node1 == node) {
      cout << "adjacent: " << edge->node2->id << endl;
      adjacentEdges->push_back(edge);
    } else if (edge->node2 == node) {
      cout << "adjacent: " << edge->node1->id << endl;
      adjacentEdges->push_back(edge);
    }
  }
  return adjacentEdges;
}

void RemoveEdge(vector<Edge*>& edges, Edge* edge) {
  vector<Edge*>::iterator it;
  for (it = edges.begin(); it < edges.end(); ++it) {
    if (*it == edge) {
      edges.erase(it);
      return;
    }
  }
}
```

</details>

<details>

<summary>

**Java**

</summary>

```java
public class Dijkstra {
    public static void dijkstra(int[][] graph, int source) {
        int count = graph.length;
        boolean[] visitedVertex = new boolean[count];
        int[] distance = new int[count];

        for (int i = 0; i < count; i++) {
            visitedVertex[i] = false;
            distance[i] = Integer.MAX_VALUE;
        }

        // Distance of self loop is zero
        distance[source] = 0;
        for (int i = 0; i < count; i++) {
            // Update the distance between neighbouring vertex and source vertex
            int u = findMinDistance(distance, visitedVertex);
            visitedVertex[u] = true;

            // Update all the neighbouring vertex distances
            for (int v = 0; v < count; v++) {
                if (!visitedVertex[v] && graph[u][v] != 0 && (distance[u] + graph[u][v] < distance[v])) {
                    distance[v] = distance[u] + graph[u][v];
                }
            }
        }

        for (int i = 0; i < distance.length; i++) {
            System.out.println(String.format("Distance from %s to %s is %s", source, i, distance[i]));
        }
    }

    // Finding the minimum distance
    private static int findMinDistance(int[] distance, boolean[] visitedVertex) {
        int minDistance = Integer.MAX_VALUE;
        int minDistanceVertex = -1;
        for (int i = 0; i < distance.length; i++) {
            if (!visitedVertex[i] && distance[i] < minDistance) {
                minDistance = distance[i];
                minDistanceVertex = i;
            }
        }
        return minDistanceVertex;
    }

    public static void main(String[] args) {
        int graph[][] = new int[][] { { 0, 0, 1, 2, 0, 0, 0 }, { 0, 0, 2, 0, 0, 3, 0 }, { 1, 2, 0, 1, 3, 0, 0 },
            { 2, 0, 1, 0, 0, 0, 1 }, { 0, 0, 3, 0, 0, 2, 0 }, { 0, 3, 0, 0, 2, 0, 1 }, { 0, 0, 0, 1, 0, 1, 0 } };
        Dijkstra T = new Dijkstra();
        T.dijkstra(graph, 0);
    }
}
```

</details>

## Complexity

**Time Complexity**: `O(E log V)` where `E` is number of edges and `V` is number of vertices
**Space Complexity**: `O(V)`

## Applications

- find shortest path
- social networking applications
- telephone network
- find locations in a map
