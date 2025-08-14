---
title: 'Securing your NestJS App - Associating ToDos with Users in NestJS'
date: '2025-05-24'
fullPath: '/notes/javascript/nestjs/basics/course-500/unit-04'
iconComponentName: 'nestjs_icon'
sectionSlug: 'notes'
---

## Integrating Mongoose with NestJS for Todo Management

### Creating the Todo Schema with User Association

The core of our task is to ensure each ToDo item is associated with a user. We'll achieve this by updating the `Todo` schema to include an `ownerId` property to signify which user it belongs to.

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
  // NEW
  @Prop({ required: true })
  ownerId: string; // Associates the ToDo with a specific user

  // OLD
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

```

### Updating the Todo Service to consider ToDo Owners

The `TodoService` contains the logic for CRUD operations on ToDo items, making sure these operations consider the user-specific association. We need to update all of them to require a `userId` and relate ToDos with that user. This means that you can only list or update ToDos that you own. When you create a ToDo, it gets associated wit you.

```typescript
@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>) {}

  async findAll(userId: string, showIncomplete?: boolean): Promise<Todo[]> {
    const filter: any = {
      ownerId: userId,
    };

    if (showIncomplete) {
      filter.completed = false;
    }

    return await this.todoModel.find(filter).exec();
  }

  async findOne(userId: string, id: string): Promise<TodoDocument | null> {
    const todo = await this.todoModel.findById(id).exec();

    if (todo?.ownerId !== userId) {
      return null;
    }

    return todo;
  }

  async createTodo(userId: string, todo: CreateTodoDto): Promise<TodoDocument> {
    const createdTodo = new this.todoModel({
      ownerId: userId,
      ...todo,
    });

    return createdTodo.save();
  }

  // Other CRUD operations like `update` and `delete` have similar `ownerId` concerns...
}

```

### Developing the Todo Controller

```typescript
function userIdFromRequest(req: any): string {
    // The user should be set on the request object by the AuthGuard.
    // This information was embedded within the JWT token
    return req.user?.sub ?? "";
}

@Controller('todos')
export class TodoController {
  constructor(private readonly todosService: TodoService) {}

  @Get()
  async findAll(
    @Request() req,
    @Query('showIncomplete') showIncomplete: boolean,
  ): Promise<TodoDto[]> {
    // Find ToDos that are owned by the user that was received from the token.
    const todos = await this.todosService.findAll(
      userIdFromRequest(req),
      showIncomplete,
    );

    return todos.map(transformTodoDto);
  }

  @Get(':id')
  async findOne(
    @Request() req,
    @Param('id') id: string,
  ): Promise<TodoDto> {
    const todo = await this.todosService.findOne(
      userIdFromRequest(req),
      id,
    );

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return transformTodoDto(todo);
  }

  @Post()
  async create(
    @Request() req,
    @Body(new ValidationPipe()) todo: CreateTodoDto,
  ): Promise<TodoDto> {
    const newTodo = await this.todosService.createTodo(
      userIdFromRequest(req),
      todo,
    );

    return transformTodoDto(newTodo);
  }

  // Other endpoints
}
```

## Working with ToDos and Users

Example requests demonstrating associations

```typescript
import axios from 'axios';

// Create a new todo item
async function createTodo(token: string, username: string) {
  try {
    const response = await axios.post('http://localhost:3000/todos', {
      title: 'Learn NestJS',
      description: `${username} Explore the basics of NestJS`,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

// Get all todo items
async function getTodos(token: string) {
  try {
    const response = await axios.get('http://localhost:3000/todos', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Todos:', response.data);
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

async function run() {
  console.log('Registering a new User 1');
  await registerUser("testuser1");

  console.log('\nLogging in the User 1');
  const { access_token: testUser1Token } = await loginUser("testuser1");

  console.log('\nCreating a new todo for User 1');
  await createTodo(testUser1Token, "User 1");

  console.log('\nGetting all todos for User 1');
  await getTodos(testUser1Token);
}

void run();

```
