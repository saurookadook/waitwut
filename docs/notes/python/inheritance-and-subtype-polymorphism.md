---
title: "Inheritance and Subtype Polymorphism"
date: "2023-12-07"
fullPath: "/notes/python/inheritance-and-subtype-polymorphism"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

# Inheritance and Subtype Polymorphism

<details>

<summary>

## Realistic example: `SortedList`

</summary>

<span>

```python
class SimpleList:
    def __init__(self, items):
        self._items = list(items)

    def add(self, item):
        self._items.append(item)

    def __getitem__(self, index):
        return self._items[index]

    def sort(self):
        self._items.sort()

    def __len__(self):
        return len(self._items)

    def __repr__(self):
        return "SimpleList({!r})".format(self._items)


class SortedList(SimpleList):
    def __init__(self, items=()):  # optional sequence argument
        super().__init__(items)
        self.sort()

    def add(self, item):
        super().add(item)
        self.sort()

    def __repr__(self):
        return "SortedList({!r})".format(list(self))


class IntList(SimpleList):
    def __init__(self, items=()):
        for x in items: self._validate(x)
        super().__init__(items)

    @staticmethod
    def _validate(x):
        if not isinstance(x, int):
            raise TypeError('IntList only supports integer values.')

    def add(self, item):
        self._validate(item)
        super().add(item)

    def __repr__(self):
        return "IntList({!r})".format(list(self))


class SortedIntList(IntList, SortedList):
    def __repr__(self):
        return "SortedIntList({!r})".format(list(self))
```

</span>
</details>

Useful built-in functions:
- **`isinstance()`**
    - determines if object is of a specified type
    - will also return `True` if object is a subclass of specified type
    - second argument can also be a tuple of types
    -   ```python
        # in repl
        >>> isinstance(3, int)
        #=> True
        >>> isinstance('hello!', str)
        #=> True
        >>> x = []
        >>> isinstance(x, (float, dict, list))
        #=> True
        ```
- **`issubclass()`**
    - determines if one type is subclass of another
    -   ```python
        class BaseClass:

            def __init__(self, foo):
                self.foo = foo

        class SubClass(BaseClass):

            def __init__(self, foo, bar):
                super().__init__(foo)
                self.bar = bar

        class SubSubClass(SubClass):

            def __init__(self, foo, bar, baz):
                super().__init__(foo, bar)
                self.baz = baz

        issubclass(BaseClass, SubClass)
        #=> False
        issubclass(SubClass, BaseClass)
        #=> True
        issubclass(SubSubClass, BaseClass)
        #=> True
        ```

- **Single inheritance**
    -   ```python
        class SubClass(BaseClass):
            pass
        ```
    - **NOTE**: base class initializer will _only_ be called automatically if subclass initializer is _undefined_
- **Multiple inheritance**
    - defining class with more than one base class
    -   ```python
        class SubClass(Base1, Base2, . . .):
            pass
        ```
    - subclasses inherit methods of all bases
    - names resolve in the obvious way (_assuming there are no conflicts_)
    - **Method Resolution Order** (MRO) determines name lookup in all cases
    - if the class
        - A. has multiple base classes
        - B. defines no initializer
        then only the initializer of the first base class is automatically called
    - `__bases__` member of class objects
        - a tuple of base classes

## Method Resolution Order

- ordering that determines method name lookup
    - _more precisely: ordering of a class's inheritance graph used to determine which implementation to use when a method is invoked_
- MRO of a class determines order in which inheritance graph is searched to find the correct implementation of the method
- class's MRO is stored on `__mro__` member
    - returns tuple of classes defining method resolution order
- can also call `mro()` to get the order as a list rather than a tuple

### How is MRO used to dispatch method calls?

When you call a method on an object in Python...

1. looks at MRO for object's type
2. for each entry in MRO (_from front to back_), check if that class has requested method
3. as soon as a class is found with matching method, that method is used and search stops

### How is Method Resolution Order Calculated?

**C3**
    - algorithm for calculating MRO in Python
    - ensures that
        - subclasses come before base classes
        - base class order from class definition is preserved
        - first two qualities are preserved no matter where you start in the inheritance graph
    - because of the above criteria, **not all inheritance declarations are allowed!**

