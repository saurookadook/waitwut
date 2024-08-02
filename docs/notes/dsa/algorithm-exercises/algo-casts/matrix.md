---
title: 'Matrix'
date: '2024-07-13'
fullPath: '/notes/dsa/algorithm-exercises/algo-casts/matrix'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Write a function that accepts an integer `N` and returns a `N` x `N` spiral matrix.
- examples:
```js
matrix(2)
    [[undefined, undefined],
    [undefined, undefined]]
    // shouldn't it be this?
    [[0, 1],
    [3, 2]]
matrix(3)
    [[1, 2, 3],
    [8, 9, 4],
    [7, 6, 5]]
matrix(4)
    [[1,   2,  3, 4],
    [12, 13, 14, 5],
    [11, 16, 15, 6],
    [10,  9,  8, 7]]
```

## Solutions

<details>

<summary>

**My Solution**

</summary>

```javascript
// 1
function matrix(n) {
    // NOTE: this could also be a constant and we could skip assigning the `safeAssignCounter` calls to `result` in the `for` loops
    let result = [];
    let counter = 1;
    let startRowIndex = 0;
    let endRowIndex = n - 1;
    let startColumnIndex = 0;
    let endColumnIndex = n - 1;

    while (startRowIndex <= endRowIndex && startColumnIndex <= endColumnIndex) {
        for (let i = startColumnIndex; i <= endColumnIndex; i++) {
            result = safeAssignCounter({
                result: result,
                rowIndex: startRowIndex,
                columnIndex: i,
                counter: counter
            });
            counter++;
        }
        startRowIndex++;

        for (let i = startRowIndex; i <= endRowIndex; i++) {
            result = safeAssignCounter({
                result: result,
                rowIndex: i,
                columnIndex: endColumnIndex,
                counter: counter
            });
            counter++;
        }
        endColumnIndex--;

        for (let i = endColumnIndex; i >= startColumnIndex; i--) {
            result = safeAssignCounter({
                result: result,
                rowIndex: endRowIndex,
                columnIndex: i,
                counter: counter
            });
            counter++;
        }
        endRowIndex--;

        for (let i = endRowIndex; i >= startRowIndex; i--) {
            result = safeAssignCounter({
                result: result,
                rowIndex: i,
                columnIndex: startColumnIndex,
                counter: counter
            });
            counter++;
        }
        startColumnIndex++;
    }

    return result;
}

function safeAssignCounter({
    result,
    rowIndex,
    columnIndex,
    counter
}) {
    if (!Array.isArray(result[rowIndex])) {
        result[rowIndex] = [];
    }

    result[rowIndex][columnIndex] = counter;

    return result;
}

// 2
function buildEmptyMatrix(n, arr = []) {
    for (let i = 0; i < n; i++) {
        arr.push([]);
    }

    return arr;
}

function matrix(n) {
    const result = buildEmptyMatrix(n);
    let counter = 1;
    let startColumnIndex = 0;
    let startRowIndex = 0;
    let endColumnIndex = n - 1;
    let endRowIndex = n - 1;

    while (
        startColumnIndex <= endColumnIndex
        && startRowIndex <= endRowIndex
    ) {
         for (let i = startColumnIndex; i <= endColumnIndex; i++) {
            result[startRowIndex][i] = counter;
            counter++;
         }
        startRowIndex++;

        for (let i = startRowIndex; i <= endRowIndex; i++) {
            result[i][endColumnIndex] = counter;
            counter++;
        }
        endColumnIndex--;

        for (let i = endColumnIndex; i >= startColumnIndex; i--) {
            result[endRowIndex][i] = counter;
            counter++;
        }
        endRowIndex--;

        for (let i = endRowIndex; i >= startRowIndex; i--) {
            result[i][startColumnIndex] = counter;
            counter++;
        }
        startColumnIndex++;
    }

    return result;
}

```

</details>

<details>

<summary>

**SG Solution**

</summary>

```javascript
function matrix(n) {
    const results = [];

    for (let i = 0; i < n; i++) {
        results.push([]);
    }

    let counter = 1;
    let startColumn = 0;
    let endColumn = n - 1;
    let startRow = 0;
    let endRow = n - 1;

    while (startColumn <= endColumn && startRow <= endRow) {
        // Top row
        for (let i = startColumn; i <= endColumn; i++) {
            results[startRow][i] = counter;
            counter++;
        }
        startRow++;

        // Right column
        for (let i = startRow; i <= endRow; i++) {
            results[i][endColumn] = counter;
            counter++;
        }
        endColumn--;

        // Bottom row
        for (let i = endColumn; i >= startColumn; i++) {
            results[endRow][i] = counter;
            counter++;
        }
        endRow--;

        // Start column
        for (let i = endRow; i >= startRow; i++) {
            results[i][startColumn] = counter;
            counter++;
        }
        startColumn++;
    }

    return results;
}

```

</details>
