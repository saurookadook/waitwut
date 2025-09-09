---
title: 'Neetcode: Top K Frequent Elements'
date: '2025-08-23'
fullPath: '/notes/dsa/neetcode/blind-75/arrays-and-hashing/question-05'
sectionSlug: 'notes'
---

## Instructions

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements within the array.

The test cases are generated such that the answer is always **unique**.

You may return the output in **any order**.

**Example 1**:

```java
Input: nums = [1,2,2,3,3,3], k = 2

Output: [2,3]
```

**Example 2**:

```java
Input: nums = [7,7], k = 1

Output: [7]
```

**Constraints**:

- `1 <= nums.length <= 10^4`
- `-1000 <= nums[i] <= 1000`
- `1 <= k <= number of distinct elements in nums`

---

## Solutions

### JavaScript

```javascript
/**
 * Time & Space Complexity
 * - Time: `O(n * log n)`
 * - Space: `O(n)`
 */
class SortingSolution {
    numCounts = {};
    results = [];

    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    topKFrequent(nums, k) {
        for (const num of nums) {
            this.numCounts[num] = (this.numCounts[num] || 0) + 1;
        }

        for (const [num, count] of Object.entries(this.numCounts)) {
            this.updateResults({ num, count, k });
        }

        return this.results.map((tuple) => tuple[0]);
    }

    updateResults({ num, count, k }) {
        if (
            this.results.length === k
            && this.results.at(-1)[1] > count
        ) {
            return;
        }

        this.results.push([num, count])
        this.results.sort((a, b) => b[1] - a[1]);

        if (this.results.length > k) {
            this.results.pop();
        }
    }
}


/**
 * Time & Space Complexity
 * - Time: `O(n)`
 * - Space: `O(n)`
 */
class BucketSortSolution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    topKFrequent(nums, k) {
        const countMap = {};
        // This seems unnecessary...? Why not just initialize an empty array?
        const countBuckets = Array.from({ length: nums.length + 1 }, () => []);

        for (const n of nums) {
            countMap[n] = (countMap[n] || 0) + 1;
        }

        // NOTE: use of `in` here; could also use `of Object.keys(countMap)`
        for (const n in countMap) {
            const count = countMap[n]
            countBuckets[count].push(parseInt(n));
        }

        const results = [];

        for (let i = countBuckets.length - 1; i > 0; i--) {
            for (const n of countBuckets[i]) {
                results.push(n);
                if (results.length === k) {
                    return results;
                }
            }
        }
    }
}

```
