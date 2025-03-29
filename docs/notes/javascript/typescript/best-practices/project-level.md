---
title: 'TypeScript Project-level Best Practices'
date: '2025-03-12'
fullPath: '/notes/javascript/typescript/best-practices/project-level'
iconComponentName: "typescript_icon"
sectionSlug: 'notes'
---

## Overview

- [Structural Best Practices](#structural-best-practices)
- [Architectural Best Practices](#architectural-best-practices)
- [Configuration Best Practices](#configuration-best-practices)
- [Tooling Best Practices](#tooling-best-practices)

---

### Structural Best Practices

- file and folder structure will likely change based on nature of project, frameworks, personal preference, etc.
- however, adhering to [the **LIFT** principle](https://angular.io/guide/styleguide#lift) is a good rule of thumb
  - **L**ocatable
    - code should be easy to find
    - name files and folders to promote findability
  - **I**dentifiable
    - should be easy to identify which files contain which code and which folder contain which files
  - **F**lat
    - keep folder structure as flat as possible, with only as much nesting as is required
  - **T**-DRY (Try to be DRY)
    - avoid duplicating files of same purpose and scope in multiple places

### Architectural Best Practices

1. favor modular design
  - discreet modules are easier to reuse through app
  - modules should ahere to _**single responsibility rule**_
2. favor layered design
   - divide app into distinct layers, each responsible for a different thing
   - minimize dependencies between layers
   - example:
     - **presentation layer** _(UI components, framework)_
     - **domain layer** _(entities, business logic, use-cases\(?\))_
     - **data layer** _(storing/retrieving data)_
     - **repository** _(bridge between domain/data layers)_
  - **dependency rule** _(dependencies should always point inwards and only be one level deep)_
3. Domain Driven Development (DDD)

### Configuration Best Practices

- TypeScript apps configured using one or more `tsconfig.json` _(including namespaced files like `tsconfig.dev.json`, `tsconfig.prod.json`, etc.)_
- starting project with maximum strictness/cleanliness options enabled gives solid and safe foundation
- `strict` mode is umbrella for
  - `alwaysStrict`
  - `strictNullChecks`
  - `strictBindCallApply`
  - `strictFunctionTypes`
  - `strictPropertyInitialization`
  - `noImplicitAny`
  - `noImplicitThis`
  - `useUnknownInCatchVariables`
- additional type-checking options
  - `noImplicitOverride`
  - `noImplicitReturns`
  - `noPropertyAccessFromIndexSignature`
  - `noUncheckedIndexedAccess`
  - `noFallThroughCasesInSwitch`
  - `noUnusedLocals`
  - `noUnusedParameters`
  - `exactOptionalPropertyTypes`
- disable `allowUnreachableCode` setting
- enable `noEmitOnError` setting
- _**always**_ configure `outDir` setting
  - _by default, `tsc` command emits compiled files next to original source files_

#### Watching Files and Directories

- 2 primary settings in `tsconfig`
  - `watchFile`
  - `watchDirectory`
- watch options:
  - Priority Polling Interval
  - Dynamic Priority Polling
  - File System Events (FS Events)
  - FS Events on Parent Directory
  - FS Events with Dynamic Priority Polling
- can also use environment variables
  - `TSC_WATCHFILE`
  - `TSC_WATCHDIRECTORY`

### Tooling Best Practices

- linter _([`typescript-eslint`](https://typescript-eslint.io/))_
- formatter _([`prettier`](https://prettier.io/))_
- automate linting/formatting tasks
  - editor integration
  - git hooks _([`husky`](https://typicode.github.io/husky/))_
