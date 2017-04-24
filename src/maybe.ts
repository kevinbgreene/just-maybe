export type MaybeMapping<A,B> =
  (val: A) => B;


export type MaybePredicate<T> =
  (val: T) => boolean;


export class Maybe<T> {
  protected _value: T;

  static fromNullable<T>(val: T): Maybe<T> {
    if (val === null || val === undefined) {
      return new Nothing<T>();
    } else {
      return new Just<T>(val);
    }
  }

  static nothing<T>(): Nothing<T> {
    return new Nothing<T>();
  }

  /**
   * Returns a new Just wrapping the given value
   *
   * @param val The value to place in the Just
   * @returns {}
   */
  static just<T>(val: T): Just<T> {
    return new Just<T>(val);
  }

  toString(): string {
    return `Just(${this._value})`;
  }

  /**
   * ap :: Maybe (a -> b) -> Maybe a -> Maybe b
   *
   * Applies the function in one maybe to the value of another.
   *
   * @name ap
   * @method
   * @memberof Maybe#
   * @param {Maybe} maybe
   * @returns {Maybe}
   */
  ap<A,B>(this: Just<(val: A) => B>, maybe: Maybe<A>): Maybe<B> {
    const self: Just<(val: A) =>B> = this;
    if (maybe.isJust()) {
      return new Just<B>(self._value((<Just<A>>maybe)._value));
    } else {
      return new Nothing<B>();
    }
  }

  /**
   * join :: Maybe (Maybe a) -> Maybe a
   *
   * Takes a nested Maybe and removes one level of nesting.
   *
   * @name join
   * @method
   * @memberof Maybe#
   * @returns {Maybe}
   */
  join<A>(this: Maybe<Maybe<A>>): Maybe<A> {
    return this.get();
  }

  /**
   * @name fork
   * @method
   * @memberof Maybe#
   * @param {Function} justFn Function to call with value of Just
   * @param {Function} nothingFn Function to call with value of Nothing
   * @returns {*} The return value of the matching function
   */
  fork<B>(justFn: (val: T) => B, _: () => B): B {
    return justFn(this._value);
  }

  /**
   * map :: Maybe a -> (a -> b) -> Maybe b
   *
   * Transforms the value of a Maybe with the given function.
   *
   * @name map
   * @method
   * @memberof Maybe#
   * @param {Function} mapping Function used to map value of Maybe
   * @returns {Maybe}
   */
  map<B>(mapping: MaybeMapping<T,B>): Maybe<B> {
    return new Just<B>(mapping(this._value));
  }

  /**
   * chain :: Maybe a -> (a -> Maybe b) -> Maybe b
   *
   * Takes the value of a Maybe and gives it to a function that returns a new Maybe.
   *
   * @name chain
   * @method
   * @memberof Maybe#
   * @param {Function} mapping Function used to create new Maybe
   * @returns {Maybe}
   */
  chain<B>(mapping: (val: T) => Maybe<B>): Maybe<B> {
    return this.map(mapping).join();
  }

  /**
   * filter :: Maybe a -> (a -> Boolean) -> Maybe a
   *
   * Turns a Just into a Nothing if the predicate returns false
   *
   * @name filter
   * @method
   * @memberof Maybe#
   * @param {Function} predicate Function used to test value
   * @returns {Maybe}
   */
  filter(predicate: MaybePredicate<T>): Maybe<T> {
    if (predicate(this._value)) {
      return new Just<T>(this._value);
    } else {
      return new Nothing<T>();
    }
  }

  /**
   * get :: Maybe a -> a
   *
   * Extract the value from a Maybe
   *
   * @name get
   * @method
   * @memberof Maybe#
   * @returns {*}
   */
  get(): T {
    return this._value;
  }

  /**
   * getOrElse :: Maybe a -> a -> a
   *
   * @name getOrElse
   * @method
   * @memberof Maybe#
   * @returns {*}
   */
  getOrElse(_: T): T {
    return this._value;
  }

  /**
   * isNothing :: Maybe a -> Boolean
   *
   * @name isNothing
   * @method
   * @memberof Maybe#
   * @returns {Boolean}
   */
  isNothing(): boolean {
    return false;
  }

  /**
   * isJust :: Maybe a -> Boolean
   *
   * @name isJust
   * @method
   * @memberof Maybe#
   * @returns {Boolean}
   */
  isJust(): boolean {
    return true;
  }
}


export class Just<T> extends Maybe<T> {
  static create<B>(val: B): Just<B> {
    return new Just<B>(val);
  }

  constructor(val: T) {
    super();
    this._value = val;
  }
}


export class Nothing<T> extends Maybe<T> {
  static create<B>(): Nothing<B> {
    return new Nothing<B>();
  }

  toString(): string {
    return 'Nothing';
  }

  fork<B>(_: (val: T) => B, nothingFn: () => B): B {
    return nothingFn();
  }

  join(): Nothing<T> {
    return new Nothing<T>();
  }

  map<B>(_: MaybeMapping<T,B>): Nothing<B> {
    return new Nothing<B>();
  }

  filter(_: MaybePredicate<T>): Nothing<T> {
    return new Nothing<T>();
  }

  ap<A,B>(this: Maybe<(val: A) =>B>, _: Maybe<A>): Nothing<B> {
    return new Nothing<B>();
  }

  chain<B>(_: (val: T) => Maybe<B>): Nothing<B> {
    return new Nothing<B>();
  }

  get(): T {
    throw new Error('Cannot get the value of a Nothing');
  }

  getOrElse(val: T): T {
    return val;
  }

  isJust(): boolean {
    return false;
  }

  isNothing(): boolean {
    return true;
  }
}