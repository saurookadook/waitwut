---
title: 'Securing your NestJS App - Creating Users with Encrypted Passwords via Bcrypt in NestJS'
date: '2025-05-24'
fullPath: '/notes/javascript/nestjs/basics/course-500/unit-01'
iconComponentName: 'nestjs_icon'
sectionSlug: 'notes'
---

## Understanding Bcrypt

- `bcrypt` uses **one-way hashing** to secure passwords
- **one-way hashing** is fundamental security measure that...
  - transforms any input into fixed-size string of random characters _(a hash)_
  - transformation is non-reversible _(i.e. it is computationally infeasible to convert hash back to original input)_
    - _**IMPORTANT**: this property is crucial for protecting passwords - if hash is compromised, actual password cannot easily be retrieved by attacker_
- other alternatives include `Argon2` and `PBKDF2`

## User Schema Setup in NestJS

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydrateDocument } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export type UserDocument = HydrateDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
```

## Implementing User Registration with Bcrypt

```typescript
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from '../users/user.service';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(
    username: string,
    unhashedPassword: string
  ): Promise<{ registrationSuccess: string; username: string; }> {
    const password = await bcrypt.hash(unhashedPassword, SALT_ROUNDS);
    const user = await this.userService.create(username, password);
    return {
      registrationSuccess: 'Successfully registered!',
      username: user.username
    };
  }
}
```

### What is Salt?

The `SALT_ROUNDS` constant in the example above refers to the **cost factor**, which controls how computationally expensive it is to generate a password hash. When passing `10` as the 2nd argument to `bcrypt.hash`, the hashing algorithm used will run `2^10` rounds _(aka 1024 iterations)_. The higher the the number, the longer it takes to hash the password, thereby making brute-force attacks more difficult. However, more rounds will also negatively affect performance so one needs to strike a balance between security and speed.

## Full Example

Missing pieces from above examples

### `UserService`

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async create(username: string, hashedPassword: string): Promise<UserDocument> {
    const createdUser = new this.userModel({ username, password: hashedPassword });
    return await createdUser.save();
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ username }).exec();
  }

  // TEMPORARY FOR TESTING
  async findAll() {
    return await this.userModel.find().exec();
  }
}
```

## `UsernameWithPassword`

```typescript
// src/auth/dtos/auth.dto.ts
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class UsernameWithPassword {
  @IsNotEmpty()
  @IsString()
  @Expose()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  password: string;
}
```

## `AuthController`

```typescript
import { Body, Controller, Post } from '@nestjs/common';

import { UsernameWithPassword } from './dtos/auth.dto';
import { AuthService } from './auth-service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: UsernameWithPassword) {
    return await this.authService.register(
      createUserDto.username,
      createUserDto.password
    );
  }

  @Post('login')
  async login(@Body() createUserDto: UsernameWithPassword) {
    // TODO: ???
    return await this.authService.login(
      createUserDto.username,
      createUserDto.password
    )
  }
}
```

## `AuthModule`

```typescript
import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
```
