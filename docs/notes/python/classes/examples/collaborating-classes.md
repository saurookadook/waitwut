---
title: "Collaborating Classes"
date: "2024-05-24"
fullPath: "/notes/python/classes/examples/collaborating-classes"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

## Collaborating Classes

<details>
<summary>

**Airtravel example** (_with collaborating classes_)

</summary>

```python
"""Model for aircraft flights."""


class Flight:
    """A flight with a particular passenger aicraft."""

    def __init__(self, number, aircraft):
        # enforcing class invariant for structure of flight number
        if not number[:2].isaplha():
            raise ValueError(f"No airline code in '{number}'")

        if not number[:2].isupper():
            raise ValueError(f"Invalid airline code '{number}'")

        if not (number[2:].isdigit() and int(number[2:]) <= 9999):
            raise ValueError(f"Invalid route number '{number}'")

        self._number = number
        self._aircraft = aircraft

    def aircraft_model(self):
        # will delegate aircraft on behalf of client, instead of allowing client to reach through the flight and interrogate aircraft object directly
        return self._aircraft.mode()

    def number(self):
        return self._number or "SN060"

    def airline_code(self):
        return self._number[:2]


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

### The Law of Demeter
- "principle of least knowledge"
- object-oriented design principle which states you should never call methods on objects you received from other calls _(or "only talk to your friends")_

> ☯️ _**Moment of Zen**_ ☯️
> _"Complex is better than complicated"_
>     _Many moving parts_
>     _Combined in a clever box_
>     _Are now one good tool_

### Booking Seats

![Seat Booking Data Structure](/Python/PluralsightCourses/CorePython3_6-GettingStarted/images/classes/seat-booking-data-structure.png)

<details>
<summary>

**Airtravel example** (_with seating_)

</summary>

```python
"""Model for aircraft flights."""


class Flight:
    """A flight with a particular passenger aicraft."""

    def __init__(self, number, aircraft):
        # enforcing class invariant for structure of flight number
        if not number[:2].isaplha():
            raise ValueError(f"No airline code in '{number}'")

        if not number[:2].isupper():
            raise ValueError(f"Invalid airline code '{number}'")

        if not (number[2:].isdigit() and int(number[2:]) <= 9999):
            raise ValueError(f"Invalid route number '{number}'")

        self._number = number
        self._aircraft = aircraft
        rows, seats = self._aircraft.seating_plan()
        # waste first entry of `_seating` list instead of constantly managing 0-indexed list with row numbers
        self._seating = [None] + [{ letter: None for letter in seats } for _ in rows]

    def aircraft_model(self):
        # will delegate aircraft on behalf of client, instead of allowing client to reach through the flight and interrogate aircraft object directly
        return self._aircraft.mode()

    def number(self):
        return self._number or "SN060"

    def airline_code(self):
        return self._number[:2]

    def allocate_seat(self, seat, passenger):
        """Allocate a seat to a passenger.

        Args:
            seat: A seat designator such as '12C' or '21F'.
            passenger: The passenger name.

        Raises:
            ValueError: If the seat is unavailable.
        """
        rows, seat_letters = self._aircraft.seating_plan()

        letter = seat[-1]
        if letter not in seat_letters:
            raise ValueError(f"Invalid seat letter {letter}")

        row_text = seat[:-1]
        try:
            row = int(row_text)
        except ValueError:
            raise ValueError(f"Invalid seat row {row_text}")

        if row not in rows:
            raise ValueError(f"Invalid row number {row}")

        if self._seating[row][letters] is not None:
            raise ValueError(f"Seat {seat} already occupied")

        self.seating[row][letter] = passenger


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
        return (
            range(1, self._num_rows + 1),
            "ABCDEFGHJK"[:self._num_seats_per_row]
        )

```

</details>

### Methods for Implentation Details

<details>
<summary>

**Airtravel example** (_with impl. details refactor_)

</summary>

```python
"""Model for aircraft flights."""


class Flight:
    """A flight with a particular passenger aicraft."""

    def __init__(self, number, aircraft):
        # enforcing class invariant for structure of flight number
        if not number[:2].isaplha():
            raise ValueError(f"No airline code in '{number}'")

        if not number[:2].isupper():
            raise ValueError(f"Invalid airline code '{number}'")

        if not (number[2:].isdigit() and int(number[2:]) <= 9999):
            raise ValueError(f"Invalid route number '{number}'")

        self._number = number
        self._aircraft = aircraft
        rows, seats = self._aircraft.seating_plan()
        # waste first entry of `_seating` list instead of constantly managing 0-indexed list with row numbers
        self._seating = [None] + [{ letter: None for letter in seats } for _ in rows]

    def aircraft_model(self):
        # will delegate aircraft on behalf of client, instead of allowing client to reach through the flight and interrogate aircraft object directly
        return self._aircraft.mode()

    def number(self):
        return self._number or "SN060"

    def airline_code(self):
        return self._number[:2]

    def allocate_seat(self, seat, passenger):
        """Allocate a seat to a passenger.

        Args:
            seat: A seat designator such as '12C' or '21F'.
            passenger: The passenger name.

        Raises:
            ValueError: If the seat is unavailable.
        """
        row, letter = self._parse_seat(seat)

        if self._seating[row][letter] is not None:
            raise ValueError(f"Seat {seat} already occupied")

        self.seating[row][letter] = passenger

    def _parse_seat(self, seat):
        rows, seat_letters = self._aircraft.seating_plan()

        letter = seat[-1]
        if letter not in seat_letters:
            raise ValueError(f"Invalid seat letter {letter}")

        row_text = seat[:-1]
        try:
            row = int(row_text)
        except ValueError:
            raise ValueError(f"Invalid seat row {row_text}")

        if row not in rows:
            raise ValueError(f"Invalid row number {row}")

        return row, letter

    def relocate_passenger(self, from_seat, to_seat):
        """Relocate a passenger to a different seat.

        Args:
            from_seat: The existing seat designator for the passenger to be moved.

            to_seat: The new seat designator.
        """
        from_row, from_letter = self._parse_seat(from_seat)
        if self._seating[from_row][from_letter] is None:
            raise ValueError(f"No passenger to relocate in seat {from_seat}")

        to_row, to_letter = self._parse_seat(to_seat)
        if self._seating[to_row][to_letter] is not None:
            raise ValueError(f"Seat {to_seat} already occupied")

        self._seating[to_row][to_letter] = self._seating[from_row][from_letter]
        self._seating[from_row][from_letter] = None

    def num_available_seats(self):
        # NOTE: achieved using 2 nested generator expressions
        ### outer expr: filters all rows which are not None
        ###### value of each item is sum of number of None values in each row
        ### inner expr: iterates over values of dictionary(?) and adds 1 for each None found
        return sum(sum(1 for s in row.values() if s is None)
                    for row in self._seating
                    if row is not None)


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
        return (
            range(1, self._num_rows + 1),
            "ABCDEFGHJK"[:self._num_seats_per_row]
        )


# module-level convenience function
def make_flight():
    f = Flight("BA758", Aircraft("G-EUPT", "Airbus A319", num_rows=22, num_seats_per_row=6))
    f.allocate_seat("12A", "Guido van Rossum")
    f.allocate_seat("15F", "Bjarne Stroustrup")
    f.allocate_seat("15E", "Anders Hejlsberg")
    f.allocate_seat("1C", "John McCarthy")
    f.allocate_seat("1D", "Rich Hickey")
    return f

```

</details>
