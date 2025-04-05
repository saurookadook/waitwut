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

## Navigating Arrays and Overcoming Obstacles in Python

**Task Statement**
In this "Move Until Obstacle" game, the player begins at the start of a linear array of integers. The number at each position indicates the number of steps a player can move rightward, while an obstacle number is one upon which you can't land. The aim is to move as far right as possible until an obstacle stops you or you reach the array's end.

Your function, `solution(numbers, obstacle)`, needs to tally and return the number of moves needed to reach the array's end without encountering an obstacle. If the player encounters an obstacle, then the function should return the index at which the obstacle lies.

For example, if the function is given the input: `numbers = [2, 3, 3, 4, 2, 4]` and `obstacle = 4`, it should return `5`. This is because the player starts on the 0th index, takes 2 steps as indicated by the number at the 0th index (landing on the 2nd index), and then takes 3 more steps as indicated by the number at the 2nd index to land on the 5th index, which is the obstacle `4`.

If the function is given the input: `numbers = [4, 1, 2, 2, 4, 2, 2]` and `obstacle = 2`, the output should be `2`. The player starts on the 0th index, takes 4 steps, lands on the 4th index, then takes 4 more steps, which brings the player outside the array, so in total the player makes `2` steps.

```python
def solution(numbers, obstacle):
    position = 0
    moves = 0
    while position < len(numbers):
        if numbers[position] == obstacle:
            return position
        moves += 1
        position += numbers[position]
    return moves

```

### Gameboard Transformation: Navigating Obstacles in Array

**TASK**: You are given an array of `n` integers, ranging from `1` to `100` inclusive. Each integer represents a player's progress on a linear gameboard, indicating how many steps they can move to the right. However, the course is fraught with challenges; there exist several obstacles, represented by negative integers.

Your task is to return a transformed array structuring the gameboard in a new way: if an integer can lead the player to an obstacle on its right (within the range of its value), replace the number with the index of the obstacle. If the number represents an obstacle (a negative integer), replace it with `-1`. If none of these conditions are met, retain the original integer.

Keep in mind, this task is an innovative take on our previous analysis lesson, implementing a "Move Until Obstacle" game. Remember, your array will have no more than `500` elements, and the elements in the array range from `-100` to `100`, inclusive. Good luck with your coding journey!

For instance, given an array `[3, 2, -3, 1, 2]`, the output would be `[2, 2, -1, 1, 2]`.

Here's how it works:

- Replace the first position with `2` because a player at the first position can move `3` steps but will hit the obstacle at the `2nd` index.
- Replace the second position with `2` because a player at the second position can move `2` steps but will hit the obstacle at the `2nd` index.
- Replace the negative number `-3` at the third position with `-1` because it represents an obstacle.
- Keep the number `1` at the fourth position as there are no obstacles in its range.
- Keep the number `2` at the fifth position as there are no further positions or obstacles to impact it.

```python
def get_index_of_obstacle(arr: list[int], start_index: int) -> int | None:
    for i in range(start_index, len(arr)):
        if arr[i] < 0:
            return i
    return None


def solution(numbers):
    results = []
    position_index = 0
    obstacle_index = get_index_of_obstacle(numbers, position_index)

    while position_index < len(numbers):
        if (
            obstacle_index is None
            or (
                numbers[position_index] > 0
                and position_index + numbers[position_index] < obstacle_index
            )
        ):
            results.append(numbers[position_index])
        elif position_index < obstacle_index:
            results.append(obstacle_index)
        else:
            results.append(-1)
            obstacle_index = get_index_of_obstacle(numbers, obstacle_index + 1)

        position_index += 1

    return results

```

### Design and Implement a 1D Board Game using Arrays

**TASK**: Your task is to design a 1-dimensional game where a player moves along a path determined by an array of integers.

The path is an array of integers, each ranging from `-100` to `100`, inclusive. The size of the array `n`, i.e., the total number of steps on the path, can range from `1` to `500`, inclusive. Each integer `a_i` in the array signifies how many steps the player can move and in which initial direction:

- A positive integer allows the player to move that many steps to the right.
- A negative integer directs the player to move that many steps to the left.
- Zero signifies a blockade that prevents further movement.

