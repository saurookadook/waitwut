---
title: 'Neetcode: Word Search'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/backtracking/question-02'
sectionSlug: 'notes'
---

## Instructions

Given a 2-D grid of characters `board` and a string `word`, return `true` if the word is present in the grid, otherwise return `false`.

For the word to be present it must be possible to form it with a path in the board with horizontally or vertically neighboring cells. The same cell may not be used more than once in a word.

**Example 1**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/a4639809-0754-4eda-221f-a4cd58bd9c00/public" alt="Visual representation of 'board' input with highlighted squares for 'word' input for Example 1.">

```java
Input:
board = [
  ["A","B","C","D"],
  ["S","A","A","T"],
  ["A","C","A","E"]
],
word = "CAT"

Output: true
```

**Example 2**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/a4639809-0754-4eda-221f-a4cd58bd9c00/public" alt="Visual representation of 'board' input with no highlighted squares for 'word' input for Example 2.">

```java
Input:
board = [
  ["A","B","C","D"],
  ["S","A","A","T"],
  ["A","C","A","E"]
],
word = "BAT"

Output: false
```

**Constraints**:

- `1 <= board.length, board[i].length <= 5`
- `1 <= word.length <= 10`
- `board` and `word` consists of only lowercase and uppercase English letters.

---

## Solutions

### Python

```python
from typing import List, Set, Tuple


class Solution:
    ROWS: int = 0
    COLS: int = 0

    def exist(self, *args) -> bool:
        return self.solution_1(*args)

    def solution_1(self, board: List[List[str]], word: str) -> bool:
        self.ROWS = len(board)
        self.COLS = len(board[0])
        path: Set[Tuple[int, int]] = set()

        def dfs(r: int, c: int, i: int) -> bool:
            """Performs recursive depth-first search

            Args:
                `r`: row index
                `c`: column index
                `i`: index of character in `word`
            """

            if i == len(word):
                return True

            if (
                self.is_outside_board(r, c)  # force formatting
                or word[i] != board[r][c]  # force formatting
                or (r, c) in path
            ):
                return False

            path.add((r, c))
            i += 1
            search_result = (
                dfs(*self.cardinal_up(r, c), i)  # force formatting
                or dfs(*self.cardinal_right(r, c), i)  # force formatting
                or dfs(*self.cardinal_left(r, c), i)  # force formatting
                or dfs(*self.cardinal_down(r, c), i)  # force formatting
            )
            path.remove((r, c))
            return search_result

        for r in range(self.ROWS):
            for c in range(self.COLS):
                if dfs(r, c, 0):
                    return True

        return False

    def cardinal_up(self, r: int, c: int):
        return r - 1, c

    def cardinal_right(self, r: int, c: int):
        return r, c + 1

    def cardinal_down(self, r: int, c: int):
        return r + 1, c

    def cardinal_left(self, r: int, c: int):
        return r, c - 1

    def is_outside_board(self, r: int, c: int) -> bool:
        return min(r, c) < 0 or r >= self.ROWS or c >= self.COLS


# ============================= 1 =============================
class BacktrackingHashSetSolution:
    """1. Solution utilizing a Backtracking Algorithm using a hash set

    ---- Time & Space Complexity ----

    Time complexity:
        - `O(m * 4^n)`
    Space complexity:
        - `O(n)`

    _NOTE: Where `m` is the number of cells in the `board` and `n` is the length of the `word`._
    """

    def exist(self, board: List[List[str]], word: str) -> bool:
        ROWS, COLS = len(board), len(board[0])
        n = len(word)
        path = set()

        def dfs(r: int, c: int, i: int) -> bool:
            """Performs recursive depth-first search

            Args:
                `r`: row index
                `c`: column index
                `i`: index of character in `word`
            """

            if i == n:
                return True

            if (
                min(r, c) < 0  # force formatting
                or r >= ROWS
                or c >= COLS
                or word[i] != board[r][c]
                or (r, c) in path
            ):
                return False

            path.add((r, c))
            i += 1
            search_result = (
                dfs(r - 1, c, i),  # force formatting
                dfs(r + 1, c, i),
                dfs(r, c - 1, i),
                dfs(r, c + 1, i),
            )
            path.remove((r, c))
            return search_result

        for r in range(ROWS):
            for c in range(COLS):
                if dfs(r, c, 0):
                    return True

        return False


# ============================= 2 =============================
class BacktrackingVisitedArraySolution:
    """2. Solution utilizing a Backtracking Algorithm using a visited array

    ---- Time & Space Complexity ----

    Time complexity:
        - `O(m * 4^n)`
    Space complexity:
        - `O(n)`

    _NOTE: Where `m` is the number of cells in the `board` and `n` is the length of the `word`._
    """

    def exist(self, board: List[List[str]], word: str) -> bool:
        ROWS, COLS = len(board), len(board[0])
        n = len(word)
        visited = [[False for _ in range(COLS)] for _ in range(ROWS)]

        def is_outside_board(r, c):
            return min(r, c) < 0 or r >= ROWS or c >= COLS

        def dfs(r: int, c: int, i: int) -> bool:
            """Performs recursive depth-first search

            Args:
                `r`: row index
                `c`: column index
                `i`: index of character in `word`
            """

            if i == n:
                return True

            if (
                is_outside_board(r, c)  # force formatting
                or word[i] != board[r][c]
                or visited[r][c]
            ):
                return False

            visited[r][c] = True
            i += 1
            search_result = (
                dfs(r - 1, c, i),  # force formatting
                dfs(r + 1, c, i),
                dfs(r, c - 1, i),
                dfs(r, c + 1, i),
            )
            visited[r][c] = False
            return search_result

        for r in range(ROWS):
            for c in range(COLS):
                if dfs(r, c, 0):
                    return True

        return False


# ============================= 3 =============================
class OptimalBacktrackingSolution:
    """3. Solution utilizing an optimal Backtracking Algorithm

    ---- Time & Space Complexity ----

    Time complexity:
        - `O(m * 4^n)`
    Space complexity:
        - `O(n)`

    _NOTE: Where `m` is the number of cells in the `board` and `n` is the length of the `word`._
    """

    def exist(self, board: List[List[str]], word: str) -> bool:
        ROWS, COLS = len(board), len(board[0])
        n = len(word)

        def is_outside_board(r, c):
            return min(r, c) < 0 or r >= ROWS or c >= COLS

        def dfs(r: int, c: int, i: int) -> bool:
            """Performs recursive depth-first search

            Args:
                `r`: row index
                `c`: column index
                `i`: index of character in `word`
            """

            if i == n:
                return True

            if (
                is_outside_board(r, c)  # force formatting
                or word[i] != board[r][c]
                or board[r][c] == "#"
            ):
                return False

            board[r][c] = "#"
            i += 1
            search_result = (
                dfs(r - 1, c, i),  # force formatting
                dfs(r + 1, c, i),
                dfs(r, c - 1, i),
                dfs(r, c + 1, i),
            )
            board[r][c] = word[i]
            return search_result

        for r in range(ROWS):
            for c in range(COLS):
                if dfs(r, c, 0):
                    return True

        return False


```
