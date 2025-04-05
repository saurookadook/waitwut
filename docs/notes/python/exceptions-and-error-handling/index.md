---
title: 'Exceptions and Error Handling'
date: '2024-02-28'
fullPath: '/notes/python/exceptions-and-error-handling'
iconComponentName: 'python_icon'
sectionSlug: 'notes'
---

- [Exception Handling](/notes/python/exceptions-and-error-handling/exception-handling)
- [Exceptions](/notes/python/exceptions-and-error-handling/exceptions)
- [Assertions](/notes/python/exceptions-and-error-handling/assertions)

## Python's Philosophy

### Prepare for Failure

- **LBYL** stands for "look before you leap"
    - check all preconditions
- **EAFP** standers for "easier to ask forgiveness than permission"
    - prepare for consequences

### Python prefers EAFP
- code's "happy path" is emphasized rather than being interspersed with error handling
- example: file processing (and some givens)
    - processing details are not important
    - `process_file()` opens a file and reads it
```python
# ################################ Process file: LBYL version ################################


import os


p = '/path/to/datafile.dat'


if os.path.exists(p):
    process_file(p)
else:
    print(f'No such file as {p}')

### ISSUES
# what if file's contents aren't valid?
# what if path leads to directory?
# BONUS: there is race condition where file could be deleted AFTER check but BEFORE processing

# ################################ Process file: EAFP version ################################


p = '/path/to/datafile.dat'


try:
    process_file(f)
except OSError as e:
    print(f'Error: {e}')

```

#### Takeaways
- EAFP is enabled by exceptions
- without exceptions, error handling is interspersed in program flow
- exceptions can be handled non-locally
- EAFP plus Exceptions
    - exceptions are not easily ignored
    - error codes are silent by default
    - Exceptions plus EAFP makes it difficult for problems to be silently ignored

As a practice when using `try/except`, you should specify the type of exception being handled

## `try...except`
- `except` block is passed argument of exception type(s)
    - may have multiple `except` blocks per `try` block
    - accepts `tuple` as argument, which allows for passing multiple types of exceptions
