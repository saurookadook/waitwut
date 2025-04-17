---
title: 'Building a To-Do REST API with NestJS - Enhancing the API with Filters and Specific Modifiers'
date: '2025-04-13'
fullPath: '/notes/javascript/nestjs/basics/course-498/unit-04'
sectionSlug: 'notes'
---

## Adding Filters to the Todo API

### Updating `findAll` method in `TodoController`

```typescript
import { Controller, Get, Query } from '@nestjs/common';

import { TodoDto } from './dtos/todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(
    // Introduce query parameter called `showIncomplete`
    @Query('showIncomplete') showIncomplete: boolean,
  ): TodoDto[] {
    return this.todoService.findAll(showIncomplete);
  }

  // ... Existing GET, POST, PUT, and DELETE handlers
}
```

### Updating `findAll` method in `TodoService`

```typescript
import { Injectable } from '@nestjs/common';

import { TodoDto } from './dtos/todo.dto';

@Injectable()
export class TodoService {
  private todos: TodoDto[] = [];

  findAll(showIncomplete?: boolean): TodoDto[] {
    if (showIncomplete) {
      return this.todos.filter((todo) => !todo.completed);
    }

    return this.todos;
  }

  // ... Existing `findOne`, `create`, `update`, and `delete` methods
}
```

## Adding Specific Modifiers to the Todo API

- path parameters can be used to identify specific resources in an API _(e.g. `/todos/:id/complete`)_

### Adding `complete` method to `TodoController`

```typescript
import { Controller, Param, Put } from '@nestjs/common';

import { TodoDto } from './dtos/todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // ... Existing GET, POST, and PUT handlers

  @Put(':id/complete')
  findAll(@Param('id') id: string): TodoDto {
    return this.todoService.markTodoComplete(id);
  }

  // ... Existing DELETE handler
}
```

### Adding `complete` method to `TodoService`

```typescript
import { Injectable } from '@nestjs/common';

import { TodoDto } from './dtos/todo.dto';

@Injectable()
export class TodoService {
  private todos: TodoDto[] = [];

  // ... Existing `findOne`, `findAll`, `create`, `update`, and `delete` methods

  markTodoComplete(id: string): TodoDto | null {
    return this.updateTodo(id, { completed: true });
  }
}
```
