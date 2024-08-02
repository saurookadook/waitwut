---
title: 'Tree: Binary Search Tree'
date: '2024-07-13'
fullPath: '/notes/dsa/algorithm-exercises/algo-casts/tree-binary-search-tree'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

1) Implement the `Node` class to create a binary search tree.
    - The constructor should initialize the properties `data`, `left`, and `right`.
2) Implement the `insert` method for the `Node` class.
    - `insert` should accept an argument of `data`, then insert a new `Node` at the appropriate location in the tree.
3) Implement the `contains` method for the `Node` class.
   - `contains` should accept a `data` argument and return the `Node` in the tree with the same value.
   - If the value isn't in the tree, return `null`.

## Examples

</details>

<details>

<summary>

**Implementation**

</summary>

```javascript
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    insert(data) {
        if (data < this.data) {
            if (this.left != null) {
                this.left.insert(data);
            } else {
                this.left = new Node(data);
            }
        } else if (data > this.data) {
            if (this.right != null) {
                this.right.insert(data);
            } else {
                this.right = new Node(data);
            }
        }
    }

    contains(data) {
        if (data == null) {
            return;
        }

        if (data === this.data) {
            return this;
        }

        return (this.left != null && this.left.contains(data))
            || (this.right != null && this.right.contains(data))
            || null;
    }
}
```

</details>
