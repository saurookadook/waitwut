---
title: 'NestJS Basics - Generating Components Using the CLI'
date: '2025-04-06'
fullPath: '/notes/javascript/nestjs/basics/course-497/unit-05'
iconComponentName: 'nestjs_icon'
sectionSlug: 'notes'
---

## Introduction to NestJS CLI

- [NestJS CLI Docs](https://docs.nestjs.com/cli/overview)
- some common commands
  - `nest g module [name]`: generates new module
  - `nest g controller [name]`: generates new controller
  - `nest g service [name]`: generates new service

The following sections will assume this directory structure:

```diff
app
|-- src/
|---- app.controller.ts
|---- app.module.ts
|---- app.service.ts
|---- main.ts
|-- package.json
|-- tsconfig.json
|-- <other setup files>
```

## Generate A Module

Running this command from the root `app` directory

```sh
nest g module books
```

will result in the following:

```diff
app
|-- src/
+ |---- books/
+ |------ books.module.ts
|---- app.controller.ts
+ |---- app.module.ts <-- will add BooksModule to AppModule as import
|---- app.service.ts
|---- main.ts
|-- package.json
|-- tsconfig.json
|-- <other setup files>
```

## Generate A Controller

Running this command from the root `app` directory

```sh
nest g controller books
```

will result in the following:

```diff
app
|-- src/
|---- books/
+ |------ books.controller.ts
+ |------ books.module.ts <-- will add BooksController to BooksModule configuration
|---- app.controller.ts
|---- app.module.ts
|---- app.service.ts
|---- main.ts
|-- package.json
|-- tsconfig.json
|-- <other setup files>
```

## Generate A Service

Running this command from the root `app` directory

```sh
nest g service books
```

will result in the following:

```diff
app
|-- src/
|---- books/
|------ books.controller.ts
+ |------ books.module.ts <-- will add BooksService to BooksModule configuration
+ |------ books.service.ts
|---- app.controller.ts
|---- app.module.ts
|---- app.service.ts
|---- main.ts
|-- package.json
|-- tsconfig.json
|-- <other setup files>
```

## Generated Files

### `books.module.ts`

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

### `books.controller.ts`

```typescript
import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {}
```

### `books.service.ts`

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  findAll(): string {}
}
```

### `app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';

@Module({
  imports: [BooksModule], // this was added `nest g module books` command
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
