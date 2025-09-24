---
title: 'Neetcode: Number of Islands'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/graphs/question-01'
sectionSlug: 'notes'
---

## Instructions

Given a 2D grid `grid` where `'1'` represents land and `'0'` represents water, count and return the number of islands.

An **island** is formed by connecting adjacent lands horizontally or vertically and is surrounded by water. You may assume water is surrounding the grid (i.e., all the edges are water).

**Example 1**:

```java
Input: grid = [
    ["0","1","1","1","0"],
    ["0","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
  ]
Output: 1
```

**Example 2**:

```java
Input: grid = [
    ["1","1","0","0","1"],
    ["1","1","0","0","1"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ]
Output: 4
```

**Constraints**:

- `1 <= grid.length, grid[i].length <= 100`
- `grid[i][j]` is `'0'` or `'1'`.

---

## Solutions

### Python

```python
from typing import List


class Solution:
    ROWS: int = 0
    COLS: int = 0

    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid:
            return 0
        #              up       down    right    left
        DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]]

        ROWS, COLS = len(grid), len(grid[0])
        visited = set()
        islands = 0

        def bfs(r, c):
            q = deque()
            visited.add((r, c))
            q.append((r, c))

            while q:
                # NOTE:
                # using `popleft` makes this a BREADTH-first search**
                # using `pop` would make this a DEPTH-first search**
                row, col = q.popleft()

                for dr, dc in DIRECTIONS:
                    next_r, next_c = row + dr, col + dc
                    if (
                        next_r in range(ROWS)  # force formatting
                        and next_c in range(COLS)
                        and grid[next_r][next_c] == "1"
                        and (next_r, next_c) not in visited
                    ):
                        connected = (next_r, next_c)
                        q.append(connected)
                        visited.add(connected)

        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == "1" and (r, c) not in visited:
                    bfs(r, c)
                    islands += 1

        return islands


# ============================= 1 =============================
class DepthFirstSearchSolution:
    """1. Solution utilizing a Depth-First Search algorithm

    Time & Space Complexity

    Time complexity:
        `O(m * n)`
    Space complexity:
        `O(m * n)`

    _NOTE: Where `m` is the number of rows and `n` is the number of columns in the `grid`.
    """

    def numIslands(self, grid: List[List[str]]) -> int:
        directions = [[-1, 0], (1, 0), (0, -1), (0, 1)]
        ROWS, COLS = len(grid), len(grid[0])
        islands = 0
        visited = set()  # NOTE: could also use a `list`

        def dfs(r, c):
            if (
                r < 0  # force formatting
                or c < 0
                or r >= ROWS
                or c >= COLS
                or grid[r][c] == "0"
                or (r, c) in visited
            ):
                return

            visited.add((r, c))
            for dr, dc in directions:
                dfs(r + dr, c + dc)

        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == "1" and (r, c) not in visited:
                    dfs(r, c)
                    islands += 1

        return islands


# ============================= 2 =============================
from collections import deque


class BreadthFirstSearchSolution:
    """2. Solution utilizing a Breadth-First Search algorithm

    Time & Space Complexity

    Time complexity:
        `O(m * n)`
    Space complexity:
        `O(m * n)`

    _NOTE: Where `m` is the number of rows and `n` is the number of columns in the `grid`.
    """

    def numIslands(self, grid: List[List[str]]) -> int:
        directions = [[-1, 0], (1, 0), (0, -1), (0, 1)]
        ROWS, COLS = len(grid), len(grid[0])
        islands = 0
        visited = [[False] * COLS] * ROWS  # NOTE: could also use a `set`

        def bfs(r, c):
            q = deque()
            visited[r][c] = True
            q.append((r, c))

            while q:
                row, col = q.popleft()
                for dr, dc in directions:
                    nr, nc = dr + row, dc + col
                    if (
                        nr < 0
                        or nc < 0
                        or nr >= ROWS
                        or nc >= COLS
                        or grid[nr][nc] == "0"
                        or visited[r][c]
                    ):
                        continue
                    q.append((nr, nc))
                    visited[nr][nc] = True

        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == "1" and not visited[r][c]:
                    bfs(r, c)
                    islands += 1

        return islands


# ============================= 3 =============================
class DSU:
    """Disjoint Set Union"""

    def __init__(self, n):
        self.Parent = list(range(n + 1))
        self.Size = [1] * (n + 1)

    def find(self, node_idx: int) -> int:
        if self.Parent[node_idx] != node_idx:
            self.Parent[node_idx] = self.find(self.Parent[node_idx])
        return self.Parent[node_idx]

    def union(self, u: int, v: int) -> bool:
        pu = self.find(u)
        pv = self.find(v)

        if pu == pv:
            return False

        if self.Size[pu] >= self.Size[pv]:
            self.Size[pu] += self.Size[pv]
            self.Parent[pv] = pu
        else:
            self.Size[pv] += self.Size[pu]
            self.Parent[pu] = pv

        return True


class DisjointSetUnionSolution:
    """3. Solution utilizing a Disjoint Set Union algorithm

    Time & Space Complexity

    Time complexity:
        `O(m * n)`
    Space complexity:
        `O(m * n)`

    _NOTE: Where `m` is the number of rows and `n` is the number of columns in the `grid`.
    """

    def numIslands(self, grid: List[List[str]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        dsu = DSU(ROWS * COLS)

        def calc_node_idx(r, c):
            return r * COLS + c

        directions = [[-1, 0], (1, 0), (0, -1), (0, 1)]
        islands = 0

        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == "1":
                    islands += 1
                    for dr, dc in directions:
                        nr, nc = r + dr, c + dc
                        if (
                            nr < 0
                            or nc < 0
                            or nr >= ROWS
                            or nc >= COLS
                            or grid[nr][nc] == "0"
                        ):
                            continue

                        if dsu.union(calc_node_idx(r, c), calc_node_idx(nr, nc)):
                            islands -= 1

        return islands

```
