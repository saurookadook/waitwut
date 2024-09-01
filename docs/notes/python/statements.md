---
title: "Statements"
date: "2023-12-02"
fullPath: "/notes/python/statements"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

# Statements

`assert`
- <a href="https://docs.python.org/3/reference/simple_stmts.html#the-assert-statement" target="_blank" rel="noopener noreferrer">The `assert` Statement</a>
- <a href="https://python-reference.readthedocs.io/en/latest/docs/statements/assert.html" target="_blank" rel="noopener noreferrer">assert (The Right Way)</a>
- <a href="https://realpython.com/python-assert-statement/" target="_blank" rel="noopener noreferrer">Python `assert` Statement</a>

```python
assert expression

# equivalent to
if __debug__:
    if not expression: raise AssertionError

assert expression, other_expression

# equivalent to
if __debug__:
    if not expression: raise AssertionError(other_expression)

```
