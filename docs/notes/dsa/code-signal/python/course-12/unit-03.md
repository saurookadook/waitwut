---
title: 'Mastering Stack Applications: Interview Problems Solved Efficiently'
date: '2025-09-27'
fullPath: '/notes/dsa/code-signal/python/course-12/unit-03'
sectionSlug: 'notes'
---

## Problem 1: Previous Value Finder

Let's start with our first problem. Imagine you have a list of integers, and your task is to determine the _preceding smaller value_ for every number on the list. If a smaller previous element does not exist, you have to return `-1`.

### Problem 1: Problem Actualization

Now, let's give this problem some context for better understanding its real-world application. Imagine you are working in finance, analyzing historical stock prices. For each day, you would like to know the previous day when the price was lower than the current price. This situation is a perfect instance where our problem comes into play, and solving it would make your everyday job a lot easier.

### Problem 1: Naive Approach

While approaching this problem, your initial heuristic might lead you down the path of comparing each number with all its previous numbers. While this method does offer a solution, it's not an efficient one. Would you guess it's time complexity? Exactly, it is <em class="math">O(n<sup>2</sup>)</em>! As the scale increases, this approach generates a lot of unnecessary computations, rendering it inefficient for larger data sets.

### Problem 1: Efficient Approach Explanation

Instead of the naive, brute-force approach, a more elegant and efficient solution would involve the use of **Stacks**. A **Stack** would allow us to track only relevant numbers, discarding the ones that won't contribute to the solution. This ensures higher accuracy in our solutions and optimizes computational resources.

### Problem 1: Solution Building

```python
def find_smaller_preceeding(numbers):
    # the `-1` serves as placeholder for first element
    result = [-1]
    stack = []

    for num in numbers:
        while stack and stack[-1] >= num:
            stack.pop()

        next_val = stack[-1] if stack else -1
        result.append(next_val)
        stack.append(num)

    # return result list excluding placeholder element
    return result[1:]

```

### Problem 1: Intuition

Now, you might be wondering, "Sure, this approach seems way more efficient, but why does it work? How can we just ignore certain numbers and trust that our stack is leading us to the correct answers?" Well, that's the beauty of this approach.

By popping out the numbers from the stack that are larger than or equal to the current number, we are notifying the process that these numbers can't possibly be the "previous smaller value" for any other number that follows in the list. Why? Because if there is a number smaller than these popped numbers, it would be smaller than our current number as well, and it would inevitably be positioned in between our current number and the popped numbers. As a result, our current number is closer to any forthcoming numbers, fulfilling the 'smaller' and 'most recent' criteria in our quest.

## Problem 2: Stack Minimizer

Our second problem requires us to design a stack with a special feature. This stack should be capable of performing all typical operations like pushing an element onto the stack, popping the top element from the stack, and fetching the top element. In addition, it should also support a special function `get_min()` that returns the smallest element in the stack — all within a time complexity of <em class="math">O(1)</em>.

### Problem 2: Problem Actualization

To understand when this problem may come in handy, imagine you are dealing with a stack of papers, each assigned with a different numerical value, and you always need to have access to the paper with the smallest number. In such a scenario, how would you engineer your stack so that the smallest paper can be found instantly? Our `get_min()` function is the answer to this problem.

### Problem 2: Naive Approach

The initial heuristic might be to maintain a separate variable to keep track of the minimum element. However, this approach becomes problematic when the minimum element is removed from the stack, as it triggers additional overhead to update the new minimum.

### Problem 2: Efficient Approach Explanation

We can solve this issue by maintaining a secondary stack that mirrors the main stack but tracks the minimum values in parallel. When an element is pushed onto the main stack, we check if it's less than or equal to the current top element of the secondary stack. If it is, we also push it onto our secondary stack. This ingenious method paves the way to query the minimum element with a `get_min()` function at a constant time complexity of <em class="math">O(1)</em>.

### Problem 2: Solution Building

Starting from the ground up, we'll build our structure and the `MinStack` class to house all the method operations:

We'll first initialize two empty lists, `stack` and `min_stack`.

```python
class MinStack:
    def __init__(self):
        self.min_stack = []
        self.stack = []

```

This `stack` stores the added elements, and `min_stack` holds the minimum values.

Next, we'll shape the `push` method, which pushes an element onto `stack`, and if this new element is smaller than or equal to the current smallest element _(the top element of `min_stack`)_, it is also pushed onto our `min_stack`.

```python
    def push(self, x):
        self.stack.append(x)
        if not self.min_stack or x <= self.min_stack[-1]:
            self.min_stack.append(x)

```

Our `pop` method is up next. It removes the top element from the `stack`, and if the smallest element is being removed, it also pops the corresponding element from the `min_stack`.

```python
    def pop(self):
        if not self.stack:
            return None

        if self.stack[-1] == self.min_stack[-1]:
            self.min_stack.pop()

        return self.stack.pop()
```

The `top` method returns the top element of `stack`.

```python
    def top(self):
        return self.stack[-1] if self.stack else None

```

Finally, the `get_min` method, the star of our show, retrieves the minimum element in the stack.

```python
    def get_min(self):
        return self.min_stack[-1] if self.min_stack else None

```

Full Implementation

```python
class MinStack:
    def __init__(self):
        self.min_stack = []
        self.stack = []

    def push(self, x):
        self.stack.append(x)
        if not self.min_stack or x <= self.min_stack[-1]:
            self.min_stack.append(x)

    def pop(self):
        if not self.stack:
            return None

        if self.stack[-1] == self.min_stack[-1]:
            self.min_stack.pop()

        return self.stack.pop()

    def top(self):
        return self.stack[-1] if self.stack else None

    def get_min(self):
        return self.min_stack[-1] if self.min_stack else None

```

## Examples

### Previous Cooler Days

Alright, Space Explorer, let's have a little fun with data analysis! You have a list of daily temperatures recorded in ascending order of days, right? In degrees Celsius, if you please. No, not Martian days, Earth days! Your job is, for each day, to find out how many days you'll have to wait until the next cooler day. Is it tomorrow? Or three days later? Or maybe there's no cooler day in sight and that calls for a `-1`.

Just bear in mind the input list of temperatures isn't picky, it could be empty, only contain one record, or have several days with the same temperature. And how are we presenting the results? A list! For each day, indicate the wait time until the next cooler day, or a `-1` if the future's looking too hot to handle! Let's see what you can do, Stellar Navigator!

```python
def days_until_cooler(temps):
    result = [-1] * len(temps)
    stack = []

    for i in range(len(temps) - 1, -1, -1):
        while stack and temps[stack[-1]] >= temps[i]:
            stack.pop()

        if stack:
            result[i] = stack[-1] - i
        stack.append(i)

    return result


print(days_until_cooler([30, 60, 90, 120, 60, 30]))  # Expected: [-1, 4, 2, 1, 1, -1]
print(days_until_cooler([100, 95, 90, 85, 80, 75]))  # Expected: [1, 1, 1, 1, 1, -1]
print(days_until_cooler([1]))  # Expected: [-1]
```
