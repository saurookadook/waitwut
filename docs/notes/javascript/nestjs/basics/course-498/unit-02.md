---
title: 'Building a To-Do REST API with NestJS - Create a ToDo Item Provided from the Request Body'
date: '2025-04-13'
fullPath: '/notes/javascript/nestjs/basics/course-498/unit-02'
sectionSlug: 'notes'
---

## Creating new Todo Items in the Controller

```typescript
import { Body, Controller, Post } from '@nestjs/common';

import { CreateTodoDto, TodoDto } from './todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // ... Existing GET handlers

  @Post()
  create(
    // Decorate this data object with @Body() to declare that the data comes
    // from the HTTP body and not the URL
    @Body() todo: CreateTodoDto,
  ): TodoDto {
    return this.todoService.createTodo(todo);
  }
}
```

## Implementing the TodoService

```typescript
import { Injectable } from '@nestjs/common';

import { CreateTodoDto, TodoDto } from './todo.dto';

@Injectable()
export class TodoService {
  private todos: TodoDto[] = [];

  // ... existing fetch methods

  createTodo(todo: CreateTodoDto): TodoDto {
    // `CreateTodoDto` is a subset of the `TodoDto`. It only includes the title and
    // description so we need to populate the `id` and `completed` fields
    const newTodo = {
      id: global.crypto.randomUUID(),
      ...todo,
      completed: false,
    };

    this.todos.push(newTodo);

    return newTodo;
  }
}
```

## Creating Data Transfer Objects (DTOs)

```typescript
export class CreateTodoDto {
  readonly description: string;
  readonly title: string;
}

export class TodoDto extends CreateTodoDto {
  readonly id: ReturnType<typeof global.crypto.randomUUID>;
  readonly completed: boolean;
}
```
