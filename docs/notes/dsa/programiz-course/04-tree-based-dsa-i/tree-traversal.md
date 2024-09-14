---
title: 'Tree Traversal'
date: '2024-07-11'
fullPath: '/notes/dsa/programiz-course/04-tree-based-dsa-i'
sectionSlug: 'notes'
---

_from [Tree Traversal](https://www.programiz.com/dsa/tree-traversal)_

**_inorder, preorder, postorder_**

Traversing tree means visiting every node in tree (might want to add all values in tree or find largest one)

**Basic structure of tree:**
```c++
struct node {
    int data;
    struct node* left;
    struct node* right;
}
```

- node pointed to by `left` and `right` might have other left and right children, so should be thought of as "sub-trees" instead of "sub-nodes"
- according to structure, every tree is combination of:
    - node carrying data
    - two sub-trees


## Types of Tree Traversal

### Inorder Traversal

1. visit all nodes in left sub-tree
2. then visit root node
3. visit all nodes in right sub-tree

### Preorder Traversal

1. visit root node
2. visit all nodes in left sub-tree
3. visit all nodes in right sub-tree

### Postorder Traversal

1. visit all nodes in left sub-tree
2. visit all nodes in right sub-tree
3. visit root node


#### Explanation of inorder traversal

```js
const tree = {
    root: {
        data: 1,
        left: {
            data: 12,
            left: {
                data: 5,
                left: null,
                right: null,
            },
            right: {
                data: 6,
                left: null,
                right: null,
            },
        },
        right: {
            data: 9,
            left: null,
            right: null,
        },
    },
};
```

1. from root node, traverse left sub-tree
2. visit root node
3. then, from root node, traverse right sub-tree

all steps in a stack:
```js
const traversalStack = [
    {
        data: 12,
        left: {
            data: 5,
            left: null,
            right: null,
        },
        right: {
            data: 6,
            left: null,
            right: null,
        }
    },
    {
        data: 1,
        left: tree.root.left,
        right: tree.root.right
    },
    {
        data: 9,
        left: null,
        right: null
    }
]
```

follow same traversal steps for tree on top of stack:
```js
const traversalStack = [
    {
        data: 5,
        left: null,
        right: null
    },
    {
        data: 12,
        left: tree.root.left.left,
        right: tree.root.left.right
    },
    {
        data: 6,
        left: null,
        right: null
    },
    {
        data: 1,
        left: tree.root.left,
        right: tree.root.right
    },
    {
        data: 9,
        left: null,
        right: null
    }
]
```

## Implementations

### Python

```python
class Node:
    def __init__(self, item):
        self.left = None
        self.right = None
        self.val = item


def inorder(root):
    if root:
        # Traverse left
        inorder(root.left)
        # Traverse root
        print(str(root.val) + "->", end='')
        # Traverse right
        inorder(root.right)


def postorder(root):
    if root:
        # Traverse left
        postorder(root.left)
        # Traverse right
        postorder(root.right)
        # Traverse root
        print(str(root.val) + "->", end='')


def preorder(root):
    if root:
        # Traverse root
        print(str(root.val) + "->", end='')
        # Traverse left
        preorder(root.left)
        # Traverse right
        preorder(root.right)


root = Node(1)
root.left = Node(2)
root.right = Node(3)
root.left.left = Node(4)
root.left.right = Node(5)

print("Inorder traversal ")
inorder(root)

print("\nPreorder traversal ")
preorder(root)

print("\nPostorder traversal ")
postorder(root)

```

### C++

```cpp
#include <iostream>
using namespace std;

struct Node {
  int data;
  struct Node *left, *right;
  Node(int data) {
    this->data = data;
    left = right = NULL;
  }
};

// Preorder traversal
void preorderTraversal(struct Node* node) {
  if (node == NULL)
    return;

  cout << node->data << "->";
  preorderTraversal(node->left);
  preorderTraversal(node->right);
}

// Postorder traversal
void postorderTraversal(struct Node* node) {
  if (node == NULL)
    return;

  postorderTraversal(node->left);
  postorderTraversal(node->right);
  cout << node->data << "->";
}

// Inorder traversal
void inorderTraversal(struct Node* node) {
  if (node == NULL)
    return;

  inorderTraversal(node->left);
  cout << node->data << "->";
  inorderTraversal(node->right);
}

int main() {
  struct Node* root = new Node(1);
  root->left = new Node(12);
  root->right = new Node(9);
  root->left->left = new Node(5);
  root->left->right = new Node(6);

  cout << "Inorder traversal ";
  inorderTraversal(root);

  cout << "\nPreorder traversal ";
  preorderTraversal(root);

  cout << "\nPostorder traversal ";
  postorderTraversal(root);
}

```

### Java

```java
class Node {
    int item;
    Node left, right;

    public Node(int key) {
        item = key;
        left = null;
        right = null;
    }
}

class BinaryTree {
    // Root of Binary Tree
    Node root;

    BinaryTree() {
        root = null;
    }

    void postorder(Node node) {
        if (node == null) {
            return;
        }

        // Traverse left
        postorder(node.left);
        // Traverse right
        postorder(node.right);
        // Traverse root
        System.out.print(node.item + "->");
    }

    void inorder(Node node) {
        if (node == null) {
            return;
        }

        // Traverse left
        inorder(node.left);
        // Traverse root
        System.out.print(node.item + "->");
        // Traverse right
        inorder(node.right);
    }

    void preorder(Node node) {
        if (node == null) {
            return;
        }

        // Traverse root
        System.out.print(node.item + "->");
        // Traverse left
        preorder(node.left);
        // Traverse right
        preorder(node.right);
    }

    public static void main(String[] args) {
        BinaryTree tree = new BinaryTree();
        tree.root = new Node(1);
        tree.root.left = new Node(12);
        tree.root.right = new Node(9);
        tree.root.left.left = new Node(5);
        tree.root.left.right = new Node(6);

        System.out.println("Inorder traversal");
        tree.inorder(tree.root);

        System.out.println("\nPreorder traversal ");
        tree.preorder(tree.root);

        System.out.println("\nPostorder traversal");
        tree.postorder(tree.root);
    }
}

```
