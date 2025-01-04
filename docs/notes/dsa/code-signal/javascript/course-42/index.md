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

**Binary Search** is an efficient algorithm that pinpoints elements in a sorted list. It's like finding a house number on a long street — instead of starting from one end, you begin in the middle and, based on whether the house number is higher or lower, you search the right or left half of the list.

### Unveiling Binary Search

Binary Search follows a divide-and-conquer strategy. It starts in the middle of a sorted list. If the middle value is the desired one, great! If not, it uses the sorted nature of the list to eliminate half of it. The side to eliminate is selected based on whether the target is smaller or larger than the middle value.

### Implementing Binary Search Using Recursion in JavaScript

This implementation of a binary search algorithm calls itself recursively, gradually shrinking the search area until it finds the target.

```js
function recursiveBinarySearch({ arr, start, end, target }) {
    // Base case: search area is empty
    if (start > end) {
        return -1;
    }

    const midPoint = Math.floor((start + end) / 2);

    // Found the target
    if (arr[midPoint] == target) {
        return midPoint;
    }

    return (arr[midpoint] > target)
    // If the target is less than the midpoint, search the left half
        ? recursiveBinarySearch({ arr, start, end: midPoint - 1, target })
    // Else, search the right half
        : recursiveBinarySearch({ arr, start: midPoint + 1, end, target });
}
```

### Implementing Binary Search Using Iteration in JavaScript

This implementation of a binary search algorithm uses a `while` loop instead of recursion.

```js
function iterativeBinarySearch({ arr, target }) {
    let start = 0;
    let end = arr.length - 1;
    let midPoint;

    while (start <= end) {
        midPoint = Math.floor((start + end) / 2);

        if (arr[midPoint] == target) {
            // Found the target
            return midPoint;
        }

        if (arr[midPoint] < target) {
            // Search the right half
            start = midPoint + 1;
        } else {
            // Search the left half
            end = midPoint - 1;
        }
    }

    return -1;
}
```

### Analyzing Complexity of Binary Search

Binary Search reduces the input size by half on every step, hence it takes `log(n)` steps to find a target in an array of size `n`. Thus, the time complexity of Binary Search is **`O(log n)`**.

Both recursive and iterative approaches share the same time complexity — **`O(log n)`**. Their choice usually comes down to specific problems, constraints, and personal preferences.

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
