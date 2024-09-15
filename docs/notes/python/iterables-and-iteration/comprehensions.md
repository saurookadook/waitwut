---
title: "Comprehensions"
date: "2023-12-07"
fullPath: "/notes/python/iterables-and-iteration/comprehensions"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

## Overview

- concise syntax for describing lists, sets, and dictionaries
- readable and expressive
- close to natural language

### List Comprehension

- basic syntax:
    - `[ expression for item in iterable ]`
    - expression can be _any_ Python expression

```python
words = "Why sometimes I have believed as many as six impossible things before breakfast".split()
words #=> ['Why', 'sometimes', 'I', 'have', 'believed', 'as', 'many', 'as', 'six', 'impossible', 'things', 'before', 'breakfast']

# list comprehension
[ len(word) for word in words ]
#=> [3, 9, 1, 4, 8, 2, 4, 2, 3, 10, 6, 6, 9]

# another example
from math import factorial
f = [ len(str(factorial(x))) for x in range(20) ]
f #=> [1, 1, 1, 1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 18]

```

### Set Comprehensions

- basic syntax:
    - `[ expression for item in iterable ]`
    - duplicates will be eliminated
    - _REMINDER: expect that order will not be preserved_

```python
from math import factorial
s = { len(str(factorial(x))) for x in range(20) }
s #=> {1, 2, 3, 4, 5,6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 18}
```

### Dict Comprehensions

- basic syntax
    - `{ key_expression: value_expression for item in iterable }`
    - useful for reversing key-value pairs in an existing dictionary (for faster lookup in other direction)

```python
country_to_capital = { 'United Kingdom': 'London',
                        'Brazil': 'Brasília',
                        'Morocco': 'Rabat',
                        'Sweden': 'Stockholm' }
capital_to_country = {capital: country for country, capital in country_to_capital.items()}

# duplicate keys will be overwritten
words = ["hi", "hello", "foxtrot", "hotel"]
{ x[0]: x for x in words }
#=> {'h': 'hotel', 'f': 'foxtrot'}
```

**NOTE**
- dictionary comprehensions _do not_ work directly on `dict` sources
- use `dict.items()` to get keys and values from source `dict`

### Filtering Comprehensions

```python
from pprint import pprint as pp
from math import sqrt

def is_prime(x):
    if x < 2:
        return False
    for i in range(2, int(sqrt(x)) + 1):
        if x % i == 0:
            return False
    return True

# list comprehension with filtering clause
[ x for x in range(101) if is_prime(x) ]
#=> [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

# dict comprehension which maps numbers with exactly 3 divisors to a tuple of those divisors
prime_square_divisors = { x*x: (1, x, x*x) for x in range(20) if is_prime(x) }
pp(prime_square_divisors)
#=> {4: (1, 2, 4),
#=> 9: (1, 3, 9),
#=> 25: (1, 5, 25),
#=> 49: (1, 7, 49),
#=> 121: (1, 11, 121),
#=> 169: (1, 13, 169),
#=> 289: (1, 17, 289),
#=> 361: (1, 16, 361)}
```

> 💡 **IMPORTANT** 💡
> comprehensions should normally have no side-effects

> ☯️ _**Moment of Zen**_ ☯️
> _"Simple is better than complex"_
>     _Code is written once_
>     _But read over and over_
>     _Fewer is clearer_

### Multi-Input Comprehensions

Comprehensions can use **multiple input sequences** and **multile if-clauses**

Benefits:
- container populated "atomically"
- allows Python to optimize creation
- more readable

```python
[(x, y) for x in range(5) for y in range(3)]

# above as `for` loops
points = []
for x in range(5):
    for y in range(3):
        points.append((x, y))


values = [x / (x - y)
          for x in range(100) if x > 50
          for y in range(100) if x - y != 0]

# above as `for` loops
values = []
for x in range(100):
    if x > 50:
        for y in range(100):
            if x - y != 0:
                values.append(x / (x - y))

# referencing variable from 1st `for` loop in 2nd `for` loop
[(x, y) for x in range(10) for y in range(x)]

# above as `for` loops
result = []
for x in range(100):
    for y in range(x):
        result.append((x, y))
```

### Nested Comprehensions

- all comprehensions nest in the same way

```python
vals = [[y * 3 for y in range(x)] for x in range(10)]

# above as `for` loops
outer = []
for x in range(10):
    inner = []
    for y in range(x):
        inner.append(y * 3)
    outer.append(inner)


```

### `map()`

- apply a function to every element in a sequence, producing a new sequence
- creates `map` object that uses lazy evaluation, meaning it only produces values as needed
    - `map` object is an iterator object
- can accept any number of input sequences
    - **NOTE**: number of input sequences _**must**_ match number of functional arguments
![map-with-multiple-input-sequences](../src/images/python/function-vs-lambda.png)
- map will terminate as soon as _any_ of the input sequences are terminated

```python
# get Unicode codepoint for each character in string
map(ord, 'The quick brown fox')
#=> <map object at 0x101576a90>
```

Using `Trace` with first arg of `map()`

```python
class Trace:
    def __init__(self):
        self.enabled = True

    def __call__(self, f):
        def wrap(*args, **kwargs):
            if self.enabled:
                print('Calling {}'.format(f))
            return f(*args)

result = map(Trace()(ord), 'The quick brown fox')
```

Example with multiple input-sequences:
```python
sizes = ['small', 'medium', 'large']
colors = ['lavender', 'teal', 'burnt orange']
animals = ['koala', 'platypus', 'salamander']
def combine(size, color, animal):
    return '{} {} {}'.format(size, color, animal)

list(map(combine, sizes, colors, animals))
#=> ['small lavender koala', 'medium teal platypus', 'large burnt orange salamander']
```

Example of early termination
```python
import itertools

sizes = ['small', 'medium', 'large']
colors = ['lavender', 'teal', 'burnt orange']
animals = ['koala', 'platypus', 'salamander']

def combine(quantity, size, color, animal):
    return '{} x {} {} {}'.format(quantity, size, color, animal)

list(map(combine, itertools.count(), sizes, colors, animals))
#=> ['0 x small lavender koala', '1 x medium teal platypus', '2 x large burnt orange salamander']
```

### `filter()`

- apply a function to each element in a sequence, constructing a new sequence with the elements for which the function returns `True`
- unlike `map`, only accepts single sequence and function must only accept single argument
- **NOTE**: can pass `None` as first argument to remove elements which evaluate to `False`

```python
positives = filter(lambda x: x > 0, [1, -5, 0, 6, -2, 8])
#=> <filter object at 0x101576d90>
list(positives)
#=> [1, 6, 8]
```

### `functools.reduce()`

- repeatedly apply a function to elements of a sequence, reducing them to a single value
- accepts optional **initial value**
    - _conceptually, just added to the start of the input sequence_

_NOTE: standard library `operator` module contains function equivalents of infix operators_

```python
from functools import reduce
import operator

reduce(operator.add, [1, 2, 3, 4, 5])
#=> 15
```

Example with function that prints progress
```python
from functools import reduce

def mul(x, y):
    print('mul {} {}'.format(x, y))
    return x * y

reduce(mul, range(1, 10))
#=> mul 1, 2
#=> mul 2, 3
#=> mul 6, 4
#=> mul 24, 5
#=> mul 120, 6
#=> mul 720, 7
#=> mul 5040, 8
#=> mul 40320, 9
#=> 362880


import operator

values = [1, 2, 3]
reduce(operator.add, values, 0)
#=> 6

values = []
reduce(operator.add, values, 0)
#=> 0
```
