---
title: 'Hashing, Dictionaries, and Sets in JS'
date: '2024-10-07'
fullPath: '/notes/dsa/code-signal/javascript/algos-and-ds/course-1-41'
sectionSlug: 'notes'
---

## 1: Mastering Uniqueness and Disjointness with JavaScript Sets

`Sets` in JavaScript are a powerful way to handle collections of unique items, making them the ideal data structure for solving uniqueness and membership testing problems.

### Problem 1.1: Check if Two Sets are Disjoint

Let's begin by considering the function `areDisjoint`, which takes two arrays and determines if they are disjoint, meaning they have no elements in common. This is crucial when analyzing datasets for overlapping values, similar to ensuring that two puzzle pieces from different puzzles don't fit together.

Think of two companies looking to cross-promote products but wishing to target customers who have yet to interact with both brands. Ensuring that their promotional efforts are disjoint becomes essential.

#### Problem 1.1: Naive Approach

A naive approach would be to iterate over every element in the first array and, for each one, check every element in the second array for a match. This could be likened to standing at the junction of two busy streets and comparing every passerby on one side with every passerby on the other, looking for twins. The time cost grows prohibitively with the number of "passersby," making this method inefficient for larger datasets.

#### Problem 1.1: Efficient Solution Building

Consider a scenario with a list of names and a super-fast scanner that can immediately tell you whether a name is on the list. In JavaScript terms, this is what `Sets` offer via their `has` method — a way to check presence in constant time.

Let's build the solution, with this analogy in mind, step by step:

1. Transfer the elements of one array into our super-fast scanner, a.k.a. a `Set` called `set1`.
2. Feed names from the other array to the scanner using the `.some()` method to check if `set1` can find a match. The `.some()` method tests whether at least one element in the `set` passes the test implemented by the provided function.
3. Since we want to determine whether there are no twins _(common elements)_, we invert the result of `.some()` because it returns `true` if it finds at least one match.

```javascript
function areDisjoint(array1, array2) {
    const set1 = new Set(array1);
    return !array2.some((element) => set1.has(element));
}

console.log(areDisjoint(['Alice', 'Bob', 'Charlie'], ['Xander', 'Yasmine', 'Zane']))
// #=> true (no common names)
console.log(areDisjoint(['Alice', 'Bob', 'Charlie'], ['Charlie', 'Delta', 'Echo']))
// #=> false ('Charlie' is common to both)
```

This code illustrates how `Sets` can quickly indicate whether two lists share elements, producing `true` for completely disjoint lists and `false` otherwise.

### Problem 1.2: Remove Duplicates in an Array

Now, we move on to a common data-cleaning problem: removing duplicates from an array. Consider a librarian cataloging books; duplicates waste space and need clarification. Like the librarian, we want our array to contain unique entries.

#### Problem 1.2: Approaches

The naive approach would involve creating a new list and adding only those items that aren't present, akin to checking each book against the entire catalog before shelving it. This method is impractical for a library of any considerable size due to its squared time complexity.

Let's consider the efficient approach. Enter JavaScript `Sets`, which adhere to the principle that "each member is unique." By converting our array into a `Set`, we automatically remove duplicates

#### Problem 1.2: Solution Building

Let's look at how we can neatly apply this in code:

1. Create a `Set` from our array. We had an assistant who automatically filtered out duplicate names from our lists.
2. Convert our `Set` _(now containing unique names)_ back into an array, ready for use in our guest list system.

```javascript
function removeDuplicates(array) {
    return Array.from(new Set(array));
}

console.log(removeDuplicates(['apple', 'apple', 'banana', 'banana', 'cherry']));
// #=> ['apple', 'banana', 'cherry']
console.log(removeDuplicates([1, 5, 3, 5, 2, 2, 1]));
// #=> [1, 5, 3, 2]
```

These examples demonstrate how `Sets` elegantly handle duplicate removal, producing arrays that succinctly represent the unique elements they originally contained.

---

## 2: Unraveling Uniqueness and Anagram Mysteries with JavaScript Sets

### Problem 2.1: Unique Echo

Picture this: you're given a vast list of words, and you must identify the final word that stands proudly solitary — the last word that is not repeated. Imagine sorting through a database of unique identifiers and finding one identifier towards the end of the list that is unlike any others.

#### Problem 2.1: Naive Approach

The straightforward approach would be to examine each word in reverse, comparing it to every other word for uniqueness. This brute-force method would result in poor time complexity, **`O(n^2)`**, which is less than ideal for large datasets.

#### Problem 2.1: Efficient Approach

We can use two `Set` instances:

- `wordsSet` to maintain unique words
- `duplicatesSet` to keep track of duplicate words

By the end, we can remove all duplicated words from `wordsSet` to achieve our goal. Here is how to use `Set` to solve the problem.

1. Create a `Set` instance to store unique words.
2. Initialize another `Set` to monitor duplicates.
3. Iterate the word array, filling `wordsSet` and `duplicateSet`.
4. Use a loop to remove all duplicated words from `wordsSet`.
5. Now, `wordsSet` only contains unique words. Find the last unique word by iterating through the original word list from the end and return the last unique word.

