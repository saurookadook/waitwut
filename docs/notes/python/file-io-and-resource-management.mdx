---
title: "File IO and Resource Management"
date: "2024-05-24"
fullPath: "/notes/python/file-io-and-resource-management"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

import { ExternalLinkWrapper } from 'common/components';

# File IO and Resource Management

**Resources**
- program elements that must be released or closed after use
- Python provides special syntax for managing resources

## Topics
- core functions for opening files
- text vs. binary mode
- read and write files
- close files explicitly
- managing resources with context managers
- `with` keyword for using context managers
- `with`-blocks for running code that uses resources
- using Python to work with binary file formats
- abstraction of file-like objects
- tools for creating context managers

---

## Opening Files

### `open()`
- open file for reading or writing
- most common args:
    - `file`: the path to the file _(required)_
    - `mode`: reade, write, or append, plus binary or text _(optional, but suggest always using it to be explicit)_
    - `encoding`: encoding to use in text mode

#### Files Are Stored as Binary
- Python distinguishes between files opened in binary and text mode, even when underlying OS doesn't

##### Binary Mode
- reflects raw data in the file
- files opened in binary mode return and manipulate their contents as byte objects without any decoding

##### Text Mode
- by default, text mode files engage support for Python's `universal newlines`
    - causes translation between portable single newline character in program strings (`\n`) in (to?) a platform-dependent newline representation of raw bytes stored in file system
- file opened in text mode treats its contents as if it contains text strings of the `str` type, meaning:
    - raw bytes having been first decoded (with either platform-dependent encoding or using specified encoding if given)

#### Default Encoding
```python
import sys
sys.getdefaultencoding()
#=> 'utf-8'
```

More in <ExternalLinkWrapper href="https://docs.python.org/3/library/codecs.html#standard-encodings">Python docs</ExternalLinkWrapper>

---

## Writing Text

### Writing Text Example

```python
f = open('wasteland.txt', mode='wt', encoding='utf-8')
help(f) #=> to see properties of file-like object

f.write('What are the roots that clutch, ')
#=> 32 (aka number of characters written to file)
f.write('what branches grow\n')
#=> 19
f.write('Out of this stony rubbish? ')
#=> 27
f.close()
```

> **NOTE**: upon closing the file, its contents become visible to all other programs

### `open()` Modes
- Mode should be combined with Selector, such as:
    - `'wb'` _(Open for writing in binary mode)_
    - `'at'` _(Open for appending in text mode)_
- Highly recommended to always be explicit

| Mode |      Meaning       |
| 'r'  | open for reading   |
| 'w'  | open for writing   |
| 'a'  | open for appending |
-----------------------------
| Selector |   Meaning   |
|   'b'    | binary mode |
|   't'    | text mode   |


> 💡 **IMPORTANT** 💡
> - `write()` returns number of codepoints (characters) written, _**not**_ the number of bytes written to the file
> - **don't** sum these values to determine to determine file length

---

## Reading Text

### Reading Text Example

```python
g = open('wasteland.txt', mode='rt', encoding='utf-8')
g.read(32)
#=> 'What are the roots that clutch, '
g.read() # reads the rest of the file
#=> 'what branches grow\nOut of this stony rubbish? '
g.read()
#=> ''
g.seek(0)
#=> 0

### readline()
g.readline()
#=> 'What are the roots that clutch, what branches grow\n'
g.readline() # returned lines are terminated by single newline character if there is one present in the file
#=> 'Out of this stony rubbish? '
g.readline()
#=> ''

### readlines()
g.seek(0)
#=> 0
g.readlines()
#=> ['What are the roots that clutch, what branches grow\n', 'Out of this stony rubbish? ']
```

> **NOTE**:
> - for text mode files, `seek` cannot move to arbitrary offset
>     - only values allowed are `0` and values from `tell()`
>     - any other values result in undefined behavior

---

## Appending Text

### Appending Text Example

```python
h = open('wasteland.txt', mode='at', encoding='utf-8')

### writelines
h.writelines(
    [
        'Son of man,\n',
        'You cannot say, or guess, ',
        'for you know only,\n',
        'A heap of broken images, ',
        'where the sun beats\n'
    ]
)
h.close()
```

---

## Iterating over Files

### File Iteration

#### Using `print()`
```python
# files.py
import sys


f = open(sys.argv[1], mode='rt', encoding='utf-8')
for line in f:
    print(line) # adds newline character after each line (even if one already exists)
f.close()
```

