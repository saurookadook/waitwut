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

### Problem 1: Preceding Smaller Elements

Consider a sequence of integers like the peaks and valleys of a mountain range. Each peak has a height represented by an integer, and you're hiking from left to right, recording peaks shorter than the one you're currently on. For each peak, we want to find out the height of the nearest preceding peak that's lower than it — a classic problem where stacks excel.

Envision analyzing daily temperatures over several months. You're interested in knowing the last cooler day for each day you examine. This mirrors our array problem, where we're seeking the previous smaller number before each entry in the array. It’s these kinds of time-sensitive queries that stack operations handle without breaking a sweat.

#### Naive Approach

You might be tempted to approach this problem with the vigor of a brute force assault — looking behind each element to find a smaller one. However, this could mean reviewing multiple times and spending unforgiving time as you consider each element repeatedly. In a vast data set, this would be akin to retracing your steps on each day's hike to find a shorter peak, an exhausting proposition!

#### Efficient Approach with Stacks

Consider we take on the role of a librarian who cleverly keeps track of how the heights of books change as she adds new ones to the shelf. Thus, the librarian can instantly recall the last book, shorter than the current one, by looking at the top of the stack.

```javascript
function findPrecedingSmallerElements(arr) {
    let stack = [];
    let result = new Array(arr.length).fill(-1);

    for (let i = 0; i < arr.length; i++) {
        while (stack.length > 0 && stack[stack.length - 1] >= arr[i]) {
            stack.pop();
        }

        if (stack.length > 0) {
            result[i] = stack[stack.length - 1];
        }

        stack.push(arr[i]);
    }

    return result;
}

console.log(findPrecedingSmallerElements([1, 3, 2, 5, 4, 7]));
// Output: [ -1, 1, 1, 2, 2, 4 ]
console.log(findPrecedingSmallerElements([5, 4, 3, 2, 1]));
// Output: [ -1, -1, -1, -1, -1 ]
```

In our code, we trek through each element in the array. Our conditions within the loop perform the 'pop' work — discarding any peak that isn't lower than our current one, ensuring that only useful candidates remain. Then, we notate the result — either -1 if no such peak exists or the last peak remaining on the stack. Before moving on, we add our current peak to the stack.

##### BONUS: Preceding Bigger Element

```javascript
function findPrecedingBiggerPlanets(arr) {
    let stack = [];
    let result = new Array(arr.length).fill(-1);

    for (let i = 0; i < arr.length; i++) {
        while (stack.length > 0 && stack[stack.length - 1] <= arr[i]) {
            stack.pop();
        }

        if (stack.length > 0) {
            result[i] = stack[stack.length - 1];
        }

        stack.push(arr[i]);
    }
    return result;
}


console.log(findPrecedingBiggerPlanets([1, 3, 2, 5, 4, 7]));
// Output: [ -1, -1, 3, -1, 5, -1 ]
console.log(findPrecedingBiggerPlanets([1, 2, 3, 4]));
// Output: [ -1, -1, -1, -1 ]
```

### Problem 2: Stack with a Minimum Trace

Our second challenge is a high-stakes game where you must keep track of your score and always be aware of your lowest score without slowing down the game. Enter the `MinStack`, a special stack designed to efficiently keep track of the minimal score.

#### Naive Approach

A naive solution would involve, at the end of each turn, traversing through all the scores recorded to that point to find the minimum score — similar to going through every high score ever recorded for each new score. Time-wise, this would mean when 100 scores are recorded, up to 100 checks would be needed each turn, leading to **`O(n^2)`** operations as the game progresses.

#### Efficient Approach Explanation

We envision a second stack, which shadows our main stack. As the main stack grows, this auxiliary stack captures and retains only the minimal elements seen up to each point. Thus, the minimum score is always at the top of our 'min stack'.

```javascript
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    push(val) {
        this.stack.push(val);
        if (this.minStack.length === 0 || val <= this.getMin()) {
            this.minStack.push(val);
        }
    }

    pop() {
        const item = this.stack.pop();
        if (item === this.getMin()) {
            this.minStack.pop();
        }
        return item;
    }

    top() {
        return this.stack[this.stack.length - 1];
    }

    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}

```

The push method introduces the key player — our `minStack` stack, which retains the minimum value observed every time we add a new entry. Meanwhile, the pop operation is like a relay race transition, handing off the title "minimum" to the next contender when the current titleholder is knocked off the podium.

Simulating the pushing of various elements onto the stack and invoking `getMin` would yield the correct minimum every time, thanks to our additional stack, `minStack`.

```javascript
let ms = new MinStack();
ms.push(5);
console.log(ms.getMin()); // 5
ms.push(7);
console.log(ms.getMin()); // 5
ms.push(3);
console.log(ms.getMin()); // 3
ms.push(1);
console.log(ms.getMin()); // 1
```

##### BONUS: `MaxStack`

