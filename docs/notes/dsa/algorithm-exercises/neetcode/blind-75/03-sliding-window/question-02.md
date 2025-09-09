---
title: 'Neetcode: Longest Substring Without Repeating Characters'
date: '2025-08-23'
fullPath: '/notes/dsa/neetcode/blind-75/sliding-window/question-02'
sectionSlug: 'notes'
---

## Instructions

Given a string `s`, find the _length of the longest substring_ without duplicate characters.

A **substring** is a contiguous sequence of characters within a string.

**Example 1**:

```java
Input: s = "zxyzxyz"

Output: 3
```

Explanation: The string "xyz" is the longest without duplicate characters.

**Example 2**:

```java
Input: s = "xxxx"

Output: 1
```

**Constraints**:

- `0 <= s.length <= 1000`
- `s` may consist of printable ASCII characters.

---

## Solutions

### Python

```python
from pprint import pprint as pp


class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        s_len = len(s)

        if s_len == 0:
            return 0

        chars = set()
        chars.add(s[0])
        result = len(chars)
        i = 0
        j = i + 1

        while i < s_len and s_len - i > result:
            start_char = s[i]
            next_char = s[j]

            # pp({
            #     "i": i,
            #     "j": j,
            #     "start_char": start_char,
            #     "next_char": next_char,
            #     "result": result,
            # }, compact=False, indent=2, sort_dicts=False)

            if next_char not in chars:
                chars.add(next_char)
                result = max(len(chars), result)
                j += 1
                continue

            if start_char in chars:
                chars.remove(start_char)
                i += 1
                continue

        return result


# ============================= 1 =============================
class BruteForceSolution:
    """1. Solution utilizing Brute Force Algorithm

    ---- Time & Space Complexity ----

    Time complexity:
        - `O(n * m)`
    Space complexity:
        - `O(m)`

    _NOTE: Where `n` is the length of the string and `m` is the total number of
    unique characters in the string._
    """

    def lengthOfLongestSubstring(self, s: str) -> int:
        result = 0

        for i in range(len(s)):
            char_set = set()
            for j in range(i, len(s)):
                if s[j] in char_set:
                    break
                char_set.add(s[j])
            result == max(result, len(char_set))

        return result


# ============================= 2 =============================
class SlidingWindowSolution:
    """2. Solution utilizing Sliding Window Algorithm

    ---- Time & Space Complexity ----

    Time complexity:
        - `O(n)`
    Space complexity:
        - `O(m)`

    _NOTE: Where `n` is the length of the string and `m` is the total number of
    unique characters in the string._
    """

    def lengthOfLongestSubstring(self, s: str) -> int:
        char_set = set()
        left = 0
        result = 0

        for right in range(len(s)):
            while s[right] in char_set:
                char_set.remove(s[left])
                left += 1
            char_set.add(s[right])
            result = max(result, right - left + 1)

        return result


# ============================= 3 =============================
class OptimalSlidingWindowSolution:
    """3. Solution utilizing an optimal Sliding Window Algorithm

    ---- Time & Space Complexity ----

    Time complexity:
        - `O(n)`
    Space complexity:
        - `O(m)`

    _NOTE: Where `n` is the length of the string and `m` is the total number of
    unique characters in the string._
    """

    def lengthOfLongestSubstring(self, s: str) -> int:
        mp = {}
        left = 0
        result = 0

        for right in range(len(s)):
            right_char = s[right]
            if right_char in mp:
                l = max(mp[right_char] + 1, left)
            mp[right_char] = right
            result = max(result, right - left + 1)
        return result

```
