---
title: 'Exceptions and Error Handling'
date: '2024-02-28'
fullPath: '/notes/python/exceptions-and-error-handling'
iconComponentName: 'python_icon'
sectionSlug: 'notes'
---

import { ExternalLinkWrapper } from 'common/components';

# Exceptions and Error Handling

## Python's Philosophy

### Prepare for Failure

- **LBYL** stands for "look before you leap"
    - check all preconditions
- **EAFP** standers for "easier to ask forgiveness than permission"
    - prepare for consequences

### Python prefers EAFP
- code's "happy path" is emphasized rather than being interspersed with error handling
- example: file processing (and some givens)
    - processing details are not important
    - `process_file()` opens a file and reads it
```python
# ################################ Process file: LBYL version ################################


import os


p = '/path/to/datafile.dat'


if os.path.exists(p):
    process_file(p)
else:
    print(f'No such file as {p}')

### ISSUES
# what if file's contents aren't valid?
# what if path leads to directory?
# BONUS: there is race condition where file could be deleted AFTER check but BEFORE processing

# ################################ Process file: EAFP version ################################


p = '/path/to/datafile.dat'


try:
    process_file(f)
except OSError as e:
    print(f'Error: {e}')

```

#### Takeaways
- EAFP is enabled by exceptions
- without exceptions, error handling is interspersed in program flow
- exceptions can be handled non-locally
- EAFP plus Exceptions
    - exceptions are not easily ignored
    - error codes are silent by default
    - Exceptions plus EAFP makes it difficult for problems to be silently ignored

As a practice when using `try/except`, you should specify the type of exception being handled

## `try...except`
- `except` block is passed argument of exception type(s)
    - may have multiple `except` blocks per `try` block
    - accepts `tuple` as argument, which allows for passing multiple types of exceptions

## Exception Handling

- mechanism for interrupting normal program flow and continuing in surrounding context
- key concepts:
    - **Raising an exception**: act/event of interrupting normal flow of program
    - **Handling an exception**: within some enclosing context, raised exception must be handled, with control flow being transferred to exception handler
    - **Unhandled exceptions**: when exception propagates up callstack to start of program, thereby causing its termination
    - **Exception object**: contains information about where and why exception occurred, is transported from point at which exception was raised to exception handler

Examples of exceptions resulting from programmer error (_and therefore may not worth catching_)
- `IndentationError`
- `SyntaxError`
- `NameError`


### Control Flow

**`convert` example**
```python
DIGIT_MAP = {
    'zero': '0',
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
}


def convert(s):
    number = ''
    for token in s:
        number += DIGIT_MAP[token]
    x = int(number)
    return x

```

- in shell env:
```python
>>> from exceptional import convert
>>> convert("one three three seven".split())
#=> 1337
>>> convert("around two grillion".split())
#=> throws KeyError
```

- raised exception may propagate several levels in callstack
![Exception Propagation](/CorePython3_6-GettingStarted/images/handling_exceptions/exception-propagation.png)

**`convert` example (v2.0)**

```python
import sys


DIGIT_MAP = {
    'zero': '0',
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
}


def convert(s):
    try:
        number = ''
        for token in s:
            number += DIGIT_MAP[token]
        return int(number)
    except (KeyError, TypeError) as e:
        # `!r` results in using repl representation of value in string
        # stderr === standard error
        print(f"Conversion error: {e!r}", file=sys.stderr)
        return -1

```

#### `pass`
- special statement that does nothing except allow for creation of "syntactically permissible blocks that are semantically empty"
```py
### BAD
def do_something(x):
    try:
        x += "meow"
    except TypeError:
    return x

### GOOD
def do_something(x):
    try:
        x += "meow"
    except TypeError:
        pass
    return x
```

#### `try...finally`

Basic syntax:
```py
try:
    # try-block
finally:
    # executed no matter how the try-block terminates
```

##### Simple use case for `finally`

**Not-Exception-safe**
```py
import os


def make_at(path, dir_name):
    original_path = os.getcwd()
    os.chdir(path)
    os.mkdir(dir_name)
    os.chdir(original_path)
```

**Cleans up from Exceptions**
```py
import os
import sys


def make_at(path, dir_name):
    original_path = os.getcwd()
    os.chdir(path)
    try:
        os.mkdir(dir_name)
    finally:
        os.chdir(original_path)
```

**Extended with added `except` block**
```py
import os
import sys


def make_at(path, dir_name):
    original_path = os.getcwd()
    os.chdir(path)
    try:
        os.mkdir(dir_name)
    except OSError as e:
        print(e, file=sys.stderr)
        raise
    finally: ###### NOTE: this block will still run, even if exception is raised
        os.chdir(original_path)
```

