---
title: 'Sorting'
date: '2024-07-13'
fullPath: '/notes/dsa/algorithm-exercises/algo-casts/sorting'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Implement `bubbleSort`, `selectionSort`, and `mergeSort`

## Solutions

### JS

<details>

<summary>

**Bubble Sort**

</summary>

```javascript
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < (arr.length - i - 1); j++) {
            if (arr[j] > arr[j+1]) {
                const lesser = arr[j+1];
                arr[j+1] = arr[j]
                arr[j] = lesser;
            }
        }
    }

    return arr;
}
```

</details>

<details>

<summary>

**Selection Sort**

</summary>

```javascript
function selectionSort(arr) {
    let lesser;

    for (let i = 0; i < arr.length; i++) {
        let indexOfMin = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[indexOfMin]) {
                indexOfMin = j;
            }
        }

        if (indexOfMin !== i) {
            lesser = arr[indexOfMin];
            arr[indexOfMin] = arr[i];
            arr[i] = lesser;
        }
    }

    return arr;
}
```

</details>

<details>

<summary>

**Merge Sort**

</summary>

```javascript
function mergeSort(arr) {
    if (arr.length === 1) {
        return arr;
    }

    const center = Math.floor(arr.length / 2);
    const left = arr.slice(0, center);
    const right = arr.slice(center);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    const results = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            results.push(left.shift());
        } else {
            results.push(right.shift());
        }
    }

    // NOTE: is the spread operator performant?
    return [...results, ...left, ...right];
}
```

</details>
