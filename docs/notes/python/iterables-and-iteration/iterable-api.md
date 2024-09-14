---
title: "Low-level `iterable` API"
date: "2023-12-07"
fullPath: "/notes/python/iterables-and-iteration/iterable-api"
iconComponentName: "python_icon"
sectionSlug: "notes"
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
