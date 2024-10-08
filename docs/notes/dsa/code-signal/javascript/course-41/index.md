---
title: 'Hashing, Dictionaries, and Sets in JS'
date: '2024-10-07'
fullPath: '/notes/dsa/code-signal/javascript/course-41'
sectionSlug: 'notes'
---

`Sets` in JavaScript are a powerful way to handle collections of unique items, making them the ideal data structure for solving uniqueness and membership testing problems.

## Problem 1: Check if Two Sets are Disjoint
Let's begin by considering the function `areDisjoint`, which takes two arrays and determines if they are disjoint, meaning they have no elements in common. This is crucial when analyzing datasets for overlapping values, similar to ensuring that two puzzle pieces from different puzzles don't fit together.

Think of two companies looking to cross-promote products but wishing to target customers who have yet to interact with both brands. Ensuring that their promotional efforts are disjoint becomes essential.

### Naive Approach
A naive approach would be to iterate over every element in the first array and, for each one, check every element in the second array for a match. This could be likened to standing at the junction of two busy streets and comparing every passerby on one side with every passerby on the other, looking for twins. The time cost grows prohibitively with the number of "passersby," making this method inefficient for larger datasets.

### Efficient Solution Building
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

## Problem 2: Remove Duplicates in an Array
Now, we move on to a common data-cleaning problem: removing duplicates from an array. Consider a librarian cataloging books; duplicates waste space and need clarification. Like the librarian, we want our array to contain unique entries.

### Approaches
The naive approach would involve creating a new list and adding only those items that aren't present, akin to checking each book against the entire catalog before shelving it. This method is impractical for a library of any considerable size due to its squared time complexity.

Let's consider the efficient approach. Enter JavaScript `Sets`, which adhere to the principle that "each member is unique." By converting our array into a `Set`, we automatically remove duplicates

### Solution Building
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
