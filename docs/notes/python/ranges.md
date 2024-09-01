---
title: "Ranges"
date: "2024-05-21"
fullPath: "/notes/python/ranges"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

# Ranges

## `range`
- sequence representing an arithmetic progression of integers
- created by call to `range()` constructor
    - there is _no_ literal form
- usually only supply stop value, which is **1 past the end of the sequence**
    - _Python supplies default starting value of 0_
```py
range(5)
# => range(0, 5)

for i in range(5):
    print(i)

# => 0
# => 1
# => 2
# => 3
# => 4

### using starting value
range(5, 10)
# => range(5, 10)
list(range(5, 10))
# => [5, 6, 7, 8, 9]

### using step argument
list(range(0, 10, 2))
# => [0, 2, 4, 6, 8]
```

### `range()` Signature
- `range(stop)`
- `range(start, stop)`
- `range(start, stop, step)`
- **NOTE**: `range` does not support keyword arguments

poorly-styled example:
```py
s = [0, 1, 4, 6, 13]
for i in range(len(s)):
    print(s[i])

# => 0
# => 1
# => 4
# => 6
# => 13
```

preferable example:
```py
s = [0, 1, 4, 6, 13]
for v in s:
    print(v)

# => 0
# => 1
# => 4
# => 6
# => 13
```

---

## `enumerate`
- constucts iterable of `(index, value)` tuples around another iterable object
- example:
```py
t = [6, 372, 8862, 148800, 2096886]
for p in enumerate(t):
    print(p)

# => (0, 6)
# => (1, 372)
# => (2, 8862)
# => (3, 148800)
# => (4, 2096886)

for i, v in enumerate(t):
    print(f"i = {i}, v = {v}")

# => i = 0, v = 6
# => i = 1, v = 372
# => i = 2, v = 8862
# => i = 3, v = 148800
# => i = 4, v = 2096886
```
