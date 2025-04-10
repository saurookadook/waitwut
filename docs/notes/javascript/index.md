---
title: 'JavaScript'
date: '2025-03-06'
fullPath: '/notes/javascript'
iconComponentName: "javascript_icon"
sectionSlug: 'notes'
---

- [Handling Asynchronous Operations](./async.md)
- [JavaScript Security](./security.md)
- [React](./react/index.md)
- [TypeScript](./typescript/index.md)
- [Web Workers](./web-workers.md)

---

## [RamdaJs](https://ramdajs.com/)

- emphasizes purer functional style
- immutability and side-effect free functions
- clean and elegant API

```javascript
import * as R from 'ramda'

// NOTE: Destructuring imports from ramda does not necessarily prevent importing the entire library.
// You can manually cherry-pick methods like the following
import pick from 'ramda/src/pick';
```

### [`pipe`](https://ramdajs.com/docs/#pipe)

- performs left to right composition

```javascript
const triple = (x) => x * 3;
const cube = (x) => x * x * x;

var output = pipe(cube, triple)(2);
console.log(output); // 24
```

### [`compose`](https://ramdajs.com/docs/#compose)

- performs right to left composition

```javascript
const triple = (x) => x * 3;
const cube = (x) => x * x * x;

var output = compose(cube, triple)(2);
console.log(output); // 216
```