```js
function findLastUniqueWord(words) {
    const wordsSet = new Set();
    const duplicatesSet = new Set();

    words.forEach((word) => {
        if (wordsSet.has(word)) {
            duplicatesSet.add(word);
        }

        wordsSet.add(word);
    });

    duplicatesSet.forEach((word) => {
        wordsSet.delete(word);
    });

    for (let i = words.length - 1; i >= 0; i--) {
        if (wordsSet.has(words[i])) {
            return words[i];
        }
    }

    return ''
}
```

This efficient approach, with a time complexity closer to **`O(n)`**, is far superior to the naive method and showcases your proficiency at solving algorithmic problems with JavaScript's `Set`.

### Problem 2.2: Anagram Matcher

Now, imagine a different scenario in which you have two arrays of strings, and your task is to find all the words from the first array that have an anagram in the second array.

#### Problem 2.2: Efficient Approach

We'll create a unique signature for each word by sorting its characters and then compare these signatures for matches. We'll use `Set` to store signatures for efficient access.

#### Problem 2.2: Solution Building

1. Construct a function to create sorted character signatures from the input string.
2. Store these sorted characters from `array2` in a `Set` for fast lookup.
3. For each word in `array1`, check for its sorted signature in the `Set` and track the found anagrams by adding them to the `result` `Array`.
4. Return `result`.

```javascript
function sortCharacters(input) {
    return [...input].sort().join('');
}

function findAnagrams(array1, array2) {
    let sortedWordsInArray2 = new Set();

    array2.forEach((word) => {
        sortedWordsInArray2.add(sortCharacters(word));
    })

    let result = [];
    let anagramsMatched = new Set();

    array1.forEach((word) => {
        if (sortedWordsInArray2.has(sortCharacters(word))) {
            result.push(word);
            // TODO: what's this for...?
            anagramsMatched.add(word);
        }
    });

    return result;
}
```

By utilizing `Sets` in this manner, we achieve efficient anagram checking with reduced complexity, considering both the **`O(m * logm)`** character sorting for each word and the **`O(n)`** comparison for **`n`** words.

### Practice Task

Picture two spacecraft log files, each a whole array of words. Your mission? Find the words from the second log file that have an anagram in the first log file. Then, add up the length of these matching anagram words. You must return this total length as a number. Now, remember, anagrams are words that have the same letters but rearranged. If a word has no anagram in the other array, abandon it.

```javascript
function sortCharacters(input) {
    return input.split('').sort().join('');
}

function findAnagrams(array1, array2) {
    const sortedWordsInArray1 = new Set();

    array1.forEach((word1) => sortedWordsInArray1.add(sortCharacters(word1)));

    const anagrams = [];

    array2.forEach((word2) => {
        if (sortedWordsInArray1.has(sortCharacters(word2))) {
            anagrams.push(word2)
        }
    });

    return anagrams.reduce((acc, cur) => {
        return acc + cur.length;
    }, 0)
}

let array1 = ["cat", "dog", "tac", "god", "act"];
let array2 = ["tca", "ogd", "atc", "taco"];
let result = findAnagrams(array1, array2);
console.log(result);   // output: 9

```

---

## Mastering JavaScript Maps: Keys to Efficient Data Handling

### Dive Into JavaScript Maps

Maps provide some essential built-in methods:

- `set(key, value)`: Stores a key-value pair.
- `get(key)`: Retrieves the value of a key.
- `has(key)`: Checks if a key exists and returns true or false.
- `delete(key)`: Erases a key-value pair.
- `size`: Returns the count of key-value pairs.

```js
let myMap = new Map();

// Add pairs with set
myMap.set('apples', 10); // Adds a new pair
myMap.set('bananas', 6); // Adds another pair

// Use get
console.log(myMap.get('apples')); // Outputs: 10, gets apples' value

// Apply has
console.log(myMap.has('bananas')); // Outputs: true, checks for bananas' existence

// Delete with delete
myMap.delete('bananas'); // Deletes bananas and its value from the map

// Check size
console.log(myMap.size); // Outputs: 1; gives the number of pairs

```

### Behind The Scenes: Maps in Memory Management

JavaScript uses a Hash Table to implement Maps. This table ensures the Map's size adjusts based on the stored data, optimizing memory usage.

### Time Complexity Analysis of Map Operations

The time complexity of `get`, `set`, `has`, and `delete` operations in Maps is `O(1)`. This signifies that they execute instantly, regardless of the Map's size.

Imagine running a store with thousands of items. A Map lets you quickly handle any item!

