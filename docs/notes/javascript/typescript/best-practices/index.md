---
title: 'TypeScript Best Practices'
date: '2025-03-10'
fullPath: '/notes/javascript/typescript/best-practices'
iconComponentName: "typescript_icon"
sectionSlug: 'notes'
---

## Sections

- [Project-level Best Practices](/notes/javascript/typescript/best-practices/project-level)
- [Language Best Practices](/notes/javascript/typescript/best-practices/language)

---

### Handling Errors

- for readability, should explicitly type errors as `unkonwn`

```typescript
try {
    const uhoh = JSON.parse('{"oops":"eeeeeeeeeeeee",');
} catch (error: unknown) {
    // ...
}
```
