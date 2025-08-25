---
title: 'Neetcode: Implement Trie (Prefix Tree)'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/tries/question-01'
sectionSlug: 'notes'
---

## Instructions

A **prefix tree** (also known as a trie) is a tree data structure used to efficiently store and retrieve keys in a set of strings. Some applications of this data structure include auto-complete and spell checker systems.

Implement the PrefixTree class:

- `PrefixTree()`: Initializes the prefix tree object.
- `void insert(String word)`: Inserts the string word into the prefix tree.
- `boolean search(String word)`: Returns `true` if the string `word` is in the prefix tree (i.e., was inserted before), and `false` otherwise.
- `boolean startsWith(String prefix)`: Returns `true` if there is a previously inserted string `word` that has the prefix `prefix`, and `false` otherwise.

**Example 1**:

```Java
Input:
["Trie", "insert", "dog", "search", "dog", "search", "do", "startsWith", "do", "insert", "do", "search", "do"]

Output:
[null, null, true, false, true, null, true]

Explanation:
PrefixTree prefixTree = new PrefixTree();
prefixTree.insert("dog");
prefixTree.search("dog");    // return true
prefixTree.search("do");     // return false
prefixTree.startsWith("do"); // return true
prefixTree.insert("do");
prefixTree.search("do");     // return true
```

**Constraints**:

- `1 <= word.length, prefix.length <= 1000`
- `word` and `prefix` are made up of lowercase English letters.
