---
title: 'Mastering Interview Problems with Binary Search Trees'
date: '2025-10-04'
fullPath: '/notes/dsa/code-signal/python/course-14/unit-07'
sectionSlug: 'notes'
---

## Problem 1: Checking the Balance of a Binary Search Tree

Here is the first problem: we need to write a function that checks if a **BST** is balanced. The tree is balanced if for each vertex, the size of the left subtree differs from the size of the right subtree by at most `1`.

### Problem 1: Problem Actualization

This problem frequently appears in job interviews because checking the balance of a tree optimizes search operations.

Consider trying to balance on one foot. If the weight on your left and right sides is not equal, you'll topple over, right? Similarly, a **binary tree** is considered balanced when the left and right sides are equal, or at least the difference is no more than one.

### Problem 1: The Naive Approach

One could start by calculating the heights of all subtrees and then checking whether the heights of each node's left and right subtrees differ by no more than one. While this approach is functional, it is inefficient since it involves traversing the entire tree multiple times and making duplicate calculations.

### Problem 1: Efficient Approach Explanation

Instead of traversing the tree multiple times, we can use recursion to do it all in one sweep. We calculate the heights of the subtrees while simultaneously checking the balance condition. So, essentially, we're hitting two birds with one stone!

### Problem 1: Solution Building

Checking if a **Tree** is balanced involves examining all its **Nodes**. However, we can approach this more efficiently. Instead of calculating the height of each **Node** separately, which involves repeated traversal, we can implement a `check_balance` function that computes _both the height of the **Tree** and checks balance in one recursive traversal_. The function should return an indicator `is_balanced = False` when the **Tree** is unbalanced to allow for early termination without visiting all **Nodes**.

```python
def is_balanced(root: Node) -> bool:
    # Returns `tuple` of `(height, is_balanced)`
    def check_balance(node: Node) -> (int, bool):
        if node is None:
            return 0, True

        left_height, left_balanced = check_balance(node.left)
        if not left_balanced:
            return -1, False

        right_height, right_balanced = check_balance(node.right)
        if not right_balanced:
            return -1, False

        height = max(left_height, right_height) + 1
        is_balanced = abs(left_height - right_height) <= 1
        return height, is_balanced

    height, balanced = check_balance(root)
    return balanced


```

This solution performs with <em class="math">O(n)</em> time complexity, where <em class="math">n</em> is the number of **Nodes** in the **Tree**, as each **Node** is visited only once.

## Problem 2: Identify the K-th Smallest Element in a Binary Search Tree

Imagine needing to identify the player with the <em class="math">k<sup>th</sup></em> best result while constructing a leaderboard for a game. We're expected to find this <em class="math">k<sup>th</sup></em> smallest element in a **Binary Search Tree (BST)** where the players's scores are stored for efficient retrieval.

### Problem 2: Actualization

We're dealing with a **BST** where each player's score represents a **Node**. Our goal is to identify the <em class="math">k<sup>th</sup></em> smallest score, which translates to the <em class="math">k<sup>th</sup></em> smallest element within the **BST**.

### Problem 2: Naive Approach

A simplistic, blunt approach involves storing all the elements in an array. We then sort it and return the <em class="math">k<sup>th</sup></em> element. This brute force method, however, has a time complexity of <em class="math">O(n * log n)</em> due to the sorting operation. It also necessitates extra space, thus revealing a space complexity of <em class="math">O(n)</em>. There must be a more efficient method, right?

### Problem 2: Efficient Approach

A more efficient and memory-friendly strategy to address this task entails employing a recursive method without explicit in-order traversal.

This approach involves counting the number of **Nodes** in the left subtree of the **Root Node**. If the count of **Nodes** matches `k - 1`, the **Root Node** value is the <em class="math">k<sup>th</sup></em> smallest element we're looking for. If the `k` is smaller or equal to the count, the <em class="math">k<sup>th</sup></em> smallest is in the left subtree. If the `k` is larger, then the <em class="math">k<sup>th</sup></em> smallest is in the right subtree, and we adjust `k` accordingly.

### Problem 2: Solution Implementation

