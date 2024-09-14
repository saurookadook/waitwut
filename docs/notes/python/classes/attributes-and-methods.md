---
title: "Class Attributes and Methods"
date: "2024-05-24"
fullPath: "/notes/python/classes/attributes-and-methods"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

## Simple Example

```python
class ShippingContainer:

    def __init__(self, owner_code, contents):
        self.owner_code = owner_code
        self.contents = contents

```

## Class Attributes

Class attributes created within scope of class

```python
class ShippingContainer:

    next_serial = 1337  # lolz

    def __init__(self, owner_code, contents):
        self.owner_code = owner_code
        self.contents = contents
        self.serial = ShippingContainer.next_serial
        ShippingContainer.next_serial += 1

```

> **NOTE**: assignment via `self.attr = something` _always_ creates instance attribute

## Static Methods

- created with use of `@staticmethod` decorator

```python
class ShippingContainer:

    next_serial = 1337  # lolz

    @staticmethod
    def _get_next_serial():
        result = ShippingContainer.next_serial
        ShippingContainer.next_serial += 1
        return result

    def __init__(self, owner_code, contents):
        self.owner_code = owner_code
        self.contents = contents
        self.serial = ShippingContainer._get_next_serial()

```

## Class Methods

- created with use of `@classmethod` decorator

```python
class ShippingContainer:

    next_serial = 1337  # lolz

    @classmethod
    def _get_next_serial(cls):
        result = cls.next_serial
        cls.next_serial += 1
        return result

    def __init__(self, owner_code, contents):
        self.owner_code = owner_code
        self.contents = contents
        self.serial = ShippingContainer._get_next_serial()

```

### Class Methods for Named Constructors

- "named constructors" also known as "factory functions"
    - construct objects with certain configurations
    - allows support for multiple functions which behave similarly to constructors but:
        - with different behaviors
        - without needing to change `__init__` to handle different forms of argument lists

```python
class ShippingContainer:

    next_serial = 1337  # lolz

    @classmethod
    def _get_next_serial(cls):
        result = cls.next_serial
        cls.next_serial += 1
        return result

    @classmethod
    def create_empty(cls, owner_code):
        return cls(owner_code, contents=None)

    @classmethod
    def create_with_items(cls, owner_code, items):
        return cls(owner_code, contents=list(items))

    def __init__(self, owner_code, contents):
        self.owner_code = owner_code
        self.contents = contents
        self.serial = ShippingContainer._get_next_serial()

```

#### _Aside - ISO 6346 BIC code_
- _BIC === Bureau International des Containers (International Container Bureau)_
- _Full example: **CSQU3054383**_
_consists of:_
    - _owner code (**CSQ**)_
    - _category identifier (**U**)_
    - _serial number (**305438**)_
    - _check digit (**3**)_

_**Provided helper module**: `iso6346.py`_

```python
"""
ISO 6346 shipping container codes.
"""


def create(owner_code, serial, category='U'):
    """Create an ISO 6346 shipping container code.

    Args:
        owner_code (str): Three character alphabetic container code.
        serial (str): Six digit numeric serial number.
        category (str): Equipment category identifier.

    Returns:
        An ISO 6346 container code including a check digit.

    Raises:
        ValueError: If incorrect values are provided.
    """
    if not (len(owner_code) == 3 and owner_code.isalpha()):
        raise ValueError("Invalid ISO 6346 owner code '{}'".format(owner_code))

    if category not in ('U', 'J', 'Z', 'R'):
        raise ValueError("Invalid ISO 6346 category identifier '{}'".format(category))

    if not (len(serial) == 6 and serial.isdigit()):
        raise ValueError("Invalid ISO 6346 serial number")

    raw_code = owner_code + category + serial
    full_code = raw_code + str(check_digit(raw_code))
    return full_code


def check_digit(raw_code):
    """Compute the check digit for an ISO 6346 code without that digit

    Args:
        raw_code (str): An ISO 6346 code lacking a check digit.

    Returns:
        An integer check digit between 0 and 9 inclusive.
    """
    s = sum(code(char) * 2**index for index, char in enumerate(raw_code))
    return s % 11 % 10


def code(char):
    """Determine the ISO 6346 numeric equivalent of a character.

    Args:
        char (str): A single character string.

    Return:
        An integer code equivalent to the supplied character.
    """
    return int(char) if char.isdigit() else letter_code(char)


def letter_code(letter):
    """Determine the ISO 6346 numeric code for a letter.

    Args:
        letter (str): A single letter.

    Returns:
        An integer character code equivalent to the supplied letter.
    """
    value = ord(letter.lower()) - ord('a') + 10
    return value + value // 11

```

