---
title: 'Data Structures and Algorithms'
date: '2024-07-11'
fullPath: '/notes/dsa'
sectionSlug: 'notes'
---

- [AlgoCasts: Exercises and Solutions](/notes/dsa/algorithm-exercises/algo-casts)
- [DSA Programiz Course](/notes/dsa/programiz-course)
    - _(some of the content from that site is... questionable 😅)_

---

## Minimax

- **terminal node**: has score that would be game ending _(i.e. corresponding to win, lose, or draw)_

<figure>

```python
import math


def minimax(node: any, depth: int, maximizing_player: bool):
    """
        `node`: ???
        `depth`: Used to limit search depth
        `color`: Determines perspective of current player. In a two-player game, would be `1` if Player A, `-1` if Player B
    """

    if depth == 0 or node.is_terminal():
        return node.heuristic_value()

    if maximizing_player:
        value = -math.inf
        for child in node.children():
            value = max(value, minimax(child, depth - 1, False))
        # return value
    else:
        value = math.inf
        for child in node.children():
            value = min(value, minimax(child, depth - 1, True))
        # return value
    return value


```

<figcaption>

_in pseudo Python ([ref. from Wikipedia](https://en.wikipedia.org/wiki/Minimax))_

</figcaption>
</figure>



### Negamax

- common simplification of the [minimax algorithm](#minimax)
- **terminal node**: has score that would be game ending _(i.e. corresponding to win, lose, or draw)_


<figure>

```python
import math


def negamax(node: any, depth: int, color: int):
    """
        `node`: ???
        `depth`: Used to limit search depth
        `color`: Determines perspective of current player. In a two-player game, would be `1` if Player A, `-1` if Player B
    """

    if depth === 0 or node.is_terminal():
        return color * node.heuristic_value()

    value = -math.inf

    for child in node.children():
        value = max(value, -negamax(child, depth -1, -color))

    return value

```

<figcaption>

_in pseudo Python ([ref. from Wikipedia](https://en.wikipedia.org/wiki/Negamax))_

</figcaption>
</figure>
