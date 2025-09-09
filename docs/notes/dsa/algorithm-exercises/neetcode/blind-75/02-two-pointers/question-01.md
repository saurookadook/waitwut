---
title: 'Neetcode: Valid Palindrome'
date: '2025-08-23'
fullPath: '/notes/dsa/neetcode/blind-75/two-pointers/question-01'
sectionSlug: 'notes'
---

## Instructions

Given a string `s`, return `true` if it is a **palindrome**, otherwise return `false`.

A **palindrome** is a string that reads the same forward and backward. It is also case-insensitive and ignores all non-alphanumeric characters.

**Note**: Alphanumeric characters consist of letters `(A-Z, a-z)` and numbers `(0-9)`.

**Example 1**:

```java
Input: s = "Was it a car or a cat I saw?"

Output: true
```

Explanation: After considering only alphanumerical characters we have "wasitacaroracatisaw", which is a palindrome.

**Example 2**:

```java
Input: s = "tab a cat"

Output: false
```

Explanation: "tabacat" is not a palindrome.

**Constraints**:

- `1 <= s.length <= 1000`
- `s` is made up of only printable ASCII characters.

---

## Solutions

### Python

```python
import re
from pprint import pprint as pp


class Solution:
    ALPHANUM_REGEX = r"[A-Za-z0-9]"

    def isPalindrome(self, s: str) -> bool:
        left_pointer = 0
        right_pointer = len(s) - 1

        while left_pointer <= right_pointer:
            if not re.match(self.ALPHANUM_REGEX, s[left_pointer]):
                left_pointer += 1
                continue

            if not re.match(self.ALPHANUM_REGEX, s[right_pointer]):
                right_pointer -= 1
                continue

            if s[left_pointer].lower() != s[right_pointer].lower():
                return False

            left_pointer += 1
            right_pointer -= 1

        return True

```
