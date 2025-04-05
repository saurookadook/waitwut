---
title: "Simple Classes"
date: "2024-05-24"
fullPath: "/notes/python/classes/examples/simple"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

## Defining Classes

```py
class MyClassName:
    #
    # By convention, class names use UpperCamelCase (aka PascalCase
    # ...
```

- simlpest example:
```py
class SimplestFlight:
    pass

# some-module/main.py
from airtravel import SimplestFlight

f = Flight()
type(f) #=> <class 'airtravel.Flight'>
```

---

## A Second Class

<details>
<summary>

**Airtravel example** (_`Aircraft` class_)

</summary>

```python
class Aircraft:

    def __init__(self, registration, model, num_rows, num_seats_per_row):
        self._registration = registration
        self._model = model
        self._num_rows = num_rows
        self._num_seats_per_row = num_seats_per_row

    def registration(self):
        return self._registration

    def model(self):
        return self._model

    def seating_plan(self):
        return (range(1, self._num_rows + 1),
                "ABCDEFGHJK"[:self._num_seats_per_row])

```

</details>

```py
from airtravel import Flight, Aircraft

a = Aircraft("G-EUPT", "Airbus A319", num_rows=22, num_seats_per_row=6)
a.registration() #=> 'G-EUPT'
a.model() #=> 'Airbus A319'
a.seating_plan() #=> (range(1, 23), 'ABCDEF')
```
