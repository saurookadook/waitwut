---
title: 'TypeScript'
date: '2025-03-06'
fullPath: '/notes/javascript/typescript'
sectionSlug: 'notes'
---

# Overview

## Arrays

2 primary ways to declare types of arrays

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
