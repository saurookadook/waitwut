---
title: "Introspection"
date: "2024-03-05"
fullPath: "/notes/python/introspection"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

import { ExternalLinkWrapper } from 'common/components';

# Introspection

## Introspecting **types**

- `type` built-in function
- returns special `__class__` method

```python
# in repl
>>> i = 7
>>> type(i)
#=> <class 'int'>
>>> repr(int)
#=> "<class 'int'>"
>>> type(i) is int
#=> True
>>> type(type(i))
#=> <class 'type'>
>>> i.__class__
#=> <class 'int'>
>>> i.__class__.__class__
#=> <class 'type'>
>>> i.__class__.__class__.__class__
#=> <class 'type'>
>>> issubclass(type, object)
#=> True
>>> type(object)
#=> <class 'type'>
>>> isinstance(i, int)
#=> True
```

## Introspecting **objects**

**`dir`**: returns list of attribute names for instance

**`callable`**: returns boolean indicating if passed arg can be invoked or called

```python
# in repl
>>> i = 7
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
```

## Introspecting **scopes**

**`globals()`**: returns dictionary representing global namespace
> _actually, the returned dictionary **is** the global namespace_

**`locals()`**: returns dictionary representing local scope namespace

```python
# in repl
>>> globals()
#=> {'__name__': '__main__', '__doc__': None, '__package__': None, '__loader__': <class '_frozen_importlib.BuiltinImporter'>, '__builtins__': <module 'builtins' (built-in)>}
>>> a = 42
>>> globals()
#=> {'__name__': '__main__', '__doc__': None, '__package__': None, '__loader__': <class '_frozen_importlib.BuiltinImporter'>, '__spec__': None, '__annotations__': {}, '__builtins__': <module 'builtins' (built-in)>, 'a': 42}
>>> globals()['tau'] = 6.283185
>>> tau
6.283185
>>> tau / 2
3.1415925
>>> locals()
#=> {'__name__': '__main__', '__doc__': None, '__package__': None, '__loader__': <class '_frozen_importlib.BuiltinImporter'>, '__spec__': None, '__annotations__': {}, '__builtins__': <module 'builtins' (built-in)>, 'a': 42, 'tau': 6.283185}
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
>>>
```

## Python Standard Library `inspect` module

- "provides several useful functions to help get information about live objects" (<em> the docs for more: <ExternalLinkWrapper href="https://docs.python.org/3/library/inspect.html"><code>inspect</code></ExternalLinkWrapper></em>)

```python
# in repl
>>> import inspect
>>> import sorted_set # <- from example in Collections
>>>
>>> inspect.ismodule(sorted_set)
#=> True
>>>
>>> inspect.getmembers(sorted_set)
#=> [('Sequence', <class 'collections.abc.Sequence'>), ('Set', <class 'collections.abc.Set'>), ('SortedSet', <class 'sorted_set.SortedSet'>), ...]
>>>
>>> inspect.getmembers(sorted_set, inspect.isclass)
#=> [('Sequence', <class 'collections.abc.Sequence'>), ('Set', <class 'collections.abc.Set'>), ('SortedSet', <class 'sorted_set.SortedSet'>), ('chain', <class 'itertools.chain'>)]
### NOTE: 'chain' was included because the class is imported in the scope of the 'sorted_set' module
>>>
>>> inspect.getmembers(sorted_set.SortedSet, inspect.isfunction)
#=> [('__add__', <function SortedSet.__add__ at 0x101896b90>), ('__and__', <function  Set.__and__ at 0x1006dc9e0>), ('__contains__', <function SortedSet.__contains__ at 0x101896560>), ('__eq__', <function SortedSet.__eq__ at 0x101896830>), ('__ge__', <function Set.__ge__ at 0x1006dc7a0>), ('__getitem__', <function SortedSet.__getitem__ at 0x101896710>), ('__gt__', <function Set.__gt__ at 0x1006dc710>), ...]
>>>
>>> init_sig = inspect.signature(sorted_set.SortedSet.__init__)
>>> init_sig
#=> <inspect.Signature object at 0x1006e3c10>
>>> init_sig.parameters
#=> mappingproxy(OrderedDict([('self', <Parameter at 0x1018ad7e0 'self'>), ('items', <Parameter at 0x1018ad838 'items'>)]))
>>> repr(init_sig.parameters['items'].default)
#=> 'None'
>>>
>>> str(init_sig)
#=> '(self, items=None)'
>>>
>>> inspect.signature(abs)
#=> raises 'ValueError: no signature found for builtin function <built-in function abs>'
```

## Building your own Object Inspection Tool

**Goal**: create function which, when passed single object, prints out a nicely formatted dump of object's attributes and methods (_similar to `getmembers()` but with more finesse_)

```python
import inspect
import itertools
import os
import reprlib

from sorted_set import SortedSet  # <= from 'Collections' example


window_width, _ = os.get_terminal_size()
heading_separator = "=" * (window_width // 2)


def full_sig(method):
    try:
        return method.__name__ + inspect.signature(method)
    except ValueError:
        return method.__name__ + '(...)'


def brief_doc(obj):
    doc = obj.__doc__

    if doc is not None:
        lines = doc.splitlines()
        if len(lines) > 0:
            return lines[0]

    return ''


def print_table(rows_of_columns, *headers):
    num_columns = len(rows_of_columns[0])
    num_headers = len(headers)

    if len(headers) != num_columns:
        raise TypeError("Expected {} header arguments, "
                        "got {}".format(num_columns, num_headers))

    rows_of_columns_with_header = itertools.chain([headers], rows_of_columns)
    columns_of_rows = list(zip(*rows_of_columns_with_header))
    column_widths = [max(map(len, column)) for column in columns_of_rows]

    column_specs = ('{{:{w}}}'.format(w=width) for width in column_widths)
    format_spec = ' '.join(column_specs)

    print(format_spec.format(*headers))
    rules = ('-' * width for width in column_widths)
    print(format_spec.format(*rules))
    for row in rows_of_columns:
        print(format_spec.format(*row))
    print('\n\n')


def dump(obj):
    print("Type")
    print(heading_separator)
    print(type(obj), end='\n\n')

    print("Documentation")
    print(heading_separator)
    print(inspect.getdoc(obj), end='\n\n')

    print("Attributes")
    print(heading_separator)
    all_attr_names = SortedSet(dir(obj))
    method_names = SortedSet(
        filter(lambda attr_name: callable(getattr(obj, attr_name)), all_attr_names)
    )
    assert method_names <= all_attr_names  # tests `issubset`
    attr_names = all_attr_names - method_names  # tests `difference`
    # use `reprlib.repr` to trim down values in intelligent way
    attr_names_and_values = [(name, reprlib.repr(getattr(obj, name)))
                             for name in attr_names]
    print_table(attr_names_and_values, "Name", "value")

    print("Methods")
    print(heading_separator)
    methods = (getattr(obj, method_name) for method_name in method_names)
    method_names_and_doc = [(full_sig(method), brief_doc(method))
                            for method in methods]
    print_table(method_names_and_doc, "Name", "Description")

```