```javascript
class MaxStack {
    constructor(){
        this.stack = [];
        this.maxStack = [];
    }

    push(val) {
        this.stack.push(val);
        if (this.maxStack.length === 0 || val >= this.getMax()) {
            this.maxStack.push(val)
        }
    }

    pop() {
        const item = this.stack.pop();
        if (item === this.getMax()) {
            this.maxStack.pop();
        }
        return item;
    }

    top() {
        return this.stack[this.stack.length - 1];
    }

    getMax() {
        return this.maxStack[this.maxStack.length - 1];
    }
}

let ms = new MaxStack();
ms.push(3);
console.log(ms.getMax());  // Expected: 3
ms.push(2);
console.log(ms.getMax());  // Expected: 3
ms.push(4);
console.log(ms.getMax());  // Expected: 4
```

---

## Understanding Queues in JavaScript: From Concept to Code

- First-In, First-Out (FIFO) data structure

### Implementing a Queue in JavaScript

```javascript
class Queue {
    constructor() {
        this.data = [];
    }

    enqueue(element) {
        this.data.push(element);
    }

    dequeue() {
        if (this.isEmpty()) {
            return "Underflow";
        }

        return this.data.shift();
    }

    isEmpty() {
        return this.data.length <= 0;
    }
}
```

### Complexity Analysis of Queue Operations

- **time complexity** of both `enqueue` and `dequeue` operations is constant: **`O(1)`**
- **space complexity** of a queue scales with the number of elements: **`O(n)`**

---

## Mastering Queue Operations: Efficient Data Processing for Interviews

### Problem 1: Queue Interleaving

When merging data from two different sources, we seek to alternate between each source fairly, much as traffic from two lanes merges on a highway. Cars from both lanes are expected to merge seamlessly, taking turns. In the world of data structures, we face a similar task of intertwining two queues.

#### Problem Actualization

Suppose you're working with two devices that send printing tasks to a shared printer. You would alternate print jobs from each device's queue to prevent one device from monopolizing the printer. This concept of combining two queues by alternating their elements is what we're implementing here.

#### Efficient Approach Explanation

An efficient solution adheres strictly to queue operations: `enqueue` (to add an element) and `dequeue` (to remove and fetch the front element). We _interleave_ by performing alternating `dequeue` operations from each queue, and adding the results to a new one. This approach respects the FIFO nature of queues and optimizes time complexity.


```javascript
// using `Queue` class from above
function interweaveQueues(queue1, queue2) {
    const resultQueue = new Queue();

    while (!queue1.isEmpty() || !queue2.isEmpty()) {
        if (!queue1.isEmpty()) {
            resultQueue.enqueue(queue1.dequeue());
        }
        if (!queue2.isEmpty()) {
            resultQueue.enqueue(queue2.dequeue());
        }
    }

    return resultQueue;
}


// using built-in arrays
const isEmpty = (arr) => arr.length <= 0;

function interweaveArrays(arr1, arr2) {
    const resultArray = [];

    while (!isEmpty(arr1) || !isEmpty(arr2)) {
        if (!isEmpty(arr1)) {
            resultArray.push(arr1.shift());
        }
        if (!isEmpty(arr2)) {
            resultArray.push(arr2.shift());
        }
    }

    return resultArray;
}
```

### Problem 2: Moving Average for Data Stream

Let's move on to the next problem - calculating the moving average from a data stream. This often appears in technical interviews and is typically applied in real-time decision-making settings, such as a trader monitoring livestock prices for rapid buying or selling decisions. We have to compute the average of the last `k` elements from a streaming data, which is crucial for trend analysis in data science.

#### Real-world Scenario

Consider a fitness app that continually updates the user's average heart rate over the previous 10 minutes. Based on each new heart rate reading, the app calculates and updates this information to present the user's latest health status.

#### Naive Approach

A simple technique would be to store all the data points and recompute the average every time a new item arrives. However, this method might need to be more efficient, especially when dealing with large datasets or infinite data streams.

#### Efficient Solution to the Problem

A queue can provide an efficient solution to this problem. Keeping a sliding window of the most recent k elements mirrors our fitness app's continuous update cycle of heart rate readings, where newer readings replace the older entries.

#### Building the Solution

```javascript
// simulates backend of fitness tracking app
class MovingAverage {
    constructor(size) {
        this.size = size;
        this.window = new Queue();
        this.sum = 0.0;
    }

    next(val) {
        if (this.window.getSize() === this.size) {
            this.sum -= this.window.dequeue();
        }

        this.window.enqueue(val);
        this.sum += val;
        return this.sum / this.window.getSize();
    }
}

const movingAvg = new MovingAverage(3);
console.log(movingAvg.next(1));     // returns 1.0 (like a single heart rate reading)
console.log(movingAvg.next(10));    // returns 5.5 (the average after a short burst of activity)
console.log(movingAvg.next(3));     // returns 4.66667 (normalizing after the burst)
console.log(movingAvg.next(5));     // returns 6.0 (the most recent average, taking into account the last three readings)
```
