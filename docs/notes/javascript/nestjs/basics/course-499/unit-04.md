---
title: 'Adding Enterprise Features to your NestJS App - Error Handling'
date: '2025-05-04'
fullPath: '/notes/javascript/nestjs/basics/course-499/unit-04'
sectionSlug: 'notes'
---

## Setting Up Error Handling in NestJS

To handle errors effectively, NestJS provides a powerful mechanism called **Exception Filters**. These filters allow you to manage exceptions and provide custom error responses.

### Creating an Exception Filter

**Exception Filters** in NestJS allow you to catch unhandled exceptions in your application and modify the response that users receive.

<figure>

```ts
// src/filters/http-exception.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse = {
      path: request.url,
      statusCode: status,
      timestamp: new Date().toISOString(),
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      response.status(status).json(errorResponse);
    } else if (
      status <= HttpStatus.BAD_REQUEST
      && status < HttpStatus.INTERNAL_SERVER_ERROR
    ) {
      response.status(status).json({
        ...errorResponse,
        message: exception.message
      })
    } else {
      // maybe add some other context...?
      response.status(status).json({
        ...errorResponse,
        message: exception.message
      }
    }
  }
}
```

<figcaption>`HttpExceptionFilter` is a simple example of an Exception Filter</figcaption>
</figure>

### Integrating Exception Filter in App


<figure>

```ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TimerMiddleware } from './middlewares/timer.middleware';
import { ValidationMiddleware } from './middlewares/validation.middleware';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-todo'),
    TodoModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TimerMiddleware).forRoutes('*')
  }
}
```

<figcaption>Integrating the `HttpExceptionFilter` into the main App module</figcaption>
</figure>

### Sample Code to Simulate Various Errors

```ts
// send_request.ts
import axios from 'axios';

async function createTodo() {
  try {
    const response = await axios.post('http://localhost:3000/todos', {
      title: 'Learn NestJS',
      description: 'Explore the basics of NestJS',
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(`HTTP ${error.response.status}: `, error.response.data);
    }
  }
}

async function createInvalidTodo() {
  try {
    await axios.post('http://localhost:3000/todos', {
      title: '' // Invalid title
    });
  } catch (error) {
    if (error.response) {
      console.log(`HTTP ${error.response.status}: `, error.response.data);
    }
  }
}

async function simulateInternalServerError() {
  try {
    await axios.get('http://localhost:3000/error');
  } catch (error) {
    if (error.response) {
      console.log(`HTTP ${error.response.status}: `, error.response.data);
    }
  }
}

async function getTodos() {
  const response = await axios.get('http://localhost:3000/todos');
  console.log('Todos: ', response.data);
}

async function run() {
  try {
    console.log('Running database migration');
    execSync('npm run typeorm migration:run');

    console.log('Creating a valid todo');
    await createTodo();

    console.log('Creating an invalid todo');
    await createInvalidTodo();

    console.log('Simulating internal server error');
    await simulateInternalServerError();

    console.log('Getting all todos');
    await getTodos();
  } catch (error) {
    console.error('Error during run: ', error.message);
  }
}

run();
```
