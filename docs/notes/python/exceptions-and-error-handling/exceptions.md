---
title: 'Exceptions'
date: '2024-02-28'
fullPath: '/notes/python/exceptions-and-error-handling/exceptions'
iconComponentName: 'python_icon'
sectionSlug: 'notes'
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

-   Full class hierarchy for built-in exceptions can be found in Python's docs: <a href="https://docs.python.org/3/library/exceptions.html#exception-hierarchy" target="_blank" rel="noopener noreferrer">Exception hierarchy</a>

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
