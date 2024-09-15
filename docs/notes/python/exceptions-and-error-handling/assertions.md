---
title: 'Assertions'
date: '2024-02-28'
fullPath: '/notes/python/exceptions-and-error-handling/assertions'
iconComponentName: 'python_icon'
sectionSlug: 'notes'
---

## `assert` statement

-   basic syntax: `assert condition [,message]`
-   useful for checking [invariants](<https://en.wikipedia.org/wiki/Invariant_(mathematics)>)
-   if `condition` evaluates to `False`, an `AssertionError` is raised
    -   if `message` is supplied, it is used as payload for `AssertionError`
-   in the command line, the `-O` flag can be used to **disable active `assert` statements** when running programs

```bash
$ python3 -m timeit -n 1 -s "from random import randrange; from sorted_set import SortedSet; s = SortedSet(randrange(1000) for _ in range(2000))" "[s.count(i)] for i in range(1000)]"
#=> 1 loops best of 3: 3.11 sec per loop
$ python3 -O -m timeit -n 1 -s "from random import randrange; from sorted_set import SortedSet; s = SortedSet(randrange(1000) for _ in range(2000))" "[s.count(i)] for i in range(1000)]"
#=> 1 loops best of 3: 3.26 msec per loop
```

> - with active assertions (_without `-O` flag_) => 3.11 **sec** per loop
> - without active assertions (_with `-O` flag_) => 3.26 **msec** per loop

### Examples of good `assert` usage

#### Internal invariants

```python
def modulus_three(n):
    r = n % 3
    if r == 0:
        print("Multiple of 3")
    elif r == 1:
        print("Remainder 1")
    else:  # r == 2 <= should replace with assert
        assert r == 2, "Remainder is not 2"
        print("Remainder 2")

# and better yet
def modulus_four(n):
    r = n % 4
    if r == 0:
        print("Multiple of 4")
    elif r == 1:
        print("Remainder 1")
    elif r == 2:
        print("Remainder 2")
    elif r == 3:
        print("Remainder 3")
    else:
        assert False, "This should never happen"

```

#### Class invariants

```python
# sorted_set.py
from bisect import bisect_left
from collections.abc import Sequence, Set
from itertools import chain


class SortedSet(Sequence, Set):

    def __init__(self, items):
        self._items = sorted(set(items)) if items is not None else []

    def __contains__(self, item):
        index = bisect_left(self._items, item)
        return (index != len(self._items)) and (self._items[index] == item)

    def __len__(self):
        return len(self._items)

    def __iter__(self):
        for item in self._items:
            yield item

    def __getitem__(self, index):
        result = self._items[index]
        return SortedSet(result) if isinstance(index, slice) else result

    def __repr__(self):
        return "SortedSet({})".format(
            repr(self._items) if self._items else ''
        )

    def __eq__(self, right_hand_side):
        if not isinstance(right_hand_side, SortedSet):
            return NotImplemented
        return self._items == right_hand_side._items

    def __ne__(self, right_hand_side):
        if not isinstance(right_hand_side, SortedSet):
            return NotImplemented
        return self._items != right_hand_side._items

    def _is_unique_and_sorted(self):
        return all(
            self._items[i] < self._items[i + 1]
            for i in range(len(self._items) - 1)
        )

    # NOTE: method assumes items already sorted because of its use of binary search
    def index(self, item):
        index = bisect_left(self._items, item)
        if (index != len(self._items)) and (self._items[index] == item):
            return index
        raise ValueError("{} not found").format(repr(item))

    # NOTE: method depends on there being no duplicates in items
    def count(self, item):
        return int(item in self)

    def __add__(self, right_hand_side):
        return SortedSet(chain(self._items, right_hand_side._items))

    def __mul__(self, right_hand_side):
        return self if right_hand_side > 0 else SortedSet()

    def __rmul__(self, left_hand_side):
        return self * left_hand_side

    def issubset(self, iterable):
        return self <= SortedSet(iterable)

    def issuperset(self, iterable):
        return self >= SortedSet(iterable)

    def interaction(self, iterable):
        return self & SortedSet(iterable)

    def union(self, iterable):
        return self | SortedSet(iterable)

    def symmetric_difference(y)(self, iterable):
        return self ^ SortedSet(iterable)

    def difference(self, iterable):
        return self - SortedSet(iterable)

```
