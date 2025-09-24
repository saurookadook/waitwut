---
title: 'Unraveling Recursion Through Classic Problems'
date: '2025-09-23'
fullPath: '/notes/dsa/code-signal/python/course-11/unit-01'
sectionSlug: 'notes'
---

## Problem 1: Fibonacci Sequence

So, what is the _Fibonacci_ sequence? The _Fibonacci_ sequence is an infinite sequence of numbers, starting with `0` and `1`, with every subsequent number being the sum of the previous two numbers: `0`, `1`, `1`, `2`, `3`, `5`, `8`, `13`, ...

Given a number `n`, our task is to implement a recursive algorithm that returns the `n`-th number in the Fibonacci sequence. Remember, indexing starts from 0, just like Python's 0-index style.

Visualizing Fibonacci might be a little bit tricky at first. If you are into art and design, you might have heard about the _golden spiral_, a logarithmic spiral whose growth factor is linked to the _golden ratio_. Interestingly, the Fibonacci sequence is connected with the golden ratio as well. If you look at the ratio of two consecutive numbers in the Fibonacci series, you'll observe that it approximates the golden ratio! It's truly fascinating to see such a foundational mathematical pattern connected to art and design.

### Problem 1: Naive Recursion Approach

```python
def fib(n):
    if n <= 1:
        return n
    else:
        return fib(n - 1) + fib(n - 2)

```

The above naive recursive solution is a clear and straightforward way, but it is incredibly inefficient. Its inefficiency arises due to repeated calculations.

This inefficiency can be seen by looking at how many times the program calculates `fib(n - 2)`. This function is called once in the scope of `fib(n)` and then gets called again in the scope of `fib(n - 1)`. This redundancy in calculations greatly bloats up the time required to execute the program, leading to this solution's inefficiency.

For instance, when calculating the 5th Fibonacci number, the 3rd Fibonacci number will be calculated twice, and the 2nd Fibonacci number will be calculated three times. You can even see that, in general, the `n`-th Fibonacci number will have to calculate the `(n - 2)`-nd Fibonacci number `(n - 1)` times, which is incredibly wasteful and inefficient.

In fact, this approach has an exponential time complexity of <em class="math">O(2<sup>n</sup>)</em>, which means the runtime doubles with each addition to the input size.

Ideally, we would want to reduce this to <em class="math">O(n)</em>, which signifies linear time complexity, a much more efficient rate. This can be achieved.

### Problem 1: Efficient Approach Explanation

Beyond handling base cases in the naive solution <em class="math">(n ≤ 1)</em>, we integrate an optimization technique known as **memoization** to further enhance the function. With memoization, we store the results of previous Fibonacci number calculations. This way, for any given input `n`, if we've already calculated the Fibonacci number for `n`, there's no need to recalculate; the function can directly return the stored result.

This combination of addressing base cases and leveraging memoization avoids unnecessary repetitions and improves the function's efficiency, particularly for larger inputs.

### Problem 1: Efficient Implementation

```python
def fib(n, computed={0: 0, 1: 1})
    if n not in computed:
        computed[n] = fib(n - 1, computed) + fib(n - 2, computed)
    return computed[n]


```

In this function, we use a Python dictionary `computed` to store the Fibonacci numbers we've computed so far. If a number `n` is not in the dictionary `computed`, we calculate it using the recursive formula and store the result in our dictionary. If the number `n` is already in our dictionary, we simply return the value, thus avoiding the computation. Edge cases results (`n = 0` and `n = 1`) are stored in the `computed` dictionary by default.

This function now computes the nth Fibonacci number in linear time <em class="math">O(n)</em>, which is a significant improvement over the naive recursive implementation. Each number is calculated only once, and the function can handle a large `n` efficiently.

## Problem 2: Summing Array Elements

Next on our list is a simple operation we frequently perform in our daily lives, which is finding the sum of numbers. Our task is to implement a recursive algorithm that calculates the sum of all elements in an array.