> ☯️ _**Moment of Zen**_ ☯️
> _"Errors should never pass silently, unless explicitly silenced"_
>     _Errors are like bells_
>     _And if we make them silent_
>     _They are of no use_

### Re-raising Exceptions

#### Exceptions Can Not Be Ignored
- folly of returning error codes: can be easily ignored by caller
- (type) checks are always required

> 💡 **IMPORTANT** 💡
> instead of returning error codes, just raise an exception 🙂

**`convert` example (v3.0)**

```python
import sys
from math import log


DIGIT_MAP = {
    'zero': '0',
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
}


def convert(s):
    try:
        number = ''
        for token in s:
            number += DIGIT_MAP[token]
        return int(number)
    except (KeyError, TypeError) as e:
        # `!r` results in using repl representation of value in string
        # stderr === standard error
        print(f"Conversion error: {e!r}", file=sys.stderr)
        raise


def string_log(s):
    v = convert(s)
    return log(v)

```

### Exceptions Are Part of the API

Whenever possible and sensible, use Standard Exception Types
- **Standard Types**
    - Python provides standard exception types for signalling common errors
- **Invalid argument values**
    - use `ValueError` for arguments of the right type but with invalid value
- **Exception constructors**
    - use `raise ValueError()` to raise new `ValueError`

#### `sqrt` example

##### Not ideal 🙁

```python
import sys


def sqrt(x):
    """Compute square roots using the method of Heron of Alexandria.

    Args:
        x: The number for which the square root is to be computed.

    Returns:
        The square root of x.
    """
    guess = x
    i = 0
    # catching `ZeroDivisionError` and raising as `ValueError`
    try:
        while guess * guess != x and i < 20:
            guess = (guess + x / guess) / 2.0
            i += 1
    except ZeroDivisionError:
        # this is wasteful since we KNOW that the function will fail if x is a negative number
        raise ValueError()
    return guess


def main():
    try:
        print(sqrt(9))
        print(sqrt(2))
        print(sqrt(-1)) # raises ZeroDivisionError
        print("This is never printed.")
    except ZeroDivisionError:
        print("Cannot compute square root of a negative number.")

    print("Program execution continues normally here.")


if __name__ == '__main__':
    main()

```

##### Better 🙂

```python
import sys


def sqrt(x):
    """Compute square roots using the method of Heron of Alexandria.

    Args:
        x: The number for which the square root is to be computed.

    Returns:
        The square root of x.

    Raises:
        ValueError: If x is negative.
    """
    if x < 0:
        raise ValueError(f"Cannot compute square root of negative number {x}")

    guess = x
    i = 0
    while guess * guess != x and i < 20:
        guess = (guess + x / guess) / 2.0
        i += 1
    return guess


def main():
    try:
        print(sqrt(9))
        print(sqrt(2))
        print(sqrt(-1))
        print("This is never printed.")
    except ValueError as e:
        print(e, file=sys.stderr)

    print("Program execution continues normally here.")


if __name__ == '__main__':
    main()
```

---

## Exceptions

In Python, exceptions are arranged in an **inheritance** hierarchy

### Exception Protocols

- Sequences should raise `IndexError` for out-of-bounds indexing
- Exceptions must be implemented and documented correctly
- Existing built-in exceptions are often the right ones to use

#### Common Exception Types

- `IndexError`: raised when integer index is out of range
```python
nums = [1, 2, 4]
nums[4] #=> raises IndexError
```
- `ValueError`: raised when object is of correct type but has inappropriate value
```python
int("jim") #=> raises ValueError
```
- `KeyError`: raised for lookup in a mapping fails
```python
codes = dict(gb=44, us=1, no=47, fr=33, es=34)
codes['de'] #=> raises KeyError
```

### Standard Exception Hierarchy

-   In the code, can easily be viewed by looking at the `mro`:

```python
# in repl
>>> IndexError.mro()
#=> [<class 'IndexError'>, <class 'LookupError'>, <class 'Exception'>, <class 'BaseException'>, <class 'object'>]
>>> KeyError.mro()
#=> [<class 'KeyError'>, <class 'LookupError'>, <class 'Exception'>, <class 'BaseException'>, <class 'object'>]
```

-   Full class hierarchy for built-in exceptions can be found in Python's docs: <ExternalLinkWrapper href="https://docs.python.org/3/library/exceptions.html#exception-hierarchy">Exception hierarchy</ExternalLinkWrapper>

### Exception Payloads

-   Most exception types simply receive a string in their constructor
-   Can also get payload info from `args` attribute

```python
def boomboom(matchstick):
    return matchstick[0]

try:
    boomboom(1)
except LookupError as e:
    print("boomboom exploded:", e.args)

```

-   specific exception classes may provide additional specific named attributes that contain further information about
    cause

