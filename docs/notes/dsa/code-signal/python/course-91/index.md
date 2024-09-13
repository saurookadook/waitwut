---
title: 'Applying Simple Looping in Practice with Python'
date: '2024-09-13'
fullPath: '/notes/dsa/code-signal/python/course-91'
sectionSlug: 'notes'
---

> 🚧 UNDER CONSTRUCTION 🚧

## Traversing Digits in a Number without converting to String

**TASK**: Get sum or product of digits of integer without converting it to a string
- given integer `n` where `n` ranges from `1` to `10^8`, inclusive
- write function that calculates and returns product of ODD digits of `n` without converting `n` into a string
- if `n` has no odd digits, function should return `0`
Example: if `n` is `43172`, then result should be `21` (`3 * 1 * 7`)
SOLUTION
- extract last digit of `n` using modulo operator: `n % 10`
   - if digit is odd, multiply `product_of_digits` by that digit (multiply by `1` if `product_of_digits` is `0`)
- after processing digit, chop off last digit of `n` using integer division: `n // 10`
-
```python
def solution(n):
    local_n = int(n)
    product_of_digits = 0

    while local_n > 0:
        digit = local_n % 10

        if not digit % 2 == 0:
            product_of_digits = (product_of_digits or 1) * digit

        local_n = local_n // 10

    return product_of_digits

```

**TASK**: construct function that...
- accepts integer `n` and returns the integer with the same digits as `n` but in reverse order
- `n` will always be positive integer between `1` and `10^8`
- DO NOT use built-in functions that convert integers to another data type (such as a string) to reverse it
- solve problem PURELY using mathematical operations and loop constructs
Example: if `n` is `12345`, then result should be `54321`

```python
def solution(n):
    local_n = int(n)
    reversed_n = 0

    while local_n > 0:
        digit = local_n % 10

        reversed_n += digit

        local_n = local_n // 10

        if local_n > 0:
            reversed_n *= 10

    return reversed_n

```

## Duplicating Digits in non-negative Integer

**TASK**: implement a function that duplicates every digit in a given non-negative integer number, n. For example, if n equals 1234, the function should return 11223344.
- To prevent possible integer overflow, it is guaranteed that n will be a non-negative integer that does not exceed `10^4`
- Solve this task without converting n into a string or performing any other type of casting. Your job is to work strictly with integer operations.

```python
def solution(n):
    local_n = int(n)
    result = 0
    digit_multiplier = 1

    while local_n > 0:
        digit = local_n % 10

        rh_digit = digit * digit_multiplier
        digit_multiplier *= 10

        lh_digit = digit * digit_multiplier
        digit_multiplier *= 10

        result += lh_digit + rh_digit

        local_n = local_n // 10

    return result


def solution(input_string):
    result = ""
    # Pattern for getting middle index
    length = len(input_string)
    middle_index = length // 2 + length % 2
    for i in range(middle_index):
        pass

```

**TASK**: start at middle index and iterate outwards adding the left- and right-next elements to new array

```python
def iterate_middle_to_end(numbers):
    mid = len(numbers) // 2  # The index of the left middle element
    if len(numbers) % 2 == 1:
        left = mid - 1  # The left to the middle element
        right = mid + 1  # The right to the middle element
        new_order = [numbers[mid]]  # Adding the middle element to the resulting array
    else:
        left = mid - 1  # Left middle element
        right = mid  # Right middle element
        new_order = []  # No elements in the resulting array for now

    while left >= 0 and right < len(numbers):
        new_order.append(numbers[left])
        new_order.append(numbers[right])
        left -= 1
        right += 1

    return new_order


def solution(numbers):
    results = []
    length_of_numbers = len(numbers)

    midpoint = length_of_numbers // 2
    left_index = midpoint - 1

    if length_of_numbers % 2 == 1:
        right_index = midpoint + 1
        results.append(numbers[midpoint])
    else:
        right_index = midpoint

    while left_index >= 0 and right_index < length_of_numbers:
        results.append(numbers[left_index] * numbers[right_index])
        left_index -= 1
        right_index += 1

    return results

```

**TASK**: You are provided with an array of `n`` integers, where `n`` ranges from `1` to `501` and is always an odd number.

The elements of the array span values from `-10^6` to `10^6`, inclusive.

The goal is to return a new array constructed by traversing the initial array in a specific order, outlined as follows:
- Begin with the middle element of the array.
- For each subsequent pair of elements, alternate between taking two elements from the left and two elements from the right, relative to the middle.
- If fewer than two elements remain on either side, include all the remaining elements from that side.
- Continue this process until all elements of the array have been traversed.

For example, for `array = [1, 2, 3, 4, 5, 6, 7]`, your function should return `[4, 2, 3, 5, 6, 1, 7]`. And for `array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]`, your function should return `[6, 4, 5, 7, 8, 2, 3, 9, 10, 1, 11]`.

```python
def unusual_traversal(array):
    results = []
    arr_len = len(array)

    middle_index = arr_len // 2

    results.append(array[middle_index])

    def get_next_left_index(index):
        return max(index - 2, 0)

    def get_next_right_index(index):
        return min(index + 2, arr_len)

    left_upper_index = middle_index
    left_lower_index = get_next_left_index(left_upper_index)
    right_lower_index = 1 + middle_index
    right_upper_index = get_next_right_index(right_lower_index)

    while len(results) < arr_len:
        results += (
            array[left_lower_index:left_upper_index]
            + array[right_lower_index:right_upper_index]
        )

        left_upper_index = left_lower_index
        left_lower_index = get_next_left_index(left_upper_index)
        right_lower_index = right_upper_index
        right_upper_index = get_next_right_index(right_lower_index)

    return results
```



