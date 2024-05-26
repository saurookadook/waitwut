---
title: "Objects and Types"
date: "2024-05-21"
fullPath: "/notes/python/objects-and-types"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

# Objects and Types

- Python object model
- named references to objects
- value vs. identity equality
- passing arguments and returning values
- Python's type system
- scopes to limit name access
- "Everything is an object"

## Assigning to a Variable

Given:
```py
x = 1000
```
Python does the following:
- creates an `int` object with value of `1000`
- creates an object reference with the name `x`
- arranges for `x` to refer to the `into 1000` object(?)

## Reassigning a Variable

Following above example, then:
```py
x = 500
```
Python does the following:
- value initial integer object DOES NOT change, since integer objects in Python are immutable
- creates _new_ `int` object with value of `500`
- redirects `x` reference to point to new object
- the previous `int` object can no longer be reached/referenced, so Python garbage collector will reclaim it at some point

## Multiple Assignment

- when assigning from one object to another, one object reference is assigned to another object reference
```py
x = 500
y = x
# x == 500 && y == 500

x = 3000
# x == 3000 && y == 500
```

## `id()`

- built-in function
- returns unique integer identifier for object which is **constant** for the life of the object

## Augmented Assignment
Given:
```py
t = 5
t+= 2
```
- start with `t` referring to `int 5` object
- augmented assignment creates `int 2` object without creating reference to it
- then adds `int 5` with `int 2` to create `int 7`
- finally, assigns `t` to newly-created `int 7` and remaining `int` objects are garbage collected

> 💡 **IMPORTANT** 💡
> - Python objects show this behavior for all types
> - core rule is that assignment operator _**only**_ ever binds objects to names
>     - NEVER copies object to a value

## Mutable Objects
Given:
```py
r = [2, 4, 6]
s = r
s[1] = 17
s #=> [2, 17, 6]
r #=> [2, 17, 6]
s is r #=> True
```
- think "assignment by reference"

- Python doesn't have variables in sense of boxes holding value
- instead, has named references to objects, which behave more like labels

## Value vs. Identity Equality
Given:
```py
p = [4, 7, 11]
q = [4, 7, 11]
p == q #=> True
p is q #=> False
```
- `==` tests "value equality"
- `is` tests "identity equality"

- value equality and identity equality are fundamentally different concepts
- comparison by value can be controlled programatically
- identity comparison is unalterably defined by language

## Passing Arguments and Returning Values

### Argument Passing
Given:
```py
m = [9, 15, 24]
def modify(k):
    k.append(39)
    print("k =", k)

modify(m)
#=> k = [9, 15, 24, 39]
m
#=> [9, 15, 24, 39]
```

- when passing object reference to function, essentially are assigning from actual argument reference to formal argument reference
- if function should modify a _copy_ of an object, it's function's resonsibility to do the copying

### Replacing Argument Value
Given:
```py
f = [14, 23, 37]
def replace(g):
    g = [17, 28, 45]
    print("g =", g)

replace(f)
#=> g = [17, 28, 45]
f
#=> [14, 23, 37]
```

### Mutable Arguments
Given:
```py
def replace_contents(g):
    g[0] = 17
    g[1] = 28
    g[2] = 45
    print("g =", g)

f = [14, 23, 37]
replace_contents(f)
#=> g = [17, 28, 45]
f
#=> [17, 28, 45]
```

#### Conclusion

- function arguments transferred using pass-by-object-reference
- references to objects are copied, _**not**_ the objects themselves

### Return Semantics
Given:
```py
def f(d):
    return d

c = [6, 10, 16]
e = f(c)
c is e #=> True
```

## Function Arguments

### Default Argument Values

Simple example:
```py
def banner(message, border='-'):
    line = border * len(message)
    print(line)
    print(message)
    print(line)

banner("Norwegian Blue")
#=> --------------
#=> Norwegian Blue
#=> --------------

banner("Sun, Moon, and Stars", "*")
#=> ********************
#=> Sun, Moon, and Stars
#=> ********************

banner("Sun, Moon, and Stars", border="*")
### in this case:
# first argument is called 'positional argument'
# second argument is called 'keyword argument'
```

- arguments with default values must come **must** come after those without default values
- **positional arguments**: matched up in sequence with formal arguments
- **keyword arguments**: matched up by name (meaning order will not matter for them)

