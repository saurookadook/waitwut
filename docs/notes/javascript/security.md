---
title: 'JavaScript Security'
date: '2025-04-02'
fullPath: '/notes/javascript/security'
iconComponentName: "javascript_icon"
sectionSlug: 'notes'
---

## Defending Against Prototype Pollution

### Typical Prototype Pollution Attack

1. attacker sends malicious JSON payload to target server
2. code under attack parses JSON and processes result using vulnerable code
  - one of the most common cases: merging parsed JavaScript object with internal application objects
3. this might result in prototype chain being polluted, thereby causing unexpected code behavior

### Prototype Chain

- each object has prototype
- prototypes form chain, all which end with `null`
- JS objects have 2 types of properties:
  1. **inherited**
    - available through prototype chain
    - when set, only actual object is modified _(never any of the prototypes)_
  2. **own**
    - either directly declared when object is created or added at runtime to a particular object

#### The `__proto__` Property

```javascript
const parent = { a: 99 };
const child = Object.create(parent);
console.log(child.a); // 99
console.log(child.__proto__ === parent); // true
```

> **NOTE**: Classes in JavaScript are just syntactic sugar; they create prototype chains under the hood.

### Polluting the Object Prototype

- **Denial of service**: by modifying built-in methods to make code near impossible to execute correctly
- **`for-in` loop manipulation**: iterates over both **own** and **inherited** properties, so could result in processing additional properties added by an attacker
- **property injection**: properties could be injected into an object that wouldn't otherwise be present
  - could result in bypassing checks and decisions made based on presence of an object property
  - SQL and NoSQL injections
- **remote code execution**

```javascript
const user = { name: 'Full Name' }; // Regular user
const malicious = { isAdmin: true }; // isAdmin is true for administrators only
user['__proto__'] = malicious; // Pollution!
console.log(user.isAdmin); // true (Escalation of privilege!)
```

### Prototype Pollution Code Smells

- **property mutation with untrusted key and value**
  - such as property mutation using bracket notation
- **recursive object merging**
  - if source object can be manipulated by attacker, can be used to launch prototype pollution attack
- **object cloning**
  - similar concern as with recursive object merging
- **property access by path**
  - often occurs when writing properties deep in object tree based on path, where path consists of property names separated by dots _**and**_ if path or any components of path and the value may be tampered with by attacker

#### Simple Example

```javascript
function safeProfile(req, res) {
    const [user] = filter(users, 'email', req.body.email);

    if (user) {
        const updatedUser = merge({}, req.body);
        Object.assign(user, updatedUser);
    }

    res.json([user]);
}

function merge(target, source) {
    for (let prop in source) {
        if (typeof target[prop] === 'object' && typeof source[prop] === 'object') {
            merge(target[prop], source[prop]);
        }
        target[prop] = source[prop];
    }
    return target;
}
```

### Protecting Against Prototype Pollution

- validate JSON schema
- freeze the prototype
  - `Object.freeze`
- create objects without prototype
  - `Object.create(null, ...)`
- use `Map` instead of `{}`
  - `Map` has richer API and better performance