```python
# Example of multiple inheritance that violates C3
>>> class A:
...     pass
>>> class B(A):
...     pass
>>> class C(A):
...     pass
>>> class D(B, A, C):
...     pass
#=> TypeError: Cannot create a consistent method resolution order (MRO) for bases A, C
```
_**Explanation of above**:_
    - _since `B` and `C` both inherit from `A`, `B` and `C` must both come before `A` in any MRO_
    - _however, since `D`'s base class declaration puts `A` before `C`, **and** since C3 also guarantees that base class declaration order is preserved, C3 cannot produce a consistent MRO, as it can't put `A` **both before and after** `C`_

## Built-in `super()` Function

**Short, albeit incomplete, definition**: given a method resolution order and a class `C`, `super()` gives you an object which resolves methods using only the part of the MRO which comes after `C`

- `super()` returns a proxy object which routes method calls
    - **bound proxy**: bound to specific class or instance
    - **unbound proxy**: not bound to specific class or instance
        - _primarily an implementation detail for other Python features_

## Class-Bound Super Proxies

two types of bound proxies:
- instance-bound
- class-bound

### Class-bound proxy

`super(base-class, derived-class)`
- `base-class` is class object
- `derived-class` is subclass of first argument
- when invoking method on proxy...
    1. finds MRO for derived-class
    2. then finds base-class in that MRO
    3. takes everything **after** base-class in MRO and finds first class in _that_ sequence with matching method name

**Explanation using [`SortedList` example](#realistic-example-SortedList)

```python
>>> from sorted_list import *
>>> from pprint import pprint as pp
>>> pp(SortedIntList.mro())
#=> [
#=>     <class 'sorted_list.SortedIntList'>,
#=>     <class 'sorted_list.IntList'>,
#=>     <class 'sorted_list.SortedList'>,
#=>     <class 'sorted_list.SimpleList'>,
#=>     <class 'object'>,
#=> ]
>>> super(SortedList, SortedIntList)
#=> <super: <class 'SortedList'>, <SortedIntList object>>
#=> --------- NAME RESOLUTION ---------
#=> 1. gets MRO for 'SortedIntList'
#=> 2. finds 'SortedList' in that MRO
#=> 3. takes everything after 'SortedList', giving us an MRO of containing just 'SimpleList' and 'object'
#=> 4. finds first class in that smaller MRO which has an 'add' method
>>> super(SortedList, SortedIntList).add
#=> <function SimpleList.add at 0x10436a050>
>>> super(SortedList, SortedIntList).add(4)
#=> TypeError: add() missing 1 required positional argument: 'item'
#   ^^^^^^^^ raised because our proxy is bound to a class, not an instance
#
#   However, we could invoke the method with our proxy if it's a static method or class method, like so:
>>> super(SortedList, SortedIntList)._validate(5)
>>> super(SortedList, SortedIntList)._validate('hello')
#=> TypeError: IntList only supports integer values.
```

## Instance-bound proxy

`super(class, instance-of-class)`
- similar to class-bound proxies except that they are instead bound to an instance of a class
- `class` is class object
- `instance-of-class` must be instance of `class` or any class derived from it
- when invoking method on proxy...
    1. finds MRO for type of second argument
    2. then finds location of first argument in that MRO
    3. uses everything **after** location from step 2 for resolving methods

```python
>>> from sorted_list import *
>>> from pprint import pprint as pp
>>> pp(SortedIntList.mro())
#=> [
#=>     <class 'sorted_list.SortedIntList'>,
#=>     <class 'sorted_list.IntList'>,
#=>     <class 'sorted_list.SortedList'>,
#=>     <class 'sorted_list.SimpleList'>,
#=>     <class 'object'>,
#=> ]
>>> sil = SortedIntList([5, 15, 10])
>>> sil
#=> SortedIntList([5, 10, 15])
>>> super(SortedList, sil)
#=> <super: <class 'SortedList'>, <SortedIntList object>>
>>> super(SortedList, sil).add(6)
>>> sil
#=> SortedIntList([5, 10, 15, 6]) --- Not quite 🙃
```

## Calling `super()` Without Arguments

When calling `super()` without arguments, Python will sort out arguments for you
- in an **instance method**:
```
super(class-of-method, self)
```
- in a **class method**:
```
super(class-of-method, class)
```

## The `object` Class

- core of Python's **object model**
- **ultimate** base class of every class
- **automatically added** as base class of every class