```python
def kth_smallest(root: Node, k: int):
    # The number of **Nodes** in the left subtree of the **Root Node**
    left_nodes = count_nodes(root.left) if root else 0

    # If `k` is equal to the number of **Nodes** in the left subtree plus 1,
    # that means we must return the **Root Node's** value as we've reached the `k`-th smallest.
    if k == left_nodes + 1:
        return root.val
    # If there are more than `k` **Nodes** in the left subtree,
    # the `k`-th smallest must be in the left subtree.
    elif k <= left_nodes:
        return kth_smallest(root.left, k)
    # If there are less than `k` nodes in the left subtree,
    # the `k`-th smallest must be in the right subtree.
    else:
        return kth_smallest(root.right, k - 1 - left_nodes)


def count_nodes(node: Node) -> int:
    if not node:
        return 0
    return 1 + count_nodes(node.left) + count_nodes(node.right)


```

Please note that this code snippet relies on a helper function, `countNodes`, which returns the count of **Nodes** in a given **Tree**. The main function compares the total **Nodes** in the left subtree with `k` and decides whether the <em class="math">k<sup>th</sup></em> smallest is in the left subtree or right subtree or if it is the **Root Node** itself.

This approach has <em class="math">O(k)</em> time complexity, as we visit at most `k` vertices in the **Tree**.

## Examples

### Find Greatest Difference Between Heights of Left and Right Subtrees

```python
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


def max_height_diff(root):
    max_diff = 0

    def height(node):
        nonlocal max_diff

        if node is None:
            return -1

        left_height = height(node.left)
        right_height = height(node.right)

        current_diff = abs(left_height - right_height)
        max_diff = max(max_diff, current_diff)

        return 1 + max(left_height, right_height)

    if root is None:
        return 0

    height(root)
    return max_diff


# Test samples
root = TreeNode(10)
root.left = TreeNode(5)
root.right = TreeNode(15)
root.right.left = TreeNode(13)
root.right.right = TreeNode(17)

print(max_height_diff(root))  # Expected output: 1

root_2 = TreeNode(10)
root_2.left = TreeNode(5)
root_2.right = TreeNode(15)
root_2.right.left = TreeNode(13)
root_2.right.right = TreeNode(17)
root_2.right.right.left = TreeNode(20)
root_2.right.right.right = TreeNode(25)

print(max_height_diff(root_2))  # Expected output: 2

root_3 = TreeNode(10)
root_3.left = TreeNode(5)
root_3.right = TreeNode(15)
root_3.left.left = TreeNode(3)
root_3.left.right = TreeNode(7)
root_3.right.right = TreeNode(20)
root_3.left.left.left = TreeNode(1)

print(max_height_diff(root_3))  # Expected output: 1


# ##### WRONG ############
def max_height_diff(root):
    min_height = 1
    max_diff = 0

    def height(node):
        nonlocal min_height

        if node is None:
            return min_height, 0

        left_height, left_max_diff = height(node.left)
        right_height, right_max_diff = height(node.right)
        current_height = max(left_height, right_height) + 1
        min_height = min(left_height, right_height)
        max_diff = max(left_max_diff, right_max_diff, current_height - min_height)

        return current_height, max_diff

    if root is None:
        return 0

    left_height, left_max_diff = height(root.left)
    right_height, right_max_diff = height(root.right)
    print(f"left_height: {left_height}")
    print(f"right_height: {right_height}")
    print(f"left_max_diff: {left_max_diff}")
    print(f"right_max_diff: {right_max_diff}")
    print(f"min_height: {min_height}")
    print(f"max_diff: {max_diff}")
    return max(
        left_max_diff,
        right_max_diff
    )
    # return max(left_height, right_height) - min_height
```

### Find <em class="math">k<sup>th</sup></em> Largest Element

```python
class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def count_nodes(node: Node) -> int:
    if not node:
        return 0
    return 1 + count_nodes(node.left) + count_nodes(node.right)


def kth_largest(node: Node, k: int) -> int:
    right_nodes_count = (
        count_nodes(node.right) if node else 0
    )

    if k == right_nodes_count + 1:
        return node.val
    elif k <= right_nodes_count:
        return kth_largest(node.right, k)
    else:
        return kth_largest(node.left, k - 1 - right_nodes_count)


# Creating the BST
root = Node(50)
root.left = Node(20)
root.right = Node(60)
root.left.left = Node(10)
root.left.right = Node(30)
root.right.left = Node(55)
root.right.right = Node(70)
root.left.right.left = Node(25)
root.left.right.right = Node(35)
root.right.right.left = Node(65)
root.right.right.right = Node(80)

# Now, let's test the function with the new binary tree
print(kth_largest(root, 1))  # Expected output: 80
print(kth_largest(root, 5))  # Expected output: 55
print(kth_largest(root, 10))  # Expected output: 20
print(kth_largest(root, 3))  # Expected output: 65
print(kth_largest(root, 7))  # Expected output: 35

```
