declare module 'f-utility' {
  interface Functor<T> {
      map<U>(fn: (t: T) => U): Functor<U>;
  }
  interface CurriedTypeGuard2<T1, T2, R extends T2> {
    (t1: T1): (t2: T2) => t2 is R;
    (t1: T1, t2: T2): t2 is R;
  }
  interface CurriedTypeGuard3<T1, T2, T3, R extends T3> {
    (t1: T1): CurriedTypeGuard2<T2, T3, R>;
    (t1: T1, t2: T2): (t3: T3) => t3 is R;
    (t1: T1, t2: T2, t3: T3): t3 is R;
  }
  interface CurriedTypeGuard4<T1, T2, T3, T4, R extends T4> {
    (t1: T1): CurriedTypeGuard3<T2, T3, T4, R>;
    (t1: T1, t2: T2): CurriedTypeGuard2<T3, T4, R>;
    (t1: T1, t2: T2, t3: T3): (t4: T4) => t4 is R;
    (t1: T1, t2: T2, t3: T3, t4: T4): t4 is R;
  }
  interface CurriedTypeGuard5<T1, T2, T3, T4, T5, R extends T5> {
    (t1: T1): CurriedTypeGuard4<T2, T3, T4, T5, R>;
    (t1: T1, t2: T2): CurriedTypeGuard3<T3, T4, T5, R>;
    (t1: T1, t2: T2, t3: T3): CurriedTypeGuard2<T4, T5, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4): (t5: T5) => t5 is R;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): t5 is R;
  }
  interface CurriedTypeGuard6<T1, T2, T3, T4, T5, T6, R extends T6> {
    (t1: T1): CurriedTypeGuard5<T2, T3, T4, T5, T6, R>;
    (t1: T1, t2: T2): CurriedTypeGuard4<T3, T4, T5, T6, R>;
    (t1: T1, t2: T2, t3: T3): CurriedTypeGuard3<T4, T5, T6, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4): CurriedTypeGuard2<T5, T6, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): (t6: T6) => t6 is R;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): t6 is R;
  }
  interface CurriedFunction2<T1, T2, R> {
    (t1: T1): (t2: T2) => R;
    (t1: T1, t2: T2): R;
  }
  interface CurriedFunction3<T1, T2, T3, R> {
    (t1: T1): CurriedFunction2<T2, T3, R>;
    (t1: T1, t2: T2): (t3: T3) => R;
    (t1: T1, t2: T2, t3: T3): R;
  }
  interface CurriedFunction4<T1, T2, T3, T4, R> {
    (t1: T1): CurriedFunction3<T2, T3, T4, R>;
    (t1: T1, t2: T2): CurriedFunction2<T3, T4, R>;
    (t1: T1, t2: T2, t3: T3): (t4: T4) => R;
    (t1: T1, t2: T2, t3: T3, t4: T4): R;
  }
  interface CurriedFunction5<T1, T2, T3, T4, T5, R> {
    (t1: T1): CurriedFunction4<T2, T3, T4, T5, R>;
    (t1: T1, t2: T2): CurriedFunction3<T3, T4, T5, R>;
    (t1: T1, t2: T2, t3: T3): CurriedFunction2<T4, T5, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4): (t5: T5) => R;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): R;
  }
  interface CurriedFunction6<T1, T2, T3, T4, T5, T6, R> {
    (t1: T1): CurriedFunction5<T2, T3, T4, T5, T6, R>;
    (t1: T1, t2: T2): CurriedFunction4<T3, T4, T5, T6, R>;
    (t1: T1, t2: T2, t3: T3): CurriedFunction3<T4, T5, T6, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4): CurriedFunction2<T5, T6, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): (t6: T6) => R;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): R;
  }

  interface UnaryAny {
    ( a: any ): any;
  }
  interface UnaryAnyArray {
    ( a: any[] ): any[];
  }
  interface BinaryAny {
    ( a: any, b: any): any;
  }
  interface AnyToBoolean {
    (x: any): boolean;
  }

  type CURRY_PLACEHOLDER = '🍛';
  export const $: CURRY_PLACEHOLDER;
  export const PLACEHOLDER: CURRY_PLACEHOLDER;

  export function I<T>(a: T): T;
  export function K<T>(a: T): () => T;

  interface BinaryNumber {
    (b: number, a: number): number;
    (b: number): (a: number) => number;
  }

  export const add: BinaryNumber;
  export const subtract: BinaryNumber;
  export const divide: BinaryNumber;
  export const multiply: BinaryNumber;
  export const pow: BinaryNumber;

  interface PartiallyAppliedAlterIndex {
    (fn: UnaryAny, array: any[]): any[];
    (fn: UnaryAny): UnaryAnyArray;
  }
  export function alterIndex(index: number, fn: UnaryAny, array: any[]): any[]
  export function alterIndex(index: number): PartiallyAppliedAlterIndex;
  export function alterIndex(index: number, fn: UnaryAny): UnaryAnyArray;
  export const alterFirstIndex: PartiallyAppliedAlterIndex;
  export const alterLastIndex: PartiallyAppliedAlterIndex;


  export function ap<T, U>(fns: Array<((a: T) => U)>, vs: T[]): U[];
  export function ap<T, U>(fns: Array<((a: T) => U)>): (vs: T[]) => U[];

  export function assign(...obj: any[]): any

  export function chain<T, U>(fn: (n: T) => U[], list: T[]): U[];
  export function chain<T, U>(fn: (n: T) => U[]): (list: T[]) => U[];

  export function charAt(index: number, x: string): string;
  export function charAt(index: number): (x: string) => string;

  export function choice<X, A, B>(fn: (a: A, b: B) => boolean, a: A, b: B): boolean;
  export function choice<X, A, B>(fn: (a: A, b: B) => boolean): (a: A, b: B) => boolean;
  export function choice<X, A, B>(fn: (a: A, b: B) => boolean, a: A): (b: B) => boolean;

  export function codePointAt(index: number, str: string): number | undefined
  export function codePointAt(index: number): (str: string) => number | undefined

  export function compose<V0, T1>(
    fn0: (x0: V0) => T1
  ): (x0: V0) => T1;
  export function compose<V0, V1, T1>(
    fn0: (x0: V0, x1: V1) => T1
  ): (x0: V0, x1: V1) => T1;
  export function compose<V0, V1, V2, T1>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1
  ): (x0: V0, x1: V1, x2: V2) => T1;
  export function compose<V0, T1, T2>(
    fn1: (x: T1) => T2,
    fn0: (x0: V0) => T1
  ): (x0: V0) => T2;
  export function compose<V0, V1, T1, T2>(
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1) => T1
  ): (x0: V0, x1: V1) => T2;
  export function compose<V0, V1, V2, T1, T2>(
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1, x2: V2) => T1
  ): (x0: V0, x1: V1, x2: V2) => T2;
  export function compose<V0, T1, T2, T3>(
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x: V0) => T1
  ): (x: V0) => T3;
  export function compose<V0, V1, T1, T2, T3>(
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1) => T1
  ): (x0: V0, x1: V1) => T3;
  export function compose<V0, V1, V2, T1, T2, T3>(
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1, x2: V2) => T1
  ): (x0: V0, x1: V1, x2: V2) => T3;
  export function compose<V0, T1, T2, T3, T4>(
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x: V0) => T1
  ): (x: V0) => T4;
  export function compose<V0, V1, T1, T2, T3, T4>(
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1) => T1
  ): (x0: V0, x1: V1) => T4;
  export function compose<V0, V1, V2, T1, T2, T3, T4>(
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1, x2: V2) => T1
  ): (x0: V0, x1: V1, x2: V2) => T4;
  export function compose<V0, T1, T2, T3, T4, T5>(
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x: V0) => T1
  ): (x: V0) => T5;
  export function compose<V0, V1, T1, T2, T3, T4, T5>(
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1) => T1
  ): (x0: V0, x1: V1) => T5;
  export function compose<V0, V1, V2, T1, T2, T3, T4, T5>(
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1, x2: V2) => T1
  ): (x0: V0, x1: V1, x2: V2) => T5;

  export function compose<V0, T1, T2, T3, T4, T5, T6>(
    fn5: (x: T5) => T6,
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x: V0) => T1
  ): (x: V0) => T6;
  export function compose<V0, V1, T1, T2, T3, T4, T5, T6>(
    fn5: (x: T5) => T6,
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1) => T1
  ): (x0: V0, x1: V1) => T6;
  export function compose<V0, V1, V2, T1, T2, T3, T4, T5, T6>(
    fn5: (x: T5) => T6,
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1, x2: V2) => T1
  ): (x0: V0, x1: V1, x2: V2) => T6;

  export function concat(a: any[], b: any | any[]): any[]
  export function concat(a: any[]): (b: any | any[]) => any[]

  export function curry<T1, T2, TResult extends T2>(
    fn: (a: T1, b: T2) => b is TResult
  ): CurriedTypeGuard2<T1, T2, TResult>;
  export function curry<T1, T2, T3, TResult extends T3>(
    fn: (a: T1, b: T2, c: T3) => c is TResult
  ): CurriedTypeGuard3<T1, T2, T3, TResult>;
  export function curry<T1, T2, T3, T4, TResult extends T4>(
    fn: (a: T1, b: T2, c: T3, d: T4) => d is TResult
  ): CurriedTypeGuard4<T1, T2, T3, T4, TResult>;
  export function curry<T1, T2, T3, T4, T5, TResult extends T5>(
    fn: (a: T1, b: T2, c: T3, d: T4, e: T5) => e is TResult
  ): CurriedTypeGuard5<T1, T2, T3, T4, T5, TResult>;
  export function curry<T1, T2, T3, T4, T5, T6, TResult extends T6>(
    fn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6) => f is TResult
  ): CurriedTypeGuard6<T1, T2, T3, T4, T5, T6, TResult>;
  export function curry<T1, T2, TResult>(
    fn: (a: T1, b: T2) => TResult
  ): CurriedFunction2<T1, T2, TResult>;
  export function curry<T1, T2, T3, TResult>(
    fn: (a: T1, b: T2, c: T3) => TResult
  ): CurriedFunction3<T1, T2, T3, TResult>;
  export function curry<T1, T2, T3, T4, TResult>(
    fn: (a: T1, b: T2, c: T3, d: T4) => TResult
  ): CurriedFunction4<T1, T2, T3, T4, TResult>;
  export function curry<T1, T2, T3, T4, T5, TResult>(
    fn: (a: T1, b: T2, c: T3, d: T4, e: T5) => TResult
  ): CurriedFunction5<T1, T2, T3, T4, T5, TResult>;
  export function curry<T1, T2, T3, T4, T5, T6, TResult>(
    fn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6) => TResult
  ): CurriedFunction6<T1, T2, T3, T4, T5, T6, TResult>;
  export function curry(fn: (...a: any[]) => any): (...a: any[]) => any;

  export function curryObjectK(keys: string[], fn: UnaryAny): UnaryAny;
  export function curryObjectK(keys: string[]): (fn: UnaryAny) => UnaryAny;
  export function curryObjectN(n: number, fn: UnaryAny): UnaryAny;
  export function curryObjectN(n: number): (fn: UnaryAny) => UnaryAny;
  export function curryObjectKN(kn: {k: string[], n: number}, fn: (a: {n: number, k: string[]}) => any): UnaryAny;
  export function curryObjectKN(kn: {k: string[], n: number}): (fn: (a: {n: number, k: string[]}) => any) => UnaryAny;
  // deal with this later

  export function curryify(placeholder: string, fn: Function): any;

  interface Diffable {
    <T>(a: T[], b: T[]): T[];
    <T>(a: T[]): (b: T[]) => T[];
  }
  export const difference: Diffable;
  export const symmetricDifference: Diffable;

  interface WordInWord {
    (search: string, str: string): boolean
    (search: string): (str: string) => boolean
  }

  export const endsWith: WordInWord;
  export const startsWith: WordInWord;

  export function entries(x: object): [string, any][];
  export function toPairs(x: object): [string, any][];

  export function equal(a: any, b: any): boolean;
  export function equals(a: any, b: any): boolean;
  export function equal(a: any): (b: any) => boolean;
  export function equals(a: any): (b: any) => boolean;

  interface Dictionary<T> {
    [index: string]: T;
  }

  interface Filter<T> {
    (list: T[]): T[];
    (obj: Dictionary<T>): Dictionary<T>;
  }

  interface Filterable {
    <T>(fn: (value: T) => boolean): Filter<T>;
    <T>(fn: (value: T) => boolean, list: T[]): T[];
    <T>(fn: (value: T) => boolean, obj: Dictionary<T>): Dictionary<T>;
  }

  export const every: Filterable;
  export const filter: Filterable;
  export const reject: Filterable;
  export const some: Filterable;
  export const which: Filterable;

  export function flatMap<T, U>(fn: (n: T) => U[], list: T[]): U[];
  export function flatMap<T, U>(fn: (n: T) => U[]): (list: T[]) => U[];

  export function flip<T, U, TResult>(fn: (a: T, b: U) => TResult): (b: U, a?: T) => TResult;
  export function flip<T, U, TResult>(fn: (a: T, b: U, ...args: any[]) => TResult): (b: U, a?: T, ...args: any[]) => TResult;

  export function fold(bad: UnaryAny, good: UnaryAny, foldable: any): any;
  export function fold(bad: UnaryAny): (good: UnaryAny, foldable: any) => any;
  export function fold(bad: UnaryAny, good: UnaryAny): UnaryAny;

  export function freeze<T>(o: T): T;

  export function fromPairs(x: [string, any][]): any;

  export function indexOf(lookup: string, ref: string): number;
  export function indexOf(lookup: string): (ref: string) => number;

  export const invert: AnyToBoolean;

  export const isArray: AnyToBoolean;
  export const isBoolean: AnyToBoolean;
  export const isDistinctObject: AnyToBoolean;
  export const isFunction: AnyToBoolean;
  export const isNil: AnyToBoolean;
  export const isNumber: AnyToBoolean;
  export const isObject: AnyToBoolean;
  export const isString: AnyToBoolean;
  export function isTypeof(x: string, y: any): boolean;
  export function isTypeof(x: string): AnyToBoolean;

  export function iterate(x: number, fn: UnaryAny): any[];
  export function iterate(x: number): (fn: UnaryAny) => any[];

  export function join(delimiter: string, arr: any[]): string;
  export function join(delimiter: string): (arr: any[]) => string;

  export function keys(o: object): [string, any][];

  export function lastIndexOf(x: string, str: string): number;
  export function lastIndexOf(x: string): (str: string) => number;

  export function length(x: any): number;

  export function map<T, U>(fn: (x: T) => U, list: T[]): U[];
  export function map<T, U>(fn: (x: T) => U, obj: Functor<T>): Functor<U>; // used in functors
  export function map<T, U>(fn: (x: T) => U): (list: T[]) => U[];
  export function map<T extends object, U extends {[P in keyof T]: U[P]}>(fn: (x: T[keyof T]) => U[keyof T], obj: T): U;
  export function map<T extends object, U extends {[P in keyof T]: U[P]}>(fn: (x: T[keyof T]) => U[keyof T]): (obj: T) => U;

  export function mapKeys<T, U>(fn: (x: T) => U, x: object): U[];
  export function mapKeys<T, U>(fn: (x: T) => U): (x: object) => U[];

  interface PairwiseTransformer {
    (hoc: any, fn: ([k, v]: [string, any]) => any, list: [string, any][]): any[];
    (hoc: any, fn: ([k, v]: [string, any]) => any): (list: [string, any][]) => any[];
    (hoc: any): (fn: ([k, v]: [string, any]) => any) => (list: [string, any][]) => any[];
  }
  export const pairwise: PairwiseTransformer
  interface PairwiseObjectTransformer {
    (hoc: any, fn: ([k, v]: [string, any]) => any, list: [string, any][]): any;
    (hoc: any, fn: ([k, v]: [string, any]) => any): (list: [string, any][]) => any;
    (hoc: any): (fn: ([k, v]: [string, any]) => any) => (list: [string, any][]) => any;
  }
  export const pairwiseObject: PairwiseTransformer

  interface PairwiseMap {
    (fn: ([k, v]: [string, any]) => any, list: [string, any][]): any;
    (fn: ([k, v]: [string, any]) => any): (list: [string, any][]) => any;
  }

  export const mapTuple: PairwiseMap
  export const mapTuples: PairwiseMap

  export function match(regex: RegExp, str: string): boolean;
  export function match(regex: RegExp): (str: string) => boolean;

  export function merge(a: object, b: object): object;
  export function merge(a: object): (b: object) => object;

  export function not(fn: UnaryAny): boolean;

  export function not1(fn: UnaryAny, a: any): boolean;
  export function not1(fn: UnaryAny): AnyToBoolean;

  export function not2(fn: UnaryAny, a: any, b: any): boolean;
  export function not2(fn: UnaryAny): (a: any, b: any) => boolean;
  export function not2(fn: UnaryAny, a: any): AnyToBoolean;

  export function not3(fn: UnaryAny, a: any, b: any, c: any): boolean;
  export function not3(fn: UnaryAny): (a: any, b: any, c: any) => boolean;
  export function not3(fn: UnaryAny, a: any): (b: any, c: any) => boolean;
  export function not3(fn: UnaryAny, a: any, b: any): AnyToBoolean;

  interface Paddable {
    (amount: number, str: string, input: string): string;
    (amount: number): (str: string, input: string) => string;
    (amount: number, str: string): (input: string) => string;
  }

  export const padEnd: Paddable;
  export const padStart: Paddable;

  export function path(steps: string[], x: object): any
  export function path(steps: string[]): (x: object) => any

  export function pathEq(steps: string[], x: object): boolean
  export function pathEq(steps: string[]): (x: object) => boolean

  export function pathIs(fn: AnyToBoolean, x: object): boolean
  export function pathIs(fn: AnyToBoolean): (x: object) => boolean

  export function pathOr<T, U, V>(def: T, steps: string[], x: object): T|any
  export function pathOr<T, U, V>(def: T): (steps: string[], x: object) => T|any
  export function pathOr<T, U, V>(def: T, steps: string[]): (x: object) => T|any

  export function prop(step: string, x: object): any
  export function prop(step: string): (x: object) => any

  export function propEq(step: string, x: object): boolean
  export function propEq(step: string): (x: object) => boolean

  export function propIs(fn: AnyToBoolean, x: object): boolean
  export function propIs(fn: AnyToBoolean): (x: object) => boolean

  export function propOr<T, U, V>(def: T, step: string, x: object): T|any
  export function propOr<T, U, V>(def: T): (step: string, x: object) => T|any
  export function propOr<T, U, V>(def: T, step: string): (x: object) => T|any

  export function pipe<V0, T1>(
    fn0: (x0: V0) => T1
  ): (x0: V0) => T1;
  export function pipe<V0, V1, T1>(
    fn0: (x0: V0, x1: V1) => T1
  ): (x0: V0, x1: V1) => T1;
  export function pipe<V0, V1, V2, T1>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1
  ): (x0: V0, x1: V1, x2: V2) => T1;
  export function pipe<V0, T1, T2>(
    fn0: (x0: V0) => T1,
    fn1: (x: T1) => T2
  ): (x0: V0) => T2;
  export function pipe<V0, V1, T1, T2>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2
  ): (x0: V0, x1: V1) => T2;
  export function pipe<V0, V1, V2, T1, T2>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2
  ): (x0: V0, x1: V1, x2: V2) => T2;
  export function pipe<V0, T1, T2, T3>(
    fn0: (x: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3
  ): (x: V0) => T3;
  export function pipe<V0, V1, T1, T2, T3>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3
  ): (x0: V0, x1: V1) => T3;
  export function pipe<V0, V1, V2, T1, T2, T3>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3
  ): (x0: V0, x1: V1, x2: V2) => T3;
  export function pipe<V0, T1, T2, T3, T4>(
    fn0: (x: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4
  ): (x: V0) => T4;
  export function pipe<V0, V1, T1, T2, T3, T4>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4
  ): (x0: V0, x1: V1) => T4;
  export function pipe<V0, V1, V2, T1, T2, T3, T4>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4
  ): (x0: V0, x1: V1, x2: V2) => T4;
  export function pipe<V0, T1, T2, T3, T4, T5>(
    fn0: (x: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5
  ): (x: V0) => T5;
  export function pipe<V0, V1, T1, T2, T3, T4, T5>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5
  ): (x0: V0, x1: V1) => T5;
  export function pipe<V0, V1, V2, T1, T2, T3, T4, T5>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5
  ): (x0: V0, x1: V1, x2: V2) => T5;
  export function pipe<V0, T1, T2, T3, T4, T5, T6>(
    fn0: (x: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6
  ): (x: V0) => T6;
  export function pipe<V0, V1, T1, T2, T3, T4, T5, T6>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6
  ): (x0: V0, x1: V1) => T6;
  export function pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6
  ): (x0: V0, x1: V1, x2: V2) => T6;
  export function pipe<V0, T1, T2, T3, T4, T5, T6, T7>(
    fn0: (x: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn: (x: T6) => T7
  ): (x: V0) => T7;
  export function pipe<V0, V1, T1, T2, T3, T4, T5, T6, T7>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7
  ): (x0: V0, x1: V1) => T7;
  export function pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7
  ): (x0: V0, x1: V1, x2: V2) => T7;
  export function pipe<V0, T1, T2, T3, T4, T5, T6, T7, T8>(
    fn0: (x: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn: (x: T7) => T8
  ): (x: V0) => T8;
  export function pipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn7: (x: T7) => T8
  ): (x0: V0, x1: V1) => T8;
  export function pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn7: (x: T7) => T8
  ): (x0: V0, x1: V1, x2: V2) => T8;
  export function pipe<V0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    fn0: (x0: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn7: (x: T7) => T8,
    fn8: (x: T8) => T9
  ): (x0: V0) => T9;
  export function pipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn7: (x: T7) => T8,
    fn8: (x: T8) => T9
  ): (x0: V0, x1: V1) => T9;
  export function pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn7: (x: T7) => T8,
    fn8: (x: T8) => T9
  ): (x0: V0, x1: V1, x2: V2) => T9;

  export function pipe<V0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    fn0: (x0: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn7: (x: T7) => T8,
    fn8: (x: T8) => T9,
    fn9: (x: T9) => T10
  ): (x0: V0) => T10;
  export function pipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn7: (x: T7) => T8,
    fn8: (x: T8) => T9,
    fn9: (x: T9) => T10
  ): (x0: V0, x1: V1) => T10;
  export function pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn7: (x: T7) => T8,
    fn8: (x: T8) => T9,
    fn9: (x: T9) => T10
  ): (x0: V0, x1: V1, x2: V2) => T10;

  interface Random {
    (x: number): number;
    floor(x: number): number;
    floorMin(min: number, x: number): number;
    floorMin(min: number): (x: number) => number;
    shuffle(x: any[]): any[];
    take<T>(encase: boolean, o: Dictionary<T>|T[]): Dictionary<T>|T[];
    take<T>(encase: boolean): (o: Dictionary<T>|T[]) => Dictionary<T>|T[];
    pick<T>(of: T[]): T;
    grab<T>(of: Dictionary<T>|T[]): Dictionary<T>|T[];
    allot<S, T>(howMany: number, ofThing: Dictionary<T>|T[]): Dictionary<T>|T[];
    allot<S, T>(howMany: number): (ofThing: Dictionary<T>|T[]) => Dictionary<T>|T[];
    wordSource(source: any[], howLong: number): string;
    wordSource(source: any[]): (howLong: number) => string;
    word(howLong: number): string;
  }
  export const random: Random;

  export function range(start: number, end: number): number[];
  export function range(start: number): (end: number) => number[];

  export function reduce(fn: BinaryAny, init: any, data: any[]): any;
  export function reduce(fn: BinaryAny): (init: any, data: any[]) => any;
  export function reduce(fn: BinaryAny, init: any): UnaryAny;

  export function remap(indices: number[], fn: UnaryAny): UnaryAny;
  export function remap(indices: number[]): (fn: UnaryAny) => UnaryAny;
  export function remapArray(indices: number[], arr: any[]): any[];
  export function remapArray(indices: number[]): UnaryAnyArray;

  export function repeat(x: number, str: string): string;
  export function repeat(x: number): (str: string) => string;

  export function replace(x: RegExp|string, y: string): string;
  export function replace(x: RegExp|string): (y: string) => string;

  export function round(x: number): number;

  export function search(regex: RegExp, str: string): number;
  export function search(regex: RegExp): (str: string) => number;

  export function split(delimiter: string, str: string): string[];
  export function split(delimiter: string): (str: string) => string[];

  export function ternary<T, U, V>(x: T, a: U, b: V): U|V
  export function ternary<T, U, V>(x: T): (a: U, b: V) => U|V
  export function ternary<T, U, V>(x: T, a: U): (b: V) => U|V

  export function toPairs(x: object): [string, any][];

  export function trim(str: string): string;

  export function triplet(test: AnyToBoolean, a: UnaryAny, b: UnaryAny, x: any): any
  export function triplet(test: AnyToBoolean): (a: UnaryAny, b: UnaryAny, x: any) => any
  export function triplet(test: AnyToBoolean, a: UnaryAny): (b: UnaryAny, x: any) => any
  export function triplet(test: AnyToBoolean, a: UnaryAny, b: UnaryAny): (x: any) => any

}
