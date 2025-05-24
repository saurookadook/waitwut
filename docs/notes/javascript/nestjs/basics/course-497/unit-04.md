---
title: 'NestJS Basics - Modules in NestJS'
date: '2025-04-06'
fullPath: '/notes/javascript/nestjs/basics/course-497/unit-04'
sectionSlug: 'notes'
---

## Introduction to Modules in NestJS

In _NestJS_, **Modules** help structure the application, making it organized, scalable, and maintainable.

## Understanding Dependency Injection and the Purpose of Modules

**Dependency Injection (DI)** is a design pattern used to implement **IoC** _(Inversion of Control)_, allowing dependencies to be injected into a class rather than the class creating them itself. This improves code modularity and ease of testing.

In _NestJS_, **DI** is implemented through the use of decorators like `@Injectable()` and types that indicate what should be injected. Modules in _NestJS_ group related components, like services and controllers, together. This modular approach keeps your code organized and helps manage dependencies effectively.

## Creating a Basic NestJS Module

- defined using `@Module()` decorator which takes metadata object
- metadata object typically includes arrays of **providers**, **controllers**, and other imported **modules**

```typescript
import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
```

### Implementing the Book Ratings Service

```typescript
import { Injectable } from '@nestjs/common';

const ratings = {
  '6abc1421-843f-4eb2-8693-5c1a319f1976': 4,
  'ac4ab8e0-29d6-4b47-bf6e-6737e1e8115b': 5,
  'cb4fce20-c17e-4ebb-ae27-cb04af5b530f': 3,
};

@Injectable()
export class BookRatingsService {
  getRatingForBook(id: string): number {
    return ratings[id] ?? 0;
  }
}
```

### Integrating Book Ratings with the Books Service

```typescript
import { Injectable } from '@nestjs/common';
import { BookRatingsService } from './bookRatings.service';
import { Book, books } from './books.data';

@Injectable()
export class BooksService {
  constructor(private readonly bookRatingsService: BookRatingsService) {}

  getAllBooks(): Book[] {
    return books.map((book) => ({
      ...book,
      rating: this.bookRatingsService.getRatingForBook(book.id),
    }))
  }
}
```

### Configuring the Books Module

By registering both `BooksService` and `BookRatingsService` in the `BooksModule`, you can group related services that handle book-related logic together.

**Modules** defined in this way can be reused in different parts of a _NestJS_ application. For example, if you later need to build an `AuthorsModule`, it could follow the same structure, allowing you to build a highly modular and maintainable system.

```typescript
import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookRatingsService } from './bookRatings.service';

@Module({
  controllers: [BooksController],
  providers: [
    BooksService,
    BookRatingsService,
  ]
})
export class BooksModule {}
```

### Integration into the Main Application

By integrating the `BooksModule` into the main `AppModule`, the `BooksModule` is now a part of the overall application.

- existing top-level `AppModule` continues to serve its initial purpose
- now also including everything in the `BooksModule` so both sets of routes are exposed
- any endpoints defined in `BooksController` will be accessible alongside any other routes defined in the `AppController` or any other modules that might be added in the future

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';

@Module({
  imports: [BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
