---
title: "Lists"
date: "2023-10-24"
fullPath: "/notes/python/lists"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

# Lists

In Python, a `list` is...
- a sequences of objects
- mutable
- a workhorse of Python data structures
- examples:
```py
integers = [3, 186, 4431, 74400, 1048443]
[1, 9, 8]
a = ["apple", "orange", "pear"]
a[1] #=> 'orange'
a[1] = 7
a #=> ['apple', 7, 'pear']

b = []
b.append(1.618)
b.append(1.414)
b #=> [1.618, 1.414]

# using list() constructor
list("characters") #=> ['c', 'h', 'a', 'r', 'a', 'c'', t', 'e', 'r', 's']

c = ['bear',
    'giraffe',
    'elephant',
    'caterpillar',] # notice trailing comma!
```

## Negative indices

- index from end of sequences using negative numbers
- last element is at index `-1`
- supported in lists, strings, tuples
```py
r = [1, -4, 10, -16, 15]
r[-1] #=> 15
r[-2] #=> -16
```

## slicing

- extended form of indexing for referring to portion of list or other sequence
- syntax: `a_list[start:stop]`
    - start and stop indices are optional

```python
integers = [3, 186, 4431, 74400, 1048443]
integers[1:3] #=> [186, 4431]
integers[1:-1] #=> [186, 4431, 74400]

### using only stop index
integers[2:] #=> [4431, 74400, 1048443]

### using only the start
integers[:2] #=> [3, 186]

### using neither (import idiom for copying a list, since it results in a new object)
integers[:] #=> [3, 186, 4431, 74400, 1048443]

integers_copy = integers
integers_copy is integers #=> True

integers_sliced_copy = integers[:]
integers_sliced_copy is integers #=> False
integers_sliced_copy == integers #=> True
```

### Copying with `slice`

```py
s = [1, 2, 3, 4, 5]
r = s[:]
```
- new `list` object is created
- however, elements within it are references to same objects referred to by original
- if list's objects are _**mutable and modified**_, the changes will be observed in both lists

### Only References Are Copied with `slice`

![Only References Are Copied](/CorePython3_6-GettingStarted/images/built-in-collections/only-references-are-copied.png)

In reference to copying with slice:
```py
s = [1, 2, 3, 4, 5]
r = s[:]
```
- new `list` object is created
- however, elements within it are references to same objects referred to by original
- if list's objects are _**mutable and modified**_, the changes will be observed in both lists

### Other Ways to Copy List

```py
s = [3, 186, 4431, 74400, 1048443]

u = s.copy()
u is s #=> False

v = list(s)
v is s #=> False
```

> 💡 **IMPORTANT** 💡
> all of above copying techniques perform _shallow copies_

- example:
```py
a = [[1, 2], [3, 4]]
b = a[:]
a is b #=> False
a == b #=> True

a[0] is b[0] #=> True

### rebinding value of first element
a[0] = [8, 9]
a #=> [8, 9]
b #=> [1, 2]

### mutating object at second element
a[1].append(5)
a[1] #=> [3, 4, 5]
b[1] #=> [3, 4, 5]

# final state of each list
a #=> [[8, 9], [3, 4, 5]]
b #=> [[1, 2], [3, 4, 5]]
```

> _**Note**: for making deep copies, look to use `copy` module in Python standard library_

### Repetition Using Multiplication Operator

```py
c = [21, 37]
d = c * 4
d #=> [21, 37, 21, 37, 21, 37, 21, 37]

### most useful for initializing list of a given size
[0] * 9 #=> [0, 0, 0, 0, 0, 0, 0, 0, 0]

###### NOTE: when using mutable objects as elements, be wary of same trap above with copying
s = [ -1, +1 ] * 5
s #=> [[-1, 1], [-1, 1], [-1, 1], [-1, 1], [-1, 1]]

s[2].append(7)
s #=> [[-1, 1, 7], [-1, 1, 7], [-1, 1, 7], [-1, 1, 7], [-1, 1, 7]]
```

