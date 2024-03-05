---
title: "Context Managers"
date: "2024-03-01"
fullPath: "/notes/python/context-managers"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

import { ExternalLinkWrapper } from 'common/components';

# Context Managers

Objects designed to be used in a `with` statement:

```python
with context_manager:
    # do stuff
    pass
```

- When with statement is executed, the expression following `with` is evaluated to a value, which must be a context manager.
- Underlying mechanics of `with` statement use that value in specific ways to implement semantics of `with` statement

## Details

- defined in <ExternalLinkWrapper href="https://www.python.org/dev/peps/pep-0343">PEP343</ExternalLinkWrapper>
- must implement at least 2 methods:
    - `enter()`
        - called before `with` statement's code block begins
        - prepares manager for use
    - `exit()`
        - called before `with` statement's code block ends (_even if it exits with an exception_)
        - ensures manager is properly closed, shut down, or cleaned up at end
- ensures that **resources** are properly and automatically **managed**

## Context-Manager Protocol

- consists of only 2 methods:
    1. `__enter__(self)`
    2. `__exit__(self, exc_type, exc_val, exc_tb)`

### How Methods Are Used By `with` Statement

```python
with expression as x:
    body
```

1. `with` statement executes its `expression`, which **must** evaluate to a context-manager
2. `with` statement then calls `__enter__()` on the context-manager from `expression`
    - if `__enter__()` throws an exception, execution never enter `with` block and statement is finished
    - if `with` statement includes an `as` clause, then return value of `__enter__()` is bound to name in the `as` clause
        - _**NOTE**: it is specifically the return value of `expression.__enter__()` and **not** the return value of `expression` that is bound in `as` clause_
3. then `body` is executed and can terminate in one of two fundamental ways:
    - with exception
    - running off the end of the block (_aka normal termination_)
4. either way, context-manager's `__exit__()` is called after block is terminated
    - if block exits normally, `__exit__()` is called with no extra information
    - if block exits with exception, then exception information is passed to `__exit__()`

### Example: `LoggingContextManager`

```python
class LoggingContextManager:
    def __enter__(self):
        print('LoggingContextManager.__enter__()')
        return 'You are in a with-block!'

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is None:
            print('LoggingContextManager.__exit__: normal exit detected')
        else:
            print('LoggingContextManager.__exit__:'
            'Exception detected!'
            'type={}, value={}, traceback={})'.format(
                exc_type, exc_val, exc_tb
            ))
        return
```


### More on Protocol Methods

#### `__enter__()`

- called before entering `with`-statement body
- return value bound to `as variable`
- can return value of any type
- commonly returns context-amanger itself

#### `__exit__()`

- called when `with`-statement body exits
    - responsible for cleaning up whatever resources controlled by context-manager
- properly handle case where `with` block exits with exception
    - in order to support this case, `__exit__()` should accept 3 arguments:
        1. `exc_type` - exception type
        2. `exc_val` - exception object
        3. `exc_tb` - exception traceback
    - also responsible for how exceptions propagate out of them
        - by default, `__exit__()` **propagates exceptions** thrown from `with`-statement's code block
        - if `__exit__()` returns value that evaluates to `False`, exception is **propagated**
            - _`__exit__()` should answer the question "should the `with`-statement swallow exceptions?"_
        - should **never** explicitly re-raise exceptions
            - if exception _should_ be re-raised, then `__exit__()` should just return `False` and let `with`-statement re-raise it
        - should **only** raise exceptions if it **fails** itself

## `contextlib`

- standard library module for working with context managers
- "provides utilities for common tasks involving the `with` statement"

### `contextlib.contextmanager`

- decorator that can be used to create new context managers
- lets you define context-managers with **simple** control flow
- allows you to leverage the **statefulness** of generators

```python
import contextlib


@contextlib.contextmanager
def my_context_manager():
    # <ENTER>
    try:
        yield [value]  # <= like __enter__()'s return statement
        # <NORMAL EXIT>
    except:
        # <EXCEPTIONAL EXIT>
        raise

with my_context_manager() as x:
    # ...
```

### Example: `LoggingContextManager` refactored using `contextmanager` decorator

```python
import contextlib
import sys


@contextlib.contextmanager
def logging_context_manager():
    print('logging_context_manager: enter')
    try:
        yield 'You are in a with-block!'
        print('logging_context_manager: normal exit')
    except Exception:
        print('logging_context_manager: exceptional exit',
            sys.exc_info())
        raise

```

### Differences from protocol

- use standard exception handling to propagate exceptions
- explicitly re-raise (_or don't catch_) to propagate exceptions
- swallow exceptions by not re-raising them

## Multiple Context Managers

- `with`-statements can use as many context-managers as necessary
- exceptions propagated from **inner** context managers will be seen by **outer** context managers
- basic syntax:
```python
with cm1() as a, cm2() as b, ...:
    BODY

# NOTE: multiple syntax is the same as having them nested
with cm1() as a:
    with cm2() as b:
        BODY
```

### Simple Example

```python
import contextlib


@contextlib.contextmanager
def nest_test(name):
    print('Entering', name)
    yield
    print('Exiting', name)


with nest_test('outer') as a, nest_test('inner') as b:
    print('BODY')


with nest_test('outer') as a:
    with nest_test('inner') as b:
        print('BODY')

# NOTE: both of the above `with`-statements output the same thing
#=> Entering outer
#=> Entering inner
#=> BODY
#=> Exiting inner
#=> Exiting outer

```

## Realistic Example

- `Connection` class which represents some sort of database connection
- `Transaction` class which manages transactions in database
- users of our system can...
    - create connections
    - create transaction objects to start transactions
    - to commit/rollback transactions, users can call methods on transaction instances

```python
# db/connection.py
class Connection:
    def __init__(self):
        self.xid = 0

    def _start_transaction(self):
        print('starting transaction', self.xid)
        result = self.xid
        self.xid = self.xid + 1
        return result

    def _commit_transaction(self, xid):
        print('committing transaction', xid)

    def _rollback_transaction(self, xid):
        print('rolling back transaction', xid)


# db/transaction.py
import contextlib


class Transaction:
    def __init__(self, conn):
        self.conn = conn
        self.xid = conn._start_connection()

    def commit(self):
        self.conn._commit_transaction(self.xid)

    def rollback(self):
        self.conn._rollback_transaction(self.xid)


@contextlib.contextmanager
def start_transaction(connection):
    tx = Transaction(connection)

    try:
        yield tx
    except:
        tx.rollback()
        raise

    tx.commit()


# in repl
>>> from db import Connection, start_transaction
>>> conn = Connection()
>>> try:
...     with start_transaction(conn) as tx:
...         x = 1 + 1
...         raise ValueError()
...         y = x + 2
...         print('transaction 0 =', x, y)
... except ValueError:
...     print('Oops! Transaction 0 failed.')
...
#=> starting transaction 0
#=> rolling back transaction 0
#=> Oops! Transaction 0 failed.
>>> try:
...     with start_transaction(conn) as tx:
...         x = 1 + 1
...         y = x + 2
...         print('transaction 1 =', x, y)
... except ValueError:
...     assert False
...
#=> starting transaction 1
#=> transaction 1 = 2 4
#=> committing transaction 1
```

