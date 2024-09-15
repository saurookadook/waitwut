---
title: "with-blocks"
date: "2024-05-24"
fullPath: "/notes/python/file-io-and-resource-management/with-blocks"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

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

### Sequence Reader (_using `with`_)

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

### **Recaman Sequence (_using `with`_)**

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

#### BMP file writer

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
