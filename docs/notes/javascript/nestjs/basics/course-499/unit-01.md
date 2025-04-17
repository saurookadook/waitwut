---
title: 'NestJS Basics - Integrating MongoDB'
date: '2025-04-17'
fullPath: '/notes/javascript/nestjs/basics/course-499/unit-01'
sectionSlug: 'notes'
---

## Installing MongoDB Locally

1. Install with [Homebrew](https://brew.sh/)

```sh
brew tap mongodb/brew
brew install mongodb-community
```

2. Run MongoDB

```sh
brew services start mongodb/brew/mongodb-community
```

_Server typically starts on `mongodb://localhost:27017`_

## Installing and Configuring Mongoose in a NestJS App

- Mongoose is **Object Data Modeling (ODM)** library for MongoDB and Node.js
- helps manage relationships between data
- provides schema validation
- used to translate between objects in code and their representation in MongoDB

```sh
npm install mongoose @nestjs/mongoose
```

### Configuring Mongoose

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoModule } from './todo/todo.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/nestjs-todo'),
        TodoModule
    ]
})
export class AppModule {}
```

### Creating the ToDo Schema with Mongoose

```typescript
// src/todo/schemas/todo.schema.ts
import {
    Prop, // Defines schema properties
    Schema, // Marks class as Mongoose schema
    SchemaFactory } from '@nestjs/mongoose';
import {
    // Mongoose type that represents a document from MongoDB
    // allows us to use methods like `findById`, `findByIdAndUpdate`, `delete`,
    // and other Mongoose document methods
    HydratedDocument
} from 'mongoose';

@Schema()
export class Todo {

    @Prop({ required: true })
    title: string;

    @Prop({ default: false })
    completed: boolean

    @Prop()
    description: string;
}

export type TodoDocument = HydratedDocument<Todo>;

// `createForClass` method converts `Todo` class into Mongoose schema
export const TodoSchema = SchemaFactory.createForClass(Todo);
```

### Update ToDo Service

```typescript
// src/todo/todo.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Todo, TodoDocument } from './schemas/todo.schema';
import { CreateTodoDto, UpdateTodoDto } from './dtos/todo.dto';

type Nullable<T> = T | null;

@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>) {}

    async findAll(showIncomplete?: boolean): Promise<TodoDocument[]> {
        const filter: any = {};

        if (showIncomplete) {
            filter.completed = false;
        }

        return this.todoModel.find(filter).exec();
    }

    async findOne(id: string): Promise<Nullable<TodoDocument>> {
        return this.todoModel.findById(id).exec();
    }

    async createTodo(todo: CreateTodoDto): Promise<TodoDocument> {
        const createdTodo = new this.todoModel(todo);
        return createdTodo.save();
    }

    async updateTodo(id: string, todo: UpdateTodoDto): Promise<Nullable<TodoDocument>> {
        return this.todoModel.findByIdAndUpdate(id, todo, { new: true }).exec();
    }

    async markTodoComplete(id: string): Promise<Nullable<TodoDocument>> {
        return this.updateTodo(id, { completed: true });
    }

    async deleteTodo(id: string): Promise<Nullable<TodoDocument>> {
        return this.todoModel.findByIdAndDelete(id).exec();
    }
}
```

### Updating ToDo Controller

```typescript
import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Query
} from '@nestjs/common';

import { CreateTodoDto, UpdateTodoDto } from './dtos/todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    async findAll(@Query('showIncomplete') showIncomplete: boolean) {
        const todos = await this.todoService.findAll(showIncomplete);
        return todos;
    }

    @Get(':id')
    async findOne(@Param('id') id: string): TodoDto | null {
        const todo = await this.todoService.findOne(id);

        if (!todo) {
          throw new NotFoundException('Todo not found');
        }

        return todo;
    }

    @Post()
    async create(@Body() todo: CreateTodoDto) {
        const newTodo = await this.todoService.createTodo(todo);
        return newTodo;
    }

    @Put(':id')
    async updateOne(@Param('id') id: string, @Body() todo: UpdateTodoDto): TodoDto | null {
        const updatedTodo = await this.todoService.updateOne(id, todo);

        if (!updatedTodo) {
          throw new NotFoundException('Todo not found');
        }

        return updatedTodo;
    }

    @Put(':id/complete')
    async completeOne(@Param('id') id: string): TodoDto | null {
        const completedTodo = await this.todoService.markComplete(id);

        if (!completedTodo) {
          throw new NotFoundException('Todo not found');
        }

        return completedTodo;
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.todoService.deleteTodo(id);
    }
}
```
