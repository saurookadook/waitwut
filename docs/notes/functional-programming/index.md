---
title: 'Functional Programming'
date: '2025-04-07'
fullPath: '/notes/functional-programming'
sectionSlug: 'notes'
---

## Programming Paradigms

- Imperative _(Procedural, Object-Oriented)_
  - focuses on "how"
  - states order in which operations occur

```javascript
for (let i = 0; i < courses.length; i++) {
    courses[i].lastModified = new Date();
}
```

- Declarative _(Functional, Mathematical, Reactive, etc.)_
  - focuses on "what"
  - does not state order in which to execute operations

```javascript
courses.map((course) => {
    course.lastModified = new Date();
    return course;
})
```

---

## What is Functional Programming?

- a programming paradigm
- style of building structure and elements of computer programs that treats computation as evaluation of mathematical functions
- avoids change-state and mutable data

_[Citation](https://en.wikipedia.org/wiki/Functional_programming)_

> &nbsp;
> Functional Programming is the process of building software by composing pure functions, avoiding shared state, mutable data, and side-effects.
> \- Eric Elliot
> > &nbsp;

### Key Principles

- focus on ensuring each function does one thing
- building functions for immutable variables _(e.g. data should not be mutated)_

```javascript
// Immutable Sort example
const initialArray = ['c', 'd', 'a', 'e', 'b'];
const sortedArray = sortFunction(initialArray);
// sortedArray = ['a', 'b', 'c', 'd', 'e']
// initialArray = ['c', 'd', 'a', 'e', 'b']
```

### Why Functional Programming?

- code is concise, predictable, and readable
- easier to test functional code
- results in fewer bugs
- modular code with smaller, independent units

| Functional Programming          | vs. | Object-Oriented Programming |
| :---                            | --- | :---                        |
| Function is main unit           |     | Object is primary unit      |
| Data is immutable               |     | Data is mutable             |
| Fewer data structures           |     | More data structures        |
| Functions with no side effects  |     | Methods with side effects   |

---

## First Class Functions

- **functions** in Functional Programming languages are treated as a data type and can be used like any other value

## Pure Functions

1. given same input, should always return same output
2. produces no side-effects

## Side Effects

- changing or mutating the input
- querying or updating the DOM object <!-- really...? -->
- making API calls via network _(fetch/xhr)_
- logging
- reading/writing to a file
- reading from global state

## Closure

- a **closure** gives you access to an outer function's scope from an inner function
- in JS, **closures** are created every time a function is created, at function creation time

_[Citation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)_

## Function Composition

- use of one function's result as argument to another
- can be composed of any number of functions

```txt
               _________   ________
              |         | |        |
              |         V |        V
[Input] -> [FuncA]    [FuncB]    [FuncB] -> [Output]
```

### Basic Syntax and Example

```javascript
// Syntax
function1(function2(value))


// Example
const compose = (f, g) => x => f(g(x));

const getAge = (user) => user.age;
const isAllowedAge = (age) => age >= 21;
const user = { name: "Adam", age: 25 };

const isUserAllowedToDrink = compose(isAllowedAge, getAge);
isUserAllowedToDrink(user); // true
```

### Why Function Composition?

- less code
- improves code readability
- creates chain of functions, and can easily remove link from chain
- frameworks like React use composition by wrapping a component around another component
