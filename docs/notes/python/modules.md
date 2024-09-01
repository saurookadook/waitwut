---
title: "Modules"
date: "2023-10-23"
fullPath: "/notes/python/modules"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

# Modules

- reusable functions
- source code files called modules
- modules can be used from other modules
    - _as long as circular dependencies aren't introduced by doing so_
- importing modules
- modules can be executed directly as programs or scripts
- Python execution model
    - to help understand when code is evaluated and executed
- make programs executable
    - using command line arguments to get basic config data into program
- simplest way to run Python scripts from shell:
```bash
$ python /path/to/file/script.py
```

## Platform-specific Modules
- Windows: use `msvcrt` module
- Linux and MacOS X: use `tty`, `termios`, and `sys` modules

```python
"""keypress - A module for detecting a single keypress."""


try:
    import msvcrt


    def getkey():
        """Wait for a keypress and return a single character string."""
        return msvcrt.getch()

except ImportError:
    import sys
    import tty
    import termios


    def getkey():
        """Wait for a keypress and return a single character string."""
        fd = sys.stdin.fileno()
        original_attributes = termios.tcgetattr(fd)
        try:
            tty.setstraw(sys.stdin.fileno())
            ch = sys.stdin.read(1)
        finally:
            #### NOTE: restores various terminal attributes after terminal has been put into raw mode in order to read single character
            termios.tcsetattr(fd, termios.TCSADRAIN, original_attributes)
        return ch

# If either of the Unix-specific tty or termios are not found, allow the ImportError to propagate from here

```

## Executable Directories

```
reader
 |__  __main__.py  <- This file will handle the execution
 |__  reader
       |__  __init__.py
       |__  compressed
       |     |__  __init__.py
       |     |__  bzipped.py
       |     |__  gzipped.py
       |__  reader.py
```

## Modules as Singletons

```python
# registry.py
_registry = []

def register(name):
    _registry.append(name)

def registered_names():
    return iter(_registry)



# use_registry.py
import registry

registry.register('my name')
for name in registry.registered_names():
    print(name)


```

