---
title: 'Neetcode: Word Search II'
date: '2025-08-24'
fullPath: '/notes/dsa/neetcode/blind-75/tries/question-03'
sectionSlug: 'notes'
---

## Instructions

Given a 2-D grid of characters `board` and a list of strings `words`, return all words that are present in the grid.

For a word to be present it must be possible to form the word with a path in the board with horizontally or vertically neighboring cells. The same cell may not be used more than once in a word.

**Example 1**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/06435c8e-bac3-49f5-5df7-77fd5dd42800/public" alt="Diagram representation of 'board' input with highlighted squares for 'cat', 'back', and 'backend' words from 'words' input for Example 1.">

```Java
Input:
board = [
  ["a","b","c","d"],
  ["s","a","a","t"],
  ["a","c","k","e"],
  ["a","c","d","n"]
],
words = ["bat","cat","back","backend","stack"]

Output: ["cat","back","backend"]
```

**Example 2**:

<img src="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/6f244a10-78bf-4a30-0a5f-b8f3e03ce000/public" alt="Diagram representation of 'board' input with no highlighted squares for 'words' input for Example 2.">

```Java
Input:
board = [
  ["x","o"],
  ["x","o"]
],
words = ["xoxo"]

Output: []
```

**Constraints**:

- `1 <= board.length, board[i].length <= 12`
- `board[i]` consists only of lowercase English letter.
- `1 <= words.length <= 30,000`
- `1 <= words[i].length <= 10`
- `words[i]` consists only of lowercase English letters.
- All strings within `words` are distinct.
