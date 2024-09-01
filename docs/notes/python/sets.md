---
title: "Sets"
date: "2024-05-21"
fullPath: "/notes/python/sets"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

# Sets

## `set`

- unordered collection of unique elements
- sets are mutable
    - _insofar as elements can be added and removed from the set_
- each element in set:
    - **must be immutable**
    - is a single object rather than a key-value pair
- `set()` constructor can:
    - create set from _any iterable series_
    - duplicates discarded
- membership tested with `in` and `not in` operators
```py
p = {6, 28, 496, 8128, 33550336}

### creating empty `set` using `set()` constructor
e = set()
s = set([2, 4, 16, 64, 4096, 65536, 262144])

# iterable but order is arbitrary
for x in {1, 2, 4, 8, 16, 32}:
    print(x)

32
1
2
4
8
16

### adding single element to `set`
k = {81, 108}
k.add(54)
k #=> {81, 108, 54}
k.add(12)
k #=> {81, 108, 12, 54}
k.add(108) # NOTE: produces no effect but also doesn't produce an error

### adding multiple elements
k.update([37, 128, 97])
k #=> {128, 97, 37, 108, 12, 81, 54}

### removing an element
k.remove(97)
k.remove(1000) # NOTE: removing an element not in the set results in KeyError

k.discard(1000) # NOTE: doesn't throw error

### supports `copy()` method
j = k.copy()
```

---

## Set Algebra

**union**
    - collects together all elements which are in either or both sets
    - commutative operation
**difference**:
    - collects elements from first `set` which are not present in second
    - non-commutative operation
- **symmetric_difference**
    - collects elements which are either only in the first or second sets but not in both
    - commutative operation
**intersection**:
    - collects together only elements in both sets
    - commutative operation
**subset**:
    - `issubset()` predicate method for determining if first set is a _subset_ of second
**superset**:
    - `issuperset()` predicate method for determining if second set is _superset_ of first
**disjoint**:
    - `isdisjoint()` predicate method for determining if no members are common between sets

> ⚠️ _**Note**: commutative operation === order can be swapped_

![Set Algebra](/CorePython3_6-GettingStarted/images/built-in-collections/set-algebra.png)

```py
blue_eyes = {'Olivia', 'Harry', 'Lily', 'Jack', 'Amelia'}
blond_hair = {'Harry', 'Jack', 'Amelia', 'Mia', 'Joshua'}
# `smell_hcn` = can smell hydrogen cyanide
smell_hcn = {'Harry', 'Amelia'}
# `taste_ptc` = can taste phenylthiocarbamide
taste_ptc = {'Harry', 'Lily', 'Amelia', 'Lola'}
o_blood = {'Mia', 'Joshua', 'Lily', 'Olivia'}
b_blood = {'Amelia', 'Jack'}
a_blood = {'Harry'}
ab_blood = {'Joshua', 'Lola'}

### `union()`
blue_eyes.union(blond_hair) #=> {'Harry', 'Jack', 'Amelia', 'Joshua', 'Mia', 'Olivia', 'Lily'}
blue_eyes.union(blond_hair) == blond_hair.union(blue_eyes) #=> True

### `intersection()`
blue_eyes.intersection(blond_hair) #=> {'Harry', 'Jack', 'Amelia'}
blue_eyes.intersection(blond_hair) == blond_hair.intersection(blue_eyes) #=> True

### `difference()`
blond_hair.difference(blue_eyes) #=> {'Mia', 'Joshua'}
blond_hair.difference(blue_eyes) == blue_eyes.difference(blond_hair) #=> False

### `symmetric_difference()`
blond_hair.symmetric_difference(blue_eyes) #=> {'Joshua', 'Mia', 'Olivia', 'Lily'}
blond_hair.symmetric_difference(blue_eyes) == blue_eyes.symmetric_difference(blond_hair) #=> True

### `issubset()`
smell_hcn.issubset(blond_hair) #=> True

### `issuperset()`
taste_ptc.issuperset(smell_hcn) #=> True

### `isdisjoint()` method
a_blood.isdisjoint(o_blood)
```

---

## Protocols

- set of operations that a type must support to implement the protocol
- _do not_ need to be defined as interfaces or base classes
- types only need to provide functioning implementations operations from the protocol

|      Protocol     |   Implementing collections                                |
| Container         | `str`, `list`, `dict`, `range`, `tuple`, `set`, `bytes`   |
| Sized             | `str`, `list`, `dict`, `range`, `tuple`, `set`, `bytes`   |
| Iterable          | `str`, `list`, `dict`, `range`, `tuple`, `set`, `bytes`   |
| Sequence          | `str`, `list`, `range`, `tuple`, `bytes`                  |
| Mutable Sequence  | `list`                                                    |
| Mutable Set       | `set`                                                     |
| Mutable Mapping   | `dict`                                                    |
