---
title: "Generator Functions"
date: "2023-12-07"
fullPath: "/notes/python/iterables-and-iteration/comprehensions"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

## Overview

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

## Maintaining State in Generators

### Graphical Debugger
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

## Laziness and the Infinite

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

## Generator Expressions

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
