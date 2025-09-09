---
title: 'Neetcode: 3 Sum'
date: '2025-08-23'
fullPath: '/notes/dsa/neetcode/blind-75/two-pointers/question-02'
sectionSlug: 'notes'
---

## Instructions

Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` where `nums[i] + nums[j] + nums[k] == 0`, and the indices `i`, `j`, and `k` are all distinct.

The output should not contain any duplicate triplets. You may return the output and the triplets in any order.

**Example 1**:

```java
Input: nums = [-1,0,1,2,-1,-4]

Output: [[-1,-1,2],[-1,0,1]]
```

Explanation:
`nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0`
`nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0`
`nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0`
The distinct triplets are `[-1,0,1]` and `[-1,-1,2]`.

**Example 2**:

```java
Input: nums = [0,1,1]

Output: []
```

Explanation: The only possible triplet does not sum up to 0.

**Example 3**:

```java
Input: nums = [0,0,0]

Output: [[0,0,0]]
```

Explanation: The only possible triplet sums up to 0.

**Constraints**:

- `3 <= nums.length <= 1000`
- `-10^5 <= nums[i] <= 10^5`

---

## Solutions

### Python

```python
from typing import List


class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        results = []

        for i in range(len(nums) - 2):
            for j in range(i + 1, len(nums) - 1):
                for k in range(j + 1, len(nums)):
                    if nums[i] + nums[j] + nums[k] == 0:
                        sorted_triplet = sorted([nums[i], nums[j], nums[k]])

                        if sorted_triplet not in results:
                            results.append(sorted_triplet)

        return list(results)

```
