---
title: 'Fundamental Data Structures - Linked Lists'
date: '2025-04-03'
fullPath: '/notes/dsa/code-signal/javascript/algos-and-ds/course-4-57'
sectionSlug: 'notes'
---

## Exploring Linked Lists: From Foundation to Mastery

**Linked Lists** are a fundamental data structure in computer programming. Have you ever thought about how a scavenger hunt works? You have a clue at the beginning, which leads you to the next one. Each clue points you to the next one until you find your treasure. Similarly, a _Linked List_ employs this concept - a sequence where each node points to the next one, just like clues in a scavenger hunt.

Though they store data sequentially, Linked Lists and arrays have fundamental differences. In an array, elements are stored in contiguous memory, while in a Linked List, elements (or 'nodes') can be scattered throughout memory, connected by pointers. The dynamic structure of Linked Lists enables efficient insertions and deletions at any position, benefitting applications like a photo gallery, where we frequently add, update, and delete photos.

Let's begin to understand, implement, and manipulate _Linked Lists_ in JavaScript!

### Implementing a Node for Linked Lists in JavaScript

A node in a Linked List holds two types of information - data, which houses the actual value, and next, a reference to the subsequent node in the sequence. We use JavaScript's class to construct these nodes.

```javascript
class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}
```

#### Creation and Manipulation of Linked Lists: Append

We start with defining the `LinkedList` class storing the first node, which is called `head`:

```javascript
class LinkedList {
    constructor() {
        this.head = null;
    }
}
```

The `append` method adds a new node at the end of the Linked List. The method takes a data parameter that is passed when creating a new node.

```javascript
class LinkedList {
    constructor() {
        this.head = null;
    }

    append(data) {
        const newNode = new Node(data);

        if (this.head == null) {
            this.head = newNode;
        } else {
            let currentNode = this.head;
            while (currentNode.next != null) {
                currentNode = currentNode.next;
            }
            currentNode.next = newNode;
        }
    }
}
```

#### Creation and Manipulation of Linked Lists: Add First

The `addFirst` method adds a new node at the beginning of the Linked List, effectively making it the new `head` of the list.

```javascript
class LinkedList {
    constructor() {
        this.head = null;
    }

    append(data) {
        // ...
    }

    addFirst(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
    }
}
```

#### Creation and Manipulation of Linked Lists: Delete

The `delete` method removes a node with a specific data value from the linked list.

```javascript
class LinkedList {
    constructor() {
        this.head = null;
    }

    append(data) {
        // ...
    }

    addFirst(data) {
        // ...
    }

    delete(data) {
        if (this.head == null) {
            return;
        }

        if (this.head.data === data) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next != null) {
            if (current.next.data === data) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }
}
```

#### BONUS: `show` method

```javascript
class LinkedList {
    constructor() {
        this.head = null;
    }

    append(data) {
        // ...
    }

    addFirst(data) {
        // ...
    }

    delete(data) {
        // ...
    }

    show() {
        let currentNode = this.head;
        let linkedListStr = '';

        while (currentNode?.data != null) {
            linkedListStr += `${currentNode.data} → `;
            currentNode = currentNode.next;
        }

        if (linkedListStr !== '') {
            linkedListStr += 'null';
        }

        console.log(linkedListStr);
    }

    show_usingArray() {
        let currentNode = this.head;
        let linkedListData = [];

        while (currentNode?.data != null) {
            linkedListData.push(currentNode.data);
            currentNode = currentNode.next;
        }

        linkedListData.push('null');

        console.log(linkedListData.join(' → '));
    }
}
```

#### Complexity Analysis of Linked List Operations

In a Linked List, operations take different amounts of time, depending on their nature. Complexity analysis helps us understand both this time factor and memory usage.

For instance, accessing an element in a Linked List has a time complexity of **`O(n)`** because, in the worst-case scenario, we might have to traverse through the entire list. On the other hand, if we're adding or removing a node at the beginning of the list, the operation's time complexity is **`O(1)`** and **`O(n)`** elsewhere.

---

