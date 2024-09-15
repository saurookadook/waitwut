---
title: 'Mastering Implementation of Advanced Loops in Python'
date: '2024-09-13'
fullPath: '/notes/dsa/code-signal/python/course-93'
sectionSlug: 'notes'
---

## Nested Loop Pair Discovery: Comparing Elements Across Two Arrays

**TASK**: You are given two lists: `sourceArray` and `searchArray`, consisting of `n` and `m` tuples respectively, where `n` is an integer such that `1` ≤ `n` ≤ `100` and m is an integer such that `1` ≤ m ≤ `500`. Each tuple in both arrays contains two elements: an integer identifier and a string. The identifiers in both arrays range from `1` to `100`, inclusive. The strings in `sourceArray` consist of alphanumeric characters with lengths ranging from `1` to `100`, inclusive. The strings in `searchArray` have lengths ranging from `1` to `500`, inclusive.

Your task is to implement a function `stringSearch(sourceArray, searchArray)` that takes these two arrays as input and returns an array that includes all tuples from `sourceArray` for which its string is a substring of at least one string in any tuple from `searchArray` and the identifier of the source tuple is less than or equal to the identifier of the search tuple.

The order in which the tuples appear in the result should reflect their original order in the `sourceArray`. If no matches are found, the function should return an empty array.

For example, if `sourceArray = [(1, 'abc'), (2, 'def'), (3, 'xyz')]` and `searchArray = [(1, 'abcdef'), (5, 'uvwxy')]`, the function should return `[(1, 'abc')]` since `'abc'` and `'def'` are substrings found in `'abcdef'`, but `'def'` is associated with 2 in `sourceArray` which is not less than or equal to `1` in `searchArray`. The string `'xyz'` is not found in either `'abcdef'` or `'uvwxy'`, so it is not included in the result.

This task requires mastery of skills in nested looping and array manipulation, especially in the context of searching for a string within other strings.

```python
def stringSearch(sourceArray, searchArray):
    return string_search_impl(sourceArray, searchArray)

def string_search_impl(source_array, search_array):
    results = []

    for source_tuple in source_array:
        i, source_string = source_tuple

        for j, search_string in search_array:
            if (
                i <= j
                and source_string in search_string
                and source_tuple not in results
            ):
                results.append(source_tuple)

    return results

```

### Finding Perfect Square Sum Pairs from Two Arrays

**TASK**: You will be given two arrays of integers. The first array has `n` elements, and the second array has `k` elements. Sizes `n` and `k` both range from `1` to `100`, inclusive. The elements of both arrays can fall within a range of `-100` to `100`, inclusive.

Your task is to write a Python function that will locate and return an array of all pairs of integers with the property that the first element of each pair comes from the first array and the second element of each pair comes from the second array, such that the sum of the two elements of the pair is a perfect square. A perfect square, as you know, is an integer that is the square of another integer.

The order of pairs in your output should correspond to the order of the elements in the input arrays. For example, if the two arrays are `[2, 3, 16]` and `[1, 9, 10]`, the function should return `[(3, 1), (16, 9)]` because `3 + 1 = 4` _(which is the square of 2)_ and `16 + 9 = 25` _(which is the square of 5)_.

If no such pairs exist, or if either input array is empty, your function should return an empty list.

```python
import math

def solution(arr_1, arr_2):
    perfect_square_sum_pairs = []

    if len(arr_1) < 1 or len(arr_2) < 1:
        return perfect_square_sum_pairs

    for n in arr_1:
        for k in arr_2:
            pair_sum = n + k
            if pair_sum < 0:
                continue

            square_root_of_sum = math.sqrt(pair_sum)

            if square_root_of_sum % 1 == 0:
                perfect_square_sum_pairs.append((n, k))

    return perfect_square_sum_pairs

```

## Processing Words in Sentences with Nested Loops

**Task Statement**
Here is a detailed look at our task: We will work with a string that represents a sentence in which words are separated by spaces. Your task is to create a Python function that identifies the odd-indexed characters of words that have an even number of characters. Then, combine these characters into a single string, maintaining the order in which they appear in the sentence.

Let's consider an example to foster a deep understanding: "Python is a high-level programming language." Here, the word 'Python' has 6 characters (an even number), and we will select the odd-indexed characters from this word, specifically, 'y', 'h', and 'n'. Similarly, we select 's' from 'is', and 'i', 'h', 'l', 'v', 'l' from 'high-level'. The words 'a', 'programming', and 'language.' have odd lengths, so they are skipped.

So, if our function is working correctly, it should return "yhnsihlvl". Isn't it fascinating to see the amount of information we can extract from a simple sentence?

```python
def solution(sentence):
    words = sentence.split(' ')
    result = ''
    for word in words:
        if len(word) % 2 == 0:  # check if the length of word is even
            for i in range(1, len(word), 2):  # loop over odd characters
                result += word[i]
    return result

```

