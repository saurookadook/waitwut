---
title: 'TypeScript'
date: '2025-03-06'
fullPath: '/notes/javascript/typescript'
iconComponentName: "typescript_icon"
sectionSlug: 'notes'
---

# Overview

- [Arrays](#arrays)
- [Type Narrowing](#type-narrowing)
- [Functions](#functions)
- [Interfaces](#interfaces)
- [Classes](#classes)
- [Modules](#modules)
- [Generics](#generics)
- [Type Declaration Files](#type-declaration-files)
- [Decorators](#decorators)

## Arrays

- 2 primary ways to declare types of arrays

```typescript
const strArray1: string[] = ['here', 'are', 'strings'];

const strArray2: Array<string> = ['more', 'strings', 'here'];
```

## Type Narrowing

```typescript
function getReview(title: string): string | number {
    if (title === 'A New Hope') {
        return 'An instant classic!';
    }
    else {
        return Math.floor(Math.random() * 10);
    }
}

const movieTitle: string = 'A New Hope';

const movieReview: string | number = getReview(movieTitle);

console.log(`Movie title: ${movieTitle}`);

if (typeof movieReview === 'string') {
    /**
     *  The type hint will show that the compiler has narrowed the type of `movieReview` to be
     *  a `string` based on the `if` condition
     */
    console.log(`Review: ${movieReview}`);
}
else {
    /**
     *  The type hint will show that the compiler has narrowed the type of `movieReview` to be
     *  a `number` since that's the only logical possibility when considering the `if` condition.
     */
    console.log(`Review: ${movieReview}`);
}

```

---

## Functions

### Adding Type Annotations

```typescript
function simpleExample(score: number, message: string): string {
    return `Score: ${score}\nAdditional feedback: ${message}`;
}
```

### Options Parameters

- denoted with `?` after parameter name
- must appear after all required parameters

```typescript
function createCustomer(name: string, age?: number) { }
```

### Default Parameters

- may be set to a literal value or an expression

```typescript
function getBookByTitle(title: string = 'The C Programming Language') { }

function getBookByTitle(title: string = getMostPopularBook()) { }
```

### Rest Parameters

- collects group of parameters into a **single array**

```typescript
function getBooksReadForCustomer(name: string, ...bookIDs: number[]) { }

let booksForLeigh = getBooksReadForCustomer('Leigh', 2, 5);

let booksForDaniel = getBooksReadForCustomer('Daniel', 2, 5, 12, 42);

```

### Function Overloads

- one symbol name
- multiple function types
- one implementation with type guards

```typescript
function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(bookProperty: string | boolean): string[] {
    let foundTitles: string[] = [];

    if (typeof bookProperty === 'string') {
        // get books by author, add to foundTitles
    }
    else if (typeof bookProperty === 'boolean') {
        // get books by availability, add to foundTitles
    }

    return foundTitles;
}

```

### Function Types

- [docs](https://www.typescriptlang.org/docs/handbook/2/functions.html)

```typescript
type ReleaseFunc = (someYear: number) => string;

function ReleaseMessage(year: number): string {
    return 'Year released: ' + year;
}

let releaseFunc: ReleaseFunc = ReleaseMessage;

let message: string = releaseFunc(2024);
```


> **NOTE**: The below method of creating function types is [considered deprecated](https://www.typescriptlang.org/docs/handbook/functions.html).

- combination of parameter types and return type
- variables may be declared with function types
- function assigned must have same signature as variable type

```typescript
function ReleaseMessage(year: number): string {
    return 'Year released: ' + year;
}

let releaseFunc: (someYear: number) => string;

releaseFunc = ReleaseMessage;

let message: string = releaseFunc(2024);

```

### Misc

- function that throws an error can have inferred return type of `never`

---

## Interfaces

- contracts that define types
- compiler enforces contract via type checking
- collection of property and method definitions
- [duck typing](https://en.wikipedia.org/wiki/Duck_typing#:~:text=If%20it%20walks%20like%20a%20duck%20and%20it%20quacks%20like%20a%20duck,%20then%20it%20must%20be%20a%20duck)

```typescript
interface Duck {
    color?: string;
    quack: () => void;
    swim: () => void;
    walk: () => void;
}

const probablyADuck = {
    quack: () => console.log('quacking like a duck'),
    swim: () => console.log('swiming like a duck'),
    walk: () => console.log('walking like a duck'),
}

function FlyOverWater(bird: Duck) { }

FlyOverWater(probablyADuck);
```

### Interfaces For Functions

```typescript
function createMovieID(name: string, id: number): string {
    return name + id;
}

interface IDBuilder {
    (str: string, int: number): string;
}

const idBuilder: IDBuilder = createMovieID;

/* As a property in another interface */
interface Movie {
    title: string;
    director: string;
    yearReleased: number;
    streaming: boolean;
    length?: number;
    logReview?: ReviewLogger;
}

interface ReviewLogger {
    (review: string): void;
}
```

### Extending Interfaces

```typescript
interface LibraryResource {
    catalogNumber: number;
}

interface Book {
    title: string;
}

interface Encyclopedia extends LibraryResource, Book {
    volume: number;
}

```

### Interfaces with Classes

```typescript
interface Librarian {
    doWork: () => void;
}

class ElementarySchoolLibrarian implements Librarian {
    doWork() {
        console.log('Reading to and teaching children...');
    }
}

```

---

## Classes

### Parameter Properties

```typescript
class Author {
    name: string;

    constructor(authorName: string) {
        this.name = authorName;
    }
}

/* Identical functionality to above */
class Author {
    constructor(public name: string) { }
}

```

### Abstract Classes

- created with `abstract` keyword
- base classes that may not be instantiated directly
- may contain implementation details
- abstract methods are _**not**_ implemented

```typescript
abstract class Video {

    private _producer: string = '';

    constructor(public title: string, protected year: number) {
        console.log('Creating a new Video...');
    }

    get producer(): string {
        return this._producer.toUpperCase();
    }

    set producer(newProducer: string) {
        this._producer = newProducer;
    }

    abstract printCredits(): void;
}

class Documentary extends Video {
    constructor(docTitle: string, docYear: number, public subject: string) {
        super(docTitle, docYear);
    }

    printCredits(): void {
        console.log(`Producer: ${this.producer}`);
    }
}
```

### Class Expressions

- [ES6 feature](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class) supported by TypeScript
- class expressions can be used anywhere a class definition is expected

```typescript
abstract class Video {

    private _producer: string = '';

    constructor(public title: string, protected year: number) {
        console.log('Creating a new Video...');
    }

    get producer(): string {
        return this._producer.toUpperCase();
    }

    set producer(newProducer: string) {
        this._producer = newProducer;
    }

    abstract printCredits(): void;
}

const Musical = class extends Video {
    printCredits(): void {
        console.log(`Musical credits: ${this.producer}`);
    }
}

const myMusical = new Musical('Grease', 1978);
myMusical.producer = 'Sing-Song Pictures';
myMusical.printCredits();

/* Just to show what's possible :] */
class Course extends class { title: string = ''; } {
    subject: string = '';
}

```

## Modules

### Module Resolution Strategies

- TypeScript compiler uses strategy specified by `"moduleResolution"` property
  - as of 03/07/2025, the two available optiosn are `"Classic" | "Node"`
- See [docs for more info](https://www.typescriptlang.org/docs/handbook/modules/theory.html#module-resolution)

|                                   Classic                                   |                                   Node                                   |
| :---                                                                        | :---                                                                     |
| Defalut when emitting `"AMD"`, `"UMD"`, `"System"`, or `"ES2015"` modules.  | Default when emitting `"CommonJS"` modules                               |
| Simple - compiler traverses directories looking for right module. If relative reference, exact module location provided as part of import statement. If non-relative reference, compiler walks up directory tree looking for module starting in location of importing file | Closely mirrors Node module resolution - For relative references, compiler looks for file or directory with name specified on import statement. For non-relative references, walks up directory tree looking for folder named `node_modules` and will try to locate module there. |
| Less configurable                                                           | More configurable                                                        |

---

## Generics

### What are generics?

- code that works with multiple types
- accepts "type parameters" for each instance of invocation
- can be applied to functions, interfaces, and classes

### What are type parameters?

- specify the type a generic will operate over
- listed separate from function parameters inside angle brackets
- conventionally represented by letter `T` _(e.g. `Array<T>`)_
- actual type provided at instance creation or function invocation

### Using `Array` generic

```typescript
let poetryBooks: Book[];

let fictionBooks: Array<Book>;

const historyBooks = new Array<Book>(5);

```

### Generic Functions

```typescript
function logAndReturn<T>(thing: T): T {
    console.log(`The Thing: ${thing}`);
    return thing;
}

const someString: string = logAndReturn<string>('log this');

const someBool: boolean = logAndReturn<boolean>(true);

```

### Generic Interfaces

```typescript
interface Inventory<T> {
    getNewestItem: () => T;
    addItem: (newItem: T) => void;
    getAllItems: () => Array<T>;
}

let bookInventory: Inventory<Book>;
const allBooks: Array<Book> = bookInventory.getAllItems();

```

### Generic Classes

```typescript
class Catalog<T> implements Inventory<T> {
    private catalogItems = new Array<T>();

    addItem(newItem: T) {
        this.catalogItems.push(newItem);
    }

    // implement other interface methods here
}

const bookCatalog = new Catalog<Book>();

```

### Generic Constraints

- describes types that may be passed as generic parameter
- constraint is applied through use of `extends` keyword
- only types satisfying constraint may be used

```typescript
interface CatalogItem {
    catalogNumber: number;
}

class Catalog<T extends CatalogItem> implements Inventory<T> {
    // implement interface methods here
}

```

---

## Type Declaration Files

### What are Type Declaration Files

- sometimes serve as TypeScript wrapper for JavaScript libraries
- include
  - types for variables, functions, etc.
  - define valid property names
  - define function paramters
  - and more
- development-time tool
- filenames end with `.d.ts`
- available for thousands of libraries

### Where to find declaration files?

- sometimes included with libraries
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
  - GitHub repo containing thousands of type declaration files
  - declaration files often maintained independently of related JavaScript library
  - source for installation utilities

---

## Decorators

- function that is applied to other code
- form of [metaprogramming](https://en.wikipedia.org/wiki/Metaprogramming#:~:text=Metaprogramming%20is%20a%20computer%20programming,even%20modify%20itself%2C%20while%20running.)
- similar to attributes in C# and annotations in Java
- may be applied to...
  - classes
  - methods
  - properties
  - fields
  - getters/setters

```typescript
function logMethodInfo(originalMethod: any, _context: ClassMethodDecoratorContext) {
    return function replacementMethod(this: any, ...args: any[]) {
        console.log(`Decorated construct: ${_context.kind}`);
        console.log(`Decorated construct name: ${_context.name as string}`);

        const result = originalMethod.call(this, ...args);
        return result
    }
}

class Documentary extends Video {
    constructor(docTitle: string, docYear: number, public subject: string) {
        super(docTitle, docYear);
    }

    @logMethodInfo
    printItem(): void {
        super.printItem();
        console.log(`Subject: ${this.subject} (${this.year})`);
    }

    printCredits(): void {
        console.log(`Producer: ${this.producer}`);
    }
}
```
