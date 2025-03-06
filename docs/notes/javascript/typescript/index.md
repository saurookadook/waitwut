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
