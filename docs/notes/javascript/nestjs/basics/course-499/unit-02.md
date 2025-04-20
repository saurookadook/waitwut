---
title: 'NestJS Basics - Transforming Data Store Objects to DTOs'
date: '2025-04-20'
fullPath: '/notes/javascript/nestjs/basics/course-499/unit-02'
sectionSlug: 'notes'
---

## The Problem

- when using only Mongoose methods, application returns data from database exactly as Mongo provides it
- representation of data from Mongo is not always the same representation that we want to expose from API

## Overview of Data Transfer Objects (DTOs)

- **DTOs** are simple objects used to transfer data between different parts of application
- useful for 3 main reasons:
  1. **Validation**: ensure data being transferred meets certain criteria
  2. **Transformation**: convert data from one format or structure to another
  3. **Encapsulation**: group related data together into single object

## Intro to `class-transformer`

- common pattern in NestJS to use library called `class-transformer` for transforming data between objects

## Defining Basic DTOs

```typescript
import { Exclude, Expose } from 'class-transformer';

// Decorator for excluding fields unless explicitly stated in class definition
@Exclude()
export class TodoDto {
  // Convert the Mongo `_id` to the DTO `id` field
  @Expose({ name: '_id' })
  id: string;


  @Expose()
  completed: boolean;

  @Expose()
  description: string;

  @Expose()
  title: string;
}

@Exclude()
export class CreateTodoDto {
  @Expose()
  description: string;

  @Expose()
  title: string;
}

@Exclude()
export class UpdateTodoDto {
  @Expose()
  completed?: boolean;

  @Expose()
  description?: string;

  @Expose()
  title?: string;
}
```

## Implementing Data Transformation in Controller

```typescript
// src/todos/utils.ts ?
import { plainToClass } from 'class-transformer';

import { TodoDto } from './dtos/todo.dto';
import { TodoDocument } from './schemas/todo.schema';

export function transformTodoDto(todo: TodoDocument): TodoDto {
  return plainToClass(TodoDto, todo.toJSON());
}


// src/todos/todo.controller.ts
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';

import { CreateTodoDto, TodoDto, UpdateTodoDto } from './dtos/todo.dto';
import { TodoService } from './todo.service';
import { transformTodoDto } from './utils';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(@Query('showIncomplete') showIncomplete: boolean): Promise<TodoDto[]> {
    const todos = await this.todoService.findAll(showIncomplete);
    return todos.map(transformTodoDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TodoDto> {
    const foundTodo = await this.todoService.findOne(id);

    if (!foundTodo) {
      throw new NotFoundException('Todo not found!');
    }

    return transformTodoDto(todo);
  }

  @Post()
  async createOne(@Body() todo: CreateTodoDto): Promise<TodoDto> {
    const newTodo = await this.todoService.createOne(todo);
    return transformTodoDto(newTodo);
  }

  // etc
}
```
