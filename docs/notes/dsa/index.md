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

---

## Cycling through integers

<figure>

```python
def cycle_value(
    starting_value: int,
    minimun_value: int,
    shift_offset: int,
    length_of_range: int,  # this is the value used with the modulo operator
    always_positive: bool = False,
) -> int:
    """The ultimate formula for cycling through values using the modulo operator
    (inspired by https://dev.to/timothee/using-modulo-to-shift-a-value-and-keep-it-inside-a-range-8fm)

    Args:
        `starting_value`: _description_
        `minimun_value`: _description_
        `shift_offset`: _description_
        `length_of_range`: _description_
        `always_positive`: _description_

    Returns:
        `int`: _description_
    """
    if always_positive:
        return (
            starting_value
            - minimun_value
            + (shift_offset % length_of_range)
            + length_of_range
        ) % length_of_range + minimun_value
    else:
        return (
            starting_value - minimun_value + shift_offset
        ) % length_of_range + minimun_value

```

<figcaption>

Formula for using the modulus operator to cycle through integer values

</figcaption>
</figure>

---

## Memoization

- special form of caching
- store results of function calls based on inputs
- useful for functions where expensive computations that are often called with same parameters

```javascript
function memoize(fn) {
    const cache = {};

    return function(...args) {
        const key = JSON.stringify(...args);

        if (cache[key]) {
            return cache[key];
        }

        const result = fn(...args);
        cache[key] = result;
        return result;
    }
}

function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

const memoizedFibonacci = memoize(fib);

memoizedFibonacci(10);
memoizedFibonacci(10); // <- this call will just return cached result
```

---

## Caching

- general term referring to storing data temporarily to avoid getting/calculating that data again
- for example, how a browser caches static assets _(images, etc.)_ by domain
- when domain visited again, unchanged assets loaded from cache instead of fetched again

```javascript
class DataCache {
    #cache = {};

    getData(key) {
        if (this.#cache[key]) {
            return this.#cache[key];
        }

        const data = this.#fetchData(key);
        this.#cache[key] = data;
        return data;
    }

    #fetchData(key) {
        // get data from API/DB/etc.
    }
}
```