The game proceeds along the following rules:

1. The player starts at the first position of the array (0-indexed) and moves according to the value at the player's current position in the array.
2. If the value in the current position is zero, then the game ends. If the player's current position leads them outside of the array's boundaries, then their ability to move in the current direction ceases.
3. If the latter happens, then the player reverses their direction and continues to move according to similar rules, but now the directions are inverted: positive integers lead the player to the left, and negative integers point to the right.
4. The game ends when the player encounters a blockade or the array boundaries for the second time and so can no longer move.

You are to implement a function titled `evaluatePath(numbers)`. This function should take an array of integers as input, representing the path and its rules, and return a tuple `(position, moves)`, where:

- `position`: This is the player's final position (0-indexed) when the game ends.
- `moves`: This is the total number of moves made by the player until the game ends.

It's guaranteed that the game will not lead to an infinite loop, i.e. the path to the next blockade or the array boundaries would not require the player to visit the same position more than once.

For instance, given an array `[3, 4, 1, 1, -3, 1]`. The output would be `(4, 5)`. Here's how it works:

- The player starts at position `0`, where the value is `3`. They move `3` steps to the right and land on the `3rd` position. Total moves till now: `1`.
- At position `3`, the value is `1`. They move `1` step to the right, landing on the 4th position. Total moves till now: `2`.
- At position `4`, the value is `-3`. They move `3` steps to the left, landing back on position `1`. Total moves meanwhile: `3`.
- At position `1`, the value is `4`. They move `4` steps to the right, landing on position `5`. Total moves thus far: `4`.
- At position `5`, the value is `1`, which would lead them out of the array's right boundary. So, they reverse their direction.
- After reversing direction at position `5`, they move `1` step to the left and land on position `4`. Total moves till now: `5`.
- Now, with the reversed direction, the player is at position `4` where the value is `-3`. In the reversed direction, `-3` indicates `3` steps to the right. But this would again lead to the right boundary of the array. Since they have already reversed direction once, they cannot move further in any direction and the game ends.

At the end of the game, the player is at position `4` having made a total of `5` moves, thereby, the function returns `(4, 5)`.

```python
# - POSITIVE integer allows player to move that many steps to RIGHT
# - NEGATIVE integer directs player to move that many steps to LEFT
# - `0` signifies a blockade that prevents further movement
import operator


def evaluatePath(numbers):
    return evaluate_path_impl(numbers)


def position_within_bounds(pos, upper_bound):
    return 0 <= pos <= upper_bound


# ############ TODO: this feels like it could use some refactoring lol ############
def evaluate_path_impl(numbers):
    # if _is_test_case(numbers):
    #     print("        evaluate_path_impl        ".center(120, "%"))
    #     print(f"numbers: {numbers}")
    position = 0
    landing_position = 0
    moves = 0
    board_size = len(numbers)
    last_index = board_size - 1

    encountered_boundary = False
    direction_func = operator.add
    can_move = True

    while can_move:
        # if _is_test_case(numbers):
        #     print("        while loop iteration        ".center(120, "#"))
        #     print(f"position: {position}")
        #     print(f"moves: {moves}")
        #     print(f"numbers[position]: {numbers[position]}")
        if numbers[position] == 0:
            can_move = False
            break

        landing_position = direction_func(position, numbers[position])
        # if _is_test_case(numbers):
        #     print(f"landing_position: {landing_position}")
        #     print(f"board_size: {board_size}")
        if position_within_bounds(landing_position, last_index):
            position = landing_position
            moves += 1
        elif encountered_boundary:
            can_move = False
        else:
            encountered_boundary = True
            direction_func =  operator.sub

            last_index = board_size - 1
            reversed_start = 0 if landing_position < 0 else last_index
            leftover_steps = operator.abs(landing_position) if landing_position < 0 else landing_position - last_index
            landing_position = direction_func(reversed_start, leftover_steps)
            if position_within_bounds(landing_position, last_index):
                position = landing_position
                moves += 1


    return (position, moves)


def _is_test_case(numbers):
    return (
        numbers == [3, 4, 1, 1, -3, 1]
        or numbers == [3, 2, -1, 2, 2, -1, 4]
    )

```

