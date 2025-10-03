---
title: 'Mastering Linked Lists: Understanding, Implementing, and Manipulating in Python'
date: '2025-09-27'
fullPath: '/notes/dsa/code-signal/python/course-12/unit-06'
sectionSlug: 'notes'
---

## Intro

**Linked Lists** comprise a sequence of nodes in which each node holds some data and a reference _(a link)_ to the next node, thus forming a chain-like structure.

The concept of **Linked Lists** is leveraged in many real-world scenarios. For instance, in a music playlist where songs can be dynamically added, deleted, or reordered, **Linked Lists** serve as an excellent solution thanks to their efficient operations.

## Understanding Linked Lists

A linked list is a collection of nodes, each acting as a container for its data and a pointer _(link)_ to the next node in the list. This link greatly facilitates sequential traversal through the list.

Here is a simple visualization of a node:

```java
class Node {
  Data
  Pointer to Next Node
}
```

A node consists of two parts: `Data`, which contains the stored value (that could be any type such as number, string, etc.), and `Pointer to Next Node`, which holds the link to the next node in the sequence. When a node is initially created, `next` is set to `None` because there is no subsequent node to point to.

Think of it like a treasure hunt game, where each clue leads to the next one, and the chain continues until we reach the final destination.

### Linked Lists vs Arrays

Now you might wonder, why opt for linked lists when we already have arrays? The answer isn't definitive, as both have their uses. Choosing one over the other completely depends on the specific problem and requirements at hand.

Here are some points of comparison:

1. **Memory Usage**: Arrays allocate memory in a continuous block during their initialization. Advanced allocation may lead to unused memory if not all spaces are filled. On the other hand, _linked lists allocate memory only when required, making efficient use of memory_.
2. **Insertion and Deletion**: Inserting or deleting elements in an array is an expensive operation as it generally involves shifting elements to maintain element continuity. With linked lists, these operations are more efficient and take a constant time of <em class="math">O(1)</em>.
3. **Access Time**: Arrays provide constant time access to any element. Contrarily, linked lists require iteratively <em class="math">O(n)</em> time for accessing an element. With arrays, you can directly jump to any index, while linked lists necessitate traversal from the start to the desired node.

### Implementing a Linked List in Python

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

```

## Complexity Analysis

While **Linked Lists** may not allow for constant time access like arrays do, they excel in insertion and deletion operations. Irrespective of the size of the list, insertion or deletion at any place takes constant time, i.e., <em class="math">O(1)</em>.

However, searching for a node in a **Linked List** requires iterative traversal, and this can lead to the worst-case time complexity of <em class="math">O(n)</em>.

## Diving Deep into Linked List Manipulation

In order to understand and use **Linked Lists** effectively, we need to master certain operations such as insertion, deletion, and traversal. Let's break each one down:

1. **Insertion**: When we talk about insertion, we are referring to the process of adding a new node to the existing list.
2. **Deletion**: Contrarily, deletion describes the action of removing a specific node from the list.
3. **Traversal**: This operation is involved with accessing and scanning through the elements in the list, one by one.

For our discussion, let's use Python to create a small class-based implementation of a **Linked List**. Following this structure, we can effectively understand and manipulate situated nodes in a **Linked List**.

Let's discuss the methods of the `LinkedList` class in more detail.

### Insertion

When you call `insert(value)`, a new node is created with the given value and added either as the head _(if the list is empty)_ or as the next node of the current tail.

```python
    def insert(self, value):
        if self.head is None:
            self.head = Node(value)
            self.tail = self.head
        else:
            new_node = Node(value)
            self.tail.next = new_node
            self.tail = new_node

```

### Deletion

Calling `delete(value)` searches the list for a node with the given value. If the node is found, it is removed from the list, and the links are fixed to keep the list connected.

```python
    def delete(self, value):
        # Step 1
        temp = self.head

        # Step 2
        if temp is not None and temp.value == value:
            self.head = temp.next
            temp = None
            return

        prev = None
        # Step 3
        while temp is not None:
            if temp.value == value:
                break
            prev = temp
            temp = temp.next

        # Step 4
        if temp == None:
            return
        prev.next = temp.next
        temp = None


