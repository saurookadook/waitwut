---
title: 'TypeScript Language Best Practices'
date: '2025-03-12'
fullPath: '/notes/javascript/typescript/best-practices/language'
iconComponentName: "typescript_icon"
sectionSlug: 'notes'
---

## Overview

- [Avoid using `any` type](#avoid-using-any-type)
- [Handle `null` \& `undefined` Safely](#handle-null--undefined-safely)
- [Avoid Excessive Annotation](#avoid-excessive-annotation)
- [Utilize Intersection Types](#utilize-intersection-types)
- [Use Enums](#use-enums)
- [Using Tuples for Fixed-length Arrays](#using-tuples-for-fixed-length-arrays)
- [Use `ReadOnly` and `ReadOnlyArray` Types](#use-readonly-and-readonlyarray-types)
- [Use the Polymorphic This](#use-the-polymorphic-this)
- [Favor Type-guards over Type Assertion](#favor-type-guards-over-type-assertion)
- [Make Switch Statements Exhaustive](#make-switch-statements-exhaustive)
- [Use Utility Types](#use-utility-types)
- [Use Generics](#use-generics)
- [Use Conditional Types](#use-conditional-types)
- [Use Decorators](#use-decorators)

---

### Avoid using `any` type

Pretty straightforward - `any` effectively disables type checking 🙂

### Handle `null` & `undefined` Safely

- use union type to specify if variables could be `null` and/or `undefined`

  ```typescript
  let e: string | undefined | null;
  ```

- `undefined` type is sometimes inferred _(such as for optional parameters)_

  ```typescript
  function echo(param?: string) { // <- type will be `string | undefined`
      return param;
  }
  ```

- use non-strict equality check to test for `null` _**and**_ `undefined`

  ```typescript
  function echo(param?: string): string {
      if (param != null) return param;
      return '';
  }
  ```

### Avoid Excessive Annotation

- should try to utilize the TypeScript compiler's ability to infer types

```typescript
const arr: string[] = ['a', 'b'];

arr.forEach((str: string) => { // <- could annotate callback parameter
    // do something with str...
});

arr.forEach((str) => { // <- still get full type-safety without annotation
    // do something with str...
});
```

### Utilize Intersection Types

- allow us to create new types by combining existing ones
  - helps us avid type proliferation
  - instead of wide range of similar types, can use small set of base types and intersections

```typescript
interface Product {
    sku: string;
    description: string;
}

interface Shippable {
    destination: string;
    weight: string;
}

type ShippableProduct = Product & Shippable; // <- name is intersection of names of types

let myProduct: ShippableProduct = {
    sku: 'abc',
    description: 'a product',
    destination: 'somewhere',
    weight: '1kg',
};

```

> **NOTE**: conflicting sub-types will result in `never`

```typescript
interface Product {
    sku: string;
    description: string;
}

interface Shippable {
    destination: string;
    weight: string;
}

interface Returnable {
    returnId: string;
    weight: number; // <- this conflicts with `weight: string` from `Shippable`!
}

type ShippableReturnableProduct = Product & Shippable & Returnable; // <- TypeScript will let us create this union without any warnings

let product1: ShippableReturnableProduct = {
    sku: '123abc',
    description: '',
    destination: '',
    returnId: 'abc123',
    weight: '1kg', // <- will throw "Error: type 'string' is not assignable to type 'never'."
}

```

### Use Enums

- represent series of named values
- uniquely, they survive compilation process and remain in compiled JavaScript

```typescript
// Numeric enum with auto-initializing zero-based indices
enum Days {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
}

// Numeric enum with explicitly assigned indices
enum Days {
    Monday = 0,
    Tuesday = 1,
    Wednesday = 2,
    Thursday = 3,
    Friday = 4,
    Saturday = 5,
    Sunday = 6,
}

// String enum
enum Days {
    Monday = 'monday',
    Tuesday = 'tuesday',
    Wednesday = 'wednesday',
    Thursday = 'thursday',
    Friday = 'friday',
    Saturday = 'saturday',
    Sunday = 'sunday',
}

```

Enums similar in some ways to union types and can sometimes be used in similar contexts

```typescript
type Strs = 'a' | 'b' | 'c';

enum Str {
    A = 'a',
    B = 'b',
    C = 'c',
}

// Example 1
type Strs = 'a' | 'b' | 'c';

function checkString(str: Strs) {
    switch (str) {
        case 'a':
            // etc
    }
}

// Example 2
enum Str {
    A = 'a',
    B = 'b',
    C = 'c',
}

function checkString(str: Str) {
    switch (str) {
        case Str.A:
            // etc
    }
}
```

### Using Tuples for Fixed-length Arrays

**Tuples** are fixed-length arrays, where each element has specific type

```typescript
type Coords = [number, number];

type CoordsAndName = [
    number,
    number,
    string,
];

// Can label elements in tuple to better communicate meaning of each element
type Coords = [
    latitude: number,
    longitude: number,
];

```

### Use `readonly` and `ReadonlyArray` Types

Since class properties/objects/arrays are **mutable** by default, can use `readonly` and `ReadonlyArray` types to specify whether certain things should be **immutable**.

- Class properties should be `readonly` if they do not need to change after initialization

  ```typescript
  class Todo {
      constructor(
          public title: string,
          public completed: boolean,
          public readonly id: string
      ) {
          this.id = crypto.randomUUID();
      }

      public updateCompleted(status: boolean) {
          this.completed = status;
      }
  }

  ```

- can use `readonly` modifier _(or `ReadonlyArray` generic type)_ to make arrays **immutable**

  ```typescript
  const immutable: readonly number[] = [1, 2, 3];

  const immutable: ReadonlyArray<number> = [1, 2, 3];

  ```

### Use the Polymorphic `this`

#### Fluent API

- chain methods together
- popularized by jQuery
- see:
  - [Fluent interface](https://en.wikipedia.org/wiki/Fluent_interface)
  - [Fluent API: Practice and Theory](https://blog.sigplan.org/2021/03/02/fluent-api-practice-and-theory/)

#### Polymorphic `this`

- `this` object can refer to different things in different contexts
- don't need to do anything special to make `this` polymorphic

```typescript
class Calculator {
    private result: number = 0;

    public add(num: number): this {
        this.result += num;
        return this;
    }

    public subtract(num: number): this {
        this.result -= num;
        return this;
    }

    public multiply(num: number): this {
        this.result *= num;
        return this;
    }

    public divide(num: number): this {
        this.result /= num;
        return this;
    }

    public reportResult(num: number): number {
        return this.result;
    }
}

```

### Favor Type-guards over Type Assertion

- **type assertion** tells TypeScript to treat value as if it were a specific type

  ```typescript
  class SpecificConfig {
      // ...
  }

  const config = state.someConfig as SpecificConfig;
  ```

- **type-guards** offer way to protect against bugs that could be introduced by type assertions

  ```typescript
  class SpecificConfig {
      // ...
  }

  function isSpecificType(config: any): config is SpecificConfig {
      return config instanceof SpecificConfig;
  }

  ```

### Make Switch Statements Exhaustive

- by "exhaustive", we mean "check every possible value of variable being switched on"
- can utilize `default` case to handle scenarios that can/should _**never**_ happen

```typescript
enum Themes {
    regular = 'regular',
    dark = 'dark',
    highContrast = 'highcontrast',
};

const unhandled = (_: never): never => _;

function switchTheme(theme: Themes) {
    switch (theme) {
        case Themes.regular:
            // handle regular theme
            break;
        case Themes.dark:
            // handle dark theme
            break;
        default:
            /**
             *~ This will throw a compiler error that "Argument of type 'Themes' is
             *~ not assignable to parameter of type 'never'.
             *~ Additionally in your IDE, the type hint will specifically draw attention
             *~ to the unused property from the `Themes` enum, in this case:
             *~ `(parameter) theme: Themes.highContrast`
             */
            return unhandled(theme);
    }
}

```

### Use Utility Types

- such as `Partial`, `Required`, `Record`, `Pick`, `Omit`, etc.
  - _for a full list, see [the doc page on Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)_

### Use Generics

- types that take other types as parameters
  - _for more info, see [the doc page on Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)_

### Use Conditional Types

- basically ternary statements for types
  - _for more info, see [the doc page on Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)_

```typescript
type NewType = TestType extends ReferenceType ? OutputTypeA : OutputTypeB;
/**
 *~ If `TestType` is assignable to `ReferenceType`
 *~   evaluates as `OutputTypeA`
 *~ Else
 *~   evaluates as `OutputTypeB`
 */

/*------------- Practical example -------------*/
/* Before refactor */
type Log =
    | { type: 'INFO'; message: string; }
    | { type: 'ERROR'; message: string; error: Error; };

function logIt(log: Log): void {
    switch (log.type) {
        case 'INFO':
            console.log(log.message);
            break;
        case 'ERROR':
            console.log(log.message, log.error.stack);
    }
}

logIt({ type: 'INFO', message: 'I love lamp' });

/* After refactor */
type Log =
    | { type: 'INFO'; message: string; }
    | { type: 'ERROR'; message: string; error: Error; };

type LogType = Log['type'];
type ExtractNonTypeParams<L, T> = L extends { type: T } ? Omit<L, 'type'> : never;

function logIt<T extends LogType>(
    logType: T,
    args: ExtractNonTypeParams<Log, T>
): void {
    switch (logType) {
        case 'INFO':
            console.log(args.message);
            break;
        case 'ERROR':
            console.log(args.message, (args as ExtractNonTypeParams<Log, "ERROR">).error.stack);
    }
}
```

### Use Decorators

- allow us to modify behavior of class without changing class itself
- TypeScript <5 used different spec _(stage 2)_
  - requires enabling with `experimentalDecorators` option
- TypeScript >5 aligns with ECMA spec _(stage 3)_
- references:
  - _[Stage 2 decorators (TS<5)](https://www.typescriptlang.org/docs/handbook/decorators.html)_
  - _[Stage 3 decorators (TS>5)](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators)_

```typescript
function instrument<T extends { new (...args: any[]): object }>(target: T) {
    const originalConstructor = target.prototype.constructor;

    for (const key of Object.getOwnPropertyNames(originalConstructor.prototype)) {
        const descriptor = Object.getOwnPropertyDescriptor(originalConstructor.prototype, key);

        if (descriptor != null && typeof descriptor.value === 'function') {
            const originalFunction = descriptor.value;

            descriptor.value = function(...args: any[]) {
                console.log(`Calling method '${key}' with arguments: ${args.join(', ')}`);
                const result = originalFunction.apply(this, args);

                if (result != null) {
                    console.log(`Method '${key}' returned: ${result}`);
                }

                return result;
            };

            Object.defineProperty(originalConstructor, key, descriptor);
        }

    }
}

@instrument
class Todo {
    // ...
}

```

Simple examples from [TypeScript 5.0 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators)

```typescript
function bound(originalMethod: any, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name);

  if (context.private) {
    throw new Error(`'bound' cannot decorate private properties like ${methodName}.`);
  }

  context.addInitializer(function() {
    this[methodName] = this[methodName].bind(this);
  })
}

function loggedMethod(headMessage = "LOG") {
  return function actualDecorator(originalMethod: any, context: ClassMethodDecoratorContext) {
    const methodName = String(context.name);

    function replacementMethod(this: any, ...args: any[]) {
      console.log(`${headMessage}: Entering method '${methodName}'.`);
      const result = originalMethod.call(this, ...args);
      console.log(`${headMessage}: Exiting method '${methodName}'.`);
      return result;
    }

    return replacementMethod;
  }
}

class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    @bound
    @loggedMethod()
    greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }

    @loggedMethod("⚠️")
    special() {
      console.log(`SO SPECIAL!`)
    }
}

const p = new Person("Ron");
p.greet();

// Output:
//
//   LOG: Entering method 'greet'.
//   Hello, my name is Ron.
//   LOG: Exiting method 'greet'.

const greet = p.greet;
// Works!
greet();

/**
 * NOTE: without the `bound` decorator, the above would break unless 1 of the following 2 changes was made
 */
class Person_1 {
    name: string;
    constructor(name: string) {
        this.name = name;

        this.greet = this.greet.bind(this);
    }

    @loggedMethod
    greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

class Person_2 {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    @loggedMethod
    greet = () => {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

```

#### Writing Well-Typed Decorators

```typescript
function loggedMethod<This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
  const methodName = String(context.name);

  function replacementMethod(this: This, ...args: Args): Return {
    console.log(`LOG: Entering method '${methodName}'.`);
    const result = target.call(this, ...args);
    console.log(`LOG: Exiting method '${methodName}'.`);
    return result;
  }

  return replacementMethod;
}
```
