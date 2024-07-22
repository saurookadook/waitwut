---
title: 'Linked List'
date: '2024-07-13'
fullPath: '/notes/algorithm-exercises/algo-casts/linkedlist'
iconComponentName: ''
sectionSlug: 'notes'
---

# Directions

- Implement the `Node` and `LinkedList` classes
- **Node Class API**
<table class="table">
    <thead>
        <tr>
            <td>Function</td>
            <td>Arguments</td>
            <td>Returns</td>
            <td>Directions</td>
            <td>Example</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>constructor</td>
            <td>(Data, Node)</td>
            <td>Node</td>
            <td>
              Creates a class instance to represent a node.  The node should
              have two properties, 'data' and 'next'.  Accept both
              of these as arguments to the 'Node' constructor, then
              assign them to the instance as properties 'data' and 'next'.
              If 'next' is not provided to the constructor, then default its
              value to be 'null'.
            </td>
            <td>
              <pre>
                const n = new Node('Hi');
                n.data // 'Hi'
                n.next // null
                const n2 = new Node('There', n);
                n.next // returns n
              </pre>
            </td>
        </tr>
    </tbody>
</table>

- **LinkedList Class API**
<table class="table">
    <thead>
        <tr>
            <td>Function</td>
            <td>Arguments</td>
            <td>Returns</td>
            <td>Directions</td>
            <td>Example</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>constructor</td>
            <td>-</td>
            <td>(LinkedList)</td>
            <td>
              Create a class to represent a linked list.  When created,
              a linked list should have *no* head node associated with it.
              The LinkedList instance will have one property, 'head', which
              is a reference to the first node of the linked list.  By default
              'head' should be 'null'.
            </td>
            <td>
              <pre>
                const list = new LinkedList();
                list.head // null
              </pre>
            </td>
        </tr>
        <tr>
            <td>insertFirst</td>
            <td>(data)</td>
            <td>-</td>
            <td>
              Creates a new Node from argument 'data' and assigns the resulting
              node to the 'head' property.  Make sure to handle the case in which
              the linked list already has a node assigned to the 'head' property.
            </td>
            <td>
              <pre>
                const list = new LinkedList();
                list.insertFirst('Hi There'); // List has one node
              </pre>
            </td>
        </tr>
        <tr>
            <td>size</td>
            <td>-</td>
            <td>(integer)</td>
            <td>
              Returns the number of nodes in the linked list.
            </td>
<td>

```js
const list = new LinkedList();
list.insertFirst('a');
list.insertFirst('b');
list.insertFirst('c');
list.size(); // returns 3
```

</td>
        </tr>
        <tr>
            <td>getFirst</td>
            <td>-</td>
            <td>(Node)</td>
            <td>
              Returns the first node of the linked list.
            </td>
<td>

```js
const list = new LinkedList();
list.insertFirst('a');
list.insertFirst('b');
list.getFirst(); // returns Node instance with data 'a'
```

</td>
        </tr>
        <tr>
            <td>
              getLast
            </td>
            <td>
              -
            </td>
            <td>
              (Node)
            </td>
            <td>
              Returns the last node of the linked list
            </td>
<td>

```js
const list = new LinkedList();
list.insertFirst('a');
list.insertFirst('b');
list.getLast(); // returns node with data 'a'
```

</td>
        </tr>
        <tr>
            <td>
              clear
            </td>
            <td>
              -
            </td>
            <td>
              -
            </td>
            <td>
              Empties the linked list of any nodes.
            </td>
<td>

```js
const list = new LinkedList();
list.insertFirst('a');
list.insertFirst('b');
list.clear();
list.size(); // returns 0
```

</td>
        </tr>
        <tr>
            <td>
              removeFirst
            </td>
            <td>
              -
            </td>
            <td>
              -
            </td>
            <td>
              Removes only the first node of the linked list.  The list's head should
              now be the second element.
            </td>
<td>

```js
const list = new LinkedList();
list.insertFirst('a');
list.insertFirst('b');
list.removeFirst();
list.getFirst(); // returns node with data 'a'
```

