---
title: 'NestJS Basics'
date: '2025-04-12'
fullPath: '/notes/javascript/nestjs/basics'
sectionSlug: 'notes'
---

## Implementing ToDo App with NestJS

_[Path in CodeSignal](https://codesignal.com/learn/paths/implementing-todo-app-with-nestjs)_

- [Course 497](/notes/javascript/nestjs/basics/course-497)
  - [Unit 1: Understanding NestJS](/notes/javascript/nestjs/basics/course-497/unit-01)
  - [Unit 2: Controllers in NestJS](/notes/javascript/nestjs/basics/course-497/unit-02)
  - [Unit 3: Providers in NestJS](/notes/javascript/nestjs/basics/course-497/unit-03)
  - [Unit 4: Modules in NestJS](/notes/javascript/nestjs/basics/course-497/unit-04)
  - [Unit 5: Generating Components Using the CLI](/notes/javascript/nestjs/basics/course-497/unit-05)
- [Course 498](/notes/javascript/nestjs/basics/course-498)
  - [Unit 1: Set Up GET Queries](/notes/javascript/nestjs/basics/course-498/unit-01)
  - [Unit 2: Create a ToDo Item Provided from the Request Body](/notes/javascript/nestjs/basics/course-498/unit-02)
  - [Unit 3: Implementing Update and Delete Handlers](/notes/javascript/nestjs/basics/course-498/unit-03)
  - [Unit 4: Enhancing the API with Filters and Specific Modifiers](/notes/javascript/nestjs/basics/course-498/unit-04)
  - [Unit 5: Returning 404 for Missing To-Do Items](/notes/javascript/nestjs/basics/course-498/unit-05)
- [Course 499](/notes/javascript/nestjs/basics/course-499)
  - [Unit 1: Integrating MongoDB](/notes/javascript/nestjs/basics/course-499/unit-01)
  - [Unit 2: Transforming Data Store Objects to DTOs](/notes/javascript/nestjs/basics/course-499/unit-02)
  - [Unit 3: Configuring a Middleware and adding Validation](/notes/javascript/nestjs/basics/course-499/unit-03)
  - [Unit 4: Error Handling](/notes/javascript/nestjs/basics/course-499/unit-04)

## Data Transfer Object (DTO)

- object that carries data between processes
- motivation for use:
  - communication between processes usually done resorting to remote interfaces _(e.g. web services)_ where each call is expensive operation
  - because majority of cost of each of those calls is related to round-trip between client and server, one way of reducing number of calls is to use object _(a DTO)_ that aggregates data that otherwise would've been transferred by several calls

_[Citation](https://en.wikipedia.org/wiki/Data_transfer_object)_