running it in shell:
```sh
$ python files.py wasteland.txt
#=> What are the roots that clutch, what branches grow
#=>
#=> Out of this stony rubbish? Son of man,
#=>
#=> You cannot say, or guess, for you know only,
#=>
#=> A heap of broken images, where the sun beats
#=>
```

#### Using `sys.stdout.write()`

```python
# files.py
import sys


f = open(sys.argv[1], mode='rt', encoding='utf-8')
for line in f:
    sys.stdout.write(line)
f.close()
```

running it in shell:
```sh
$ python files.py wasteland.txt
#=> What are the roots that clutch, what branches grow
#=> Out of this stony rubbish? Son of man,
#=> You cannot say, or guess, for you know only,
#=> A heap of broken images, where the sun beats
```

---

## Closing Files with Finally

### The Recaman Sequence

<details>
<summary>

**Recaman Sequence**

</summary>

```python
import sys
from itertools import count, islice


def sequence():
    """Generate Recaman's sequence."""

    seen = set()
    a = 0
    for n in count(1):
        yield a
        seen.add(a)
        c = a - n
        if c < 0 or c in seen:
            c = a + n
        a = c


def write_sequence(filename, num):
    """Write Recaman's sequence to a text file."""

    f = open(filename, mode='wt', encoding='utf-8')
    f.writelines(f"{r}\n" for r in islice(sequence(), num + 1))
    f.close()


if __name__ == '__main__':
    write_sequence(filename=sys.argv[1], num=int(sys.argv[2]))

```

</details>

```sh
$ python recaman_sequence.py ~/recaman.dat 1000
```

<details>
<summary>

**Sequence Reader**

</summary>

```python
"""Read and print an integer series."""
import sys


# def read_series(filename):
#     f = open(filename, mode='rt', encoding='utf-8')
#     series = []
#     for line in f:
#         a = int(line.strip())
#         series.append(a)
#     f.close()
#     return series


# refactor with try/finally to make sure that file is closed even if an error occurs
def read_series(filename):
    try:
        f = open(filename, mode='rt', encoding='utf-8')
        # another refactor using list comprehension instead
        return [int(line.strip()) for line in f]
    finally:
        f.close()


def main(filename):
    series = read_series(filename)
    print(series)


if __name__ == '__main__':
    main(filename=sys.argv[1])

```

</details>

```sh
$ python sequence_reader.py ~/recaman.dat
```

#### Breaking it 🙂

```sh
echo "oops" >> ~/recaman.dat
python sequence_reader.py ~/recaman.dat
#=> throws exception with ValueError
```

---

## With-blocks

## File Usage Pattern
Most basic:
```python
f = open(...)
# work with file
f.close()
```

**NOTE**: if file isn't closed, data can be lost!

## `with`-block
- Want mechanism to pair `open()` and `close()` automatically
- control flow structure for managing resources
- can be used with any objects (such as files) _which support the context-manager protocol_


<details>
<summary>

**Sequence Reader (_using `with`_)**

</summary>

```python
"""Read and print an integer series."""
import sys


# the `with` block will close file automatically, no matter how the `with` block exits
def read_series(filename):
    with open(filename, mode='rt', encoding='utf-8') as f:
        return [int(line.strip()) for line in f]


def main(filename):
    series = read_series(filename)
    print(series)


if __name__ == '__main__':
    main(filename=sys.argv[1])

```

</details>

<details>
<summary>

**Recaman Sequence (_using `with`_)**

</summary>

```python
import sys
from itertools import count, islice


def sequence():
    """Generate Recaman's sequence."""

    seen = set()
    a = 0
    for n in count(1):
        yield a
        seen.add(a)
        c = a - n
        if c < 0 or c in seen:
            c = a + n
        a = c


# refactored using `with` block
def write_sequence(filename, num):
    """Write Recaman's sequence to a text file."""

    with open(filename, mode='wt', encoding='utf-8') as f:
        f.writelines(f"{r}\n" for r in islice(sequence(), num + 1))


if __name__ == '__main__':
    write_sequence(filename=sys.argv[1], num=int(sys.argv[2]))

```

</details>

> ☯️ _**Moment of Zen**_ ☯️
> _"Beautiful is better than ugly"_
>     _Sugary syntax_
>     _Faultlessness attained through_
>     _Sweet fidelity_

