---
title: 'Neetcode: Valid Parentheses'
date: '2025-08-23'
fullPath: '/notes/dsa/neetcode/blind-75/stack/question-01'
sectionSlug: 'notes'
---

## Instructions

You are given a string `s` consisting of the following characters: `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`.

The input string `s` is valid if and only if:

1. Every open bracket is closed by the same type of close bracket.
2. Open brackets are closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Return `true` if `s` is a valid string, and `false` otherwise.

**Example 1**:

```java
Input: s = "[]"

Output: true
```

**Example 2**:

```java
Input: s = "([{}])"

Output: true
```

**Example 3**:

```java
Input: s = "[(])"

Output: false
```

Explanation: The brackets are not closed in the correct order.

**Constraints**:

- `1 <= s.length <= 1000`

## Solutions

### JavaScript

```javascript
class Solution {
    OPEN_PARENS;
    PAREN_MAP = {
        ')': '(',
        ']': '[',
        '}': '{',
    };

    constructor() {
        this.OPEN_PARENS = new Set(Object.values(this.PAREN_MAP))
    }

    /**
     * @param {string} s
     * @return {boolean}
     */
    isValid(s) {
        const parens = [];

        for (const char of s) {
            if (parens.length === 0 && !this.OPEN_PARENS.has(char)) {
                return false;
            }

            const lastParen = parens.at(-1);
            if (parens.length > 0 && lastParen === this.PAREN_MAP[char]) {
                parens.pop();
                continue;
            }

            parens.push(char);
        }

        return parens.length === 0;
    }
}

```
