---
title: 'Mastering Binary Search: Implementation and Complexity Analysis in Python'
date: '2025-09-23'
fullPath: '/notes/dsa/code-signal/python/course-11/unit-03'
sectionSlug: 'notes'
---

## Understanding Continuous Functions

Before we dive into **binary search** and **continuous functions**, let's refresh our understanding of what exactly **continuous functions** are. In the simplest terms, a function is a mapping from an input (or set of inputs) to an output. For instance, if we think about a Python function, it takes one or more arguments and returns an output based on the logic embedded within the function.

**Continuous functions** are those that produce a smooth, unbroken output for a continuous range of inputs without any abrupt changes or gaps. In mathematical terms, a function <em class="math">f(x)</em> is continuous at a point <em class="math">x = a</em> if the limit of <em class="math">f(x)</em> as <em class="math">x</em> approaches <em class="math">a</em> from the left is equal to the limit of <em class="math">f(x)</em> as <em class="math">x</em> approaches <em class="math">a</em> from the right, and these values are equal to <em class="math">f(a)</em>. That means that:

<div id="continuous-functions-grid">
  <div class="main-expression">
    <span style="text-align: center;">lim</span>
    <span>f(x)</span>
    <span style="text-align: center;">=</span>
    <span style="text-align: center;">lim</span>
    <span>f(x)</span>
    <span style="text-align: center;">=</span>
    <span>f(a)</span>
  </div>
  <div class="sub-expressions">
    <span style="grid-column: 1 / span 1;">x→a<sup>−</sup></span>
    <!-- <span class="spacer"></span>
    <span class="spacer"></span> -->
    <span style="grid-column: 4 / span 1;">x→a<sup>+</sup></span>
    <!-- <span class="spacer"></span>
    <span class="spacer"></span>
    <span class="spacer"></span> -->
  </div>
</div>
​

Where <em class="math">lim<sub><span>x→a<sup>−</sup></span></sub> f(x)</em> and <em class="math">lim<sub><span>x→a<sup>+</sup></span></sub> f(x)</em> represent the limit of <em class="math">f(x)</em> as <em class="math">x</em> approaches <em class="math">a</em> from the left and the right, respectively.

For example, in real life, the function that relates the time of day to the temperature outside is continuous (although it may go up and down). It's a natural phenomenon that temperature doesn't make abrupt jumps.

Why is this property important to us? Well, remember that for **binary search**, the elements must be sorted, i.e., arranged in some order. Although **continuous functions** might not be sorted in the traditional sense (like a list of integers), they still maintain order due to their 'continuity'. This property allows us to apply the **binary search** algorithm to them.

## Binary Search Recap

You might recall from previous lessons that binary search is a powerful search algorithm with a logarithmic running time. It searches a sorted list by repeatedly dividing the search interval in half. In each step, it compares the middle element with the target item. If the middle element matches the target item, its position in the list is returned. However, if the target item is greater than the middle element, the search continues on the right half of the list and vice versa.

But how does all this apply to a continuous function? Well, the mechanism of binary search remains much the same, but instead of comparing the middle element to the target, we compare the middle point <em class="math">x</em>'s function value <em class="math">f(x)</em> to the target. We continuously narrow down an interval until we reach an interval small enough that the function value within it is as close to the target as we demand.

## Finding the Function Value with Binary Search

Now, let's lay out the steps for finding a specific function value using binary search. The spirit of the methodology is similar to that of searching a discrete list, but there are some key differences:

1. We define the `left` and `right` bounds of the binary search. These should be an interval `[left, right)` within which the function takes on our target value.
2. We define a loop that runs until the difference between `left` and `right` is smaller than a very small number <em class="math">ϵ</em> (called the precision of our search).
3. Within that loop, we compute the midpoint: `m = (left + right) / 2`.
4. We then compute the function value at `m`, `f(m)`. If `f(m)` is less than the target value, we update `left` to `m`. Otherwise, we update right to `m`.
5. The loop continues until we achieve the required precision, and the function value within the final interval `[left, right)` is close enough to the target that we accept it as the sought value.

Let's stress-test our understanding with a hands-on example. Consider the continuous function
<em class="math">f(x) = x<sup>2</sup> − 2</em>, and let's try to find <em class="math">x</em> for which <em class="math">f(x) = 0</em>, within the interval `[1, 2]`.