### Even-Indexed Characters in Odd-Length Words Reverser

**TASK**: In this task, we are manipulating sentences and strings using nested loops. You will be given a string representing a sentence where words are separated by spaces. Your objective is to write a Python function that selects the even-indexed characters of words containing an odd number of characters.

This sentence string will have a maximum length of `500` characters, including spaces.

Subsequently, these characters must be combined into a single string in the order they appear in the sentence, but the **final output** string will be reversed end-to-end.

For instance, if the input sentence is "Coding tasks are fun and required", the output string should be `"tssaefnad"`, which, when reversed, becomes `"danfeasst"`. The words `"tasks"`, `"are"`, `"fun"`, and `"and"` are selected since they have an odd number of characters, and the characters `'t'`, `'s'`, `'s'`, `'a'`, `'e'`, `'f'`, `'n'`, `'a'`, `'d'` at even indexes are chosen and then reversed in the final string. Do not forget that Python indexing begins at `0`, so `'t'` in "tasks" is considered to be at an even index. Single-character words must also be taken into consideration for this task.

```python
def solution(sentence):
    words = sentence.split(' ')
    result = ''

    for word in words:
        word_length = len(word)
        if word_length % 2 != 0:
            for i in range(0, word_length, 2):
                result = word[i] + result

    return result

```

### Most frequent Characters in Odd-Length Words

**TASK**: You are given a string of `n` words, with `n` ranging from `1` to `100`, inclusive. The words are separated by a single space in the string. Your task is to return the most frequently occurring character in each word that has an odd number of characters. The resulting characters should be concatenated into a string with their occurrences in the sentence.

Please note:

1. Each word's character count ranges from `1` to `500`, inclusive. The string contains lowercase and uppercase alphanumeric characters, spaces, and punctuation.
2. For instance, if the input string is "Hello world this is a demo string", your function should return `"lwa"`. In this string, `'Hello'`, `'world'`, and `'a'` have an odd number of characters. The most frequently occurring character in these words are `'l'`, `'w'`, and `'a'` respectively. When concatenated, they form `"lwa"`.
3. In case of a tie in character frequency, return the character that appears first in the word. In the example above, we took `'w'` from the word `'world'`.
4. The function should be case insensitive. The lowercase and uppercase characters should be counted as the same character. The output should only contain lowercase characters. For example: `"Hhi"` should return `"h"` because `"h"` appears twice in the string even though one is uppercase and one is lowercase.
5. If there are no words with an odd number of characters in the input string, your function should return an empty string.
6. The input string will always be at least one character long, and it cannot be just a single whitespace.

```python
def get_most_frequently_occurring_char(word):
    char_map = {}
    result = ''
    has_tie = False
    lower_word = word.lower()

    for char in lower_word:
        char_from_map = char_map.setdefault(char, 0)
        char_map[char] = char_from_map + 1

        if not result:
            result = char
            continue

        if char_map[char] > char_map[result] or char == result:
            result = char
            has_tie = False
        elif char != result and char_map[char] == char_map[result]:
            has_tie = True

    return (
        result
        if not has_tie or (has_tie and char_map[result] > 1)
        else lower_word[0]
    )


def solution(space_separated_words):
    words = space_separated_words.split(' ')
    result = ''

    for word in words:
        if len(word) % 2 != 0:
            result += get_most_frequently_occurring_char(word)

    return result

```

### Concatenating Selected Characters from Even-Length Words in a Sentence

**TASK**: You are given a string that represents a sentence in which words are separated by spaces. Your task is to create a Python function that identifies and concatenates the second half of each word with an even number of characters, ensuring the characters of this second half go before the character `c` in the ASCII table. Then, combine these characters into a single string, maintaining the order in which they appear in the sentence.

The input sentence consists of ASCII characters from the space character (`' '`) up to the tilde character (`'~'`), with its length ranging between `1` and `500`, inclusive. These characters form words separated by spaces, without any consecutive space characters.

For example, consider the sentence: `"Python is a high-level programming language."` and the character `"n"`. The word `'Python'` consists of `6` characters _(an even number)_, and the second half of this word is `'hon'`. In this second half, only `'h'` is less than `'n'`.

The output of your function, in this case, should be: `"h"`, as it's the only character that meets the conditions.

For the character comparison (`'<'` character), use the ASCII values since all characters in the sentence are ASCII. ASCII codes for characters can be found by using Python's built-in function `ord()`.

```python
def solution(sentence, c):
    words = sentence.split(' ')
    result = ''
    ord_c = ord(c)

    for word in words:
        word_length = len(word)

        if word_length % 2 == 0:
            middle_index = word_length // 2

            chars_for_result = [
                char for char in word[middle_index:word_length] if ord(char) < ord_c
            ]
            if chars_for_result:
                result += ''.join(chars_for_result)

    return result

```
