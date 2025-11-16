---
title: 'Frequency Calculation and Multi-Step Operations'
date: '2025-11-08'
fullPath: '/notes/dsa/code-signal/python/course-94/unit-02'
sectionSlug: 'notes'
---

## Frequency Calculation and Multi-Step Operations

### Task Statement

Alice has devised a unique way of encoding words. She takes a word and replaces each character with the next character in the alphabetical order. In other words, given a string `word`, for each character, if it's not `z`, she replaces it with the character that comes next alphabetically. For the character `z`, she replaces it with `a`.

Another element of Alice's algorithm involves frequency analysis. After shifting the characters, she counts the frequency of each character in the new string. Then, she creates an association of each character with its frequency and ASCII value. Each character maps to a number, which is a product of the ASCII value of the character and its frequency. The aim of our task is to construct a list that contains these products, sorted in descending order.

#### Example

For the input string `"banana"`, the output should be `[294, 222, 99]`.

The string `"banana"` will be shifted to `"cbobob"`.

Calculating the product of frequency and ASCII value for each character:

- The ASCII value for `'c'` is `99`, it appears once in the string so its product is `99 x 1 = 99`.
- The ASCII value for `'b'` is `98`, it appears three times in the string so its product is `98 x 3 = 294`.
- The ASCII value for `'o'` is `111`, it appears twice in the string so its product is `111 x 2 = 222`.

Collecting these products into a list gives `[99, 294, 222]`. Sorting this list in descending order results in `[294, 222, 99]`.

### Solution Building

#### Step 1 - Mapping each character to the next alphabetical character

Our first step involves mapping each character of the input string to the next alphabetical character. For this, we define the `next_string` as an empty string, storing the result of the shift operation. We then iterate over each character of the input string. If a character is not `z`, we replace it with the next alphabetical character using the built-in `chr` and `ord` functions. If it is `z`, we replace it with `a`.

```python
def character_frequency(word: str):
    next_string = ''

    for letter in word:
        next_string += 'a' if letter == 'z' else chr(ord(letter) + 1)

```

#### Step 2 - Counting the frequency of characters in `next_string`

The next step is to track the frequency of each character in `next_string`. We start by initializing an empty dictionary, `frequency_dict`. Then, we iterate over `next_string`. If the current character exists in `frequency_dict`, we increment its frequency by `1`. If it doesn't exist, we add it to `frequency_dict` with a frequency of `1`.

```python
from collections import defaultdict


def character_frequency(word: str):
    next_string = ''

    for letter in word:
        next_string += 'a' if letter == 'z' else chr(ord(letter) + 1)

    frequency_dict = defaultdict(int)

    for letter in next_string:
        frequency_dict[letter] += 1

```

#### Step 3 - Building the product list

Next, we calculate the numerical representation for each unique character. We initialize an empty list, `combined_values`, to store these numbers. For each character in `frequency_dict`, we calculate the product of its ASCII representation and its frequency in `next_string` and append this to `combined_values`.

```python
from collections import defaultdict


def character_frequency(word: str):
    next_string = ''

    for letter in word:
        next_string += 'a' if letter == 'z' else chr(ord(letter) + 1)

    frequency_dict = defaultdict(int)

    for letter in next_string:
        frequency_dict[letter] += 1

    combined_values = []

    for letter, freq in frequency_dict.items():
        combined_values.append(ord(letter) * freq)

```

#### Step 4 - Sorting the final values

The final step is to sort the list `combined_values` in descending order. We use Python's built-in `sort` function.

```python
from collections import defaultdict


def character_frequency(word: str):
    next_string = ''

    for letter in word:
        next_string += 'a' if letter == 'z' else chr(ord(letter) + 1)

    frequency_dict = defaultdict(int)

    for letter in next_string:
        frequency_dict[letter] += 1

    combined_values = []

    for letter, freq in frequency_dict.items():
        combined_values.append(ord(letter) * freq)

    combined_values.sort(reverse=True)
    return combined_values

```

## Examples

### Weird encoding

Bob, Alice's friend, is also interested in string manipulations. Inspired by Alice's technique, he has devised his own string encoding scheme. He takes a sentence, which is a string of n alphanumeric characters _(ranging from `a-z`, `A-Z`, `0-9`)_, including spaces and punctuation marks, with n ranging from `1` to `500`, inclusive. His encoding technique consists of the following steps:

- He replaces each alphanumeric character with the previous character in their respective sequence, i.e., for alphabets, he moves in the alphabetical order, and for numbers, he moves in the ordinal sequence.
  - For instance, given a string `word`, for each character, if it's not `a` or `A` or `0`, he replaces it with the character that precedes it in the sequence.
  - For the character `a` or `A`, he replaces it with `z` or `Z`, respectively.
  - For the number `0`, he replaces it with `9`.
- Another important aspect of Bob's algorithm involves frequency analysis. After shifting the characters, he counts the frequency of each alphanumeric character in the new string. Then, he creates an association between each alphanumeric character and its frequency and ASCII value. Each character maps to a number, which is the difference between the ASCII value of the character and its frequency. Once this is done, he computes the absolute value of each of these differences.

The task is to help Bob generate a list of these absolute differences, sorted in ascending order.

```python
from collections import defaultdict


def cycle_value(
    starting_value: int,
    length_of_range: int = 10,  # this is the value used with the modulo operator
    minimum_value: int = 0,
    shift_offset: int = 0,
    always_positive: bool = False,
) -> int:
    """The ultimate formula for cycling through values using the modulo operator
    (inspired by https://dev.to/timothee/using-modulo-to-shift-a-value-and-keep-it-inside-a-range-8fm)

    Args:
        `starting_value`: _description_
        `length_of_range`: _description_
        `minimum_value`: _description_
        `shift_offset`: _description_
        `always_positive`: _description_

    Returns:
        `int`: _description_
    """
    if always_positive:
        return (
            starting_value
            - minimum_value
            + (shift_offset % length_of_range)
            + length_of_range
        ) % length_of_range + minimum_value
    else:
        return (
            starting_value - minimum_value + shift_offset
        ) % length_of_range + minimum_value


def cycle_alphabetic(val: str) -> str:
    ord_val = ord(val)

    cycled_val = cycle_value(
        ord_val,
        length_of_range=26,
        minimum_value=97 if val.islower() else 65,
        shift_offset=-1,
        always_positive=True,
    )

    return chr(cycled_val)


def cycle_numeric(val: str) -> int:
    return cycle_value(
        int(val),
        length_of_range=10,
        minimum_value=0,
        shift_offset=-1,
        always_positive=True,
    )


def solution(sentence: str):
    """Encoding scheme:
    - replace each alphanueric character with the previous character in their respective sequence
        - _(i.e. for alphabets, moves in alphabetical order; for numbers, moves in ordinal sequence)_
    - after shifting characters, count frequency of each alphanumeric character in new string
    - create association between each alphanumeric character and its frequency and ASCII value
        - each character maps to number which is:
        absolute value of difference between ASCII value of character and its frequency
    - return list of these absolute differences, sorted in ascending order
    """

    frequency_dict = defaultdict(int)
    final_result = dict()

    for c in sentence:
        if not c.isalnum():
            continue

        cycled_c = (
            cycle_alphabetic(c) if c.isalpha() else cycle_numeric(c)
        )
        frequency_dict[str(cycled_c)] += 1

        final_result[str(cycled_c)] = abs(
            ord(str(cycled_c)) - frequency_dict[str(cycled_c)]
        )

    return sorted(final_result.values())


```
