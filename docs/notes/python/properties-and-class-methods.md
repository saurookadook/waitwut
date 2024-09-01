---
title: "Properties and Class Methods"
date: "2023-12-07"
fullPath: "/notes/python/properties-and-class-methods"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

# Properties and Class Methods

<details>

<summary>Code example</summary>

<span>

```python
class ShippingContainer:

    def __init__(self, owner_code, contents):
        self.owner_code = owner_code
        self.contents = contents

```

</span>
</details>

## Class Attributes

Class attributes created within scope of class

<details>

<summary>Code example</summary>

<span>

```python
class ShippingContainer:

    next_serial = 1337  # lolz

    def __init__(self, owner_code, contents):
        self.owner_code = owner_code
        self.contents = contents
        self.serial = ShippingContainer.next_serial
        ShippingContainer.next_serial += 1

```

</span>
</details>

**NOTE**: assignment via `self.attr = something` _always_ creates instance attribute

## Static Methods

- created with use of `@staticmethod` decorator

<details>

<summary>Code example</summary>

<span>

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

</span>
</details>

## Class Methods

- created with use of `@classmethod` decorator

<details>

<summary>Code example</summary>

<span>

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

</span>
</details>

### Class Methods for Named Constructors

- "named constructors" also known as "factory functions"
    - construct objects with certain configurations
    - allows support for multiple functions which behave similarly to constructors but:
        - with different behaviors
        - without needing to change `__init__` to handle different forms of argument lists

<details>

<summary>Code example</summary>

<span>

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

</span>
</details>

#### _Aside - ISO 6346 BIC code_
- _BIC === Bureau International des Containers (International Container Bureau)_
- _Full example: **CSQU3054383**_
_consists of:_
    - _owner code (**CSQ**)_
    - _category identifier (**U**)_
    - _serial number (**305438**)_
    - _check digit (**3**)_

<details>

<summary>

_Provided helper module_

</summary>

<span>

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

</span>
</details>

### Static Method Example Using BIC Code Helper

<details>

<summary>Code example</summary>

<span>

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

</span>
</details>

## Static Methods with Inheritance

- in Python, static methods can be overridden in subclasses

<details>

<summary>Code example</summary>

<span>

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

</span>
</details>

## Class Methods with Inheritance

- distinguishing feature of Python is ability to have class methods behave polymorphically

<details>

<summary>Code example</summary>

<span>

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

</span>
</details>

## Properties

- encapsulation using the `@property` decorator
[Property Decorator Diagram](/src/images/python/property-decorator-diagram.png)

<details>

<summary>Code example</summary>

<span>

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
        self._celsius = celsius

    @property  # celsius getter
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value > RefrigeratedShippingContainer.MAX_CELSIUS:
            raise ValueError("Temperature too hot!")
        self._celsius = value

```

</span>
</details>

<details>

<summary>Extended example</summary>

<span>

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

    @staticmethod
    def _c_to_f(celsius):
        return celsius * 9/5 + 32

    @staticmethod
    def _f_to_c(fahrenheit):
        return (fahrenheit - 32) * 5/9

    def __init__(self, owner_code, contents, celsius):
        super().__init__(owner_code, contents)
        self.celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value > RefrigeratedShippingContainer.MAX_CELSIUS:
            raise ValueError("Temperature too hot!")
        self._celsius = value

    @property
    def fahrenheit(self):
        return RefrigeratedShippingContainer._c_to_f(self.celsius)

    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = RefrigeratedShippingContainer._f_to_c(value)

```

</span>
</details>

## Properties and Inheritance

- inheritance interaction with the `@property` decorator

<details>

<summary>Code example</summary>

<span>

```python
import iso6346


class ShippingContainer:

    HEIGHT_FT = 8.5
    WIDTH_FT = 8.0
    next_serial = 1337

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
    def create_empty(cls, owner_code, length_ft *args, **kwargs):
        return cls(owner_code, length_ft, contents=None, *args, **kwargs)

    @classmethod
    def create_with_items(cls, owner_code, length_ft items, *args, **kwargs):
        return cls(owner_code, length_ft, contents=list(items), *args, **kwargs)

    def __init__(self, owner_code, length_ft, contents):
        self.contents = contents
        self.length_ft = length_ft
        self.bic = self._make_bic_code(
            owner_code=owner_code,
            serial=ShippingContainer._get_next_serial()
        )

    @property
    def volume_in_cubic_feet(self):
        return ShippingContainer.HEIGHT_FT * ShippingContainer.WIDTH_FT * self.length_ft


class RefrigeratedShippingContainer(ShippingContainer):

    MAX_CELSIUS = 4.0

    FRIDGE_VOLUME_IN_CUBIC_FEET = 100

    @staticmethod
    def _make_bic_code(owner_code, serial):
        return iso6346.create(
            owner_code=owner_code,
            serial=str(serial).zfill(6),
            category='R'
        )

    @staticmethod
    def _c_to_f(celsius):
        return celsius * 9/5 + 32

    @staticmethod
    def _f_to_c(fahrenheit):
        return (fahrenheit - 32) * 5/9

    def __init__(self, owner_code, length_ft, contents, celsius):
        super().__init__(owner_code, length_ft, contents)
        self.celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value > RefrigeratedShippingContainer.MAX_CELSIUS:
            raise ValueError("Temperature too hot!")
        self._celsius = value

    @property
    def fahrenheit(self):
        return RefrigeratedShippingContainer._c_to_f(self.celsius)

    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = RefrigeratedShippingContainer._f_to_c(value)

    @property
    def volume_in_cubic_feet(self):
        return super().volume_in_cubic_feet - RefrigeratedShippingContainer.FRIDGE_VOLUME_IN_CUBIC_FEET

```

