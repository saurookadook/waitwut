---
title: 'Neetcode: Container with Most Water'
date: '2025-08-23'
fullPath: '/notes/dsa/neetcode/blind-75/two-pointers/question-3'
sectionSlug: 'notes'
---

## Instructions

You are given an integer array `heights` where `heights[i]` represents the height of the <em>i<sup>th</sup></em> bar.

You may choose any two bars to form a container. Return the maximum amount of water a container can store.

**Example 1**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/77f004c6-e773-4e63-7b99-a2309303c700/public" alt="Graph representation of input array with shaded in area representing answer.">

```java
Input: height = [1,7,2,5,4,7,3,6]

Output: 36
```

**Example 2**:

```java
Input: height = [2,2,2]

Output: 4
```

**Constraints**:

- `2 <= height.length <= 1000`
- `0 <= height[i] <= 1000`

## Solutions

### Python

```Python
class Solution:
    def maxArea(self, heights: List[int]) -> int:
        result_area = 0

        i = 0
        j = len(heights) - 1

        while i < j:
            result_area = max(result_area, self.calc_area(heights, i, j))

            if heights[i] < heights[j]:
                i += 1
            else:
                j -= 1

        return result_area

    def calc_area(self, heights: List[int], i: int, j: int) -> int:
        return (j - i) * min(heights[i], heights[j])

```