### Implementing Different Player Starting Positions in a Board Game

**TASK**: You are the developer of a unique board game and are now dealing with the challenge of quantifying player progress, assuming different starting positions.

The game is played on a linear board that can be described as an array of integers, from `1` to `n`, with n ranging from
`1` to `500` inclusive. Each position in the array is a move value that a player can take, signifying the number of steps a player can move rightward. An obstacle is a specific integer value on which the player cannot land.

Your task is to implement the `solution(numbers, obstacle)` function, which calculates and returns an array `steps`. For every `i` in `steps`, the algorithm should calculate the number of steps required for a player to reach the end of the array from the `i`-th position without landing on an obstacle. If the player encounters an obstacle, `steps[i]` should should be `-1`.

Each number in the `numbers` array can range from `1` to `10`, and the obstacle value can range between `1` and `10`, inclusive.

The return value should be `steps`, the array with calculated values.

For example, if `numbers` is `[5, 3, 2, 6, 2, 1, 7]` and `obstacle` is `3`, the function would return an array `[3, -1, 3, 1, 2, 2, 1]`. The first value `1` indicates that starting from position `0`, the player will have to make one move and land on an obstacle. The second value, `-1`, indicates that starting from `1`, the player is on an obstacle. Therefore, progression from `1` is not possible. And so on.

```python
def solution(numbers, obstacle):
    steps = []
    position = 0
    step_count = 0
    board_size = len(numbers)

    for n in range(board_size):
        position = n

        while position < board_size:
            if numbers[position] == obstacle:
                break

            position += numbers[position]
            step_count += 1

        steps.append(-1 if position < board_size and numbers[position] == obstacle else step_count)
        step_count = 0

    return steps


```

## Adding Extremely Large Numbers Represented as Strings

**Intro**
Hello and welcome! Today, we'll delve deep into a captivating problem that involves large numbers -- specifically, adding extraordinarily large numbers. As you may have noticed, traditional calculators and even some programming languages struggle when numbers get exceedingly large. To handle such scenarios efficiently, we'll simulate this process manually using strings. By the end of this discussion, you'll be able to add together numbers that have thousands or even tens of thousands of digits.

**Task Statement**
In today's task, we'll step into the world of large numbers, where, specifically, we are given two exceedingly large positive integers. However, these aren't your average, everyday large numbers. They are so vast they're represented as strings that can be up to 10,000 digits long!

Accepting our mission means writing a Python function that binds these two "string-numbers" together. The challenge is to perform the addition without converting the entire strings into integers.

Finally, our function should return the resulting sum, represented as a string. While it might seem daunting at first, don't worry -- we'll break it down step by step, mimicking how we manually add numbers.

```python
def solution(num_1, num_2):
    i = len(num_1) - 1
    j = len(num_2) - 1
    carry = 0
    results = []

    while i >= 0 or j >= 0 or carry < 0:
        n_1 = int(num_1[i]) if i >= 0 else 0
        n_2 = int(num_2[j]) if j >= 0 else 0
        total = n_1 + n_2 + carry
        carry = 1 if total > 9 else 0
        results.append(str(total % 10))
        i -= 1
        j -= 1

    # `results[::-1]` reverses list
    return ''.join(reversed([d for d in results]))

```

### Comparing Large Numbers Represented as Strings

**TASK**: For this task, you are given two non-negative integers, num1 and num2. However, these are not just ordinary numbers; they are so large that they should be represented as strings instead of normal integers. Each can be up to 100 digits long.

Your mission is to write a Python function that compares these two "string-numbers" without converting the entire strings into integers. Your function should determine whether `num_1` is greater than, less than, or equal to `num_2`.

Your function can only use comparison operators (such as `>`, `<`, or `==`) on strings. So `"1" < "2"` is allowed, but `1 < 2` is not. The task requires that you manually compare the two strings from the most significant digit to the least significant. You should implement your own logic to compare two string numbers.

The function should return the following results:

- If `num_1` is greater than `num_2`, your function should return `1`.
- If `num_2` is greater than `num_1`, your function should return `-1`.
- If `num_1` and `num_2` are equal, your function should return `0`.