</td>
        </tr>
        <tr>
            <td>
              removeLast
            </td>
            <td>
              -
            </td>
            <td>
              -
            </td>
            <td>
              Removes the last node of the chain
            </td>
<td>

```js
const list = new LinkedList();
list.insertFirst('a');
list.insertFirst('b');
list.removeLast();
list.size(); // returns 1
list.getLast(); // returns node with data of 'b'
```

</td>
        </tr>
        <tr>
            <td>
              insertLast
            </td>
            <td>
              (Data)
            </td>
            <td>
              -
            </td>
            <td>
              Inserts a new node with provided data at the end of the chain
            </td>
<td>

```js
const list = new LinkedList();
list.insertFirst('a');
list.insertFirst('b');
list.insertLast('c');
list.getLast(); // returns node with data 'C'
```

</td>
        </tr>
        <tr>
            <td>
              getAt
            </td>
            <td>
              (integer)
            </td>
            <td>
              (Node)
            </td>
            <td>
              Returns the node at the provided index
            </td>
<td>

```js
const list = new List();
list.insertFirst('a');
list.insertFirst('b');
list.insertFirst('c');
list.getAt(1); // returns node with data 'b'
```

</td>
        </tr>
        <tr>
            <td>
              removeAt
            </td>
            <td>
              (integer)
            </td>
            <td>
              -
            </td>
            <td>
              Removes node at the provided index
            </td>
<td>

```js
const list = new List();
list.insertFirst('a');
list.insertFirst('b');
list.insertFirst('c');
list.removeAt(1);
list.getAt(1); // returns node with data 'a'
```

</td>
        </tr>
        <tr>
            <td>
              insertAt
            </td>
            <td>
              (Data, integer)
            </td>
            <td>
              -
            </td>
            <td>
              Create an insert a new node at provided index.
              If index is out of bounds, add the node to the end
              of the list.
            </td>
<td>

```js
const list = new List();
list.insertFirst('a');
list.insertFirst('b');
list.insertFirst('c');
list.insertAt('Hi', 1)
list.getAt(1); // returns node with data 'Hi'
```

</td>
        </tr>
        <tr>
            <td>
              forEach
            </td>
            <td>
              (function)
            </td>
            <td>
              -
            </td>
            <td>
              Calls the provided function with every node of the chain and the index
              of the node.
            </td>
<td>

```js
const list = new List();

list.insertLast(1);
list.insertLast(2);
list.insertLast(3);
list.insertLast(4);

list.forEach((node, index) => {
    node.data += 10;
});
list.getAt(0); // Returns node with data '11'
```

</td>
        </tr>
        <tr>
            <td>
              for...of Loop
            </td>
            <td>
              -
            </td>
            <td>
              -
            </td>
            <td>
              Linked list should be compatible as the subject of a 'for...of' loop
            </td>
<td>

```js
const list = new List();

list.insertLast(1);
list.insertLast(2);
list.insertLast(3);
list.insertLast(4);

for (let node of list) {
    node.data += 10;
}

node.getAt(1); // returns node with data 11
```

</td>
        </tr>
    </tbody>
</table>

## Implementation

### JS

<details>

<summary>

**As Functions**

</summary>

