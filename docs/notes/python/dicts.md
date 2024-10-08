---
title: "Dictionaries"
date: "2023-10-24"
fullPath: "/notes/python/dictionaries"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

# Dictionaries

![Dictionary Internals](/CorePython3_6-GettingStarted/images/built-in-collections/dictionary-internals.png)

- keys in any single dictionary must be unique
- duplicate values are allowed
- interally
    - maintains pairs of references to key objects and value objects
    - key objects **must** be immutable _strings, numbers, and tuples(?)_
    - value objects may be mutable
- should _never_ rely on order of items in dictionary _(it's basically random, and may even vary between different runs of same program)_

## `dict()` constructor
- can convert other types to dictionaries
```py
names_and_ages = [('Alice', 32), ('Bob', 48), ('Charlie', 28), ('Daniel', 33)]
d = dict(names_and_ages)
d #=> {'Alice', 32, 'Bob', 48, 'Charlie', 28, 'Daniel', 33}

phonetic = dict(a='alfa', b='bravo', c='charlie', d='delta', e='echo', f='foxtrot')
phonetic #=> {'a': 'alfa', 'b': 'bravo', 'c': 'charlie', 'd': 'delta', 'e': 'echo', 'f': 'foxtrot'}

basic_dict = dict(foo='bar', baz='beep')
'foo' in basic_dict #=> True
del basic_dict['foo']
```

### Copying Dictionaries

> 💡 **Important** 💡
> as with lists, dictionary copying is shallow by default

- two means of copying
    - using `copy` method
    - pass existing dictionary to `dict()` constructor _(more common)_
```py
d = dict(goldenrod=0xDAA520, indigo=0x4B0082, seashell=0xFFF5EE)
e.copy()
e #=> {'goldenrod': 0xDAA520, 'indigo': 0x4B0082, 'seashell': 0xFFF5EE}

f = dict(e)
f #=> {'goldenrod': 0xDAA520, 'indigo': 0x4B0082, 'seashell': 0xFFF5EE}
```

---

## `dict.update()`
- add entries from one dictionary into another
- call on _dictionary that is to be updated_
- if argument update includes keys which already exist in target dictionary, values associated with those keys will be replaced in target with corresponding values from source
```py
f #=> {'goldenrod': 0xDAA520, 'indigo': 0x4B0082, 'seashell': 0xFFF5EE}
g = dict(wheat=0xF5DEB3, khaki=0xF0E68C, crimson=0xDC143C)
f.update(g)
f #=> {'goldenrod': 0xDAA520, 'indigo': 0x4B0082, 'seashell': 0xFFF5EE, 'wheat': 0xF5DEB3, 'khaki': 0xF0E68C, 'crimson': 0xDC143C}

### common keys between target and source dictionaries
stocks = {'GOOG': 891, 'AAPL': 416, 'IBM': 194}
stocks.update({'GOOG': 894, 'YHOO': 25})
stocks #=> {'GOOG': 894, 'AAPL': 416, 'IBM': 194, 'YHOO': 25}
```

---

## Dictionary Iteration
- dictionaries yield next key on each iteration
- values can be retrieved using square-bracket operator
- again, order should not be relied upon here
```py
colors = dict(aquamarine='#7FFFD4', burlywood='#DEB887',
            chartreuse='#7FFF00', cornflower='#6495ED',
            firebrick='#B22222', honeydew='#F0FFF0',
            maroon='#B03060', sienna='#A0522D')
for key in colors:
    print(f"{key} => {colors[key]}")

#=> aquamarine => '#7FFFD4'
#=> burlywood => '#DEB887'
#=> chartreuse => '#7FFF00'
#=> cornflower => '#6495ED'
#=> firebrick => '#B22222'
#=> honeydew => '#F0FFF0'
#=> maroon => '#B03060'
#=> sienna => '#A0522D'


### using `values` method
# provides iterable view of dictionaries values without them being copied
for value in colors.values():
    print(value)

#=> #7FFFD4
#=> #DEB887
#=> #7FFF00
#=> #6495ED
#=> #B22222
#=> #F0FFF0
#=> #B03060
#=> #A0522D


### using `keys` method
for key in colors.keys():
    print(key)

#=> aquamarine
#=> burlywood
#=> chartreuse
#=> cornflower
#=> firebrick
#=> honeydew
#=> maroon
#=> sienna
```

### `dict.items()`
- iterates over keys and values in tandem
- yields `(key, value)` tuple on each iteration
```py
# NOTE: this uses tuple unpacking
for key, value in colors.items():
    print(f"{key} => {value}")

#=> aquamarine => '#7FFFD4'
#=> burlywood => '#DEB887'
#=> chartreuse => '#7FFF00'
#=> cornflower => '#6495ED'
#=> firebrick => '#B22222'
#=> honeydew => '#F0FFF0'
#=> maroon => '#B03060'
#=> sienna => '#A0522D'
```

### Other(?)
- membership tests using `in` and `not in` _work on keys_
- remove elements using `del`

```py
### `in` and `not in`
symbols = dict(usd='$', gbp='£', nzd='$', eur='€', jpy='¥', nok='kr', hhg='Pu')
symbols #=> {'usd': '$', 'gbp': '£', 'nzd': '$' 'eur': '€', 'jpy': '¥', 'nok': 'kr', 'hhg': 'Pu'}

'usd' in symbols #=> True
'mkd' not in symbols #=> True


### del
z = {'H': 1, 'Tc': 43, 'Xe': 54, 'Fy': 137, 'Rf': 104, 'Fm': 100}
del z['Fy']
z #=> {'H': 1, 'Tc': 43, 'Xe': 54, 'Rf': 104, 'Fm': 100}

### modifying
m = {'H': [1, 2, 3],
    'He': [3, 4],
    'Li': [6, 7],
    'Be': [7, 9, 10],
    'B': [10, 11],
    'C': [11, 12, 13, 14]}

m['H'] += [4, 5, 6, 7]
m #=> {'H': [1, 2, 3, 4, 5, 6, 7], 'He': [3, 4], 'Li': [6, 7], 'Be': [7, 9, 10], 'B': [10, 11], 'C': [11, 12, 13, 14]}}

### pretty-printing using `pprint` module from Python standard library
from pprint import pprint as pp # NOTE: withou `as pp`, `pprint` function would mask `pprint` module
m #=> {'H': [1, 2, 3, 4, 5, 6, 7], 'He': [3, 4], 'Li': [6, 7], 'Be': [7, 9, 10], 'B': [10, 11], 'C': [11, 12, 13, 14]}}
pp(m)
```

---

## Common/Useful Methods

### `get()`

<a href="https://python-reference.readthedocs.io/en/latest/docs/dict/get.html" target="_blank" rel="noopener noreferrer">
    <em>Official Python docs for <code>get()</code></em>
</a>

```python
basic_dict = dict(foo='bar', baz='beep')
basic_dict.get('foo')
#=> 'bar'
basic_dict.get('meow', 'DEFAULT')
#=> 'DEFAULT'

counts_by_letter = {'a': 1, 'b': 2}
counts_by_letter['c'] = counts_by_letter.get('c', 0) + 1
counts_by_letter
#=> {'a': 1, 'b': 2, 'c': 1}

```

## pretty-printing using `pprint` module from Python standard library
```python
from pprint import pprint as pp
pp(basic_dict)
```

