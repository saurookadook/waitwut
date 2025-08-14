---
title: 'Building a To-Do REST API with NestJS - Implementing Update and Delete Handlers'
date: '2025-04-13'
fullPath: '/notes/javascript/nestjs/basics/course-498/unit-03'
iconComponentName: 'nestjs_icon'
sectionSlug: 'notes'
---

## Adding PUT and DELETE to the TodoController

```typescript
import { Body, Controller, Delete, Param, Put } from '@nestjs/common';

import { UpdateTodoDto } from './dtos/todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // ... Existing GET and POST handlers

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() todo: UpdateTodoDto,
  ) {
    return this.todoService.updateTodo(id, todo);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.todoService.deleteTodo(id);
  }
}
```

## Adding edit and delete to the TodoService

```typescript
import { Injectable } from '@nestjs/common';

import { UpdateTodoDto } from './dtos/todo.dto';

@Injectable()
export class TodoService {
  private todos: TodoDto[] = [];

  // ... existing find and create methods

  updateTodo(id: string, todo: UpdateTodoDto): TodoDto | null {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);

    if (todoIndex < 0) {
      return null;
    }

    this.todos[todoIndex] = {
      ...this.todos[todoIndex],
      ...todo,
    };

    return this.todos[todoIndex];
  }

  deleteTodo(id: string): void {
    this.todos = this.todos.filter((todo) => todo.id != id);
  }
}
```

## Create the `UpdateTodoDto`

```typescript
export class CreateTodoDto {
  readonly description: string;
  readonly title: string;
}

export class TodoDto extends CreateTodoDto {
  readonly completed: boolean;
  readonly id: string;
}

export class UpdateTodoDto {
  readonly completed?: TodoDto['completed'];
  readonly description?: TodoDto['description'];
  readonly title?: TodoDto['title'];
}
```