Let's look at the following examples:

- For `num_1` = '12345' and `num_2` = '1234', your function should return `1`.
- For `num_1` = '1234' and `num_2` = '12345', your function should return `-1`.
- For `num_1` = '12345' and `num_2` = '12345', your function should return `0`.

```python
def solution(num_1, num_2):
    num_1_len = len(num_1)
    num_2_len = len(num_2)

    if num_1_len > num_2_len:
        return 1

    if num_2_len > num_1_len:
        return -1

    comparison = 0

    for i in range(num_1_len):
        if num_1[i] > num_2[i]:
            return 1
        elif num_2[i] > num_1[i]:
            return -1

    return comparison


```

### Subtracting Large Numbers Represented as Strings

**TASK**: You are given two exceedingly large positive decimal numbers, `num_1` and `num_2`, both represented as strings. The length of these strings can range anywhere from `1` to `500` characters. The challenge here is to subtract `num_2` from `num_1` without directly converting the strings into integers.

Create a Python function that performs this operation and returns the resultant string, referred to as `num_3`.

Please note that the subtraction will not result in a negative number, as `num_1` will always be greater than or equal to `num_2`.

```python
def solution(num_1, num_2):
    num_1_len = len(num_1)
    num_2_len = len(num_2)
    i = num_1_len - 1
    j = num_2_len - 1

    borrowed = 0
    results = []

    while i >= 0 or j >= 0 or borrowed < 0:
        n_1 = int(num_1[i]) - borrowed if i >= 0 else 0
        n_2 = int(num_2[j]) if j >= 0 else 0

        if n_2 > n_1:
            n_1 += 10
            borrowed = 1
        else:
            borrowed = 0

        results.append(str(n_1 - n_2))
        i -= 1
        j -= 1

    while len(results) > 1 and results[-1] == '0':
        results.pop()

    return ''.join(reversed([d for d in results]))


```

### Multiplying Extremely Large Numbers Represented as Strings

**TASK**: You are tasked with writing a Python function to multiply two extremely large positive integers. These are not your regular-sized large numbers; they are represented as strings potentially up to `500` digits long.

Your function should take two string parameters, representing the two large integers to be multiplied, and return the product as a string. The challenging part is that you should perform the multiplication without converting the entire strings into integers.

Keep in mind that the elements of the string are digits in the range from `0` to `9`, inclusive.

Furthermore, bear in mind that when multiplying numbers manually, we align the numbers vertically and multiply each digit of the first number with each digit of the second number, starting from the rightmost digits, and add the results after shifting appropriately.

```python
def get_initial_values(num_1, num_2):
    num_1_len = len(num_1)
    num_2_len = len(num_2)

    if num_2_len > num_1_len:
        bigger_num_str = num_2
        smaller_num_str = num_1
        bigger_index = num_2_len - 1
        smaller_index = num_1_len - 1
    else:
        bigger_num_str = num_1
        smaller_num_str = num_2
        bigger_index = num_1_len - 1
        smaller_index = num_2_len - 1

    return bigger_num_str, bigger_index, smaller_num_str, smaller_index


def solution(num_1, num_2):
    (bigger_num_str, bigger_index, smaller_num_str, smaller_index) = get_initial_values(
        num_1=num_1, num_2=num_2
    )

    last_bigger_index = bigger_index
    bigger_added_zeroes = ""
    smaller_added_zeroes = ""
    results = []

    while smaller_index >= 0:
        smaller_num = (
            int(smaller_num_str[smaller_index] + smaller_added_zeroes)
            if smaller_index >= 0
            else 0
        )

        while bigger_index >= 0:
            bigger_num = (
                int(bigger_num_str[bigger_index] + bigger_added_zeroes)
                if bigger_index >= 0
                else 0
            )

            results.append(bigger_num * smaller_num)
            bigger_index -= 1
            bigger_added_zeroes += "0"

        bigger_index = last_bigger_index
        bigger_added_zeroes = ""
        smaller_index -= 1
        smaller_added_zeroes += "0"

    return str(sum(results))

```
