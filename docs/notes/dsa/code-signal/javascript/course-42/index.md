---
title: 'Sorting and Searching Algorithms in JS'
date: '2025-01-03'
fullPath: '/notes/dsa/code-signal/javascript/course-42'
sectionSlug: 'notes'
---

## Exploring the Magic of Recursion in JavaScript

### Understanding Recursion

Think about a stack of pancakes. To get to the bottom, you must lift each pancake from the top, one at a time. This repeated action is a basic example of recursion. In programming, recursion involves a function calling itself repeatedly until a specific condition, known as the **base case**, is satisfied. This is like walking down a staircase, step by step until you reach the bottom.

Here's a simple JavaScript function to illustrate recursion:

```js
function recursiveFunction(x) {
    if (x <= 0) { // Base case
        console.log("Base case reached");
    } else {
        console.log(x);
        recursiveFunction(x - 1); // Recursive call
    }
}
recursiveFunction(5);
/*Output:
5
4
3
2
1
Base case reached
*/
```

### Defining the Base Case

Think of the **base case** as a stop sign guiding our function, indicating when recursion should cease. In our pancake stack example, the **base case** is when there are no more pancakes to lift. Similarly, `x <= 0` is our **base case** in our function. This **base case** is vital in avoiding the chaos of an infinite recursion.

### Defining the Recursive Case

The **recursive case** makes recursion tick — it refers to the process that gradually reduces the problem's size. Each recursive function call brings us closer to the **base case**. Let's take finding a factorial as an example to illustrate this.

To find a factorial, we multiply a number by the factorial of the number minus one and repeat this process until we reach one (our base case):

```js
function factorial(n) {
    if (n === 1) { // base case
        return 1;
    } else {
        return n * factorial(n-1); // recursive case
    }
}
console.log(factorial(3)); // Will print 6 (3 * 2 * 1)
```

### Tips for Thinking Recursively

1. Try visualizing problems as a nesting doll to wrap your thoughts around recursion. Each time you open the doll, a smaller one reveals itself until you reach the smallest doll - analogous to the **base case**, and the un-nesting process resembles the **recursive case**.

2. Remembering that large problems often break down into smaller, manageable sub-problems is crucial. Solving these smaller problems and combining their solutions can easily tackle the bigger problem.

### Another Example of Recursive Function

Let's create a function that calculates the sum of the digits of a number. A loop could suffice for this job, but with clever utilization of recursion, the solution becomes simpler:

```js
function sumOfDigits(num) {
    if (num < 10) { // Base case
        return num;
    } else {
        return num % 10 + sumOfDigits(Math.floor(num / 10)); // Recursive case
    }
}
console.log(sumOfDigits(12345)); // Will print 15 (1+2+3+4+5)
```

## Binary Search in JavaScript: Unraveling the Algorithm and Complexity

🚧

## Advanced Binary Search: Mastering Complex Array Problems

🚧

## Sorting Data Swiftly: Quick Sort in JavaScript Explained

🚧

## Merge Sort Mastery: Sorting Arrays Efficiently in JavaScript

🚧

## Mastering the Sort Function: Organizing Data in JavaScript

🚧

## Advanced Techniques with Sorting Algorithms: K-th Largest Element and Inversion Count

🚧