```python
# Define the function
def f(x):
    return x * x - 2


# Define the binary search function
def binary_search(target, left, right, precision):
    while right - left > precision:
        mid = (left + right) / 2
        if f(mid) < target:  # If the midpoint value is less than the target...
            left = mid  # ...update the left boundary to be the midpoint.
        else:
            right = mid  # Otherwise, update the right boundary.
    return left  # Return the left boundary of our final, narrow interval.


epsilon = 1e-6
result = binary_search(0, 1, 2, epsilon)
print(f"'x' for which 'f(x)' is approximately 0: {result}")

# Outputs:
# 'x' for which 'f(x)' is approximately 0: 1.4142131805419922
```

This code prints an <em class="math">x ≈ √2</em>, demonstrating how binary search can find function values in continuous space.

### Implications of Precision

Throughout our binary search function, we mentioned a precision value <em class="math">ϵ</em>, which we set as a very small number (<em class="math">10<sup>-6</sup></em> in our case). It's introduced to achieve the desired accuracy in our result. The smaller the <em class="math">ϵ</em>, the higher the precision of our target value since we are narrowing down the interval width to a smaller range. However, this comes with a trade-off. A smaller <em class="math">ϵ</em> means that our while loop will run more times, and thus, the algorithm will take longer to reach the desired precision level. This challenge presents an exciting optimization problem but is beyond the scope of this lesson.

## Applying the Technique to a Complex Problem

With this newly acquired knowledge, we open up a vast range of possibilities to solve complex problems. For example, suppose we need to solve a problem in physics where we need to determine at which time <em class="math">t</em>, the velocity function <em class="math">V(t) = 9.81 \* t - 0.65 \* t<sup>2</sup></em> of an object equals a certain target value within a given time range. We can discretize the time and check every second, but a more efficient solution could be derived using a binary search, where the `left` bound is `0`, the `right` bound is `t`, and the `target` is the target velocity. Such use cases show that with a sound understanding of binary search and continuous functions, we are equipped to solve a whole new array of complex problems.

### Examples

```python
# Python program to calculate the point at which a ball dropped from a height h reaches the ground
# using Binary Search on the continuous function h(t) = h - (1/2) * g * t^2.

import math


# Define the continuous function for the height of the ball at time t
def h(t, initial_height, g):
    return initial_height - (0.5) * g * t**2


# Define the binary search function
def binary_search(func, initial_height, g, target, left, right, precision):
    while right - left > precision:
        mid = (left + right) / 2
        if func(mid, initial_height, g) < target:
            right = mid
        else:
            left = mid
    return (left + right) / 2


# Requested precision
epsilon = 1e-6
# Constants
initial_height = 100  # Initial height in meters
g = 9.81  # acceleration due to gravity

# Time range
time_range = [0, 10]

# Call binary_search for h with the target being 0, indicating the hit of the ground
result = binary_search(h, initial_height, g, 0, time_range[0], time_range[1], epsilon)

print("Time when the ball hits the ground (seconds): ", result)

```

```python
# Python program to find the root of a given function using Binary Search

# Define a continuous function 'f' where f(x) = x^4 - x^2 - 10
def f(x):
    return x**4 - x**2 - 10


# Define the binary search function
def binary_search(func, target, left, right, precision):
    # while np.abs(func(left)) > precision and np.abs(func(right)) > precision:
    while right - left > precision:
        middle = (left + right) / 2
        if func(middle) < target:
            left = middle
        else:
            right = middle
    return middle


epsilon = 1e-6  # to make sure the solution is within an acceptable range
target = 50  # target value for root of function 'f'
start = -5  # starting point of the interval
end = 5  # ending point of the interval

result = binary_search(f, target, start, end, epsilon)
print(
    "The value of x for which f(x) is approximately 50 within the interval "
    f"[{str(start)}, {str(end)}] is: {result}"
)
```

```python
# Python program to find the temperature at which a specific coffee type is approximated to be best
import math


# Define the continuous function for the specific coffee type
def coffee_function(T):
    return -((T - 85)**2) + 60


# Define the binary search function
def binary_search(func, target, left, right, precision):
    while right - left > precision:
        mid = (left + right) / 2
        if func(mid) < target:
            left = mid
        else:
            right = mid
    return (left + right) / 2


# Requested precision
epsilon = 1e-6
# Identify the temperature range in which the coffee tastes the best
temperature_range = [30, 100]

# TODO: Find the exact temperature at which your coffee tastes best.
result = binary_search(
    coffee_function,
    30,
    temperature_range[0],
    temperature_range[1],
    epsilon
)
print(f"The temperature T for which my coffee tastes best is: {result}")

```
