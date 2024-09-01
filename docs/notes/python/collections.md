---
title: "Collections"
date: "2023-12-07"
fullPath: "/notes/python/collections"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

# Collections

## Protocols

- `container`: allows testing for item membership using `in` and `not in`
- `sized`: allows determining number of items in collection with `len(x)`
- `iterable`: can produce _iterator_ with `iter(x)` (_think `for..in` loop_)
- `sequence`: supports random read access to collections
- `set`: supports various set algebra operations (_methods and infix operators_)
    - `subset` and `proper subset`
    - `equal` and `not equal`
    - `proper superset` and `superset`
    - `intersections` and `union`
    - `symmetric difference` and `difference`

### `container`

- membership testing using `in` and `not in`
- **Special method**:  `__contains__(item)`
- fallback to **iterable** protocol

### `sized`

- number of items using `len(sized)` function
- must **not** consume or modify collection
- **Special method**:  `__len__()`

### `iterable`

- obtain an iterator with `iter(iterable)` function
- **Special method**: `__iter__()`

### `sequence`

- implies support for `container`, `sized`, and `iterable` protocols
- retrieve...
    - elements by indexing: `item = seq[index]`
    - slices by slicing: `item = seq[start:stop]`
    - **Special method**: `__getitem__()`
- produce reversed sequence: `r = reversed(seq)`
    - **Special method**: `__reversed__()`
    - Fallback to `__getitem__()` and `__len__()`
- find items by value: `index = seq.index(item)`
- count items: `num = seq.count(item)`
- concatenation with `+` operator
    - **Special method**: `__add__()`
- repetition with `*` operator
    - **Special methods**:
        - `__mul__()` => when class is on left-hand side of operator
        - `__rmul__()` => when class is on right-hand side of operator
- can make use of inheriting from `Sequence` from `collections.abc` (_see [Python docs](https://docs.python.org/3/library/collections.abc.html#collections-abstract-base-classes) for more info_)

### Implementing Equality and Inequality

**Special methods**:
    - equality => `__eq__()`
    - inequality => `__ne__()`

### `set`

- can make use of inheriting from `Set` from `collections.abc` (_see [Python docs](https://docs.python.org/3/library/collections.abc.html#collections-abstract-base-classes) for more info_)
    - if you need a mutable set, then:
        - inhert from `MutableSet` from `collections.abc` instead
        - implement `add()` and `discard()`
        - consider adding `update()` and `symmetric_difference_update()`, etc.
        - may also want a `copy` method
- Relational operators:
| special method | infix operator | `set` method   | meaning         |
| :---           | :---           | :---           |  :---           |
| `__le__()`     |      `<=`      | `issubset()`   | subset          |
| `__lt__()`     |       `<`      |                | proper subset   |
| `__eq__()`     |       `==`     |                | equal           |
| `__ne__()`     |       `!=`     |                | not equal       |
| `__gt__()`     |       `>`      |                | proper superset |
| `__ge__()`     |      `>=`      | `issuperset()` | superset        |
- Algebraic operators:
| special method | infix operator |  `set` method              |
| :---           | :---           | :---                       |
| `__and__()`    |      `&`       | `intersection()`           |
| `__or__()`     |      `|`       | `union()`                  |
| `__xor__()`    |      `^`       | `symmetric_difference()`   |
| `__sub__()`    |      `-`       | `symmetric_difference()`   |


### Construction

**Example**: `SortedSet` which is `sized`, `iterable`, `sequence` `container` of `set` of distinct items and constructible from an iterable

```python
# sorted_set.py
from bisect import bisect_left
from collections.abc import Sequence, Set
from itertools import chain


class SortedSet(Sequence, Set):

    def __init__(self, items):
        self._items = sorted(set(items)) if items is not None else []

    def __contains__(self, item):
        ### before refactor
        # return item in self._items
        ### after refactor
        index = bisect_left(self._items, item)
        return (index != len(self._items)) and (self._items[index] == item)

    def __len__(self):
        return len(self._items)

    def __iter__(self):
        # return iter(self._items)
        for item in self._items:
            yield item

    def __getitem__(self, index):
        # return self._items[index]
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

    def index(self, item):
        index = bisect_left(self._items, item)
        if (index != len(self._items)) and (self._items[index] == item):
            return index
        raise ValueError("{} not found").format(repr(item))

    # Override inherited `count` method to improve performance from O(n) => O(log n)
    def count(self, item):
        ### before refactor
        # index = bisect_left(self._items, item)
        # found = (index != len(self._items)) and (self._items[index] == item)
        # return int(found)
        ### after refactor
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

#### Other Considerations

- look to utilize Abstract Base Classes from Python standard library, such as <a href="https://docs.python.org/3/library/collections.abc.html" target="_blank" rel="noopener noreferrer">`collections.abc`</a>

---

## Related Pages

- [Ranges](/notes/python/ranges)
- [Sets](/notes/python/sets)