## Mastering Linked List Operations: Reversal and Length Calculation

### Problem 1: Reverse Linked List with Stack

Consider a to-do list on sticky notes, where each task points to the next by stacking on top. You'd want first to reverse this stack to focus on the most recent tasks. Similarly, to reverse the order of a linked list, we'll use a stack data structure.

Imagine an application feature displaying user activities, with the most recent ones appearing first. This requires reversing the list of events to display the latest entries.

#### Approach Explanation: Utilizing a Stack

A stack's **Last-In-First-Out (LIFO)** property can be leveraged here to reverse the list succinctly. Pushing the list node's values onto the stack and then popping them out naturally reverses their order.

#### Solution

```javascript
function printReverse(list) {
    const stack = [];
    let currentNode = list.head;

    while (currentNode != null) {
        stack.push(currentNode.value);
        currentNode = currentNode.next;
    }

    while (stack.length > 0) {
        console.log(stack.pop());
    }
}
```

### Problem 2: Length of Linked List

Calculating the number of elements in a sequence resembles counting sticks in a bundle. We need to determine how many sticks are tied together in our linked list, which represents the list's length.

Suppose you manage a subscription service with a list of subscribers. In that case, calculating how many subscribers are active is similar to determining the list length: each subscriber is linked to the next in your records.

#### Solution Building

To count our subscribers more efficiently, we can iterate through the list while maintaining a count of each node we encounter.

```javascript
function listLength(list) {
    let length = 0;
    let currentNode = list.head;
    while (currentNode != null) {
        length++;
        currentNode = currentNode.next;
    }
    return length;
}
```

---

## Decoding Interview Problems: Mastering Linked Lists

### Problem 1: Linked List Deduplication

Our journey begins with a linked list with several duplicate values, resembling a situation where an email campaign mistakenly sends multiple invites to the same guests. Our goal is equivalent to ensuring each guest receives only one invitation, which means we must eliminate these duplicate nodes from our linked list.

#### Efficient Approach Explanation

Much as you would mark songs you have already checked, we can use a `Set` to keep track of the node values we've seen. When a duplicate value surfaces, we bypass the node altogether, simplifying the process to a manageable single pass through the list or an **`O(n)`** operation — much as you would realize you've already heard this song and skip it. This method efficiently preserves our list's uniqueness, much like that perfect, non-repetitive playlist you'd enjoy on a long drive.

#### Solution Building

```javascript
function removeDuplicates(list) {
    if (list.head == null || list.head.next == null) {
        return list.head;
    }

    let currentNode = list.head;
    const seen = new Set([currentNode.value]);

    while (currentNode.next != null) {
        if (seen.has(currentNode.next.value)) {
            currentNode.next = currentNode.next.next;
        } else {
            seen.add(currentNode.next.value);
            currentNode = currentNode.next;
        }
    }
}
```

### Problem 2: Average of Every Third Element

For our next challenge, let's calculate the average of every third element in a linked list. Picture yourself in a fruit orchard, tasting every third apple to understand the overall harvest quality. While you would only sample some apples, this systematic approach lets you estimate the batch's quality reliably.

Much like our orchard sampling, sampling at consistent intervals can reduce noise in signal processing, helping us focus on signal trends. Consider financial analysts, who might average quarterly results to understand a company's performance trend.

#### Approach Explanation

We'll keep a running sum and a tally of every third element as we traverse the linked list. Once we reach the end, we can easily calculate the average, avoiding extra storage or double-handling of nodes. This simplification keeps our operation at **`O(n)`** complexity, like sampling apples directly from the tree without hauling them all back to the barn first!

#### Solution Building

```javascript
function averageOfEveryThird(list) {
    if (list.head == null) {
        return 0;
    }

    let sum = 0;
    let count = 0;
    let index = 0;
    let currentNode = list.head;

    while (currentNode != null) {
        if ((index + 1) % 3 === 0) {
            sum += currentNode.value;
            count++;
        }
        currentNode = currentNode.next;
        index++;
    }

    return parseFloat((sum / count).toFixed(2));
}
```
