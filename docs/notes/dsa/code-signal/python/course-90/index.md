---
title: 'Revisiting Python Essentials'
date: '2024-09-13'
fullPath: '/notes/dsa/code-signal/python/course-90'
sectionSlug: 'notes'
---

## Simple Caesar Cipher Examples

### Task

Define a function to encrypt text using a shift cipher. The function should take 2 parameters:
- text to encrypt (as str)
- shift amount (as int)

```python
def get_shifted_char(starting_value, minimum_value, shift_offset, length_of_range):
    shifted_ord = (
        starting_value
        - minimum_value
        + (shift_offset % length_of_range)
        + length_of_range
    ) % length_of_range + minimum_value

    return chr(shifted_ord)


def encrypt_text(text: str, shift: int):
    encrypted_text = ""

    for char in text:
        if char.isalpha():
            char_as_ord = ord(char)
            min_val = ord("A") if char.isupper() else ord("a")
            encrypted_text += get_shifted_char(
                starting_value=char_as_ord,
                minimum_value=min_val,
                shift_offset=shift,
                length_of_range=26,
            )
        else:
            encrypted_text += char

    return encrypted_text

```
