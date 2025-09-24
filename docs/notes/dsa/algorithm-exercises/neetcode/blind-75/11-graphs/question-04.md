---
title: 'Neetcode: Course Schedule'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/graphs/question-04'
sectionSlug: 'notes'
---

## Instructions

You are given an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that you must take course `b` first if you want to take course `a`.

The pair `[0, 1]`, indicates that must take course `1` before taking course `0`.

There are a total of `numCourses` courses you are required to take, labeled from `0` to `numCourses - 1`.

Return `true` if it is possible to finish all courses, otherwise return `false`.

**Example 1**:

```java
Input: numCourses = 2, prerequisites = [[0,1]]

Output: true
```

Explanation: First take course 1 (no prerequisites) and then take course 0.

**Example 2**:

```java
Input: numCourses = 2, prerequisites = [[0,1],[1,0]]

Output: false
```

Explanation: In order to take course 1 you must take course 0, and to take course 0 you must take course 1. So it is impossible.

**Constraints**:

- `1 <= numCourses <= 1000`
- `0 <= prerequisites.length <= 1000`
- All `prerequisite` pairs are **unique**.

---

## Solutions

### Python

```python
import os
import traceback
from dataclasses import dataclass, field
from typing import List, Set


@dataclass
class GraphNode:
    course_value: int = None
    prerequisite_for_courses: List["GraphNode"] = field(default_factory=list)


class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        return self.can_finish_impl(numCourses, prerequisites)

    def can_finish_impl(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        if not prerequisites:
            return True

        course_registry = dict()

        def has_circular_requirement(
            prereq_courses: Set[int], prereq_course_node: GraphNode
        ):
            if not prereq_course_node.prerequisite_for_courses:
                return False

            for course_node in prereq_course_node.prerequisite_for_courses:
                if course_node.course_value in prereq_courses:
                    raise Exception("ERROR: Circular requirement found!")

                prereq_courses_copy = prereq_courses.copy()
                prereq_courses_copy.add(course_node.course_value)
                has_circular_requirement(prereq_courses_copy, course_node)

            return False

        for i in range(len(prerequisites)):
            course_val, pre_course_val = prerequisites[-i + 1]

            pre_course_node: GraphNode = course_registry.setdefault(
                pre_course_val, GraphNode(course_value=pre_course_val)
            )

            course_node: GraphNode = course_registry.setdefault(
                course_val,
                GraphNode(
                    course_value=course_val,
                ),
            )

            if course_node not in pre_course_node.prerequisite_for_courses:
                pre_course_node.prerequisite_for_courses.append(course_node)

            try:
                has_circular_requirement(
                    set([pre_course_node.course_value]), course_node
                )
            except Exception as e:
                print(f"CAUGH EXCEPTION ::", e)
                traceback.print_exc()
                return False

        return True


# ============================= 1 =============================
class CycleDetectionDFSSolution:
    """1. Solution utilizing a Cycle Detection algorithm using a Depth-First Search approach

    Time & Space Complexity

    Time complexity:
        `O(V + E)`
    Space complexity:
        `O(V + E)`

    _NOTE: Where `V` is the number of courses and `E` is the number of prerequisites.
    """

    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # Map each course to its prerequisites
        prereq_map = {i: [] for i in range(numCourses)}
        for crs, pre in prerequisites:
            prereq_map[crs].append(pre)

        # Store all courses along current DFS path
        visiting = set()

        def dfs(crs: int) -> bool:
            if crs in visiting:
                # Cycle detected
                return False
            if prereq_map[crs] == []:
                return True

            visiting.add(crs)
            for pre in prereq_map[crs]:
                if not dfs(pre):
                    return False

            visiting.remove(crs)
            prereq_map[crs] = []
            return True

        for c in range(numCourses):
            if not dfs(c):
                return False

        return True


# ============================= 2 =============================
from collections import deque


class TopologicalSortKahnsAlgoSolution:
    """2. Solution utilizing Kahn's Algorithm, which uses topological sorting

    Time & Space Complexity

    Time complexity:
        `O(V + E)`
    Space complexity:
        `O(V + E)`

    _NOTE: Where `V` is the number of courses and `E` is the number of prerequisites.
    """

    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # NOTE: "indegree" is number of edges pointing into a vertex
        indegree = [0] * numCourses
        adj = [[] for i in range(numCourses)]

        for src, dst in prerequisites:
            indegree[dst] += 1
            adj[src].append(dst)

        q = deque()
        for n in range(numCourses):
            if indegree[n] == 0:
                q.append(n)

        finish = 0
        while q:
            node = q.popleft()
            finish += 1
            for neighbor in adj[node]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    q.append(neighbor)

        return finish == numCourses


```
