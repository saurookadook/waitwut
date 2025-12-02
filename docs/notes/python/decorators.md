---
title: "decorators"
date: "2023-12-02"
fullPath: "/notes/python/decorators"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

## decorators

- modify or enhance functions without changing their definition
  * aka, non-intrusive and maintainable
- implemented as callables that take and return other callables
- how they work:
  * Python takes decorated function and creates new function object
  * that function object is then passed to decorator function
  * return value from decorator function is then bound to the name of the original function

### Basic Syntax

```python
@my_decorator
def my_function():
    pass
```

### First Decorator Example

Consider: for whatever reason, you need to ensure that these functions return strings which only contain ASCII characters

```python
# translated_words.py
def vegetable():
    return 'blomkål'

def animal():
    return 'bjørn'

def mineral():
    return 'stål'
```

**Solution 1**: wrap strings in `ascii()`

- not scalable
- not maintainable

```python
# translated_words.py
def vegetable():
    return ascii('blomkål')

def animal():
    return ascii('bjørn')

def mineral():
    return ascii('stål')
```

**Solution 2**: using `escape_unicode` decorator

```python
# escape_unicode.py
def escape_unicode(f):
    def wrap(*args, **kwargs):
        x = f(*args, **kwargs)
        return ascii(x)

    return wrap

# translated_words.py
from escape_unicode import escape_unicode

@escape_unicode
def vegetable():
    return ascii('blomkål')

@escape_unicode
def animal():
    return ascii('bjørn')

@escape_unicode
def mineral():
    return ascii('stål')

vegetable()
#=> 'blomk\\xe5l'
animal()
#=> 'bj\\xf8rn'
mineral()
#=> 'st\\xe5l'
```

### Other Objects as Decorators

#### Classes as Decorators

```python
class MyDec:
    def __init__(self, f):
        pass

    # NOTE: MUST implement this method in order for instance to be callable
    def __call__(self):
        pass

@MyDec
def func():
    pass
```

Example:

```python
class CallCount:
    def __init__(self, f):
        self.f = f
        self.count = 0

    def __call__(self, *args, **kwargs):
        self.count += 1
        return self.f(*args, **kwargs)


@CallCount
def hello(name):
    print('Hello, {}'.format(name))


# in REPL
>>> from call_count import hello
>>> hello('Fred')
#=> Hello, Fred
>>> hello('Wilma')
#=> Hello, Wilma
>>> hello('Betty')
#=> Hello, Betty
>>> hello('Barney')
#=> Hello, Barney
>>> hello.count
#=> 4
```

#### Instances as Decorators

```python
class AnotherDec:
    def __call__(self, f):
        def wrap():
            pass
        return wrap


@AnotherDec()
def func():
    pass
```

Example:

```python
# tracer.py
class Trace:
    def __init__(self):
        self.enabled = True

    def __call__(self, f):
        def wrap(*args, **kwargs):
            if self.enabled:
                print('Calling {}'.format(f))
            return f(*args)


tracer = Trace()

@tracer
def rotate_list(l):
    return l[1:] + [l[0]]


# in REPL
>>> from tracer import rotate_list, tracer
>>> l = [1, 2, 3]
>>> l = rotate_list(l)
#=> Calling <function rotate_list at 0x103a70dd0>
>>> l
#=> [2, 3, 1]
>>> l = rotate_list(l)
#=> Calling <function rotate_list at 0x103a70dd0>
>>> l
#=> [3, 1, 2]
>>> tracer.enabled = False
>>> l = rotate_list(l)
#=>

```

### Multiple Decorators

- simply declare decorators above function with each decorator on a new line
- processed in reverse order

```python
@decorator1
@decorator2
@decorator3
def some_function():
    pass
```

### Decorating Methods

```python
from escape_unicode import escape_unicode # from escape_unicode.py

class Trace:
    def __init__(self):
        self.enabled = True

    def __call__(self, f):
        def wrap(*args, **kwargs):
            if self.enabled:
                print('Calling {}'.format(f))
            return f(*args)


tracer = Trace()

@tracer
@escape_unicode
def norwegian_island_maker(name):
    return name + 'øy'


class IslandMaker:
    def __init__(self, suffix):
        self.suffix = suffix

    @tracer
    def make_island(self, name):
        return name + self.suffix

```

### `functools.wraps()`

- properly updates metadata on wrapped functions
- **problem**: naive decorators can lose important metadata

#### Initial

```python
# no_op.py
def hello():
    """Print a well-known message."""
    print('Hello, world!')

# in repl
>>> from no_op import hello
>>> hello.__name__
#=> 'hello'
>>> hello.__doc__
#=> 'Print a well-known message.'
>>> help(hello)
#=> Help on function hello in module no_op:
#=>
#=> hello()
#=>     Print a well-known message.
```

#### After adding decorator

```python
# no_op.py
def no_op(f):
    def no_op_wrapper():
        return f()
    return no_op_wrapper

@no_op
def hello():
    """Print a well-known message."""
    print('Hello, world!')

# in repl
>>> from no_op import hello
>>> help(hello)
#=> Help on function no_op_wrapper in module no_op:
#=>
#=> no_op_wrapper()
>>> hello.__name__
#=> 'no_op_wrapper'
>>> hello.__doc__
#=>
```

#### After fixing decorator

```python
# no_op.py
def no_op(f):
    def no_op_wrapper():
        return f()

    no_op_wrapper.__name__ = f.__name__
    no_op_wrapper.__doc__ = f.__doc__
    return no_op_wrapper

@no_op
def hello():
    """Print a well-known message."""
    print('Hello, world!')

# in repl
>>> from no_op import hello
>>> help(hello)
#=> Help on function hello in module no_op:
#=>
#=> hello()
#=>     Print a well-known message.
>>> hello.__name__
#=> 'hello'
>>> hello.__doc__
#=> 'Print a well-known message.'
```

#### After fixing decorator with `functools.wraps()`

```python
# no_op.py
import functools

def no_op(f):
    @functools.wraps(f)
    def no_op_wrapper():
        return f()
    return no_op_wrapper

@no_op
def hello():
    """Print a well-known message."""
    print('Hello, world!')

# in repl
>>> from no_op import hello
>>> help(hello)
#=> Help on function hello in module no_op:
#=>
#=> hello()
#=>     Print a well-known message.
>>> hello.__name__
#=> 'hello'
>>> hello.__doc__
#=> 'Print a well-known message.'
```

### Decorators as argument validators

```python
# create_list.py
def check_non_negative(index):
    def validator(f):
        def wrap(*args):
            if args[index] < 0:
                raise ValueError(
                    'Argument {} must be non-negative'.format(index)
                )
            return f(*args)
        return wrap
    return validator

@check_non_negative(1)
def create_list(value, size):
    return [value] * size

```
