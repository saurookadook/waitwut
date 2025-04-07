---
title: 'APIs'
date: '2025-04-03'
fullPath: '/notes/apis'
sectionSlug: 'notes'
---

## Fundamentals of APIs

An **Application Programming Interface (API)** is a contract for how two software components will communicate with one another.

### Components of Web APIs

#### **Inputs**

- Path
- Operation
- Request
- Version

#### **Outputs**

- Response Body
- Status Code

---

## Documenting APIs

- [Swagger](https://swagger.io/)
  - [Swagger UI](https://swagger.io/tools/swagger-ui/)
  - [Swagger Editor](https://swagger.io/tools/swagger-editor/)
  - [Swagger Codegen](https://swagger.io/tools/swagger-codegen/)
- [Redocly](https://redocly.com/)
- [Backstage](https://backstage.io/)

### Open API Specification

- A standard format for defining and describing your APIs in JSON or YAML format.
- Managed by the [OpenAPI Initiative](https://www.openapis.org/)

#### Basic example specification file

- File commonly named `openapi.yaml` or `openapi.json`
- [Reference repository from 'Documenting APIs Effectively' on Pluralsight](https://github.com/saurookadook/carved-rock-fitness-openapi-spec)

```yaml
# openapi.yaml

openapi: # Version 3.1.0
info: # Includes the title, summary, description
  description: |
    ## Overview
    The Description field supports Markdown

    ## Versioning
    * v1 = Initial release
    * v2 = Added new features

    ## Error Handling
    | **Status Code** | **Description** |
    |-----------------|-----------------|
    | 400             | Bad request     |
servers: # List of API server URLs
tags: # List of tags for API categorization
security: # Security scheme supported by the API
externalDocs: # Link to external documentation
paths: # List of API endpoint paths and operations
components: # List of schemas (request, response, ...)
```

#### More Notable Examples

- [specs/customer/openapi.yaml](https://github.com/saurookadook/carved-rock-fitness-openapi-spec/blob/main/specs/customer/openapi.yaml)
  - usages of `$ref` and `components`
  - nested details
  - fields with markdown
  - fields with lists