---

## Expansion of the `with`-block

```python
with EXPR as VAR:
    BLOCK

# equivalent to
mgr = (EXPR)
    exit = type(mgr).__exit__
    value = type(mgr).__enter__(mgr)
    exc = True
    try:
        try:
            VAR = value
            BLOCK
        except:
            exc = False
            if not exit(mgr, *sys.exc_info()):
                raise
    finally:
        if exc:
            exit(mgr, None, None, None)
```

---

## Binary Files

### BMP File Format
- contains device-independent bit maps
- see simple example of a BMP file writer below

<details>
<summary>

**BMP file writer**

</summary>

```python
"""A module for dealing with BMP bitmap image files."""


def write_grayscale(filename, pixels):
    """Creates and writes a grayscale BMP file.

    Args:
        filename: The name of the BMP file to be created.

        pixels: A rectangular image stored as a sequence of rows.
            Each row must be an iterable series of integers in the
            range 0-255.

    Raises:
        ValueError: If any of the integer values are out of range.
        OSError: If the file couldn't be written.
    """

    # making assumption that all rows have same length
    # - that is a check which should be made in production code
    height = len(pixels)
    width = len(pixels[0])

    # NOTE: don't specify an encoding since that doesn't make sense for binary files
    with open(filename, 'wb') as bmp:
        # BMP Header
        bmp.write(b'BM')

        ### `tell()` method used to provide offset from beginning of file for the file pointer
        size_bookmark = bmp.tell()     # The next four bytes hold the filesize as a 32-bit
        bmp.write(b'\x00\x00\x00\x00') # little-endian integer. Zero placeholder for now.

        bmp.write(b'\x00\x00') # Unused 16-bit integer - should be zero
        bmp.write(b'\x00\x00') # Unused 16-bit integer - should be zero

        pixel_offset_bookmark = bmp.tell() # The next four bytes hold the integer offset to the
        bmp.write(b'\x00\x00\x00\x00')     # pixel data. Zero placeholder for now.

        # Image Header
        ### 1st: write length of image as 32-bit integer
        bmp.write(b'\x28\x00\x00\x00')      # Image header size in bytes - 40 decimal
        bmp.write(_int32_to_bytes(width))   # Image width in pixels
        bmp.write(_int32_to_bytes(width))   # Image width in pixels
        bmp.write(b'\x01\x00')              # Number of image planes
        bmp.write(b'\x08\x00')              # Bits per pixel 8 for grayscale
        bmp.write(b'\x00\x00\x00\x00')      # No compression
        bmp.write(b'\x00\x00\x00\x00')      # Zero for uncompressed images
        bmp.write(b'\x00\x00\x00\x00')      # Unused pixels per meter
        bmp.write(b'\x00\x00\x00\x00')      # Unused pixels per meter
        bmp.write(b'\x00\x00\x00\x00')      # Use whole color table
        bmp.write(b'\x00\x00\x00\x00')      # All colors are important

        # Color palette - a linear grayscale
        for c in range(256):
            bmp.write(bytes(c, c, c, 0)) # Blue, Green, Red, Zero

        # Pixel data
        pixel_data_bookmark = bmp.tell()
        for row in reversed(pixels): # BMP files are bottom to top
            row_data = bytes(row)
            bmp.write(row_data)
            padding = b'\x00' * ((4 - (len(row) % 4)) % 4) # Pad row to multiple of four bytes
            bmp.write(padding)

        # End of file
        eof_bookmark = bmp.tell()

        # Fill in file size placeholder
        bmp.seek(size_bookmark)
        bmp.write(_int32_to_bytes(eof_bookmark))

        # Fill in pixel offset placeholder
        bmp.seek(pixel_offset_bookmark)
        bmp.write(_int32_to_bytes(pixel_data_bookmark))


def _int32_to_bytes(i):
    """Convert an integer to four bytes in little-endian format."""

    return bytes((i & 0xff,
                  i >> 8 & 0xff,
                  i >> 16 & 0xff,
                  i >> 24 & 0xff))

```

</details>

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

<details>
<summary>

**Fractal**

</summary>

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

</details>

in shell:
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

<details>
<summary>

**BMP file reader**

</summary>

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

</details>

in shell:
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

<details>
<summary>

**BMP file reader**

</summary>

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

</details>

in shell:
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

