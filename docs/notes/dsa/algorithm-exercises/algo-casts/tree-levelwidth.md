---
title: 'Tree: Level Width'
date: '2024-07-13'
fullPath: '/notes/algorithm-exercises/algo-casts/tree-levelwidth'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Given the root `Node` of a tree, return an array where each element is the width of the tree at each level.
- example:
```
Given:
    0
  / |  \
1   2   3
|       |
4       5
Answer: [1, 3, 2]
```

## Solutions

### JS

<details>

<summary>

**My Solution**

</summary>

```javascript
function levelWidth(root) {
    const LEVEL_SEPARATOR = 'level-separator';
    const levels = [0];

    if (root.children === 0) {
        return levels;
    }

    const arr = [root, LEVEL_SEPARATOR];

    while (arr.length > 1) {
        const node = arr.shift();

        if (node instanceof Node) {
            if (node.children.length > 0) {
                arr.push(...node.children);
            }
            levels[levels.length - 1]++;
        } else if (node === LEVEL_SEPARATOR) {
            levels.push(0);
            arr.push(LEVEL_SEPARATOR);
        }
    }

    return levels;
}

```

</details>

<details>

<summary>

**SG Solution**

</summary>

```javascript
function levelWidth(root) {
    const arr = [root, 's'];
    const counters = [0];

    while (arr.length > 1) {
        const node = arr.shift();

        if (node === 's') {
            counters.push(0);
            arr.push('s');
        } else {
            arr.push(...node.children);
            counters[counters.length - 1]++;
        }
    }

    return counters;
}
```

</details>
