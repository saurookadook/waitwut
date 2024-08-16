---
title: "Hash Maps"
date: '2024-08-16'
fullPath: '/notes/dsa/tech-dev-guide/01-maps-dictionaries/hash-maps'
sectionSlug: 'notes'
---

_from [Leetcode tutorial](https://leetcode.com/explore/learn/card/hash-table/)_

# Intro - `Hash Table`

- data structure which organizes data using `hash functions` in order to support quick insertion and search
- two different kinds:
    - **`hash set`**: implementation of `set` data structure to store `no repeated values`
    - **`hash map`**: implementation of `map` data structure to store `(key, value)` pairs
- choosing proper `hash function` is key to performance of insertion and search

## Design a Hash Table

### Principal of Hash Table

- key idea is to use `hash function` to _**map keys to buckets**_
- specifically
    1. when inserting new `key`, `hash function` decides which bucket `key` should be assigned and `key` will be stored in corresponding bucket
    2. when searching for a `key`, the hash table will use same `hash function` to find corresponding bucket and search only in specific bucket

#### Example

```
        =====================
       ||                   ||
       ||       ------------------> 0
       ||       |           ||
0 --------------|           ||
       ||                   ||      1
1987 -------------------|   ||
       ||               |   ||
       ||               |---------> 2
24 ----------|          |   ||
       ||    |          |   ||
       ||    |          |   ||      3
2 ----------------------|   ||
       ||    |              ||
       ||    |--------------------> 4
       ||                   ||
        ===================
```

- uses `x % 5 = y` as `hash function`
- **insertion** strategy: parse `key`s through `hash function` to map them to corresponding bucket
```
i.e.
1987 is assigned to bucket 2 -- 1987 % 5 = 2
24 is assigned to bucket 4 -- 24 % 6 = 4
```
- **search** strategy: parse keys through same `hash function` and search only in specific bucket
```
i.e.
when searching for 1987, the same `hash function` is used to map 1987 to 2, and so we search in bucket 2 and successfully find 1987 in that bucket.
when searching for 23, will map 23 to 3 and therefore search in bucket 3. However, 23 is not in bucket 3, meaning that 23 is not in the hash table.
```

### Keys to Designing a Hash Table

Two essential factors: the **`hash function`** and **collision resolution**

#### Hash Function

- most important component of a hash table
- which `hash function` is used depends on **the range of key values** and **the number of buckets**

##### Examples of hash functions

| Key Type              | Key Range                               | Number of buckets        | Hash Function Example                     |
| :-------------------: | :-------------------------------------: | :----------------------: | :---------------------------------------- |
| integer               | 0 to 100,000                            | 100                      | y = x % 1000                              |
| char                  | 'a' to 'z'                              | 26                       | y = x - 'a'                               |
| array of integers     | size <= 10, each number member of [0,1] | 1024                     | y = x0 * 2^0 + x1 * 2^1 + ... + x9 * 2^9  |
| array of integers     | size <= 5, each number member of [0,3]  | 1024                     | y = x0 * 4^0 + x1 * 4^1 + ... + x4 * 4^4  |

_NOTE: x represents key and y represents hash results_

- designing a `hash function` is an **open problem**
- idea is to try to assign key to bucket as uniformly as possible
- **ideally**, perfect `hash function` would result in one-one mapping between key and bucket
- **in practice**, it's usually a tradeoff between _amount of buckets_ and _capacity of bucket_

#### Collision Resolution

Collisions from result of `hash function` are basically inevitable. Collision resolution algorithms should solve following concerns:
1. How should it organize values in same bucket?
2. What if too many values are assigned to same bucket?
3. How should it search for target value in specific bucket?

These concerns are related to `capacity of bucket` and `number of keys` which might be mapped into `same bucket` according to `hash function`.

Assume that a given bucket, which holds maximum number of keys, has `N` keys.

If `N` is constant and small, we could simply use `array` to store keys in same bucket. If `N` is variable or large, might need to use `height-balanced binary search tree` instead.