---

## `list.index()`

- find location of object in list
- returns index of first list element which is equal to passed argument
- receive `ValueError` when searching for value that isn't present in list
- counting matching elements can be another means of searching:
```py
w = "sentence with words and stuff and junk".split()
w.count("and") #=> 2
```

- can use `in` or `not in` operators to search for membership and non-membership, respectively
```py
37 in [1, 78, 9, 37, 34, 53]
```

## `del`

- remove element from list by index
    - results in shortening the list
```py
u = "jackdaws love my big sphinx of quartz".split()
u #=> ['jackdaws', 'love', 'my', 'big', 'sphinx', 'of', 'quartz']

del u[3]
u #=> ['jackdaws', 'love', 'my', 'sphinx', 'of', 'quartz']
```

## `list.remove()`

- remove element from list by value
    - results in shortening the list
- receive `ValueError` when searching for value that isn't present in list
```py
u #=> ['jackdaws', 'love', 'my', 'sphinx', 'of', 'quartz']

u.remove('jackdaws')
u #=> ['love', 'my', 'sphinx', 'of', 'quartz']

### `remove` is basically equivalent to using `index` with `del`
del u[u.index('quartz')]
```

## `list.insert()`

- insert item into list
- accepts item and index of new item

```py
a = 'I accidentally the whole universe'.split()
a #=> ['I', 'accidentally', 'the', 'whole', 'universe']
a.insert(2, "destroyed")
a #=> ['I', 'accidentally', 'destroyed', 'the', 'whole', 'universe']
```

## Concatenating Lists Misc(?)
- Concatenating Lists
    - using addition operator results in new list without modifying operands (source lists)
    - using augmented assignment operator modifies assignee in place
    - using `extend` method works the same as augmented assignment
```py
# addition operator
m = [2, 1, 3]
n = [4, 7, 11]
k = m + n
k #=> [2, 1, 3, 4, 7, 11]

# augmented assignment
k += [18, 29, 47]
k #=> [2, 1, 3, 4, 7, 11, 18, 29, 47]

# using `extend`
k.extend([76, 129, 199])
k #=> [2, 1, 3, 4, 7, 11, 18, 29, 47, 76, 129, 199]
```

## `list.reverse()` and `list.sort()`

- common operations that modify list in place

```py
g = [1, 11, 21]
g.reverse()
g #=> [21, 11, 1]

d = [17, 41, 29]
d.sort()
d #=> [17, 29, 41]
```

### More About `sort`

- `sort` accepts two optional arguments: `key` and `reverse`
    - `reverse`: when `true`, results in _descending_ order
```py
d #=> [17, 29, 41]
d.sort(reverse=True)
d #=> [41, 29, 17]
```
- `key`: accepts any callable object that accepts single parameter
- items are passed to callable and sorted according to its return value
- examples:
```py
# using `len` function
h = 'not perplexing do handwriting family where I illegibly know doctors'.split()
h #=> ['not', 'perplexing', 'do', 'handwriting', 'family', 'where', 'I', 'illegibly', 'know', 'doctors']
h.sort(key=len)
h #=> ['I', 'do', 'not', 'know', 'where', 'family', 'doctors', 'illegibly', 'perplexing', 'handwriting']
```

### Reversing and Sorting Into Copies

- `reversed()` and `sorted()`
    - "out-of-place" equivalents of `reverse` and `sort`
    - `reversed()` returns reverse iterator
    - `sorted()` returns newly-sorted list
```py
x = [4, 9, 2, 1]
y = sorted(x)
y #=> [1, 2, 4, 9]
x #=> [4, 9, 2, 1]

p = [9, 3, 1, 0]
q = reversed(p)
q #=> <list_reverseiterator object at 0x10c68ea90>
list(q)
[0, 1, 3, 9]
```
