---
title: 'NestJS Basics - Understanding NestJS'
date: '2025-04-05'
fullPath: '/notes/javascript/nestjs/basics/course-497/unit-01'
iconComponentName: 'nestjs_icon'
sectionSlug: 'notes'
---

All sections from [NestJS Basics course on CodeSignal](https://codesignal.com/learn/courses/nestjs-basics?urlSlug=implementing-todo-app-with-nestjs)

- [nestjs-todo-app](https://github.com/saurookadook/nestjs-todo-app/)

---

## Introduction

Welcome to your course on building your first _**NestJS**_ application. This lesson will get you familiar with _**NestJS**_ and its project structure. As we embark on this journey, we'll dive into the basics of _**NestJS**_ — a framework designed for building efficient and scalable server-side applications. Unlike other frameworks like `Express.js` or `Koa`, _**NestJS**_ leverages TypeScript and a modular architecture, making it not only easy to use but also highly maintainable and scalable. At the same time, _**NestJS**_ uses `Express.js` under the hood (by default).

### What is NestJS?

_**NestJS**_ is a progressive Node.js framework for building efficient and scalable server-side applications. It uses modern JavaScript, is built with TypeScript (preserving compatibility with plain JavaScript), and combines elements of Object-Oriented Programming (OOP), Functional Programming (FP), and Functional Reactive Programming (FRP). _**NestJS**_ is inspired by `Angular.js` so if you are familiar with `Angular.js`, a lot of these concepts will feel familiar.

### Why Use NestJS?

1. **TypeScript Support**: _NestJS_ makes use of TypeScript, offering strong typing, advanced code completion, and the ability to catch errors at compile time, leading to more robust applications.
2. **Modular Architecture**: The framework's modular structure allows for the organization of code into manageable parts, making it scalable and maintainable. Modules can be easily reused across different parts of the application.
3. **Dependency Injection**: _NestJS_ provides a powerful dependency injection system that promotes loose coupling and makes testing and scaling easier.
4. **Extensible**: With an adaptable ecosystem, _NestJS_ leverages a vast number of external libraries and offers an easy way to integrate them into projects. It's built on top of `Express.js` by default but even that is configurable to use something else like `Fastify`.
5. **Community and Documentation**: _NestJS_ boasts a vibrant community and comprehensive documentation, reducing the learning curve and providing support for developers.

### Setting Up the NestJS Project

To bootstrap a sample NestJS project, you can use the NestJS CLI. You can see the installation instruction in the [official NestJS documentation](https://docs.nestjs.com/first-steps#setup). After NestJS CLI is installed on your machine, you can use the following command to create a new project:

```sh
npm i -g @nestjs/cli
nest new project-name
```

### Understanding the Project Structure

When you create a new _NestJS_ project using NestJS CLI, various files and directories are automatically generated. Let's break down the key components:

- **`app.controller.ts`**: Controllers handle incoming requests and return responses to the client. This file contains a basic example of a controller.
- **`app.service.ts`**: Services are used to handle business logic. This file contains a simple service that returns a "Hello World!" message.
- **`app.module.ts`**: This is the root module of your application. It defines how your app is organized by configuring modules, controllers, and providers.
  - Modules encapsulate different parts of application and are meant to be specific
  - any _NestJS_ app needs a `root` module that is called `AppModule`
- **`main.ts`**: This file is the entry point of your application, responsible for bootstrapping the app.
