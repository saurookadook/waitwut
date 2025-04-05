---
title: 'Sorting and Searching Algorithms in JS'
date: '2025-01-03'
fullPath: '/notes/dsa/code-signal/javascript/algos-and-ds/course-2-42'
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

Some applications of binary search that transcend basic searching include applying it to complex data structures, such as _**bitonic arrays**_ and _**rotated sorted arrays**_, to find specific elements efficiently.

### Problem 1: Searching in a Bitonic Array

Consider a bitonic array as a numerical sequence simulating the trajectory of a roller coaster — first, it rises to a peak, then descends. For example, consider the array `[1, 2, 3, 4, 5, 3, 1]`: its first part ascends, and the last descends, making it bitonic. Your goal is to find a value in such an array.

#### Naive Approach

You might walk the entire path, which is exhaustive and represents our naive approach with a time complexity of **`O(n)`**. Our aim today is a more efficient method.

#### Efficient Approach Explained

To apply binary search, we first locate the _peak_ of the array, then perform binary search on either side of the peak: one for the increasing sub-array and one for the decreasing sub-array.

##### Example using iterative binary search

```js
const calculateMidPoint = (start, end) =>
    Math.floor((start + end) / 2);

function findInBitonicArray({ arr, target }) {
    // 1. FIND PEAK OF THE ARRAY
    let start = 0;
    let end = arr.length - 1;
    let midPoint;

    while (start < end) {
        midPoint = calculateMidPoint(start, end);

        if (arr[midPoint] > arr[midPoint + 1]) {
            // Peak is to the left
            end = midPoint;
        } else {
            // Peak is to the right
            start = midPoint + 1;
        }
    }

    // Peak is found
    let peak = start;

    // 2. BINARY SEARCH ON ASCENDING SUB-ARRAY
    start = 0;
    end = peak;
    while (start <= end) {
        midPoint = calculateMidPoint(start, end);
        if (arr[midPoint] === target) return midPoint;
        else if (arr[midPoint] < target) start = midPoint + 1;
        else end = midPoint - 1;
    }

    // 3. BINARY SEARCH ON DESCENDING SUB-ARRAY
    start = peak;
    end = arr.length - 1;
    while (start <= end) {
        midPoint = calculateMidPoint(start, end);
        if (arr[midPoint] === target) return midPoint;
        else if (arr[midPoint] > target) start = midPoint + 1;
        else end = midPoint - 1;
    }

    return -1;
}
```

##### Example using recursive binary search

```js
const directionEnum = {
    ASC: 'ASC',
    DESC: 'DESC',
}

const calculateMidPoint = (start, end) =>
    Math.floor((start + end) / 2);

function binarySearch({ arr, start, end, target, direction }) {
    if (start > end) {
        return -1;
    }

    const midPoint = calculateMidPoint(start, end);

    if (arr[midPoint] == target) {
        return midPoint;
    }

    const comparison = direction === directionEnum.DESC
        ? (arr[midPoint] > target)
        : (arr[midPoint] < target)

    return comparison
        ? binarySearch({ arr, start, end: midPoint - 1, target })
        : binarySearch({ arr, start: midPoint + 1, end, target });
}

function findPeak(arr) {
    let start = 0;
    let end = arr.length - 1;
    let mid;

    while (start < end) {
        mid = calculateMidPoint(start, end);

        if (arr[mid] > arr[mid] + 1) high = mid;
        else start = mid + 1;
    }

    return start;
}

function findInBitonicArray({ arr, target }) {
    // 1. FIND PEAK OF THE ARRAY
    const peak = findPeak(arr);

    // 2. BINARY SEARCH ON ASCENDING SUB-ARRAY
    const start = 0;
    const end = peak;

    const ascResult = binarySearch({
        arr,
        start: 0,
        end: peak,
        target,
        direction: directionEnum.ASC
    });

    // 3. BINARY SEARCH ON DESCENDING SUB-ARRAY
    return ascResult >= 0
        ? ascResult
        : binarySearch({
            arr,
            start: peak,
            end: arr.length - 1,
            target,
            direction: directionEnum.DESC
         });
}

```

### Problem 2: Searching the Minimum Element in a Rotated Sorted Array

Imagine you have a shuffled deck of cards that needs to be reordered. That could be represented with a rotated sorted array. For example, if we rotate array `[1, 2, 3, 4, 5]`, we could get `[3, 4, 5, 1, 2]`.

#### Naive Approach

You could check each element, one by one, to find the lowest, which is our naive approach with a time complexity of **`O(n)`**. Or, we could use binary search for a more efficient find.