```

1. The `delete()` method begins by setting a `temp` reference to the `head` of the **Linked List**. This temp reference will be used to traverse the list.
2. The first `if` statement checks if the head of the list is not `None` or, in other words, if the list is not empty. Then, inside the `if` block, it checks if the head node is the node to be deleted _(i.e., its value matches the `value` parameter)_. If it is, the head is updated to be the next node in the list _(potentially `None` if the head was the only node in the list)_, and then the old head node is deleted by setting `temp` to `None`.
3. If the head node is not the one to be deleted, the list is traversed in search of the node. The `prev` reference is updated as the current node before `temp` moves on to the next one. If at any point during the traversal, a node with a value matching the `value` parameter is found, the loop breaks, leaving `temp` pointing to the node to delete and `prev` pointing to its predecessor.
4. After traversal, if `temp` is `None`, this means the node to delete was not found, and the function returns. Otherwise, the predecessor's `next` reference (which currently points to the to-be-deleted node) is updated to point to the successor of the node to be deleted, thus excluding it from the list. The node is then deleted by setting `temp` to `None`.

The `delete()` method doesn't return any value. It either successfully deletes a node or quietly returns if the requested node is not found in the list.

### Traversal

When `print()` is called, it runs a while loop through each node in the list starting from the head. It prints the value of each node until it reaches a node where `node.next` is `None`.

```python
    def print(self)
        temp = self.head
        while temp is not None:
            print(temp.value or "None", end=" => ")
            temp = temp.next

```

Sample execution:

```python
linked_list = LinkedList()
linked_list.insert(1)
linked_list.insert(2)
linked_list.insert(3)
linked_list.print()  # Output: 1 => 2 => 3 => None
linked_list.delete(2)
linked_list.print()  # Output: 1 => 3 => None
```

## Examples

### Circular Linked List

```python
# Class to form a Circular LinkedList with basic operations
class CircularLinkedList:

    # Constructor to initialize the linked list
    def __init__(self):
        self.head = None

    # Function to add new node to the end of Circular Linked List
    def append(self, data):
        if not self.head:
            self.head = Node(data)
            self.head.next = self.head
        else:
            new_node = Node(data)
            cur = self.head
            while cur.next != self.head:
                cur = cur.next
            cur.next = new_node
            new_node.next = self.head

    # Function to display all nodes of Circular LinkedList
    def display(self):
        nodes = []
        cur = self.head
        cycle_count = 0
        while True:
            nodes.append(cur.data)
            if cur.next == self.head:
                cycle_count += 1
                if cycle_count == 2:
                    break
            cur = cur.next
        print(" -> ".join(map(str, nodes)))


clist = CircularLinkedList()
clist.append(1)
clist.append(2)
clist.append(3)
clist.display()  # Expected output: 1 -> 2 -> 3 -> 1 -> 2 -> 3
```

### Doubly Linked List

```python
# Python Script to Practice Manipulation of a Doubly Linked List

# Node class
class Node:
    def __init__(self, data=None):
        self.data = data
        self.next = None
        self.prev = None


# DoublyLinkedList class
class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    # Insert method
    def insert(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            new_node.prev = self.tail
            self.tail = new_node

    # Delete method
    def delete(self, data):
        current_node = self.head
        while current_node is not None:
            if current_node.data == data:
                if current_node.next is not None:
                    current_node.next.prev = current_node.prev
                else:
                    self.tail = current_node.prev

                if current_node.prev is not None:
                    current_node.prev.next = current_node.next
                else:
                    self.head = current_node.next

                return
            current_node = current_node.next

    # Display method
    def display_backward(self):
        current_node = self.tail
        while current_node:
            print(current_node.data, end=" <-> ")
            current_node = current_node.prev
        print('END')

    # Display method
    def display_forward(self):
        current_node = self.head
        while current_node:
            print(current_node.data, end=" <-> ")
            current_node = current_node.next
        print('END')


# Create a doubly linked list
dList = DoublyLinkedList()

# Insert some elements into the doubly linked list
dList.insert('Mars')
dList.insert('Jupiter')
dList.insert('Saturn')

# Remove a node from the doubly linked list
dList.delete('Jupiter')

# Display the elements of the doubly linked list
dList.display_forward()  # Existing output: Mars <-> Saturn <-> END
dList.display_backward()
```

### Updating Size on Delete

```python
class Node:
    def __init__(self, data=None):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None
        self.size = 0

    def insert(self, data):
        if not self.head:
            self.head = Node(data)
        else:
            temp = self.head
            while temp.next:
                temp = temp.next
            temp.next = Node(data)
        self.size += 1

    def delete(self, data):
        temp = self.head
        prev = None
        while temp:
            if temp.data == data:
                if prev:
                    prev.next = temp.next
                else:
                    self.head = temp.next
                self.size -= 1
                return
            prev = temp
            temp = temp.next


list = LinkedList()
list.insert(1)
list.insert(2)
list.insert(3)
print("Size of the linked list after insertions: ", list.size)  # Expected output: Size of the linked list after insertions: 3
list.delete(2)
print("Size of the linked list after deletion: ", list.size)  # Expected output: Size of the linked list after deletion: 2

```
