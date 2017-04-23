# Just-Maybe

It's a Maybe monad for JavaScript.

## Installation

```
> npm install --save-dev just-maybe
```

## Usage

```
import { Maybe } from 'just-maybe';


// Create a Maybe from a possible null value.
const maybe: Maybe<User> =
  Maybe.fromNullable(getUser());


// Create a Just type
const maybe: Maybe<number> =
  Maybe.just(5);


// Create a Nothing type
const maybe: Maybe<number> =
  Maybe.nothing<number>();


// Map a maybe, transform a Just value
const mappedMaybe: Maybe<number> =
  maybe.map(val: number => val + 5);


// Filter a maybe, return a Nothing if predicate fails
const filteredMaybe: Maybe<number> =
  maybe.filter((val: number): boolean => val > 5);


// Chain maybes, use value of a maybe to create a new Maybe
const chainedMaybe: Maybe<string> =
  maybe.chain((val: number): Maybe<string> => {
    if (val > 5) {
      return Maybe.just('is greater than 5');
    } else {
      return Maybe.nothing<string>();
    }
  });


// Join maybes, flatten nested Maybes
const nested: Maybe<Maybe<number>> =
  Maybe.just(Maybe.just(5));

const flattened: Maybe<number> =
  nested.join();


// Fork a maybe, return value of first function for Just, value of second for Nothing
const value: number =
  maybe.fork(
    (val: number): number => val * 10,
    (): number => 100
  );


// Get the value of a Just, throws if a Nothing
const value: number =
  maybe.get();


// Get with default, return default if Nothing
const value: number =
  maybe.getOrElse(0);
```