### Static Method Example Using BIC Code Helper

```python
import iso6346


class ShippingContainer:

    next_serial = 1337  # lolz

    @staticmethod
    def _make_bic_code(owner_code, serial):
        return iso6346.create(
            owner_code=owner_code,
            serial=str(serial).zfill(6)
        )

    @classmethod
    def _get_next_serial(cls):
        result = cls.next_serial
        cls.next_serial += 1
        return result

    @classmethod
    def create_empty(cls, owner_code):
        return cls(owner_code, contents=None)

    @classmethod
    def create_with_items(cls, owner_code, items):
        return cls(owner_code, contents=list(items))

    def __init__(self, owner_code, contents):
        self.contents = contents
        self.bic = ShippingContainer._make_bic_code(
            owner_code=owner_code,
            serial=ShippingContainer._get_next_serial()
        )

```

## Static Methods with Inheritance

- in Python, static methods can be overridden in subclasses

```python
import iso6346


class ShippingContainer:

    next_serial = 1337  # lolz

    @staticmethod
    def _make_bic_code(owner_code, serial):
        return iso6346.create(
            owner_code=owner_code,
            serial=str(serial).zfill(6)
        )

    @classmethod
    def _get_next_serial(cls):
        result = cls.next_serial
        cls.next_serial += 1
        return result

    @classmethod
    def create_empty(cls, owner_code):
        return cls(owner_code, contents=None)

    @classmethod
    def create_with_items(cls, owner_code, items):
        return cls(owner_code, contents=list(items))

    def __init__(self, owner_code, contents):
        self.contents = contents
        self.bic = self._make_bic_code(  # need to reference 'self' instead so that the overriden method is called instead of the method from the base class
            owner_code=owner_code,
            serial=ShippingContainer._get_next_serial()
        )


class RefrigeratedShippingContainer(ShippingContainer):

    @staticmethod
    def _make_bic_code(owner_code, serial):
        return iso6346.create(
            owner_code=owner_code,
            serial=str(serial).zfill(6),
            category='R'
        )
```

## Class Methods with Inheritance

- distinguishing feature of Python is ability to have class methods behave polymorphically

```python
import iso6346


class ShippingContainer:

    next_serial = 1337  # lolz

    @staticmethod
    def _make_bic_code(owner_code, serial):
        return iso6346.create(
            owner_code=owner_code,
            serial=str(serial).zfill(6)
        )

    @classmethod
    def _get_next_serial(cls):
        result = cls.next_serial
        cls.next_serial += 1
        return result

    # NOTE: added *args and **kwargs to accomodate use of these methods in derived subclasses
    @classmethod
    def create_empty(cls, owner_code, *args, **kwargs):
        return cls(owner_code, contents=None, *args, **kwargs)

    @classmethod
    def create_with_items(cls, owner_code, items, *args, **kwargs):
        return cls(owner_code, contents=list(items), *args, **kwargs)

    def __init__(self, owner_code, contents):
        self.contents = contents
        self.bic = self._make_bic_code(
            owner_code=owner_code,
            serial=ShippingContainer._get_next_serial()
        )


class RefrigeratedShippingContainer(ShippingContainer):

    MAX_CELSIUS = 4.0

    @staticmethod
    def _make_bic_code(owner_code, serial):
        return iso6346.create(
            owner_code=owner_code,
            serial=str(serial).zfill(6),
            category='R'
        )

    def __init__(self, owner_code, contents, celsius):
        super().__init__(owner_code, contents)

        if celsius > RefrigeratedShippingContainer.MAX_CELSIUS:
            raise ValueError("Temperature too hot!")
        self.celsius = celsius

```
