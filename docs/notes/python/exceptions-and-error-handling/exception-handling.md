---
title: 'Exception Handling'
date: '2024-02-28'
fullPath: '/notes/python/exceptions-and-error-handling/exception-handling'
iconComponentName: 'python_icon'
sectionSlug: 'notes'
---

## Overview

- mechanisms such as `try/except` are for interrupting normal program flow and continuing in surrounding context
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