```python
def main():
    try:
        b'\x81'.decode('utf-8')
    except UnicodeError as e:
        print(e)
        print("encoding:", e.encoding)
        print("reason:", e.reason)
        print("object:", e.object)
        print("start:", e.start)
        print("end:", e.end)


if __name__ == '__main__':
    main()

```

### Defining New Exceptions

-   for the most part, they should inherit from `Exception` (_**not** `BaseException`_)
-   can override `__init__`, `__str__`, and `__repr__` to provide better output

```python
import math


class MinimalCustomException(Exception):
    pass


class TriangleError(Exception):

    def __init__(self, text, sides):
        super().__init__(text)
        self._sides = tuple(sides)

    @property
    def sides(self):
        return self._sides

    def __str__(self):
        return "'{}' for sides {}".format(self.args[0], self._sides)

    def __repr__(self):
        return "TriangleError({!r}, {!r})".format(self.args[0], self._sides)


def triangle_area(a, b, c):
    sides = sorted((a, b, c))
    if sides[2] > sides[0] + sides[1]:
        raise TriangleError("Illegal triangle", sides)
    perimeter = (a + b + c) / 2
    area = math.sqrt(perimeter * (perimeter - a) * (perimeter - b) * (perimeter - c))
    return area

```

### Chaining Exceptions

-   allows for associating one exception with another
-   two main use cases
    -   1. **implicit chaining**: when another exception occurs during proceessing of one exception, usually in way
           incidental to first exception
        -   original exception is associated with new exception through `__context__` attribute of most recent exception
    -   2. **explicit chaining**: when we wish to deliberately handle exception by translating it into different
           exception type
        -   original exception is associated with new exception through `__cause__` attribute of most recent exception

#### Implicit Chaining Example

```python
import io
import math
import sys


class MinimalCustomException(Exception):
    pass


class TriangleError(Exception):

    def __init__(self, text, sides):
        super().__init__(text)
        self._sides = tuple(sides)

    @property
    def sides(self):
        return self._sides

    def __str__(self):
        return "'{}' for sides {}".format(self.args[0], self._sides)

    def __repr__(self):
        return "TriangleError({!r}, {!r})".format(self.args[0], self._sides)


def triangle_area(a, b, c):
    sides = sorted((a, b, c))
    if sides[2] > sides[0] + sides[1]:
        raise TriangleError("Illegal triangle", sides)
    perimeter = (a + b + c) / 2
    area = math.sqrt(perimeter * (perimeter - a) * (perimeter - b) * (perimeter - c))
    return area

def main():
    try:
        a = triangle_area(3, 4, 10)
        print(a)
    except TriangleError as e:
        try:
            print(e, file=sys.stdin)
        except io.UnsupportedOperation as f:
            print(e)
            print(f)
            print(f.__context__ is e)

if __name__ == '__main__':
    main()

```

#### Explicit Chaining Example

```python
import math


class InclinationError(Exception):
    pass


def inclination(dx, dy):
    try:
        return math.degrees(math.atan(dy / dx))
    except ZeroDivisionError as e:
        raise InclinationError("Slope cannot be vertical") from e  # NOTE: this associates new exception with original exception

if __name__ == '__main__':
    try:
        inclination(0, 5)
    except InclinationError as e:
        print(e) #=> Slope cannot be vertical
        print(e.__cause__) #=> division by zero

```

### Tracebacks

-   each exception has `__traceback__` special attribute which contains reference to traceback object associated with
    exception
-   should use `traceback` module from Python standard library when working with traceback objects

**CAUTION**:

-   if at all possible, **do not** keep references to value of `__traceback__` beyond scope of except block
-   if references are needed outside of the block's scope, they should be rendered to a string

```python
import math
import traceback


class InclinationError(Exception):
    pass


def inclination(dx, dy):
    try:
        return math.degrees(math.atan(dy / dx))
    except ZeroDivisionError as e:
        raise InclinationError("Slope cannot be vertical") from e  # NOTE: this associates new exception with original exception

def main():
    try:
        inclination(0, 5)
    except InclinationError as e:
        print(e) #=> Slope cannot be vertical
        print(e.__cause__) #=> division by zero
        print(e.__traceback__) #=> <traceback object at 0x1018066c8>
        traceback.print_tb(e.__traceback__)
        s = traceback.format_tb(e.__traceback__) # for rendering

if __name__ == '__main__':
    main()
    print("Finished")

```

---

## Assertions

### `assert` statement

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

    - with active assertions (_without `-O` flag_) => 3.11 **sec** per loop
    - without active assertions (_with `-O` flag_) => 3.26 **msec** per loop

#### Examples of good `assert` usage

**Internal invariants**

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

**Class invariants**

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