You must be thinking, "Well, adding numbers is easy. I do it all the time when I'm grocery shopping or counting the days left until the next holiday, right?" Absolutely! We regularly sum up numbers. But what about numbers in an array? Imagine trying to add up pages of a manuscript. Instead of summing each page as you go, which can be repetitive and prone to error, you'd sum up the first page with the total pages of the remaining manuscript. Sounds much more manageable, doesn't it?

**For-loop Approach**: Sure, directly adding up elements using a loop is straightforward. However, just like in the case of the Fibonacci sequence, it misses the significance of understanding and appreciating recursion. So, let's adhere to our recursive path.

**Recursive Approach Explanation**: In our recursive approach, we decompose our problem similarly. We consider the sum of the array as the sum of the first element and the sum of the remaining elements. It's almost as if we're peeling the array one by one and summing it up, layer by layer.

### Problem 2: Solution Building

Instead of considering the base case as an array with a single element, we modify our approach to use an auxiliary index, `index`. We initially set it to 0, pointing at the first element in the array. The base case is now when `index` equals the length of the array. At this point, we have processed all elements in the array, and the function should return 0 as there are no more elements to add.

For arrays with more than one element, the function effortlessly adds the current element, pointed at by the index, and the sum of the remaining elements. It achieves this sum by recursively calling the `arraySum` function, now passing `index + 1` as the index. This incremented index moves the 'pointer' to the next element. This way, we can visualize it as moving along the array, adding one element at a time until we reach the end.

This index-based approach eliminates the need for slicing the array, making it more space-efficient. With these modifications, our final solution is:

```python
def array_sum(arr, index=0):
    if index == len(arr):
        return 0
    else:
        return arr[index] + array_sum(arr, index + 1)


```

With this approach, we converge to our sum in a highly efficient and elegant manner without creating unnecessary arrays, ultimately walking our array down to the base case.

### Problem 3: Calculating Factorial

Last but not least, we tackle the last task of computing the **factorial** of a number. As many of you would remember from your school math classes, _the factorial of a number is the product of all positive integers less than or equal to that number_, expressed as the following:

> <em class="math">n! = n ⋅ (n−1) ⋅ (n−2) ⋅ ... ⋅ 2 ⋅ 1</em>.

The **factorial** pops up in the least expected places - in mathematical formulas, treks (when calculating the number of ways to traverse a path), and even poker games (when calculating the number of ways to arrange cards).

### Problem 3: Recursive Approach Explanation

Let's revisit this traditional math concept with our new friend, recursion. For example, if we want to compute `5!`, one way to do so is <em class="math">5 ⋅ 4 ⋅ 3 ⋅ 2 ⋅ 1</em>. Now, let's flip it. We could also express <em class="math">5!</em> as <em class="math">5 ⋅ 4!</em>, and <em class="math">4!</em> as <em class="math">4 ⋅ 3!</em> and so on until <em class="math">1!</em> or <em class="math">0!</em>, which are both equal to `1`. There you have it - you've just discovered the recursive nature of the factorial function.

### Problem 3: Solution Building

As with the other problems, we first tackle the base cases. If `n` is 0 or 1, the function unflinchingly returns 1. For `n` greater than 1, the function humbly returns the product of `n` and the factorial of `(n - 1)`, by calling itself, i.e., the `factorial` function, recursively acting on `(n - 1)`. And voila, we have a recursive solution to compute factorials.

Here's the recursive function that calculates the factorial of a number:

```python
def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n - 1)

```

#### Bonus: Recurisve Solution with Memoization

```python
from collections import defaultdict


def factorial(num, memo):
    if num < 0:
        return None

    if num == 0 or num == 1:
        return 1

    key = num + num - 1
    if memo[key]:
        return memo[key]

    memo[key] = num * factorial(num - 1, memo)
    return memo[key]


def factorials(nums):
    results = []
    memo = defaultdict(int)

    for num in nums:
        f = factorial(num, memo)
        if f is not None:
            results.append(f)
        else:
            results.append('Error')
    return results


print(factorials([2, 3, 4]))  # Should print: [2, 6, 24]
print(factorials([1, 5, 6]))  # Should print: [1, 120, 720]
print(factorials([0, -3, 10]))  # Should print: [1, 'Error', 3628800]
```
