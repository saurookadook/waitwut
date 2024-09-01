---
title: "Strings and Representations"
date: "2023-12-02"
fullPath: "/notes/python/strings-and-representations"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

import { ExternalLinkWrapper } from 'common/components';

# Strings and Representations

## `str`
- data type for strings in Python
- sequences of Unicode code points
- Immutable
- can use single or double quotes

> _**Moment of Zen:**_
> _Practicality beats purity_
>     _Beautiful text strings_
>     _Rendered in literal form_
>     _Simple elegance_

### String Literals

- Adjacent literal strings concatenated by Python compiler into single string
```py
"first" "second" #=> 'firstsecond'
```
- two options for literal string containing newlines:
    - **multiline strings**: spread literal across multiple lines
    - **escape sequences**: embed escape sequences in single-line literal

### Multiline Strings
- delimited by three quote characters rather than one
```py
"""This is
a multiline
string"""
#=> 'This is\na multiline\nstring'

'''So
is
this.'''
#=> 'So\nis\nthis.'

m = 'This string\nspans multiple\nlines'
m
#=> 'This string\nspans multiple\nlines'
print(m)
#=> This string
#=> spans multiple
#=> lines
```

#### Universal Newlines
- Python translates `\n` to appropriate newline sequence for your platform
- can read more at <ExternalLinkWrapper href="https://python.org/dev/peps/pep-0278/">PEP 278</ExternalLinkWrapper>

### Escape Sequences
```py
"This is a \" in a string"
#=> 'This is a " in a string'

'This is a \' in a string'
#=> "This is a ' in a string"

'This is a \" and a \' in a string'
#=> 'This is a " and a \' in a string'

k = 'A \\ in a string'
k
#=> 'A \\ in a string'
print(k)
#=> A \ in a string
```

#### All Escape Sequences
| Sequence | Meaning |
| `\newline` | Backslash and newline ignored |
| `\\` | Backslash |
| `\'` | Single quotes |
| `\"` | Double quotes |
| `\a` | ASCII Bell (BEL) |
| `\b` | ASCII Backspace (BS) |
| `\f` | ASCII Formfeed (FF) |
| `\n` | ASCII Linefeed (LF) |
| `\r` | ASCII Carriage Return (CR) |
| `\t` | ASCII Horizontal Tab (TAB) |
| `\v` | ASCII Vertical Tab (VT) |
| `\ooo` | Character with octal value _ooo_ |
| `\xhh` | Character with hex value _hh_ |

**Only recognized in string literals**
| Sequence | Meaning |
| `\N{name}` | Character named _name_ in Unicode database |
| `\uxxx` | Character with 16-bit hex value _xxx_ |
| `\Uxxxxxxxx` | Character with 32-bit hex value _xxxxxxxx_ |

_More info in_ <ExternalLinkWrapper href="https://docs.python.org/3/reference/lexical_analysis.html#strings"><i>Python docs</i></ExternalLinkWrapper>

### String Features

```py
four = "four"
len(four)
#=> 4

# raw strings
path = r'C:\Users\Merlin\Documents\Spells'
path
#=> 'C:\\Users\\Merlin\\Documents\\Spells'
print(path)
#=> C:\Users\Merlin\Documents\Spells

# using `str()` constructor
str(496)
#=> '496'

str(6.02e23)
#=> '6.02e+23'
```

- Strings in Python are what are called sequence types
    - means support certain common operations for querying sequences
- examples:
```py
s = 'parrot'
s[4]
#=> 'o'

type(s[4])
#=> <class 'str'>

c = 'oslo'
c.capitalize()
#=> 'Oslo'
c
#=> 'oslo'
```

- `str` is Unicode
    - can use them with international characters easily (even in literals)
    - Python 3 source encoding is UTF-8

### Concatenation

- `+` operator for concatenating strings
- support for augmented assignment operator `+=`

> ⚠️ _**NOTE**: Strings are immutable and therefore cannot be modify them in place_

- `join()` method is preferrable over using `+` operator, since `join` is substantially more efficient
    - 1. concatenation with `+` operator results in temporaries
    - 2. `str.join()` inserts separator between collection of strings (which are passed as arguments)
    - 3. `join()` is called on the _separator string_
    - example:
```py
colors = ';'.join(['#45ff23', '#2321fa', '#1298a3', '#a32312'])
# => '#45ff23;#2321fa;#1298a3;#a32312'
colors.split(';')
# => ['#45ff23', '#2321fa', '#1298a3', '#a32312']
''.join(['high', 'way', 'man'])
#=> 'highwayman'
```

> ☯️ _**Moment of Zen**_ ☯️
> _"The way may not be obvious at first"_
>     _To concatenate_
>     _Invoke join on empty text_
>     _Something from nothing_

- `partition` divides string into three sections and returns as `tuple`
    - part before separator
    - separator itself
    - part after separator
    - example:
```py
"unforgettable".partition('forget')
#=> ('un', 'forget', 'able')

departure, separator, arrival = "London:Edinburgh".partition(':')
departure #=> 'London'
arrival #=> 'Edinburgh'

### when not interested in capturing separator
# unspoken convention to use _ variable for unused or dummy values
origin, _, destination = "Seattle-Boston".partition('-')
```

### String Formatting

