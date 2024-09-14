---
title: "File IO and Resource Management"
date: "2024-05-24"
fullPath: "/notes/python/file-io-and-resource-management"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

- [`with`-blocks](/notes/python/file-io-and-resource-management/with-blocks)
- [File Data](/notes/python/file-io-and-resource-management/file-data)

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

More in <a href="https://docs.python.org/3/library/codecs.html#standard-encodings" target="_blank" rel="noopener noreferrer">Python docs</a>

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

### The Recaman Sequence Example

#### Write Recaman Sequence

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

Running the above script in a shell:

```sh
$ python recaman_sequence.py ~/recaman.dat 1000
```

#### Recaman Sequence Reader

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

Running the above script in a shell:

```sh
$ python sequence_reader.py ~/recaman.dat
```

#### Breaking it 🙂

```sh
echo "oops" >> ~/recaman.dat
python sequence_reader.py ~/recaman.dat
#=> throws exception with ValueError
```
