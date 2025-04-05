---
title: "Polymorphism and Duck Typing"
date: "2024-05-24"
fullPath: "/notes/python/classes/polymorphism"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

## Polymorphism and Duck Typing

### Polymorphism
- using objects of different types through a uniform interface
- applies to both functions as well as more complex types

#### Polymorphism with Card Printer
- `make_boarding_card()` did not rely on any concrete types
- any other object that fit the interface would work in place of `console_card_printer()`

### Duck Typing
_"When I see a bird that walks like a duck and swims like a duck and quacks like a duck, I call that bird a duck."_ - James Whitecomb Riley

- object's fitness for use is only determined at use/runtime
- contrasts with statically typed languages, where compiler determines if object can be used
- suitability is not determined by inheritance hierarchies, base classes, or anything except the attributes an object has at time of use

<details>
<summary>

**Airtravel example** (_with polymorphism_)

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

    def make_boarding_cards(self, card_printer):
        for passenger, seat in sorted(self._passenger_seats()):
            card_printer(passenger, seat, self.number(), self.aircraft_model())

    def _passenger_seats(self):
        """An iterable series of passenger seating locations."""
        row_numbers, seat_letters = self._aircraft.seating_plan()
        for row in row_numbers:
            for letter in seat_letters:
                passenger = self._seating[row][letter]
                if passenger is not None:
                    yield (passenger, f"{row}{letter}")

### NOTE:
# - `Aircraft` class is somewhat flawed in that instantiated objects depend on being supplied with
# seating configuration that matches aircraft model
# - for this example, may be simpler to creat separate classes for each specific
# model of aircraft with fixed seating configuration
###
# class Aircraft:

#     def __init__(self, registration, model, num_rows, num_seats_per_row):
#         self._registration = registration
#         self._model = model
#         self._num_rows = num_rows
#         self._num_seats_per_row = num_seats_per_row

#     def registration(self):
#         return self._registration

#     def model(self):
#         return self._model

#     def seating_plan(self):
#         return (
#             range(1, self._num_rows + 1),
#             "ABCDEFGHJK"[:self._num_seats_per_row]
#         )


class AirbusA319:
    def __init__(self, registration):
        self._registration = registration

    def registration(self):
        return self._registration

    def model(self):
        return "Airbus A319"

    def seating_plan(self):
        return range(1, 23), "ABCDEF"


class Boeing777:
    def __init__(self, registration):
        self._registration = registration

    def registration(self):
        return self._registration

    def model(self):
        return "Boeing777"

    def seating_plan(self):
        # For simplicity's sake, we ignore complex
        # seating arrangement for first class
        return range(1, 56), "ABCDEFGHJK"


def console_card_printer(passenger, seat, flight_number, aircraft):
    output = f"| Name: {passenger}"       \
             f"  Flight: {flight_number}" \
             f"  Seat: {seat}"            \
             f"  Aircraft: {aircraft}"    \
            " |"
    banner = "+" + "-" * (len(output) - 2) + "+"
    border = "|" + " " * (len(output) - 2) + "|"
    lines = [banner, border, output, border, banner]
    card = "\n".join(lines)
    print(card)
    print()


# module-level convenience function
def make_flight():
    # f = Flight("BA758", Aircraft("G-EUPT", "Airbus A319", num_rows=22, num_seats_per_row=6))
    f = Flight("BA758", AirbusA319("G-EUPT"))
    f.allocate_seat("12A", "Guido van Rossum")
    f.allocate_seat("15F", "Bjarne Stroustrup")
    f.allocate_seat("15E", "Anders Hejlsberg")
    f.allocate_seat("1C", "John McCarthy")
    f.allocate_seat("1D", "Rich Hickey")

    g = Flight("AF72", Boeing777("F-GSPS"))
    g.allocate_seat("55K", "Larry Wall")
    g.allocate_seat("33G", "Yukihiro Matsumoto")
    g.allocate_seat("4B", "Brian Kernighan")
    g.allocate_seat("4A", "Dennis Ritchie")

    return f, g

```

</details>