#### Efficient Approach Explained

For the naive approach to finding the minimum element in a rotated sorted array, we'd sequentially traverse the array until we found the point where the current element is less than the preceding element, indicating the minimum.

Instead, we adopt binary search to identify the rotation point, which harbors the smallest element. This is like deducing the first card in the shuffled deck without flipping through every card.

#### Solution Building: Leveraging Binary Search

```js
function findMinimumInRotatedSortedArray(arr) {
    let start = 0;
    let end = arr.length - 1;
    let midPoint;

    // Akin to deducing where the deck split happened
    while (start < end) {
        midPoint = Math.floor((start + end) / 2);

        // NOTE: flip this comparison to get the MAXIMUM value
        if (arr[midPoint] > arr[end]) {
            // Rotation point is to the right
            start = midPoint + 1;
        } else {
            // Or to the left?
            end = midPoint;
        }
    }

    // Rotation point is found
    return arr[start];
}
```

### Practice Problem 1

Alright, Space Voyager, here's your next assignment, a real noggin' buster! You have an array of unique numbers forming a 'bitonic sequence'. Now, that's a fancy term for a sequence that first increases, hits a peak, and then decreases. Just picture a cosmic roller coaster ride!

Your mission? Create a function, findPosition, that returns the 'index' of a given number, 'x', from that array. If 'x' is in hyperspace and not in our sequence, return -1.

Let's be precise: an input to findPosition is a number you want to locate, and the output is either the number's first occurrence position or -1 if the number does not exist. Now, go supe up your code engines, Voyager! You got this!

```js
const calculateMidPoint = (start, end) =>
    Math.floor((start + end) / 2);

function findPeak(arr) {
    let low = 0;
    let high = arr.length - 1;
    let mid;

    while (low < high) {
        mid = calculateMidPoint(low, high);
        if (arr[mid] > arr[mid + 1]) high = mid;
        else low = mid + 1;
    }

    return low;
}

function binarySearch({ arr, target, low, high, ascending }) {
    if (low > high) return -1;

    const mid = calculateMidPoint(low, high);

    if (arr[mid] === target) return mid;

    // const comparisonForDirection = (ascending && arr[mid] < target) || arr[mid] > target
    // return comparisonForDirection
    //     ? binarySearch({ arr, target, ascending, low: mid + 1, high })
    //     : binarySearch({ arr, target, ascending, low, high: mid - 1 });


    const commonArgs = (ascending && arr[mid] < target) || arr[mid] > target ? {
            low: mid + 1,
            high
        } : {
            low,
            high: mid - 1
        };

    return binarySearch({ arr, target, ascending, ...commonArgs });
}

// function binarySearch({ arr, target, low, high, ascending }) {
//     const peak = findPeak(arr);
//     let start;
//     let end;
//     let mid;

//     // 2. BINARY SEARCH ON ASCENDING SUB-ARRAY
//     start = 0;
//     end = peak;
//     while (start <= end) {
//         midPoint = calculateMidPoint(start, end);
//         if (arr[midPoint] === target) return midPoint;
//         else if (arr[midPoint] < target) start = midPoint + 1;
//         else end = midPoint - 1;
//     }

//     // 3. BINARY SEARCH ON DESCENDING SUB-ARRAY
//     start = peak;
//     end = arr.length - 1;
//     while (start <= end) {
//         midPoint = calculateMidPoint(start, end);
//         if (arr[midPoint] === target) return midPoint;
//         else if (arr[midPoint] > target) start = midPoint + 1;
//         else end = midPoint - 1;
//     }

//     return -1;

//     // while (low <= high) {
//     //     mid = Math.floor(low + (high - low) / 2);
//     //     if (arr[mid] == x) {
//     //         return mid;
//     //     } else if (ascending) {
//     //         if (arr[mid] < x) {
//     //             low = mid + 1;
//     //         } else {
//     //             high = mid - 1;
//     //         }
//     //     } else {
//     //         // TODO: implement descending binary search logic
//     //     }
//     // }
//     // return -1;
// }

function findPosition({ arr, target }) {
        // TODO: find peak using the implemented findPeak function
        const peak = findPeak(arr);
        // TODO: search to the left of the peak
        const leftResult = binarySearch({
            arr,
            target,
            low: 0,
            high: peak,
            ascending: true,
        });
        // TODO: search to the right of the peak
        return leftResult >= 0
            ? leftResult
            : binarySearch({
                arr,
                target,
                low: peak,
                high: arr.length - 1,
                ascending: false
            });
}

const bitonicArray = [-3, -2, 4, 6, 10, 8, 7, 1];
const x = 7;
const position = findPosition({ arr: bitonicArray, target: x });

if (position === -1) {
    console.log("Element not present");
} else {
    console.log(`Element present at index ${position}`);
}
```

