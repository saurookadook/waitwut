---
title: "Iterables and Iteration"
date: "2023-12-07"
fullPath: "/notes/python/iterables-and-iteration"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

# Iterables and Iteration

- [Comprehensions](#comprehensions)
    - creating familiar objects
    - creating new kinds of objects
    - filtering
- [Low-level `iterable` API](#iterable-api)
    - Iterators
    - Exceptions in iteration
- [Generator functions](#generator-functions)
    - the `yield` keyword
    - statefulness, laziness, and infinite sequences
    - generator expressions
- [Iteration tools](#iteration-tools)

---

## Comprehensions
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

---

## `iterable` API

### Important Concepts
- **iterable** objects
    - can be passed `iter()` to produce an `iterator`
- **iterator** objects
    - can be passed to `next()` to get the `next` value in sequence

```python
iterable = ['Spring', 'Summer', 'Autumn', 'Winter']
iterator = iter(iterable)
next(iterator) #=> 'Spring'
next(iterator) #=> 'Summer'
next(iterator) #=> 'Autumn'
next(iterator) #=> 'Winter'
next(iterator) #=> NOTE: raises exception of StopIteration
```

### Stopping Iteration with an Exception

_Why is it considered exceptional?_
- a single end
    - sequences only have one ending, after all, so reaching it is exceptional
- infinite sequences
    - finding end of infinite sequence would be _truly_ exceptional

More concrete use a utility function
- when passed iterable object, returns first item in series
- if series is empty, raises ValueError

```python
def first(iterable):
    iterator = iter(iterable)
    try:
        return next(iterator)
    except StopIteration:
        raise ValueError("iterable is empty")

```

### Iteration Protocols

- `iter()`
    - create an iterator
- `next()`
    - get next element in sequence
- `StopIteration`
    - signal end of sequence

**iterable**: object that implements `__iter__()` method
**iterator**: object that implements the iterable protocol and the `__next__()` method

```python
class ExampleIterator:
    def __init__(self, data):
        self.index = 0
        self.data = data

    def __iter__(self):
        return self

    def __next__(self):
        if self.index >= len(self.data):
            raise StopIteration()

        result = self.data[self.index]
        self.index += 1
        return result

class ExampleIterable:
    def __init__(self):
        self.data = [1, 2, 3]

    def __iter__(self):
        return ExampleIterator(self.data)
```

#### Alternative Iterable Protocol

- works with any object that supports consecutive **integer indexing** via `__getitem__()`
    - when out of indexes, `__getitem__()` must throw IndexError

```python
class AlternateIterable:
    def __init__(self):
        self.data = [1, 2, 3]

    def __getitem__(self, idx):
        return self.data[idx]
```

### Extended `iter()`

- `iter(callable, sentinel)`
    - `callable`: object that takes zero args
    - `sentinel`: iteration stops when `callable` produce this value
- often used for creating **infinite sequences** from existing functions

### Real-world Usage Examples

#### Streamed Sensor Data

```python
# sensor.py
import datetime
import itertools
import random
import time

class Sensor:
    def __iter__(self):
        return self

    def __next__(self):
        return random.random()

sensor = Sensor()
timestamps = iter(datetime.datetime.now, None)

for stamp, value in itertools.islice(zip(timestamps, sensor), 10):
    print(stamp, value)
    time.sleep(1)
```

---

## Generator Functions
- iterables defined by functions
- lazy evaluation _(i.e. they only compute next value on demand)_
- can model sequences with no definite end
    - for example, a stream of data from a sensor or active log files
- composable into pipelines
- **`yield`**: generator functions _must_ include at least one `yield` statement
- may also include return statements

```python
# simple generator function example
def gen123():
    yield 1
    yield 2
    yield 3

g = gen123()
g #=> <generator object gen123 at 0x10efca450>
next(g) #=> 1
next(g) #=> 2
next(g) #=> 3
next(g) #=> NOTE: raises exception of StopIteration

for v in gen123():
    print(v)

#=> 1
#=> 2
#=> 3


# NOTE: each call creates new object
h = gen123()
i = gen123()
h #=> <generator object gen123 at 0x10efca8d0>
i #=> <generator object gen123 at 0x10efca950>
h is i #=> False
next(h) #=> 1
next(h) #=> 2
next(i) #=> 1

### illustrating order of execution
def gen246():
    print("About to yield 2")
    yield 2
    print("About to yield 4")
    yield 4
    print("About to yield 6")
    yield 6
    print("About to return")

g = gen246()
next(g)
#=> About to yield 2
#=> 2
```

### Maintaining State in Generators

#### Graphical Debugger
- control flow is easier to see in a graphical debugger
- following example uses PyCharm

```python
def take(count, iterable):
    counter = 0
    for item in iterable:
        if counter == count:
            return
        counter += 1
        yield item


def distinct(iterable):
    seen = set()
    for item in iterable:
        if item in seen:
            continue
        yield item
        seen.add(item)


def run_pipeline():
    items = [3, 6, 6, 2, 1, 1]
    for item in take(3, distinct(items)):
        print(item)


run_pipeline()

```

> 💡 **IMPORTANT** 💡
> - lazy computation can result in complex flow control, which can be difficult to debug
> - during development, forced evaluation can simplify things

### Laziness and the Infinite

- generators only do enough work to produce requested data
- allows generators to model infinite (or just very large) sequences
- examples:
    - sensor readings
    - mathematical sequences
    - contents of large files (think 'multi-terabyte files')

```python
# definitely DOES NOT have anything to do with the order in which you should watch the Star Wars series
def lucas():
    yield 2
    a = 2
    b = 1
    while True:
        yield b
        a, b = b, a + b

```

### Generator Expressions

- cross between comprehensions and generator functions
- result in creation of generator object that produces specified sequence lazily
- basic syntax
    - `(expression for item in iterable)`
- useful for situations in which you want both:
    - lazy evaluation of generators
    - declarative concision of comprehensions

```python
# yields list of first 1 million square numbers
million_squares = (x*x for x in range(1, 1000001))
million_squares #=> <generator object <genexpr> at 0x1032cd450>

# force evaluation of generator by using it to creat long list
list(million_squares)[-10:] #=> [999982000081, ...]
### NOTE: above list consumes a significant amount of memory (about 40mb for the list object and contained integer objects, in this case)

# because iterator has been completely evaluated, it cannot be used to create another, similar list
list(million_squares) #=> []
```

> 💡 **IMPORTANT** 💡
> - generators are single-use objects
> - to recreate generator from generator expression, the expression must be executed again

---

## Iteration Tools

### Batteries Included
- powerful vocabularly for working with iterators, including `enumerate()` and `sum()`
- `itertools` module contains many useful functions and generators for processing iterable streams of data

### `itertools.islice()`
- perform lazy slicing of any iterator

```python
# sudocode: get first 1000 prime integers
from itertools import islice
islice(all_primes, 1000)
```

### `itertools.count()`
- unbounded arithmetic sequence of integers


#### `islice` and `count`

```python
from itertools import count, islice

thousand_primes = islice((x for x in count() if is_prime(x)), 1000)
thousand_primes #=> <itertools.islice object at 0x10a0d8530>
list(thousand_primes)[-10:] #=> [7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919]

sum(islice((x for x in count() if is_prime(x)), 1000)) #=> 3682913
```

### Boolean Aggregation
- `any()`: determines if any elements in a series are true
- `all()`: determines if all elements in a series are true

#### `any` and `all`

```python
any([False, False, True]) #=> True
all([False, False, True]) #=> False

# are there any prime numbers in the inclusive range 1328 to 1360
any(is_prime(x) for x in range(1328, 1361)) #=> False

# all of city names are proper nouns with initial uppercase letters
all(name == name.title() for name in ['London', 'Paris', 'Tokyo', 'New York', 'Sydney', 'Kuala Lumpur']) #=> True
```

### `zip`
- synchronize iteration across two or more iterables
- when iterated, yields `tuple`s

```python
sunday = [12, 14, 15, 15, 17, 21, 22, 22, 23, 22, 20, 18]
monday = [13, 14, 14, 14, 16, 20, 21, 22, 22, 21, 19, 17]

for item in zip(sunday, monday):
    print(item)

#=> (12, 13)
#=> (14, 14)
#=> (15, 14)
#=> (15, 14)
#=> (17, 16)
#=> (21, 20)
#=> (22, 21)
#=> (22, 22)
#=> (23, 22)
#=> (22, 21)
#=> (20, 19)
#=> (18, 17)


sunday = [12, 14, 15, 15, 17, 21, 22, 22, 23, 22, 20, 18]
monday = [13, 14, 14, 14, 16, 20, 21, 22, 22, 21, 19, 17]
tuesday = [2, 2, 3, 7, 9, 10, 11, 12, 10, 9, 8, 8]

for temps in zip(sunday, monday, tuesday):
    print(f"min = {min(temps):4.1f}, max={max(temps):4.1f}, average={sum(temps) / len(temps):4.1f}")


# one, long series for sunday, monday, and tuesday
### can lazily concatenate iterables using `itertools.chain`
from itertools import chain
temperatures = chain(sunday, monday, tuesday)

# can then check that all temperatures are above freezing point without memory impact of data duplication
all(t < 0 for t in temperatures) #=> True
```