#### `format()` method
- supersedes (though doesn't replace) string interpolation technique used in older versions of Python
- `{0}` and `{1}` in first example referred to as **replacement fields**
    - field number can be omitted if each argument is used exactly once
    - if keyword arguments are supplied to format, then named fields can be used instead
    - can also index into sequences using square brackets inside replacement field
- `59.7` and `10.4` in first example referred to as **format arguments**
- provides control over alignment and floating point formatting
- examples:
```py
"{0}°north {1}°east".format(59.7, 10.4)

### further
"The age of {0} is {1}".format('Jim', 32)
# => 'The age of Jim is 32'
"The age of {0} is {1}. {0}'s birthday is on {2}".format('Fred', 24, 'October 31')
# => "The age of Fred is 24. Fred's birthday is on October 31"

### using positional arguments only once
"Reticulating spline {} of {}.".format(4, 23)
# => 'Reticulating spline 4 of 23.'

### using keyword arguments
"Current position {latitude} {longitude}".format(latitude="60N", longitude="5E")

### indexing from sequences
"Galactic position x={pos[0]}, y={pos[1]}, z={pos[2]}".format(pos=(65.2, 23.1, 82.2))
# => 'Galactic position x=65.2, y=23.1, z=82.2'

### using module
import math
"Math constants: pi={m.pi}, e={m.e}".format(m=math)
# => 'Math constants: pi=3.141592653589793, e=2.718281828459045'

### alignment and floating point formatting
"Math constants: pi={m.pi:.3f}, e={m.e:.3f}".format(m=math)
# => 'Math constants: pi=3.142, e=2.718'
```

### F-string Syntax

Introduced in <ExternalLinkWrapper href="https://peps.python.org/pep-0498/">PEP 498: Literal String Interpolation</ExternalLinkWrapper>
- commonly called 'f-strings'
- available in Python >=3.6
- provide a way to "embed expressions inside literal strings, using a minimal syntax"

```py
f"one plus one is {1 + 1}"

# examples
value = 4 * 20
f'The value is {value}'
# => 'The value is 80'

import datetime
f'The current time is {datetime.datetime.now().isoformat()}'

import math
f'Math constants: pi={math.pi}, e={math.e}'
f'Math constants: pi={math.pi:.3f}, e{math.e:.3f}'

### `!r` results in using repl representation of value in string
f'{expr!r}'
```

---

## Bytes

### `bytes`
- data type for sequence of bytes
- often used for:
    - raw binary data
    - fixed-width single-byte encodings (such as ASCII)
- examples:
```py
b'data'
b"data"
# there is also a bytes() constructor

# support most of the same operations as strings
d = b'some bytes'
d[0] #=> 115
d.split() #=> [b'some', b'bytes']
```

### Converting Between Strings and Bytes
- must know encoding of byte sequence used to represent string's Unicode code points as bytes
- <ExternalLinkWrapper href="https://docs.python.org/3/library/codecs.html#standard-encodings">full list of supported encodings in Python</ExternalLinkWrapper>

### Encode/Decode
```py
norsk = "Jeg begynte å fortære en sandwich mens jeg kjørte taxi på vei til quiz"
data = norsk.encode('utf8')
data #=> b'Jeg Jeg begynte \xc3\xa5 fort\xc3\xa6re en sandwich mens jeg kj\xc3\xb8rte taxi p\xc3\xa5 vei til quiz'
norwegian = data.encode('utf8')
norwegian == norsk #=> True

```

---

## `repr()`

- built-in function
- produces unambiguous string representation of an object
- often suggested that `repr()` should return legitimate source code (i.e. can be copy/pasted and run to recreate the object)

```python
class Point2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return '({}, {})'.format(self.x, self.y)

    def __repr__(self):
        return 'Point2D(x={}, y={})'.format(self.x, self.y)

point = Point2D(x=12, y=24)
point.repr()
#=> 'Point2D(x=12, y=24)'
str(point)
#=> '(12, 24)'
```

### Other considerations

- exactness more important than human-friendliness
- suited for debugging
- includes identifying information
- generally best for logging
- generally, result of `repr()` should contain **more information** than result of `str()`
- as a rule, should **always write** a `repr()` for your classes

## `str()`

- built-in function
- produces readable, human-friendly representation of an object
- used in situations where it might be integrated into normal text or where programming-level details might be meaningless

## `repr()` and `str()` details

- by default, `str()` calls `repr()`
    - _i.e. if `__str__` is not defined on a class but `__repr__` is, then `__repr__` will be called when `str()` is called on an instance of that class_
- however, `repr()` _does not_ call `str()`
- `repr()` is used when showing elements of a collection

## Interaction with `format()`

- `__format__()` is special class method which is invoked by `str.format()`
- simple example
```python
class MyClass:
    def __init__(self, foo, bar):
        self.foo = foo
        self.bar = bar

    def __format__(self, f): # `f` contains any special formatting options specified in original format string
        return '[Formatted representation of class: {}, {}, {}]'.format(self.foo, self.bar, f)
```
- can force the use of a class's **special methods**:
    - force use of `__repr__()` by using `!r` in the format string: `'{!r}.format()`
    - force use of `__str__()` by using `!s` in the format string: `'{!s}.format()`

## `reprlib`

- standard library module
- supports alternative implementations of `repr()`
- often used for things like limiting how many elements of a large list is printed
- primary usage is simply `reprlib.repr()`
- <ExternalLinkWrapper href="https://docs.python.org/3/library/reprlib.html">reprlib docs</ExternalLinkWrapper>

## Other built-in functions

- `ascii()`
    - takes string as argument and replaces non-ASCII characters with escape sequences
- `ord()`
    - takes single character string and converts it to **integer** Unicode codepoint
- `chr()`
    - takes single **integer** Unicode codepoint and converts it to single character string
- `isalpha()`
- `isdigit()`
- `isdecimal()`
- `isalnum()`

