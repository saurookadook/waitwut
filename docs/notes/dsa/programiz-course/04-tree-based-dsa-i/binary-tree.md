---
title: 'Binary Tree'
date: '2024-07-11'
fullPath: '/notes/dsa/programiz-course/04-tree-based-dsa-i/binary-tree'
sectionSlug: 'notes'
---

_from [Binary Tree](https://www.programiz.com/dsa/binary-tree)_

- binary tree is data structure in which each parent node can have at most two children
- each node consists of:
    - data item
    - address of left child
    - address of right child

## Types of Binary Tree

1. **Full Binary Tree**
- type of binary tree in which _every_ parent node/internal node has either two or no children
- see [full binary tree](https://www.programiz.com/dsa/full-binary-tree)

2. **Perfect Binary Tree**
- type of binary tree in which _every_ internal node has exactly two nodes and all leaf nodes are at same level
- see [complete binary tree](https://www.programiz.com/dsa/perfect-binary-tree)

3. **Complete Binary Tree**
- like a full binary tree but with a few major differences:
    a. every level must be completely filled
    b. all leaf elements must lean towards left
    c. last leaf element might not have right sibling (i.e. a complete binary tree doesn't have to be a full binary tree)
- see [complete binary tree](https://www.programiz.com/dsa/complete-binary-tree)

4. **Degenerate or Pathological Tree**
- tree where nodes have a single child, either left or right

5. **Skewed Binary Tree**
- a pathological/degenerate tree in which tree is either dominated by left nodes or right nodes
- two types:
    a. left-skewed binary tree
    b. right-skewed binary tree

6. **Balanced Binary Tree**
- type of binary tree in which difference between height of left and right sub-tree for each node is either 0 or 1
- see [balanced binary tree](https://www.programiz.com/dsa/balanced-binary-tree)

## Implementations

### Python

```python
class Node:
    def __init__(self, key):
        self.left = None
        self.right = None
        self.val = key

    def traversePreOrder(self):
        print(self.val, end=' ')
        if self.left:
            self.left.traversePreOrder()
        if self.right:
            self.right.traversePreOrder()

    def traverseInOrder(self):
        if self.left:
            self.left.traverseInOrder()
        print(self.val, end=' ')
        if self.right:
            self.right.traverseInOrder()

    def traversePostOrder(self):
        if self.left:
            self.left.traversePostOrder()
        if self.right:
            self.right.traversePostOrder()
        print(self.val, end=' ')


root = Node(1)

root.left = Node(2)
root.right = Node(3)

root.left.left = Node(4)

print("Pre order Traversal: ", end="")
root.traversePreOrder()
print("\nIn order Traversal: ", end="")
root.traverseInOrder()
print("\nPost order Traversal: ", end="")
root.traversePostOrder()

```

### C++

```cpp
#include <stdlib.h>

#include <iostream>

using namespace std;

struct node {
    int data;
    struct node *left;
    struct node *right;
};

// New node creation
struct node *newNode(int data) {
    struct node *node = (struct node *)malloc(sizeof(struct node));

    node->data = data;

    node->left = NULL;
    node->right = NULL;
    return (node);
}

void traversePreOrder(struct node *temp) {
    if (temp != NULL) {
        cout << " " << temp->data;
        traversePreOrder(temp->left);
        traversePreOrder(temp->right);
    }
}

void traverseInOrder(struct node *temp) {
    if (temp != NULL) {
        traverseInOrder(temp->left);
        cout << " " << temp->data;
        traverseInOrder(temp->right);
    }
}

void traversePostOrder(struct node *temp) {
    if (temp != NULL) {
        traversePostOrder(temp->left);
        traversePostOrder(temp->right);
        cout << " " << temp->data;
    }
}

int main() {
    struct node *root = newNode(1);
    root->left = newNode(2);
    root->right = newNode(3);
    root->left->left = newNode(4);

    cout << "preorder traversal: ";
    traversePreOrder(root);
    cout << "\nInorder traversal: ";
    traverseInOrder(root);
    cout << "\nPostorder traversal: ";
    traversePostOrder(root);
}

```

### Java

```java
class Node {
    int key;
    Node left, right;

    public Node(int item) {
        key = item;
        left = null;
        right = null;
    }
}

class BinaryTree {
    Node root;

    BinaryTree(int key) {
        root = new Node(key);
    }

    BinaryTree() {
        root = null;
    }

    public void traverseInOrder(Node node) {
        if (node != null) {
            traverseInOrder(node.left);
            System.out.print(" " + node.key);
            traverseInOrder(node.right);
        }
    }

    public void traversePostOrder(Node node) {
        if (node != null) {
            traversePostOrder(node.left);
            traversePostOrder(node.right);
            System.out.print(" " + node.key);
        }
    }

    public void traversePreOrder(Node node) {
        if (node != null) {
            System.out.print(" " + node.key);
            traversePreOrder(node.left);
            traversePreOrder(node.right);
        }
    }

    public static void main(String[] args) {
        BinaryTree tree = new BinaryTree();

        tree.root = new Node(1);
        tree.root.left = new Node(2);
        tree.root.right = new Node(3);
        tree.root.left.left = new Node(4);

        System.out.print("Pre order Traversal: ");
        tree.traversePreOrder(tree.root);
        System.out.print("\nIn order Traversal: ");
        tree.traverseInOrder(tree.root);
        System.out.print("\nPost order Traversal: ");
        tree.traversePostOrder(tree.root);
    }
}

```

---

# [Full Binary Tree](https://www.programiz.com/dsa/full-binary-tree)

