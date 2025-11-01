---
title: 'Building and Analyzing Graphs with the Adjacency List'
date: '2025-10-18'
fullPath: '/notes/dsa/code-signal/python/course-15/unit-02'
sectionSlug: 'notes'
---

## Intro to Adjacency Lists

Consider your friends list on a social networking site like Facebook; this can be viewed as a classic example of an **Adjacency List**. Each person on Facebook has a list of connections _(or friends)_, and you can discover mutual connections by examining the overlap in your friends lists. That's precisely how **Adjacency Lists** function!

The **Adjacency List** representation is _generally more space-efficient for storing **Sparse Graphs** compared to **Adjacency Matrices**_. We'll begin by theoretically understanding **Adjacency Lists** and then illustrate how to implement them in Python. We'll then learn how to perform basic operations. To put theory into practice, we'll simulate a real scenario: building a social network graph using an **Adjacency List**.

## Understanding Adjacency Lists in Graph Theory

Before we dive into the implementation, let's familiarize ourselves with the concept of **Adjacency Lists**. An **Adjacency List** simplifies a **Graph** into its most essential and straightforward form. It's similar to creating a contacts list on your phone, where you have a compendium of everyone you can call. Likewise, in a **Graph**, every node keeps a list, akin to a contacts list, of the **Nodes** it's connected to.

Let's further refine our understanding with a simple example:

Suppose we have four interconnected cities shown below.

```txt
┌───────────╮     ┌───────────────╮
│ San Diego │─────│ San Francisco │
└───────────╯     └───────────────╯
      │       ╲         │
      │        ╲        │
      │         ╲       │
      │          ╲      │
┌───────────╮     ┌─────────────╮
│ Las Vegas │─────│ Los Angeles │
└───────────╯     └─────────────╯
```

Here, cities are our **Vertices**, and roads connecting them are our **Edges**. The **Adjacency List** for this **Graph** would appear as follows:

<code>
<pre>
<b>San Diego</b>: San Francisco, Los Angeles, Las Vegas
<b>San Francisco</b>: San Diego, Los Angeles
<b>Los Angeles</b>: San Diego, San Francisco, Los Angeles
<b>Las Vegas</b>: San Diego, Los Angeles
</pre>
</code>

## Creating an Adjacency List for a Graph in Python

When it comes to Python, the built-in dictionaries and lists are invaluable for representing adjacency lists.

In an adjacency list representation, dictionaries function exceptionally well. The keys represent the **Nodes** of the **Graph**, and the corresponding values are lists containing the adjacent **Nodes**.

```python
roadmap = {
    'San Diego': ['San Francisco', 'Los Angeles', 'Las Vegas'],
    'San Francisco': ['San Diego', 'Los Angeles'],
    'Los Angeles': ['San Diego', 'San Francisco', 'Los Angeles'],
    'Las Vegas': ['San Diego', 'Los Angeles'],
}
```

## Performing Basic Operations on Adjacency Lists in Python

Once we have an **Adjacency List**, performing basic operations becomes a breeze. Since our **Adjacency List** is essentially a dictionary of lists, adding a vertex is as simple as adding a new key-value pair to our dictionary. In the same vein, adding an edge entails merely adding a new element to the pertinent list. Ascertaining the existence of an edge is just as straightforward; all we need to do is check if a vertex exists in another vertex’s list.

Here's how these operations translate into Python code:

```python
roadmap = {}

# If we want to add a new city (let's say 'Seattle') to our roadmap:
roadmap['Seattle'] = []

# To add a new road (refer to edge in graph theory) from San Diego to Seattle, we simply need to add 'Seattle' to San Diego's list:
roadmap['San Diego'].append('Seattle')

# To verify if a road (edge) exists between San Diego and Seattle, we look up 'Seattle' in San Diego's list:
exists = 'Seattle' in roadmap['San Diego']  # Returns True.
```

## Mapping Real-world Scenarios to Theory: Building a Social Network Graph

**Adjacency Lists** find myriad practical applications. One notable example is social networks like Facebook or LinkedIn. In such networks, each individual represents a **Node** in the **Graph**. When two people become friends or connections, an **Edge** forms between their corresponding **Nodes**.

Consider three friends: `'John'`, `'Emma'`, and `'Sam'`. We can model their friendships using an **Adjacency List** as follows:

```python
friends_network = {
    'John': ['Emma', 'Sam'],
    'Emma': ['John', 'Sam'],
    'Sam': ['John', 'Emma'],
}
```
