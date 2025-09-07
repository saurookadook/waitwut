---
title: 'Neetcode: Longest Palindromic Substring'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/1D-dynamic-programming/question-04'
sectionSlug: 'notes'
---

## Instructions

Given a string `s`, return the longest substring of `s` that is a _palindrome_.

A **palindrome** is a string that reads the same forward and backward.

If there are multiple palindromic substrings that have the same length, return any one of them.

**Example 1**:

```java
Input: s = "ababd"

Output: "bab"
```

Explanation: Both "aba" and "bab" are valid answers.

**Example 2**:

```java
Input: s = "abbc"

Output: "bb"
```

**Constraints**:

- `1 <= s.length <= 1000`
- `s` contains only digits and English letters.

## Solutions

### Python

```python
# ============================= 1 =============================
class BruteForceSolution:
    """1. Solution utilizing Brute Force approach

    Time & Space Complexity

    Time complexity:
        `O(n^3)`
    Space complexity:
        `O(n)`
    """

    def longestPalindrome(self, s: str) -> str:
        res, res_len = "", 0

        for i in range(len(s)):
            for j in range(i, len(s)):
                l, r = i, j
                while l < r and s[l] == s[r]:
                    l += 1
                    r -= 1

                if l >= r and res_len < (j - i + 1):
                    res = s[i : j + 1]
                    res_len = j - i + 1

        return res


# ============================= 2 =============================
class DynamicProgrammingSolution:
    """2. Solution utilizing Dynamic Programming

    Time & Space Complexity

    Time complexity:
        `O(n^2)`
    Space complexity:
        `O(n^2)`
    """

    def longestPalindrome(self, s: str) -> str:
        res_start_idx, res_len = 0, 0
        n = len(s)

        dp_table = [[False] * n for _ in range(n)]

        for i in range(n - 1, -1, -1):  # start: n - 1, stop: -1, step: -1
            for j in range(i, n):
                if s[i] == s[j] and (j - 1 <= 2 or dp_table[i + 1][j - 1]):
                    dp_table[i][j] = True
                    if res_len < (j - i + 1):
                        res_start_idx = i
                        res_len = j - i + 1

        return s[res_start_idx : res_start_idx + res_len]


# ============================= 3 =============================
class TwoPointersSolution:
    """3. Solution utilizing Two Pointers

    Time & Space Complexity

    Time complexity:
        `O(n^2)`
    Space complexity:
        `O(1)` extra space
        `O(n)` space for output string
    """

    def longestPalindrome(self, s: str) -> str:
        res_start_idx = 0
        res_len = 0

        for i in range(len(s)):
            l, r = i, i
            while l >= 0 and r < len(s) and s[l] == s[r]:
                if (r - l + 1) > res_len:
                    res_start_idx = l
                    res_len = r - l + 1
                l -= 1
                r += 1

            l, r = i, i + 1
            while l >= 0 and r < len(s) and s[l] == s[r]:
                if (r - l + 1) > res_len:
                    res_start_idx = l
                    res_len = r - l + 1
                l -= 1
                r += 1

        return s[res_start_idx : res_start_idx + res_len]


# ============================= 4 =============================
class ManachersAlgorithmSolution:
    """4. Solution utilizing Manacher's Algorithm

    Time & Space Complexity

    Time complexity:
        `O(n)`
    Space complexity:
        `O(n)`
    """

    def longestPalindrome(self, s: str) -> str:
        def manacher(s):
            t = "#" + "#".join(s) + "#"
            n = len(t)
            p = [0] * n
            l, r = 0, 0

            for i in range(n):
                p[i] = min(r - i, p[l + (r - i)]) if i < r else 0
                while (
                    i + p[i] + 1 < n
                    and i - p[i] - 1 >= 0
                    and t[i + p[i] + 1] == t[i - p[i] - 1]
                ):
                    p[i] += 1
                if i + p[i] > r:
                    l, r = i - p[i], i + p[i]

            return p

        p = manacher(s)
        res_len, center_idx = max((v, i) for i, v in enumerate(p))
        res_start_idx = (center_idx - res_len) // 2
        return s[res_start_idx : res_start_idx + res_len]

```
