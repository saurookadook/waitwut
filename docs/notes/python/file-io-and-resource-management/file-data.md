---
title: "File Data"
date: "2024-05-24"
fullPath: "/notes/python/file-io-and-resource-management/file-data"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

## Bitwise Operators

- `&`: bitwise `AND`
- `|`: bitwise `OR`
- `~`: bitwise negation
- `^`: bitwise `XOR` _(exclusive OR)_
- `a >> n`: right-shift `n` places
- `a << n`: left-shift `n` places

```python
def _int32_to_bytes(i):
    """Convert an integer to four bytes in little-endian format."""

    return bytes((i & 0xff,
                  i >> 8 & 0xff,
                  i >> 16 & 0xff,
                  i >> 24 & 0xff))

```

---

## Pixel Data

### Fractal

```python
"""Computing Mandelbrot sets.

https://en.wikipedia.org/wiki/Mandelbrot_set
"""

import math

def mandel(real, imag):
    """The logarithm of number of iterations needed to determine whether a complex point is in the Mandelbrot set.

    Args:
        real: The real coordinate
        imag: The imaginary coordinate

    Returns:
        An integer in the range 1-225.
    """

    x = 0
    y = 0
    for i in range(1, 257):
        # alternatively, (x**2 + y**2)
        if (x*x + y*y) > 4.0:
            break
        xt = real + x*x - y*y
        y = imag + 2.0 * x * y
        x = xt
    return int(math.log(i) * 256 / math.log(265)) - 1


def mandelbrot(size_x, size_y):
    """Make a Mandelbrot set image.

    Args:
        size_x: Image width
        size_y: Image height

    Returns:
        A list of lists of integers in the range 0-255.
    """

    return [
        [
            mandel((3.5 * x / size_x) - 2.5, (2.0 * y / size_y) - 1.0) for x in range(size_x)
        ] for y in range(size_y)
    ]

```

**in shell**:

```python
>>> import fractal
>>> pixels = fractal.mandelbrot(448, 256) # produces list of list of integers
>>> import reprlib
>>> reprlib.repr(pixels)
>>> import bmp
>>> bmp.write_grayscale("~/mandel.bmp", pixels) # can view image by opening it in a browser
```

---

## Reading Binary Data

### BMP file reader

```python
def dimensions(filename):
    """Determine the dimensions in pixels of a BMP image.

    Args:
        filename: The filename of a BMP file.

    Returns:
        A tuple containing two integers with the width and height in pixels.

    Raises:
        ValueError: If the file was not a BMP file.
        OSError: If there was a problem reading the file.
    """

    with open(filename, 'rb') as f:
        magic = f.read(2)
        if magic != b'BM':
            raise ValueError("{} is not a BMP file".format(filename))

        f.seek(18)
        width_bytes = f.read(4) # returns a bytes object since the file was opened in binary mode
        height_bytes = f.read(4)

        return (_bytes_to_int32(width_bytes),
                _bytes_to_int32(height_bytes))


def _bytes_to_int32(b):
    """Convert a bytes object containing four bytes into an integer."""
    # NOTE: indexing into bytes object returns an integer
    return b[0] | (b[1] << 8) | (b[2] << 16) | (b[3] << 24)

```

**in shell**:

```python
>>> import bmp_reader
>>> bmp_reader.dimensions("~/mandel.bmp")
#=> (448, 256)
```

---

## File-like Objects

- objects that behave like files
- a semi-formal protocol
    - protocol not fully-specified because file behaviors are too varied and would greatly complicate the protocol
- use an EAFP approach with file-like objects when necessary

### Duck-typing and Files

"If it looks like a file and reads like a file, then it's a file!"
- for example:
    - opening files in text mode
    - opening files in binary mode
    - URL readers

```python
def words_per_line(flo):
    return [len(line.split()) for line in flo.readlines()]

with open("~/wasteland.txt", mode='rt', encoding='utf-8') as real_file:
    wpl = words_per_line(real_file)

wpl
#=> [9, 8, 9, 9]
type(real_file)
#=> <class '_io.TextIOWrapper'>

from urllib.request import urlopen
with urlopen("http://sixty-north.com/c/t.txt") as web_file:
    wpl = words_per_line(web_file)

wpl
#=> [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 7, 8, 14, 12, 8]
type(web_file)
#=> <class 'http.client.HTTPResponse'>
```

---

## Context Managers

### BMP file reader

```python
"""Demonstrate raiding a refrigerator.

(using a context manager)
"""

from contextlib import closing


class RefrigeratorRaider:
    """Raid a refrigerator"""

    def open(self):
        print("Open fridge door.")

    def take(self, food):
        print(f"Finding {food}...")
        if food == 'deep fried pizza':
            raise RuntimeError("Health warning!")
        print(f"Taking {food}")

    def close(self):
        print("Close fridge door.")

### before refactor
# def raid(food):
#     r = RefrigeratorRaider()
#     r.open()
#     r.take(food)
#     r.close()


def raid(food):
    with closing(RefrigeratorRaider()) as r:
        r.open()
        r.take(food)
        # calling `r.close()` will result in an unnecessary call to `close`

```

**in shell**:

```python
>>> from fridge import raid
>>> raid('bacon')
#=> Open fridge door.
#=> Finding bacon...
#=> Taking bacon
#=> Close fridge door.
>>>
>>> raid('deep fried pizza')
#=> Open fridge door.
#=> Finding deep fried pizza...
#=> raises exception with RuntimeError: 'Health warning!'

### use `closing` in `raid` which wraps object in context manager that
### always calls `close` method on wrapped object before exiting
>>> raid('deep fried pizza')
#=> Open fridge door.
#=> Finding deep fried pizza...
#=> Close fridge door.
#=> raises exception with RuntimeError: 'Health warning!'
```

