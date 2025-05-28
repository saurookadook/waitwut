---
title: 'Securing your NestJS App - Integrating JWT for Authentication in NestJS'
date: '2025-05-24'
fullPath: '/notes/javascript/nestjs/basics/course-500/unit-02'
iconComponentName: 'nestjs_icon'
sectionSlug: 'notes'
---

## Understanding JWT Structure and Functionality

Before diving into the implementation, it's essential to understand the structure and functionality of **JWTs**. A `JWT` consists of three parts:

- **Header**: This contains the type of token (`JWT`) and the signing algorithm being used, such as HMAC SHA256.
- **Payload**: Also known as the claims, this is where you store the user data and other metadata. This part includes registered claims (standard fields like `exp` for expiration time) and custom claims (custom fields like user roles).
- **Signature**: This is created by encoding the header, payload, and a secret key with a hashing algorithm. The signature is used to verify the sender's authenticity and ensure that the message wasn't altered.

**JWTs** are typically used in scenarios where you need to securely transfer information, such as authenticating users in a web application. The token is usually stored client-side, like in a browser's local storage, and sent with each request to the server via a `Bearer` token in the request header.

## Integrating JWT into NestJS

### 1. Configuring JWT Module

```typescript
// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
```

### 2. Developing AuthService

```typescript
// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';

const SALT_ROUNDS = 10;

export type AuthResponse = {
  access_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, unhashedPassword: string): Promise<string> {
    const password = await bcrypt.hash(unhashedPassword, SALT_ROUNDS);
    const user = await this.userService.create(username, password);
    return user.username;
  }

  async logIn(username: string, unhashedPassword: string): Promise<AuthResponse | null> {
    const user = await this.userService.findByUsername(username);

    if (!user || !(await bcrypt.compare(unhashedPassword, user.password))) {
      return null;
    }

    const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
```

### 3. Setting Up `AuthController`

```typescript
// src/auth/auth.controller.ts
import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';

import { UsernameWithPassword } from './dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: UsernameWithPassword) {
    return await this.authService.register(
      createUserDto.username,
      createUserDto.password,
    );
  }

  @Post('login')
  async login(@Body() loginUserDto: UsernameWithPassword) {
    const token = await this.authService.logIn(
      createUserDto.username,
      createUserDto.password,
    );

    if (!token) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return token;
  }
}
```

## Testing and Verifying JWT Implementation

```typescript
// send_request.ts
import axios from 'axios';


// Register a new user
async function registerUser(username: string) {
  try {
    const response = await axios.post('http://localhost:3000/auth/register', {
      username,
      password: 'testpass',
    });
    return response.data;
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

// Log in a user
async function loginUser(username: string) {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      username,
      password: 'testpass',
    });
    return response.data;
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}


async function run() {
  console.log('Registering a new user');
  await registerUser("testuser");

  console.log('\nLogging in the user');
  const { access_token } = await loginUser("testuser1");
  console.log("Received JWT: ", access_token);
}

run();
```

## Use of JWT in Other Requests

```typescript
import axios from 'axios';

axios.get('http://localhost:3000/todos', {
  headers: { Authorization: `Bearer ${token}` }
});
```