```py
banner(border="*", message="Sun, Moon, and Stars")
```

_**NOTE**: all keyword arguments must be specified **after** keyword arguments_

### When Are Default Values Evaluated?

Example using `time` library:
```py
import time

time.ctime()
#=> 'Tue May 31 14:16:48 2022' (or whatever today's date is)

def show_default(arg=time.ctime()):
    print(arg)

show_default()
#=> 'Tue May 31 14:17:01 2022'
show_default()
#=> 'Tue May 31 14:17:01 2022'
show_default()
#=> 'Tue May 31 14:17:01 2022'
### subsequent calls return same value
```

- remember that `def` is statement executed at runtime
- default arguments are evaluted when `def` is executed
- immutable default values don't cause problems
- mutable default values can cause confusing effects

### Mutable Default Values

Given:
```py
def add_spam(menu=[]):
    menu.append("spam")
    return menu

breakfast = ['bacon', 'eggs']
add_spam(breakfast)
#=> ['bacon', 'eggs', 'spam']
lunch = ['baked beans']
add_spam(lunch)
#=> ['baked beans', 'spam']
add_spam()
#=> ['spam']
add_spam()
#=> ['spam', 'spam']
add_spam()
#=> ['spam', 'spam', 'spam']
```

Solution is to _always_ (when possible) use immutable objects for default values

### Immutable Default Value

```py
def add_spam(menu=None):
    if menu is None:
        menu = []
    menu.append("spam")
    return menu

add_spam()
#=> ['spam']
add_spam()
#=> ['spam']
add_spam()
#=> ['spam']
```

## Python's Type System

- characterized as dynamic and strong type system
- **dynamic typing**: type of object reference isn't resolved until program is running and does not need to be specified up front when program is written
```py
def add(a, b):
    return a + b

### dynamism examples
add(5, 7) #=> 12
add(3.1, 2.4) #=> 5.5
add("news", "paper") #=> 'newspaper'
add([1, 6], [21, 107]) #=> [1, 6, 21, 107]

### strength example
add("The answer is", 42)
#=> TypeError
```

> 💡 **IMPORTANT** 💡
> generally, Python will _not_ perform implicit conversions between types
>     - exceptions being conversion of `if` statement and `while` loop predicates to `bool`

## Scopes

- name resolution to objects is managed by scopes and scoping rules
- 4 types of scopes in Python
    - hierarchically arranged
    - from narrowest to broadest:
        - `Local`: inside current function
        - `Enclosing`: inside enclosing functions
        - `Global`: at top level of module
        - `Built-in`: in special `builtins` module
    - `LEGB` rule

**NOTE**: scopes in Python do not correspond to source code blocks
    - _i.e. `for` loops and similar structures demarcated by indentation do not introduce new nested scopes_

_see `_demos/scopes/words.py`_

Module scope name bindings typically introduced by
    - import statements
    - function or class definitions
Possible to use other objects at module scope
    - typically used for constants
    - _can_ be used for variables

Each bound name in `Local` scope
- brought into existence at first use
- continues to live within function scope until function completes
- after function completes, references will be destroyed

### Rebinding Global Names

- occasionally need to rebind global name
    - _i.e. rebind something defined at module scope from within function_
- example:
```py
count = 0
def show_count():
    print(count)

def set_count(c):
    count = c

show_count() # tries to look up `count` in local namespace, doesn't find it, then looks up in next-most outer scope
#=> 0
set_count(5) # binds `5` to `count` in innermost namespace context (in this case, scope of the function)
show_count()
#=> 0
```
- can use `global` keyword to rebind global names into local namespace
```py
count = 0
def show_count():
    print(count)

def set_count(c):
    global count
    count = c

show_count()
#=> 0
set_count(5)
show_count()
#=> 5
```

> ☯️ _**Moment of Zen**_ ☯️
> _"Special cases aren't special enough to break the rules"_
>     _We follow patterns_
>     _Not to kill complexity_
>     _But to master it_

## Everything is an Object

In REPL env:
```py
import words
type(words)
#=> <class 'module'>
dir(words)
#=> ['__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'fetch_words', 'main', 'print_items', 'sys', 'urlopen']
```
