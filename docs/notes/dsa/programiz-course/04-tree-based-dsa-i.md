---
title: 'DSA Programiz Course: Tree-based DSA I'
date: '2024-07-11'
fullPath: '/notes/dsa/programiz-course/04-tree-based-dsa-i'
sectionSlug: 'notes'
---

# [Tree Data Structure](https://www.programiz.com/dsa/trees)

- non-linear, hierarchical data structure consisting of nodes connected by edges

## Why [use a] Tree Data Structure?

- different tree data structures allow quicker and easier access to data

<br />

---

## Tree Terminologies

### Node

- entity that contains key or value and pointers to child nodes
- last nodes of each path called **leaf nodes** or **external nodes**
    - do not contain link/pointer to child nodes
- any node having at least 1 child node called **internal node**

### Edge

- link between any two nodes

### Root

- topmost node of tree

### Height of a Node

- number of edges from the node to the deepest leaf (i.e. the longest path from the node to a leaf node)

### Depth of a Node

- number of edges from root to the node

### Height of a Tree

- height of root node (or depth of deepest node)

### Degree of a Node

- total number of branches of that node

### Forest

- collection of disjoint trees

<br />

---

## Types of Tree

- [Binary Tree](https://www.programiz.com/dsa/binary-tree)
- [Binary Search Tree](https://www.programiz.com/dsa/binary-search-tree)
- [AVL Tree](https://www.programiz.com/dsa/avl-tree)
- [B-Tree](https://www.programiz.com/dsa/b-tree)

## Tree Traversal

- tree traversal algorithm helps visit required node in tree
- see [tree traversal](https://www.programiz.com/dsa/tree-traversal)

## Tree Applications

- Binary Search Trees used to quickly check whether element is present in a set or not
- Heap is kind of tree used for heap sort
- modified version of tree called Tries used in modern routers to store routing information
- Most popular databases use B-Trees and T-Trees to store data
- Compilers use a syntax tree to validate syntax of every program you write

<br />

---

# [Tree Traversal](https://www.programiz.com/dsa/tree-traversal)

**_inorder, preorder, postorder_**

Traversing tree means visiting every node in tree (might want to add all values in tree or find largest one)

{/*
    TODO: specifying C++ for the block seems to break
    syntax highlighting for rest of file?
*/}
**Basic structure of tree:**
```c
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

<br />

---

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

<details>

<summary>

**Python**

</summary>

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

</details>

<details>

<summary>

**C++**

</summary>

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

</details>

<details>

<summary>

**Java**

</summary>

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

</details>

<br />

---

# [Binary Tree](https://www.programiz.com/dsa/binary-tree)

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

### Implementations

<details>

<summary>

**Python**

</summary>

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

</details>

<details>

<summary>

**C++**

</summary>

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

</details>

<details>

<summary>

**Java**

</summary>

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

</details>

<br />

---

# [Full Binary Tree](https://www.programiz.com/dsa/full-binary-tree)

