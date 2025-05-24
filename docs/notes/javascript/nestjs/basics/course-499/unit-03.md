---
title: 'Adding Enterprise Features to your NestJS App - Configuring a Middleware and adding Validation'
date: '2025-04-20'
fullPath: '/notes/javascript/nestjs/basics/course-499/unit-03'
sectionSlug: 'notes'
---

Middlewares play a crucial role in enterprise applications, providing functionalities like logging, authentication, and error handling.

Validation, on the other hand, ensures that the data sent to your application meets predefined criteria. This is crucial for maintaining data integrity and security. By validating data, you can prevent common vulnerabilities, such as SQL injection and XSS attacks, and ensure that your application behaves as expected regardless of the input it receives.

## Creating a Timer Middleware

```typescript
// app/src/middlewares/timer.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TimerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`${req.method} ${req.originalUrl} [${res.statusCode}] - ${duration}ms`);
    });

    next();
  }
}
```

## Integrating Middleware into a NestJS Application

```typescript
// app/src/app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TimerMiddleware } from './middlewares/timer.middleware';
import { TodoModule } from './todos/todo.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs-todo'),
    TodoModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TimerMiddleware).forRoutes('*');
  }
}
```

## Adding Validation to CreateTodoDto

Following examples use the `class-validator` package.

```typescript
// app/src/dtos/todo.dto.ts
import { IsNonEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsNonEmpty()
  @IsString()
  title: string;
}
```

## Use the ValidationPipe

```typescript
// app/src/todo/todo.controller.ts
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';

import { CreateTodoDto, TodoDto, UpdateTodoDto } from './dtos/todo.dto';
import { TodoService } from './todo.service';
import { transformTodoDto } from './utils';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // etc

  @Post()
  async createOne(
    // in this context, `ValidationPipe` automatically validates data from incoming
    // request against a `DTO` before it reaches controller method
    @Body(new ValidationPipe()) todo: CreateTodoDto
  ): Promise<TodoDto> {
    const newTodo = await this.todoService.createOne(todo);
    return transformTodoDto(newTodo);
  }

  // etc
}
```
