---
title: 'Fundamental Data Structures - Stacks and Queues'
date: '2025-01-03'
fullPath: '/notes/dsa/code-signal/javascript/algos-and-ds/course-3-68'
sectionSlug: 'notes'
---

## Stacks in JavaScript: Understanding and Implementing Fundamental Data Structures

- follow a **Last-In, First-Out** _(LIFO)_ structure
- simple implementation includes methods:
  - Push (add)
  - Pop (remove)
  - Peek (view the top)

```javascript
class Stack {
    constructor() {
        this.items = [];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        return this.items.length === 0 ? "Underflow" : this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }
}
```

### Complexity

- **Time**: `push`, `pop`, and `peek` have constant time complexity _(**`O(1)`**)_
- **Space**: proportional to number of elements _(**`O(n)`**)_

### Practical Applications

#### Problem 1: Validate Parentheses

##### Naive Approach

In a naive approach, one might consider scanning the string and manually checking for matching closing brackets for each opening one. While this might initially seem straightforward, it fails to handle nested structures efficiently, leading to repeat scanning and potential **`O(n^2)`** performance in the worst-case scenario.

##### Efficient Approach

```javascript
function areBracketsBalanced(s) {
    const stack = [];
    const brackets = { '(': ')', '[': ']', '{': '}', };

    for (let char of s) {
        if [brackets[char]] {
            stack.push(brackets[char]);
            continue;
        }

        if (stack.length === 0 || stack.pop() !== char) {
            return false;
        }
    }

    return stack.length === 0;
}

console.log(areBracketsBalanced('{{()}}[]'))  // true
console.log(areBracketsBalanced('[(())}'))  // false
```

Returns `false` in three cases
- find closing bracket and `stack` is empty
- find closing bracket and latest opening bracket doesn't match
- have any brackets in `stack` at end of process

#### Problem 2: Reverse a String Using a Stack

Using a stack provides an easy mechanism to reverse text. Each character is pushed onto the stack, and as we pop these characters off, the string is naturally reversed — as if we're unloading a stack of blocks, revealing the last-placed block first.

```javascript
function reverseString(str) {
    const stack = [];

    for (let char of str) {
        stack.push(char);
    }

    let reversedStr = '';
    while (stack.length) {
        reversedStr += stack.pop();
    }

    return reversedStr;
}

console.log(reverseString("abcde"))  // edcba
console.log(reverseString("algorithm"))  // mhtirogla
```

---

## Mastering Stacks in Interviews: Navigating Through Common Challenges

🚧 **WIP** 🚧

### TBD

🚧 **WIP** 🚧

---

## Understanding Queues in JavaScript: From Concept to Code

🚧 **WIP** 🚧

### TBD

🚧 **WIP** 🚧

---

## Mastering Queue Operations: Efficient Data Processing for Interviews

🚧 **WIP** 🚧

### TBD

🚧 **WIP** 🚧
