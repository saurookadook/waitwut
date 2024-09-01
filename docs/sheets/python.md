---
title: "Python"
date: "2022-07-23"
fullPath: "/sheets/python"
iconComponentName: "python_icon"
sectionSlug: "sheets"
---

# Table of Contents
- [General](#general)
- [Debugging](#debugging)
- [decorators](#decorators)

---

## General

### Significant Whitespace

- Python uses whitespace to demarcate code blocks
- by convention, 4 spaces are used per depth
- end blocks with blank lines

#### Significant Whitespace Rules

1. Prefer four spaces
2. NEVER mix spaces and tabs
3. Be consistent on consecutive lines
4. Only deviate to improve readability

## Debugging

### Introspection

```python
# in repl
>>> i = 7

######################## types ########################

>>> type(i)
#=> <class 'int'>
>>> type(i) is int
#=> True
>>> i.__class__
#=> <class 'int'>
>>> i.__class__.__class__
#=> <class 'type'>
>>> i.__class__.__class__.__class__
#=> <class 'type'>
>>> issubclass(type, object)
#=> True
>>> isinstance(i, int)
#=> True

######################## objects ########################

>>> dir(i)
#=> ['__abs__', '__add__', '__and__', ..., 'real', 'to_bytes']
>>> getattr(i, 'denominator')
#=> 1
>>> getattr(i, 'conjugate')
#=> <built-in method conjugate of int object at 0x100233160>
>>> callable(getattr(i, 'conjugate'))
#=> True
>>> hasattr(i, 'bit_length')
#=> True
>>> hasattr(i, 'index')
#=> False

######################## scopes ########################

>>> globals()
#=> {'__name__': '__main__', '__doc__': None, '__package__': None, '__loader__': <class '_frozen_importlib.BuiltinImporter'>, '__builtins__': <module 'builtins' (built-in)>}
>>> locals()
#=> {'__name__': '__main__', '__doc__': None, '__package__': None, '__loader__': <class '_frozen_importlib.BuiltinImporter'>, '__builtins__': <module 'builtins' (built-in)>}
>>> def report_scope(arg):
...     from pprint import pprint as pp
...     x = 496
...     pp(locals(), width=10)
...
>>> report_scope(42)
#=> {'arg': 42,
#=>  'pp': <function pprint at 0x10f9d9280>,
#=>  'x': 496}
>>>
>>> name = "Joe Bloggs"
>>> age = 28
>>> country = "New Zealand"
>>>
##### NOTE: not suggested for normal use but can be handy for debugging
>>> "{name} is {age} years old and is from {country}".format(**locals())
#=> 'Joe Bloggs is 28 years old and is from New Zealand'
```

## decorators

### Simple function decorator example

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

### Simple Class decorator example

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

### Simple Instance decorator example

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

