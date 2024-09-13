---
title: 'Practicing String Operations and Type Conversions in Python'
date: '2024-09-13'
fullPath: '/notes/dsa/code-signal/python/course-92'
sectionSlug: 'notes'
---

## Transforming Words with English Alphabet's Opposite Characters

**TASK**: Given a string consisting of words separated by whitespace, your task is to write a Python function that accepts this string. It then replaces each character in the words with the corresponding character opposite in the English alphabet and stitches them all together to form a new string.

Here's what you need to consider:
- The input string will include between 1 and 100 words.
- Each word consists of characters separated by white space.
- A word is composed of characters ranging from a to z or A to Z. So, if a word contains a lowercase 'a', for instance, it should be replaced with 'z', 'b' with 'y', 'c' with 'x', and so on, maintaining the same case. For words with an uppercase 'A', it should be replaced with 'Z', 'B' with 'Y', 'C' with 'X', and so forth, while preserving the uppercase.
- The given string will not start or end with a space, and there will be no occurrence of double spaces.
- After transforming the characters of the words, form a new string by taking the last word first and appending the remaining words in their original order, each separated by spaces.

**Note**: The opposite letter mappings are as follows: `a` <-> `z`, `b` <-> `y`, `c` <-> `x`, ..., `m` <-> `n`, `n` <-> `m`, ..., `x` <-> `c`, `y` <-> `b`, `z` <-> `a`. The mapping is case-sensitive.

**Example**
For the input string "CapitaL letters", the output should be "ovggvih XzkrgzO".

```python
# ord of 'A': 65
# ord of 'M': 77
# ord of 'N': 78
# ord of 'Z': 90
# ord of 'a': 97
# ord of 'm': 109
# ord of 'n': 110
# ord of 'z': 122


def get_uppercase_opposite(char_ord):
    if ord("A") <= char_ord <= ord("M"):
        offset = char_ord - ord("A")
        return chr(ord("Z") - offset)
    else:
        offset = ord("Z") - char_ord
        return chr(ord("A") + offset)


def get_lowercase_opposite(char_ord):
    if ord("a") <= char_ord <= ord("m"):
        offset = char_ord - ord("a")
        return chr(ord("z") - offset)
    else:
        offset = ord("z") - char_ord
        return chr(ord("a") + offset)


def get_opposite_char(char):
    char_ord = ord(char)

    return (
        get_uppercase_opposite(char_ord)
        if char.isupper()
        else get_lowercase_opposite(char_ord)
    )

```

## Parsing and Calculating Seconds from Time Strings in Python

**TASK**: add `seconds` to `time` (a time as a string in the format `HH:MM:SS`)

```python
def solution(time, seconds):
    time_parts = [int(part) for part in time.split(":")]
    seconds_since_start = time_parts[0] * 3600 + time_parts[1] * 60 + time_parts[2]
    total_seconds = (seconds_since_start + seconds) % (24 * 3600)
    hours, remainder = divmod(total_seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    return f"{hours:02d}:{minutes:02d}:{seconds:02d}"

```

**TASK**: same as above but first argument is an array of time strings

```python
def add_seconds_to_singular_time(time_point, seconds):
    time_parts = [int(part) for part in time_point.split(":")]
    seconds_since_start_of_day = (
        time_parts[0] * 3600 + time_parts[1] * 60 + time_parts[2]
    )
    result_in_seconds = (seconds_since_start_of_day + seconds) % (24 * 3600)
    hours, remainder = divmod(result_in_seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    return f"{hours:02d}:{minutes:02d}:{seconds:02d}"


def add_seconds_to_times(time_points, seconds):
    return [
        add_seconds_to_singular_time(time_point, seconds) for time_point in time_points
    ]

```

**TASK**: You are given an initial date as a string in the format `YYYY-MM-DD`, along with an integer `n` which represents
a number of days. Your task is to calculate the date after adding the given number of days to the initial date
and return the result in the `YYYY-MM-DD` format.

Keep these points in mind when resolving the task:
- The initial date string is always valid, formatted as `YYYY-MM-DD`, where
  `YYYY` denotes the year, `MM` the month, and `DD` the day.
- The given integer `n` is the number of days you have to add to the initial date and will be up to `50,000`.
- The output should be a string showcasing the final date after adding `n` days, in the `YYYY-MM-DD` format.

Your function will be in the form `add_days(date: str, n: int) -> str`.

**#### Constraints ####**
- `date` = the date string in the `YYYY-MM-DD` format. The year `YYYY` will be from 1900 to 2100, inclusive.
  The month `MM` and the day `DD` will be valid for the given year.
- `n` = the integer representing the number of days you have to add to the initial date. `n` ranges from `1`
  to `50,000`, inclusive.
- You should consider leap years in the calculation. A year is a leap year if it is divisible by 4, but
  century years (years divisible by 100) are not leap years unless they are divisible by 400. This means that
  the year 2000 was a leap year, although 1900 was not.
- The month and day result should always be two digits long, padding with a `0` if necessary.
  For example, July 9th should be formatted as `"07-09"`.

**Example**
For `date = '1999-01-01'` and `n = 365`, the output should be `'2000-01-01'`.

