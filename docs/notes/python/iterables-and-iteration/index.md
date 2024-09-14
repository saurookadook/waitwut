---
title: "Iterables and Iteration"
date: "2023-12-07"
fullPath: "/notes/python/iterables-and-iteration"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

# Iterables and Iteration

- [Comprehensions](/notes/python/iterables-and-iteration/comprehensions)
    - creating familiar objects
    - creating new kinds of objects
    - filtering
- [Low-level `iterable` API](/notes/python/iterables-and-iteration/iterable-api)
    - Iterators
    - Exceptions in iteration
- [Generator functions](/notes/python/iterables-and-iteration/generator-functions)
    - the `yield` keyword
    - statefulness, laziness, and infinite sequences
    - generator expressions

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
