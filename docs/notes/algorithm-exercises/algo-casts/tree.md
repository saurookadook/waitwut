---
title: 'Tree'
date: '2024-07-13'
fullPath: '/notes/algorithm-exercises/algo-casts/tree'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

1. Create a `Node` class.
    - The constructor should accept an argument that gets assigned to the `data` property and initialize an empty array for storing `children`.
    - The `Node` class should have methods `add` and `remove`.
2. Create a `Tree` class.
    - The constructor should initialize a `root` property to `null`.
3. Implement `traverseBF` _(breadth first)_ and `traverseDepthFirst` _(depth first)_ on the `Tree` class.
    - Each method should accept a function that gets called with each element in the tree.

## Solutions

### JS

<details>

<summary>

**`Node` class**

</summary>

```javascript
class Node {
    constructor(data) {
        this.data = data;
        this.children = [];
    }

    add(data) {
        this.children.push(new Node(data));
    }

    remove(data) {
        this.children = this.children.filter((node) => {
            return node.data !== data;
        })
    }
}
```

</details>

<details>

<summary>

**`Tree` class**

</summary>

```javascript
class Tree {
    constructor() {
        this.root = null;
    }

    /**
     * @method traverseBF
     * @description Executes a breadth-first traversal of the tree.
     */
    traverseBF(fn) {
        const arr = [this.root];

        while (arr.length > 0) {
            const node = arr.shift();

            arr.push(...node.children);
            fn(node);
        }
    }

    /**
     * @method traverseDF
     * @description Executes a depth-first traversal of the tree.
     */
    traverseDF(fn) {
        const arr = [this.root];

        while (arr.length > 0) {
            const node = arr.shift();

            arr.unshift(...node.children);
            fn(node);
        }
    }
}
```

</details>