```python
def is_leap_year(year):
    return year % 400 == 0 or (year % 100 != 0 and year % 4 == 0)


def get_shifted_month(
    starting_value, minimum_value=1, shift_offset=1, length_of_range=12
):
    cyclic_val = (
        starting_value - minimum_value + shift_offset
    ) % length_of_range + minimum_value
    return max(cyclic_val, 1)


def add_days(date, n):
    local_n = int(n)
    days_in_month = ["offset", 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    year, month, day = tuple([int(p) for p in date.split("-")])

    while local_n > 0:
        days_left_in_month = days_in_month[month] - day + 1

        if is_leap_year(year) and month == 2:
            # print("------------------ Adding day for leap year")
            # print(f"year: {year}")
            # print(f"month: {month}")
            # print(f"day: {day}")
            days_left_in_month += 1
            # print(f"local_n: {local_n}")
            # print(f"days_left_in_month: {days_left_in_month}")

        # print("    before calculations    ".center(160, '+'))
        # print(f"year: {year}")
        # print(f"month: {month}")
        # print(f"day: {day}")
        # print(f"local_n: {local_n}")
        # print(f"days_left_in_month: {days_left_in_month}")

        if local_n >= days_left_in_month:
            if month == 12:
                year += 1
            month = get_shifted_month(month)
            day = 1
        else:
            print("------------------ What is going on here? :]")
            print(f"year: {year}")
            print(f"month: {month}")
            print(f"day: {day}")
            print(f"local_n: {local_n}")
            print(f"days_left_in_month: {days_left_in_month}")
            day += local_n

        local_n -= days_left_in_month

    return f"{year}-{month:02d}-{max(day, 1):02d}"

```

## Exploring Substring Search in Python Strings

### Task Statement and Description
Here's our challenge: we have two lists of strings of the same length, one containing the "original" strings and the other, the "substrings". We're to identify all occurrences of each substring within its corresponding original string and return a list of the starting indices of these occurrences. Remember, index counting should start from 0.

**Example**
If we take the following lists:
- Original List: `["HelloWorld", "LearningPython", "GoForBroke", "BackToBasics"]`
- Substring List: `["loW", "ear", "o", "Ba"]`

This will produce the following outputs:
- In "HelloWorld", "loW" starts at index 3.
- In "LearningPython", "ear" starts at index 1.
- In "GoForBroke", "o" appears at indices 1, 3, and 7.
- In "BackToBasics", "Ba" starts at indices 0 and 6.

So, if `findSubString(["HelloWorld", "LearningPython", "GoForBroke", "BackToBasics"], ["loW", "ear", "o", "Ba"])` is called, the function should return:
```json
[
    "The substring 'loW' was found in the original string 'HelloWorld' at position(s) 3.",
    "The substring 'ear' was found in the original string 'LearningPython' at position(s) 1.",
    "The substring 'o' was found in the original string 'GoForBroke' at position(s) 1, 3, 7.",
    "The substring 'Ba' was found in the original string 'BackToBasics' at position(s) 0 and 6.",
]
```

```python
def solution(orig_strs, substrs):
    result_arr = []

    for original, substring in zip(orig_strs, substrs):
        start_pos = original.find(substring)
        match_indices = []

        while start_pos != -1:
            match_indices.append(str(start_pos))
            start_pos = original.find(substring, start_pos + 1)

        result_arr.append(
            f"The substring '{substring}' was found in the original string '{original}' at position(s) {', '.join(match_indices)}."
        )


```

**TASK**: Replacing and reversing words in sentences

```python
import re


def replace_words_in_sentences(sentences, words):
    results = []

    for sentence, word in zip(sentences, words):
        pattern = re.compile(f"({word})", re.I)
        result_sentence = sentence

        for match in re.finditer(pattern, sentence):
            matched_word = match.group(0)
            reversed_word = "".join(reversed([c for c in matched_word]))

            if matched_word.istitle():
                reversed_word = reversed_word.title()

            result_sentence = sentence.replace(matched_word, reversed_word)

        results.append(result_sentence)

    return results
```

**TASK**:
Humans often make mistakes when they are typing quickly. In some cases, they may press two keys simultaneously, resulting in swapped characters in the text. Your task is to craft a Python function that helps identify such typos. Specifically, you are asked to construct a function called `spot_swaps(source: str, target: str) -> List[Tuple[int, str, str]]` that behaves as follows:

Given two strings, `source` and `target`, of the same length `n` (1 ≤ `n` ≤ 500), inclusive, both comprise only lowercase English letters. The function should return a list of tuples. Each tuple should contain three elements: the zero-based index of the swap in the `source` string, the character (a string of length 1) at that index in `source`, and the character that swapped places with the source character in `target`.

In other words, go over both strings simultaneously and, for each character from
`source` and `target` at position `i`, find situations when `source[i] != target[i]` and `source[i+1] = target[i]` and `source[i] = target[i+1]`. This implies that the characters at positions `i` and `i+1` in the source string swapped places in the `target` string.

**Note**:
- Characters can be swapped at most once.
- The swapped character pairs should be returned in a list in the order they were found (from the string start to end).
- Don't check for swaps at the last position of a string, since there is no character with which to swap.

**Example**
For `source = "hello"` and `target = "hlelo"`, the output should be `[(1, 'e', 'l')]`.

```python
def spot_swaps(source: str, target: str) -> list:
    swaps = []

    for i in range(len(source) - 1):
        if (
            source[i] != target[i]
            and source[i + 1] == target[i]
            and source[i] == target[i + 1]
        ):
            swaps.append((i, source[i], target[i]))

    return swaps

```
