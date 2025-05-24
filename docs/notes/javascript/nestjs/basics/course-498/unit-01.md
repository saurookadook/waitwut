---
title: 'Building a To-Do REST API with NestJS - Set Up GET Queries'
date: '2025-04-12'
fullPath: '/notes/javascript/nestjs/basics/course-498/unit-01'
iconComponentName: 'nestjs_icon'
sectionSlug: 'notes'
---

## Creating the TodoController

- controllers handle incoming requests and return responses to client

```typescript
import { Controller, Get, Param } from '@nestjs/common';

import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): TodoDto[] {
    return this.todoService.findAll();
  }

  // Extend the /todos route to GET a single Todo via the /todos/:id route
  @Get(':id')
  findOne(
    // Use the @Param('id') decorator to decoare that the `:id` in the route will
    // map to the `id` parameter
    @Param('id') id: string,
  ): TodoDto {
    return this.todoService.findOne(id);
  }
}
```

## Creating the TodoService

```typescript
import { Injectable } from '@nestjs/common';

import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodoService {
  // temp data
  private todos: TodoDto[] = [
    {
      id: '1',
      title: 'Learn NestJS',
      description: 'Learn how to build with NestJS',
      completed: true,
    },
    {
      id: '2',
      title: 'Learn REST',
      description: 'Learn how to build interactive REST APIs',
      completed: false,
    },
  ];

  findAll(showIncomplete?: boolean): TodoDto[] {
    return this.todos;
  }

  fetchOne(id: string): TodoDto | null {
    return this.todos.find((todo) => todo.id === id) || null;
  }
}
```

## Connecting the Controller and Service

- In `TodoController`, we inject `TodoService` through the constructor using **Dependency Injection**.
- In the `findAll` method of `TodoController`, we call `this.todoService.findAll()` to fetch all To-Dos.
- In the `findOne` method of `TodoController`, we call `this.todoService.findOne(id)` to fetch a specific To-Do by ID.