## Sorting Data Swiftly: Quick Sort in JavaScript Explained

**Quick Sort** details:
- devised by Tony Hoare in 1959
- a speedy sorting algorithm akin to sorting toys by size
- leverages the divide-and-conquer strategy, whereby it selects a pivot element and then arranges all smaller elements to one side and larger ones to the other

### Quick Sort Under The Hood

Quick Sort operates in three steps:

1. Selecting a pivot.
2. Shifting elements smaller than the pivot to one side, and moving elements larger than the pivot to the other side.
3. Repeating these steps for both sides separately.

Consider, for instance, sorting `[3, 9, 4, 7, 5, 1, 6, 2, 8]` with `7` as the pivot. After one round, it becomes `[3, 4, 5, 1, 6, 2, 7, 9, 8]`. The pivot `7` is correctly placed, and we can then divide the array into two parts: `[3, 4, 5, 1, 6]` and `[9, 8]`, which can be sorted separately.

### Quick Sort Implementation in JavaScript

This implementation is going to consist of 2 parts: [Partition](#part-1-partition) and [Sorting](#part-2-sorting).

#### Part 1: Partition

First, we partition the array around the pivot in our partition function:

```js
function partition(arr, low, high) {
    const pivot = arr[high]; // The pivot is the last element
    let i = low - 1;

    for (let j = low; j < high; j++) {
        // If the current element is smaller than the pivot
        if (arr[j] <= pivot) {
            i++;
            // Swap the current element with the element at index i
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    // Position the pivot in the correct position in the array
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

```

In this portion of the code, we selected the last element as the pivot and placed smaller elements on the left.

The function starts by initializing `i` to one index before the `start`. This `i` basically keeps track of the latest position where an element has been swapped because it was less than or equal to the pivot. If `arr[j]` is less than or equal to the pivot, `i` is incremented and then `arr[j]` is swapped with `arr[i]`. Essentially, smaller elements get pushed towards the front of the array (or the given part of the array).

The `start` and `end` parameters control which part of the given array is under the partition operation. Using these parameters, we can apply partition to some part of the array, which will be helpful later.

#### Part 2: Sorting

Then, we apply **Quick Sort** with a function that invokes partition and recursively sorts the two halves:

```js
function quickSort(arr, low, high) {
    if (low < high) {
        const pivot = partition(arr, low, high);
        // Recursively sort the left half
        quickSort(arr, low, pivot - 1);
        // Recursively sort the right half
        quickSort(arr, pivot + 1, high);
    }
}

```

### Honing In On Quick Sort Efficiency

The time complexity of **Quick Sort** can vary. Generally speaking, the more unique items there are, the quicker **Quick Sort** works. In the best and average cases, it shines with a time complexity of **`O(n∗log(n))`**. However, the time complexity can degrade to **`O(n^2)`** in the worst case.

## Merge Sort Mastery: Sorting Arrays Efficiently in JavaScript

### Understanding the Merge Process in JavaScript

First, let's build a `merge()` function in JavaScript. It merges two sorted arrays into a single sorted array. Think of it as combining two sorted stacks of cards into one sorted stack.

```js
function merge(left, right) {
    const resultArray = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            // the smaller of the two elements is added to the result array
            resultArray.push(left[leftIndex]);
            // move to the next element in the left array
            leftIndex++;
        } else {
            // same as above but with the right array
            resultArray.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return resultArray
        .concat[left.slice(leftIndex)]
        .concat[right.slice(rightIndex)];
}
```

The `merge()` function above takes two sorted arrays (`left` and `right`) and combines them into one sorted array (`resultArray`).

Seemingly tricky, the code is very straightforward:

1. We place two pointers, `leftIndex` and `rightIndex`, at the beginning of the `left` and `right` arrays.
2. We choose the smaller element, put it in the final array `resultArray`, and move the corresponding pointer further.
3. We keep doing this until one of the pointers reaches the end of its array.

We stop the process when one of the pointers reaches the end of its array, but some elements could be left in the other array.

To handle this, we copy the remaining elements of both arrays (if any) to the end of the resulting `arr` array, using `.concat` method.

### Implementing Merge Sort using JavaScript

Next, we'll implement the complete **Merge Sort** algorithm in JavaScript. This process involves splitting an array into halves until we reach an array containing only one element. Arrays of one element are naturally sorted so that we can merge them into one sorted array. Then, we can merge the obtained arrays of two elements. This process goes until we merge all arrays into one sorted array.

```js
function merge(left, right) {
    const resultArray = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            // the smaller of the two elements is added to the result array
            resultArray.push(left[leftIndex]);
            // move to the next element in the left array
            leftIndex++;
        } else {
            // same as above but with the right array
            resultArray.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return resultArray
        .concat[left.slice(leftIndex)]
        .concat[right.slice(rightIndex)];
}

function mergeSort(unsortedArray) {
    if (unsortedArray.length <= 1) {
        // If the array has only one element, it's already sorted
        return unsortedArray;
    }

    // This will get the midpoint of the array
    const middle = Math.floor(unsortedArray.length / 2);
    // We split the array into two halves
    const left = unsortedArray.slice(0, middle);
    const right = unsortedArray.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}
```

### Strengths and Pitfalls of Merge Sort

**Merge Sort** is consistent in performance, making it reliable. **Merge Sort** has impressive time complexity of **`O(n log n)`**. This makes it a top contender when sorting large datasets! However, it does use extra memory during the merge process. Think of this as sorting a deck of cards: you need space to spread them out before shuffling them back together.

## Mastering the Sort Function: Organizing Data in JavaScript

### Custom Sorting with JavaScript's Sort Function

The true power of `sort()` reveals itself when you provide a compare function. This function determines the sorting order. Let's look at an array of scores sorted in descending order:

```javascript
let scores = [60, 90, 82, 100, 56];
scores.sort((a, b) => b - a);

console.log(scores); // Output: [100, 90, 82, 60, 56]
```

### Multi-Factor Sorting in JavaScript

We can sort arrays on multiple layers using JavaScript's `sort()` function. This technique is called multi-factor sorting.

Consider an array of objects representing students, with each object containing the student's name and grade. We can sort this array by grade and name within each grade.

```javascript
let students = [
    { name: "Tom", grade: 90 },
    { name: "Jerry", grade: 95 },
    { name: "Mickey", grade: 90 },
    { name: "Donald", grade: 95 }
];

students.sort((a, b) => {
    if (a.grade < b.grade) return -1;
    if (a.grade > b.grade) return 1;

    // Here, `grade` is same so we sort by `name`
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;

    return 0;
});

/* Slightly more DRY solution */
const sortOrderProperties = [
    'grade',
    'name',
];

students.sort((a, b) => {
    for (const property of sortOrderProperties) {
        if (a[property] < b[property]) return -1;
        if (a[property] > b[property]) return 1;
    }

    return 0;
});

```

## Advanced Techniques with Sorting Algorithms: K-th Largest Element and Inversion Count

### Problem 1: Finding K-th Number in an Array

Picture an array of numbers and a number `k`. Your mission is to discover the `k`-th smallest number in that array. `k` starts from `1`, so when `k = 1`, we seek the smallest number; when `k = 2`, we want the second smallest, and onwards.

#### Simple Solutions

The first solution might involve scanning and shrinking the array by removing the smallest number until you reach the `k`-th smallest. But this method, while straightforward, has a time complexity of **`O(n^2)`** due to continuous array rewriting.

An efficient plan might be to sort the array and then directly select the `k`-th number:

```javascript
inputArray.sort((a, b) => a - b);
return inputArray[k - 1];
```

This method has a better time complexity - **`O(n*log n)`**. But can we do even better? Quick Sort thinks so.

#### Quick Sort to the Rescue

Quick Sort can provide an optimal solution.
- We’ll divide the array into two parts using a pivot:
  - the left side contains numbers less than the pivot
  - the right side has all greater numbers
- If the pivot's position equals `k`, that's our answer! If not, we repeat the process on the necessary partition.

##### Building the Solution

###### Partition

```javascript
/**
 * @description Partitions array in place
 * @param {Array} arr
 * @param {number} low
 * @param {number} high
 * @returns {number} Position of new low value
 */
function partitionForSmallest(arr, low, high) {
    console.log('    partitionForSmallest    '.padStart(80, '|').padEnd(120, '|'))
    console.log({
        place: 'START',
        arr,
        low,
        high,
    });
    const pivot = arr[low];
    let newLow = low;

    for (let j = low + 1; j <= high; j++) {
        if (arr[j] <= pivot) {
            newLow++;
            [arr[newLow], arr[j]] = [arr[j], arr[newLow]];
        }
    }

    [arr[newLow], arr[low]] = [arr[low], arr[newLow]];
    console.log('\n', {
        place: 'END',
        arr,
        newLow,
        low,
        high,
    });
    console.log(''.padStart(120, '|'));
    return newLow;
}

function partitionForLargest(arr, low, high) {
    console.log('    partitionForLargest    '.padStart(80, '|').padEnd(120, '|'))
    console.log({
        fnName: 'START',
        arr,
        low,
        high,
    });
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        if (arr[j] >= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    console.log('\n', {
        fnName: 'END',
        arr,
        newLow: i + 1,
        low,
        high,
    });
    console.log(''.padStart(120, '|'));
    return i + 1;
}
```

###### Main Logic

- if pivot's position equals `k`, return pivot
- else, check appropriate partition

```javascript
const partition = partitionForSmallest

const lessThanArrayPortionLength = (x, start, end) => {
    const arrayPortionLength = end - start + 1
    return x <= arrayPortionLength;
}

function kthSmallest(arr, start, end, k) {
    if (k > 0 && lessThanArrayPortionLength(k, start, end)) {
        const pivotPosition = partition(arr, start, end);
        // if pivot's position === k
        if (pivotPosition - start === k - 1) {
            return arr[pivotPosition];
        }

        return (pivotPosition - start > k - 1)
            ? kthSmallest(arr, start, pivotPosition - 1, k)
            : kthSmallest(arr, pivotPosition + 1, end, k - pivotPosition + start - 1);
    }

    return Number.MAX_SAFE_INTEGER;
}

function findKthSmallest(numbers, k) {
    if (!numbers || numbers.length < k) return Number.MIN_SAFE_INTEGER;
    return kthSmallest(numbers, 0, numbers.length - 1, k);
}

console.log(findKthSmallest([1, 7, 2, 4, 2, 1, 6], 5));  // Prints 4
```

**Additional notes about solution**

`Number.MIN_SAFE_INTEGER` is returned by `findKthSmallest` if the input array `numbers` is empty or has fewer elements than `k`. This could represent a case where the `k` smallest value doesn't exist.

`Number.MAX_SAFE_INTEGER` is used in the `kthSmallest` function if `k` is either less than 1 or greater than the length of the portion of the array being considered. This could mean that there's an error in the `k` parameter passed, or the array doesn't have enough elements.

These extreme values are used because they are unlikely to be a valid result in any normal situation, making it easy to spot when something has gone wrong. It's a convention to return values which clearly indicate error situations, aiding in debugging and error handling.

### Problem 2: Counting Flips in an Array

Problem two presents an array; your challenge is counting the **flips** or **inversions**. An **inversion** is _a pair of numbers with the higher one coming first_.

For instance, in `numbers = [4, 2, 1, 3]`, there are **4 inversions**: `(4, 2)`, `(4, 1)`, `(4, 3)`, and `(2, 1)`.

#### Using Merge Sort
Merge Sort can efficiently solve this. It sorts an array in **`O(n*log n)`** by splitting it, sorting the halves, and merging them. During this process, we can count the inversions.

When merging, a smaller number on the right than a number on the left reveals an inversion. And it's not just one: there are as many inversions as the remaining numbers on the left.

##### Building the Solution

###### Helper Function

```javascript
function mergeAndCount(arr1, arr2) {
    let i = 0;
    let j = 0;
    let merged = [];
    let inversions = 0;

    while (i < arr1.length || j < arr2.length) {
        if (i === arr1.length) {
            merged.push(arr2[j]);
            j++;
        } else if (j === arr2.length) {
            merged.push(arr1[i]);
            i++;
        } else if (arr1[i] <= arr2[j]) {
            merged.push(arr1[i]);
            i++
        } else {
            merged.push(arr2[j]);
            j++;
            inversions += (arr1.length - i);
        }
    }

    return [merged, inversions];
}
```

###### Main Function

```javascript
function countInversions(arr) {
    if (arr.length === 1) return [arr, 0];

    const middle = Math.floor(arr.length / 2);
    const [left, leftInversions] = countInversions(arr.slice(0, middle));
    const [right, rightInversions] = countInversions(arr.slice(middle));
    const [merged, mergedInversions] = mergeAndCount(left, right);

    return [
        merged,
        leftInversions + rightInversions + mergedInversions,
    ];
}

console.log(countInversions([4, 2, 1, 3])); // Prints [ [ 1, 2, 3, 4 ], 4 ]

```
