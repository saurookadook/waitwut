---
title: 'Securing your NestJS App - Securing Endpoints with JWT Guards'
date: '2025-05-24'
fullPath: '/notes/javascript/nestjs/basics/course-500/unit-03'
iconComponentName: 'nestjs_icon'
sectionSlug: 'notes'
---

## Creating a NestJS Auth Guard

Guards in NestJS act as middleware, determining if a request can proceed.

```typescript
// src/auth/auth.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const payload = await this.verifyBearerToken(request);
      request['user'] = payload;
    } catch (error: unknown) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private async verifyBearerToken(request: Request): Promise<any> {
    const authHeader = request.headers.authorization || '';
    const [authType, bearerToken] = authHeader.split(' ');

    if (authType !== 'Bearer' || !bearerToken) {
      throw new UnauthorizedException();
    }

    return await this.jwtService.verifyAsync(bearerToken, {
      // NOTE: or maybe get it from config service?
      secret: process.env.JWT_SECRET
    });
  }
}
```

## Secure all routes with the `AuthGuard`

In a NestJS application, securing all routes by default ensures that only authenticated users can access the application's resources. By integrating the `AuthGuard` at the module level, we can enforce this security measure across all endpoints, except those explicitly marked as public.

In this configuration, the `AuthGuard` is added to the `providers` array, allowing it to be automatically injected where needed. The `JwtService` is also included since it's a dependency required by the `AuthGuard` for verifying tokens.

```typescript
// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    // Adds `AuthGuard` to require token for all routes unless marked with `@Public()`
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
})
export class AuthModule {}

```

## Implementing the Public Decorator

```typescript
// src/auth/decorators/public.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

```

## Updating the `AuthGuard` to allow public routes

```typescript
// src/auth/auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { IS_PUBLIC_KEY } from './decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.isPublic(context)) {
      return true;
    }

    // ...
  }

  // ...

  private isPublic(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
  }
}

```

## Example: Allowing the registration and login methods to be public

```typescript
// src/auth/auth.controller.ts
/**
 * IMPORTS
 */

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: UsernameWithPassword) {
    return await this.authService.register(
      createUserDto.username,
      createUserDto.password,
    );
  }

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: UsernameWithPassword) {
    const authResponse = await this.authService.logIn(
      loginUserDto.username,
      loginUserDto.password,
    );

    if (!authResponse) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return authResponse;
  }
}
```

## Using the JWT token to access protected routes

Example requests including JWT token

```typescript
import axios from 'axios';

// Create a new todo item
async function createTodo(token: string) {
  try {
    const response = await axios.post('http://localhost:3000/todos', {
      title: 'Learn NestJS',
      description: `Explore the basics of NestJS`,
    }, {
      // IMPORTANT!  Include the token you received from the login request!
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
      // IMPORTANT!  Include the token you received from the login request!
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Todos:', response.data);
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

async function run() {
  console.log('Registering a new user');
  await registerUser("testuser");

  console.log('\nLogging in the User 1');
  const { access_token } = await loginUser("testuser1");

  console.log('\nCreating a new todo');
  await createTodo(access_token);

  console.log('\nGetting all todo');
  await getTodos(access_token);
}

run();

```
