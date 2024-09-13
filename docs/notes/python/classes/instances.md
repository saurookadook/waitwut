---
title: "Class Instances"
date: "2024-05-24"
fullPath: "/notes/python/classes/instances"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

## Instance Methods

- as the first argument, instance methods _**must**_ accept reference to actual instance on which method was called
    - by convention, this argument is _always_ called `self`

```py
class Flight:

    def __init__(self, number):
        # enforcing class invariant for structure of flight number
        if not number[:2].isaplha():
            raise ValueError(f"No airline code in '{number}'")

        if not number[:2].isupper():
            raise ValueError(f"Invalid airline code '{number}'")

        if not (number[2:].isdigit() and int(number[2:]) <= 9999):
            raise ValueError(f"Invalid route number '{number}'")

        self._number = number

    def number(self):
        return self._number or "SN060"

    def airline_code(self):
        return self._number[:2]

# some-module/main.py
from airtravel import Flight

f = Flight()
f.number() #=> 'SN060'
# above is syntactic sugar for below:
Flight.number(f)
```

---

## Instance Initializers

### `__init__()`
- instance method for initializing new objects

> 💡 **IMPORTANT** 💡
> - `__init__()` is an initializer, _not_ a constructor
> - `self` is similar to `this` in Java, C#, or C++

<details>
<summary>

**Airtravel example** (_`Flight` class_)

</summary>

```python
class Flight:

    def __init__(self, number):
        # enforcing class invariant for structure of flight number
        if not number[:2].isaplha():
            raise ValueError(f"No airline code in '{number}'")

        if not number[:2].isupper():
            raise ValueError(f"Invalid airline code '{number}'")

        if not (number[2:].isdigit() and int(number[2:]) <= 9999):
            raise ValueError(f"Invalid route number '{number}'")

        self._number = number

    def number(self):
        return self._number or "SN060"

    def airline_code(self):
        return self._number[:2]
```

</details>

#### Why `_number`?
- avoid name clash with `number()`
- by convention, implementation details start with underscore

### Class Invariants
- truths about an object that endure for its lifetime