</span>
</details>

<details>

<summary>Extended example (overriding setter)</summary>

<span>

```python
import iso6346


class ShippingContainer:

    HEIGHT_FT = 8.5
    WIDTH_FT = 8.0
    next_serial = 1337

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
    def create_empty(cls, owner_code, length_ft *args, **kwargs):
        return cls(owner_code, length_ft, contents=None, *args, **kwargs)

    @classmethod
    def create_with_items(cls, owner_code, length_ft items, *args, **kwargs):
        return cls(owner_code, length_ft, contents=list(items), *args, **kwargs)

    def __init__(self, owner_code, length_ft, contents):
        self.contents = contents
        self.length_ft = length_ft
        self.bic = self._make_bic_code(
            owner_code=owner_code,
            serial=ShippingContainer._get_next_serial()
        )

    @property
    def volume_in_cubic_feet(self):
        return ShippingContainer.HEIGHT_FT * ShippingContainer.WIDTH_FT * self.length_ft


class RefrigeratedShippingContainer(ShippingContainer):

    MAX_CELSIUS = 4.0

    FRIDGE_VOLUME_IN_CUBIC_FEET = 100

    @staticmethod
    def _make_bic_code(owner_code, serial):
        return iso6346.create(
            owner_code=owner_code,
            serial=str(serial).zfill(6),
            category='R'
        )

    @staticmethod
    def _c_to_f(celsius):
        return celsius * 9/5 + 32

    @staticmethod
    def _f_to_c(fahrenheit):
        return (fahrenheit - 32) * 5/9

    def __init__(self, owner_code, length_ft, contents, celsius):
        super().__init__(owner_code, length_ft, contents)
        self.celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value > RefrigeratedShippingContainer.MAX_CELSIUS:
            raise ValueError(f"Temperature of {value} is too hot!")
        self._celsius = value

    @property
    def fahrenheit(self):
        return RefrigeratedShippingContainer._c_to_f(self.celsius)

    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = RefrigeratedShippingContainer._f_to_c(value)

    @property
    def volume_in_cubic_feet(self):
        return super().volume_in_cubic_feet - RefrigeratedShippingContainer.FRIDGE_VOLUME_IN_CUBIC_FEET


class HeatedRefrigeratedShippingContainer(RefrigeratedShippingContainer):

    MIN_CELSIUS = -20.0

    @RefrigeratedShippingContainer.celsius.setter
    def celsius(self, value):
        if not (HeatedRefrigeratedShippingContainer.MIN_CELSIUS
                <= value
                <= RefrigeratedShippingContainer.MAX_CELSIUS):
            raise ValueError(f"Temperature {value} is out of range!")
        self._celsius = value

```

</span>
</details>

_Aside - chained relational operators_

Python allows for chaining relational operators, so that one can write `a < b < c` in place of `(a < b) and (b < c)`

<details>

<summary>Example with pitfalls</summary>

<span>

```python

class HeatedRefrigeratedShippingContainer(RefrigeratedShippingContainer):

    MIN_CELSIUS = -20.0

    # NOTE: this doesn't work
    @RefrigeratedShippingContainer.celsius.setter
    def celsius(self, value):
        if value < HeatedRefrigeratedShippingContainer.MIN_CELSIUS:
            raise ValueError(f"Temperature {value} is out of range!")
        super().celsius = value  # throws AttributeError: 'super' object has no attribute 'celsius'

    # This works
    @RefrigeratedShippingContainer.celsius.setter
    def celsius(self, value):
        if value < HeatedRefrigeratedShippingContainer.MIN_CELSIUS:
            raise ValueError(f"Temperature {value} is out of range!")
        RefrigeratedShippingContainer.celsius.fset(self, value)

```

</span>
</details>

## Template Method Pattern

- implement skeletal operations in base classes while deferring some details to subclasses

[Template Method](/src/images/python/template-method-overview.png)
