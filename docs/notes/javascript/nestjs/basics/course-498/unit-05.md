---
title: 'Building a To-Do REST API with NestJS - Returning 404 for Missing To-Do Items'
date: '2025-04-13'
fullPath: '/notes/javascript/nestjs/basics/course-498/unit-05'
sectionSlug: 'notes'
---

## Error Handling in NestJS

- NestJS provides set of built-in exceptions _(such as the `NotFoundException`)_

```typescript
import { Body, Controller, Get, NotFoundException, Param, Put } from '@nestjs/common';

import { TodoDto, UpdateTodoDto } from './dtos/todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get(':id')
  findOne(@Param('id') id: string): TodoDto | null {
    const todo = this.todoService.findOne(id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  @Put(':id')
  updateOne(@Param('id') id: string, @Body() todo: UpdateTodoDto): TodoDto | null {
    const updatedTodo = this.todoService.updateOne(id, todo);

    if (!updatedTodo) {
      throw new NotFoundException('Todo not found');
    }

    return updatedTodo;
  }

  @Put(':id/complete')
  completeOne(@Param('id') id: string): TodoDto | null {
    const completedTodo = this.todoService.markComplete(id);

    if (!completedTodo) {
      throw new NotFoundException('Todo not found');
    }

    return completedTodo;
  }

  // ... Existing GET, POST, and DELETE handlers
}
```
