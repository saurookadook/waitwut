---
title: 'NestJS Basics - Controllers in NestJS'
date: '2025-04-06'
fullPath: '/notes/javascript/nestjs/basics/course-497/unit-02'
sectionSlug: 'notes'
---

## What is a Controller?

Controllers in _NestJS_ are responsible for handling incoming requests, processing them, and returning responses to the caller. They act as the entry point for the application. By using decorators (such as `@Controller()` and `@Get()`), controllers map specific routes to methods within the controller, enabling clear and structured handling of various endpoints. This organized approach simplifies the development and maintenance of web applications by centralizing the logic for request handling.

Here is an exmaple of what a Controller for a feature might look like. Whenever you make a request to `/books`, you will receive one book back in JSON form:

```typescript
@Controller('books')
export class BooksController {

  @Get()
  findAll(): Book[] {
    return [
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
      },
    ];
  }
}
```

## Understanding Decorators

`@Controller()` and `@Get()` are examples of **decorators**. In simple terms, **decorators** are special markers that can be attached to classes, methods, or other elements in your code to give them additional functionality.

Decorators help keep the code clean and readable by clearly indicating what each part of your code is supposed to do.

In _NestJS_, they also...

- make it easier to define routes
- handle requests
- apply custom logic in a consistent way

The `@Controller('books')` decorator tells _NestJS_ that this class is a controller and that it handles routes starting with `/books`. The `@Get()` decorator maps the `/books` route to the `findAll()` method, which in this case returns a single book.
