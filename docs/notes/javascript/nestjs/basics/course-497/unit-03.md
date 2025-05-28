---
title: 'NestJS Basics - Providers in NestJS'
date: '2025-04-06'
fullPath: '/notes/javascript/nestjs/basics/course-497/unit-03'
iconComponentName: 'nestjs_icon'
sectionSlug: 'notes'
---

## Introduction to Providers in NestJS

**Providers** are a fundamental building block in _NestJS_ applications. Understanding **providers** will help you build more modular, maintainable, and testable applications. There are many different kinds of **providers** in _NestJS_ but we're going to learn about **Services**. We'll be focusing on a `BookService` in this lesson which is responsible for providing `Book` data.

## What is a Service in NestJS?

In _NestJS_, a **Service** is a class that is decorated with the `@Injectable()` decorator. Services are used to encapsulate and manage business logic, data processing, and any other operations that are not directly tied to handling requests (which is the role of controllers). By separating business logic into services, you promote a clean architecture where concerns are properly separated, making your application more modular and easier to maintain.

## Understanding Dependency Injection

**Dependency Injection (DI)** is a pattern where an object receives its dependencies from an external source rather than creating them itself. This strategy makes it easier to manage and scale your application.

In _NestJS_, **DI** is built-in and allows you to inject services and other dependencies into your classes. This is done through the use of special decorators and the _NestJS_ **DI** container.

Imagine you have a coffee shop, and each coffee machine needs a supply of coffee beans. With **DI**, instead of each machine fetching its beans, a central service provides beans to all machines. This simplifies management and ensures each machine gets what it needs efficiently.

## Creating the BooksService as a Provider

The `BooksService` will provide methods to retrieve information about books.

```typescript
import { Injectable } from '@nestjs/common';
import { Book, books } from './books.data';

// This decorator indicates that the class can be managed by the _NestJS_ **DI** system.
@Injectable()
export class BooksService {
  getAllBooks(): Book[] {
    return books;
  }

  getOneBook(id: string): Book {
    return books.find((book) => book.id === id);
  }
}
```

## Using Providers in Controllers

```typescript
import { Controller, Get } from '@nestjs/common';
import { Book } from './books.data';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  // `BooksService` is injected into the controller via the constructor
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Book[] {
    return this.booksService.getAllBooks();
  }
}
```

## Organizing Providers and Controllers in Modules

To fully integrate `BooksService` and `BooksController` into our application, we need to declare them in a `BooksModule` module.

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