```js
let superstoreStock = new Map();

// Stock item
superstoreStock.set('toothpaste', 1000); // Stock 1000 toothpaste
superstoreStock.set('soap', 500); // Stock 500 soap
superstoreStock.set('shampoo', 800); // Stock 800 shampoo

// Purchase is made
console.log(superstoreStock.get('toothpaste')); // Outputs: 1000 (current quantity)
superstoreStock.set('toothpaste', superstoreStock.get('toothpaste') - 1); // Toothpaste is bought
console.log(superstoreStock.get('toothpaste')); // Outputs: 999 (updated quantity)

// Item is out of stock, will be replaced later
superstoreStock.delete('soap'); // Soap is removed
console.log(superstoreStock.has('soap')); // Outputs: false

// Item is restocked
superstoreStock.set('soap', 500); // Soap is restocked
console.log(superstoreStock.has('soap')); // Outputs: true
```

## 3. Efficient Data Management with JavaScript Maps

### Problem 3.1: Count Word Frequencies in a Text

Imagine we have a blog. We want to analyze the posts to see which topics are most discussed. A practical solution involves writing a function to count the frequency of each word in a blog post while ignoring case and punctuation.

This function is essential in text analysis tools used in search engine optimization. It can highlight popular topics and even suggest post tags, increasing visibility in search results.

#### Problem 3.1: Naive Approach

Straight away, we might think to tally word occurrences — an extra tedious process manually! This would mean extra loops, slow performance, and our time is too valuable to be inefficient.

#### Problem 3.1: Efficient Approach

Instead, Maps are handy, allowing us to map each unique word to its frequency count effortlessly. With this in mind, we can track how often each word appears with far less code and do it faster!

Let's start by creating a function and cleaning up our input: remove punctuation and convert it to lowercase for consistency.

```js
function countWordFrequencies(text) {
    const normalizedText = text.toLowerCase().replace(/[^\w\s]/g, "");
    const words = normalizedText.split(/\s+/);
    const frequencyMap = new Map();

    let count;
    for (const word of words) {
        count = frequencyMap.get(word) || 0;
        frequencyMap.set(word, count + 1);
    }

    return frequencyMap;
}
```

### Problem 3.2: Find Sum of Values in a Hashmap

Shifting gears to numbers, let's say we have a map representing a simple ledger with categories such as keys and expenses as values. How do we find the total of all categories?

In real life, this could represent a personal finance app displaying your monthly spending. Quickly summing these values gives a clear picture of your financial health — a cornerstone of such an app's utility.

#### Problem 3.2: Approach and Solution Building

Instead, the JavaScript Map's `.values()` method gives us a direct path to iterate over all the values needed for our sum. It's all about having the right tool for the job!

```js
function sumOfMapValues(numberMap) {
    let sum = 0;

    for (const value of numberMap.values()) {
        sum += value;
    }

    return sum;
}
```

---

## 4. Solving Algorithmic Puzzles with JavaScript Maps

### Problem 4.1: Celebrity Element Identification

Let's put it in a familiar scenario: at a party, it's easy to notice that one person everyone seems to know. This person, akin to the "celebrity" at the party, serves as the analogy for an element in an array that appears more than half the time — our task is to identify this celebrity element amid a crowd of numbers.

#### Problem 4.1: Naive Approach

The naive way to identify this celebrity is to count the occurrences of each number by looping over the array for each element and seeing if it repeats sufficiently to be our star. Computationally, this translates to significant time (quadratic time complexity) for larger arrays — an apparent inefficiency.

#### Problem 4.1: Efficient Approach Explanation

Now, let's be savvy about this. Enter the `Map`: your sophisticated voting tally system. With it, you can keep a running total of each element appearance as you go through the array once rather than reviewing the entire list for each integer.

```js
function findLeaderInArray(arr) {
    const countMap = new Map();
    const majorityThreshold = arr.length / 2;

    for (const num of arr) {
        const currentCount = countMap.get(num) || 0;
        countMap.set(num, currentCount + 1);

        if (countMap.get(num) > majorityThreshold) {
            return num;
        }
    }

    return -1;
}

```

### Problem 4.2: Keyword Document Indexer

Now, let's transition to a digital library setting, where you want to find all articles that mention a specific word, say "sustainability." Just like a librarian who quickly locates books on a topic, we need an efficient system to index words to documents in which they appear — a task vital for modern search engines to function effectively.

#### Problem 4.2: Naive Approach

Manually scanning through each document to note every word's occurrence, akin to flipping through each book's pages, is our naive approach. This might be manageable for a small number of short documents, but as the library grows, this approach becomes untenable — not to mention it can lead to errors and duplicates.

#### Problem 4.2: Efficient Approach

Employing `Map`s and `Set`s in JavaScript is akin to using a digital catalog system — swift, error-free, and capable of efficiently handling extensive volumes of data. This approach provides the quick lookup functionality to link words with documents effectively.

```js
function createKeywordIndex(documents) {
    const wordsIndex = new Map();

    documents.forEach((doc, docIndex) => {
        const words = doc.split(/\s+/);

        words.forEach((word) => {
            if (wordsIndex.has(word)) {
                wordsIndex.get(word).add(docIndex);
            } else {
                index.set(word, new Set([docIndex]));
            }
        })
    });

    return wordsIndex;
}
```
