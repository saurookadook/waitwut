---
title: 'Validate'
date: '2024-07-13'
fullPath: '/notes/dsa/algorithm-exercises/algo-casts/validate'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Given a `Node`, validate the binary search tree
- Ensure that every `Node`'s left-hand child is less than the parent `Node`'s value.
- Ensure that every `Node`'s right-hand child is greater than the parent `Node`'s value.

## Solutions

### JS

<details>

<summary>

**My Solution**

</summary>

```javascript
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    insert(data) {
        if (data < this.data && this.left) {
            this.left.insert(data);
        } else if (data < this.data) {
            this.left = new Node(data);
        } else if (data > this.data && this.right) {
            this.right.insert(data);
        } else if (data > this.data) {
            this.right = new Node(data);
        }
    }
}

function isNodeNullish(targetNode) {
    return targetNode == null;
}

function validate(node, min = null, max = null) {
    if ((min != null && node.data < min) || (max != null && node.data > max)) {
        return false;
    }

    if (!isNodeNullish((node.left || {}).data)
        && validate(node.left, (node.left || {}).data, node.data)) {
        return false;
    }

    if (!isNodeNullish((node.right || {}).data)
        && validate(node.right, node.data, (node.right || {}).data)
    ) {
        return false;
    }

    return true;
}
```

</details>

<details>

<summary>

**SG Solution**

</summary>

```javascript
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    insert(data) {
        if (data < this.data && this.left) {
            this.left.insert(data);
        } else if (data < this.data) {
            this.left = new Node(data);
        } else if (data > this.data && this.right) {
            this.right.insert(data);
        } else if (data > this.data) {
            this.right = new Node(data);
        }
    }
}

function validate(node, min = null, max = null) {
    if (max !== null && node.data > max) {
        return false;
    }

    if (min !== null && node.data < min) {
        return false;
    }

    if (node.left && !validate(node.left, min, node.data)) {
        return false;
    }

    if (node.right && !validate(node.right, node.data, max)) {
        return false;
    }

    return true;
}
```

</details>