```javascript
function Node(data, next = null) {
    this.data = data;
    this.next = next;
}

function LinkedList() {
    this.head = null;

    isNodeNullish(targetNode) {
        return targetNode == null;
    }

    getFirst() {
        return this.head;
    }

    getLast() {
        if (this.isNodeNullish(this.head)) {
            return null;
        }

        let node = this.head;

        while (!this.isNodeNullish(node) && !this.isNodeNullish(node.next)) {
            node = node.next;
        }

        return node;
    }

    getAt(index) {
        let iteration = 0;
        let node = this.head;

        while (!this.isNodeNullish(node)) {
            if (index === iteration) {
                return node;
            }

            iteration++
            node = node.next;
        }

        return null;
    }

    size() {
        let counter = 0;
        let node = this.head;

        while (!this.isNodeNullish(node)) {
            counter++;
            node = node.next;
        }

        return counter;
    }

    insertFirst(data) {
        this.head = new Node(data, this.head);
    }

    insertLast(data) {
        const last = this.getLast();

        if (!this.isNodeNullish(last)) {
            last.next = new Node(data);
        } else {
            this.head = new Node(data);
        }
    }

    insertAt(data, index) {
        if (this.isNodeNullish(this.head) || index === 0) {
            this.head = new Node(data);
            return;
        }

        const previous = this.getAt(index - 1) || this.getLast();
        previous.next = new Node(data, previous.next);
    }

    removeFirst() {
        if (this.isNodeNullish(this.head)) {
            return;
        }

        this.head = this.head.next;
    }

    removeLast() {
        if (this.isNodeNullish(this.head)) {
            return;
        }

        if (this.isNodeNullish(this.head.next)) {
            this.head = null;
            return;
        }

        let previous = this.head;
        let node = this.head.next;

        while (!this.isNodeNullish(node.next)) {
            previous = node;
            node = node.next;
        }

        previous.next = null;
    }

    removeAt(index) {
        if (this.isNodeNullish(this.head)) {
            return;
        }

        if (index === 0) {
            this.head = this.head.next;
            return;
        }

        const previous = this.getAt(index - 1);
        if (this.isNodeNullish(previous) || this.isNodeNullish(previous.next)) {
            return;
        }
        previous.next = previous.next.next;
    }

    clear() {
        this.head = null;
    }

    forEach(fn) {
        let node = this.head;
        let iteration = 0;

        while (!this.isNodeNullish(node)) {
            fn(node, iteration);
            node = node.next;
            iteration++;
        }
    }

    *[Symbol.iterator]() {
        let node = this.head;

        while (!this.isNodeNullish(node)) {
            yield node;
            node = node.next;
        }
    }
}

```

</details>

<details>

<summary>

**As Classes**

</summary>

```javascript
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(data) {
    this.head = new Node(data, this.head);
  }

  size() {
    let counter = 0;
    let node = this.head;

    while (node) {
      counter++;
      node = node.next;
    }

    return counter;
  }

  getFirst() {
    return this.head;
  }

  getLast() {
    if (!this.head) {
      return null;
    }

    let node = this.head;
    while (node) {
      if (!node.next) {
        return node;
      }
      node = node.next;
    }
  }

  clear() {
    this.head = null;
  }

  removeFirst() {
    if (!this.head) {
      return;
    }

    this.head = this.head.next;
  }

  removeLast() {
    if (!this.head) {
      return;
    }

    if (!this.head.next) {
      this.head = null;
      return;
    }

    let previous = this.head;
    let node = this.head.next;
    while (node.next) {
      previous = node;
      node = node.next;
    }
    previous.next = null;
  }

  insertLast(data) {
    const last = this.getLast();

    if (last) {
      // There are some existing nodes in our chain
      last.next = new Node(data);
    } else {
      // The chain is empty!
      this.head = new Node(data);
    }
  }

  getAt(index) {
    let counter = 0;
    let node = this.head;
    while (node) {
      if (counter === index) {
        return node;
      }

      counter++;
      node = node.next;
    }
    return null;
  }

  removeAt(index) {
    if (!this.head) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
      return;
    }

    const previous = this.getAt(index - 1);
    if (!previous || !previous.next) {
      return;
    }
    previous.next = previous.next.next;
  }

  insertAt(data, index) {
    if (!this.head) {
      this.head = new Node(data);
      return;
    }

    if (index === 0) {
      this.head = new Node(data, this.head);
      return;
    }

    const previous = this.getAt(index - 1) || this.getLast();
    const node = new Node(data, previous.next);
    previous.next = node;
  }

  forEach(fn) {
    let node = this.head;
    let counter = 0;
    while (node) {
      fn(node, counter);
      node = node.next;
      counter++;
    }
  }

  *[Symbol.iterator]() {
    let node = this.head;
    while (node) {
      yield node;
      node = node.next;
    }
  }
}

```

</details>
