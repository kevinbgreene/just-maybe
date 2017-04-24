import { Maybe } from '../src/maybe';
import { assert } from 'chai';


describe('Maybe', function() {
  describe('fromNullable', function() {
    it('should return a Just for non-null value', function() {
      const maybe: Maybe<number> =
        Maybe.fromNullable(5);

      const actual: string =
        maybe.toString();

      const expected: string =
        'Just(5)';

      assert.equal(actual, expected);
    });
  });

  describe('toString', function() {
    it('should return accurate representation of a Just', function() {
      const maybe: Maybe<number> =
        Maybe.just(5);

      const actual: string =
        maybe.toString();

      const expected: string =
        'Just(5)';

      assert.equal(actual, expected);
    });

    it('should return accurate representation of a Nothing', function() {
      const maybe: Maybe<number> =
        Maybe.nothing<number>();


      const actual: string =
        maybe.toString();

      const expected: string =
        'Nothing';

      assert.equal(actual, expected);
    });

    it('should return accurate representation of nested Maybes', function() {
      const maybe: Maybe<Maybe<number>> =
        Maybe.just(Maybe.just(3));

      const actual: string =
        maybe.toString();

      const expected: string =
        'Just(Just(3))';

      assert.equal(actual, expected);
    });
  });

  describe('map', function() {
    it('should correctly transform value of a Just', function() {
      const maybe: Maybe<number> =
        Maybe.just(5);

      const actual: string =
        maybe.map((val) => val + 3).toString();

      const expected: string =
        'Just(8)';

      assert.equal(actual, expected);
    });
  });

  describe('fork', function() {
    it('should use its first function to return Just value', function() {
      const maybe: Maybe<number> =
        Maybe.just(5);

      const actual: number =
        maybe.fork(
          (val: number): number => val,
          (): number => 0
        );

      const expected: number =
        5;

      assert.equal(actual, expected);
    });

    it('should use its second function to return Nothing value', function() {
      const maybe: Maybe<number> =
        Maybe.nothing<number>();

      const actual: number =
        maybe.fork(
          (val: number): number => 8,
          (): number => 0
        );

      const expected = 0;

      assert.equal(actual, expected);
    });
  });

  describe('filter', function() {
    it('should return Nothing if Maybe fails predicate', function() {
      const maybe: Maybe<number> =
        Maybe.just(5);

      const actual: string =
        maybe.filter((val) => val < 3).toString();

      const expected: string =
        'Nothing';

      assert.equal(actual, expected);
    });

    it('should return Just if Maybe passes predicate', function() {
      const maybe: Maybe<number> =
        Maybe.just(5);

      const actual: string =
        maybe.filter((val) => val > 3).toString();

      const expected: string =
        'Just(5)';

      assert.equal(actual, expected);
    });
  });

  describe('get', function() {
    it('should return value contained in a Just', function() {
      const maybe: Maybe<number> =
        Maybe.just(5);

      const actual: number =
        maybe.get();

      const expected: number =
        5;

      assert.equal(actual, expected);
    });

    it('should throw if the value is a Nothing', function() {
      const maybe: Maybe<number> =
        Maybe.nothing<number>();

      assert.throws(() => maybe.get());
    });
  });

  describe('getOrElse', function() {
    it('should return value contained in a Just', function() {
      const maybe: Maybe<number> =
        Maybe.just(5);

      const actual: number =
        maybe.getOrElse(8);

      const expected: number =
        5;

      assert.equal(actual, expected);
    });

    it('should return provided default value for a Nothing', function() {
      const maybe: Maybe<number> =
        Maybe.nothing<number>();

      const actual: number =
        maybe.getOrElse(8);

      const expected: number =
        8;

      assert.equal(actual, expected);
    });
  });

  describe('isJust', function() {
    it('should return true for a Just', function() {
      const maybe: Maybe<number> =
        Maybe.just(5);

      const actual: boolean =
        maybe.isJust();

      const expected: boolean =
        true;

      assert.equal(actual, expected);
    });

    it('should return false for a Nothing', function() {
      const maybe: Maybe<number> =
        Maybe.nothing<number>();

      const actual: boolean =
        maybe.isJust();

      const expected: boolean =
        false;

      assert.equal(actual, expected);
    });
  });

  describe('isNothing', function() {
    it('should return false for a Just', function() {
      const maybe: Maybe<number> =
        Maybe.just(5);

      const actual: boolean =
        maybe.isNothing();

      const expected: boolean =
        false;

      assert.equal(actual, expected);
    });

    it('should return true for a Nothing', function() {
      const maybe: Maybe<number> =
        Maybe.nothing<number>();

      const actual: boolean =
        maybe.isNothing();

      const expected: boolean =
        true;

      assert.equal(actual, expected);
    });
  });
});
