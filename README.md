[![CircleCI](https://circleci.com/gh/brekk/f-utility.svg?style=shield&circle-token=a9ccfc426e684dc0537090caee2e300a4ad52c78)](https://circleci.com/gh/brekk/f-utility/tree/master)

# f-utility

A collection of common, sometimes functional utilities. Uses `fast.js` + `katsu-curry`

### Changelog

-   _3.0.0_ - a complete re-imagining of the codebase
-   _3.0.1_ - fixed exported functions
-   _3.0.2_ - fixed functor delegation
-   _3.0.4_ - added `sort`, `keys`, `freeze`, `assign`, and `length`
-   _3.0.5_ - fixed `allot`, and the partially applied forms `grab` and `take`
-   _3.0.7_ - fixed exports again
-   _3.0.8_ - added `path`, `pathOr`, `prop`, and `propOr`
-   _3.0.9_ - added `merge`, `pathIs`, `pathEq`, `propIs`, `propEq` and `equals`
-   _3.1.0_ - updated `katsu-curry`, whose public API changed
-   _3.1.1_ - added `chain`
-   _3.2.0_ - added `invert`, `not`, `not1`, `not2`, `not3` and updated documentation
-   _3.2.1_ - added `toPairs` / `entries` and `fromPairs`
-   _3.2.2_ - added `ap`, `fold`
-   _3.2.3_ - added `isDistinctObject`

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## join

string.prototype.join but curried

**Parameters**

-   `delimiter` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `list` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

**Examples**

```javascript
import {join} from 'f-utility'
join(`x`, [1,2,3]) // `1x2x3`
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** joined

## sort

string.prototype.sort but curried

**Parameters**

-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 
-   `functor` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

**Examples**

```javascript
import {sort} from 'f-utility'
sort((x) => x % 2, [1,2,3,4,5,6,7,8]) // [ 0, 2, 4, 6, 8, 9, 7, 5, 3, 1 ]
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** sorted

## difference

get the difference between two arrays

**Parameters**

-   `bList` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array
-   `aList` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array

**Examples**

```javascript
import {difference} from 'f-utility'
difference([1,2,3], [2,4,6]) // [4, 6]
difference([2,4,6], [1,2,3]) // [1, 3]
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** filtered array with differences between the two arrays

## symmetricDifference

get both the differences between two arrays, and if one difference is longer, return it

**Parameters**

-   `a` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array
-   `b` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array

**Examples**

```javascript
import {symmetricDifference} from 'f-utility'
difference([1,2,3], [1,2]) // [3]
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** filtered array with differences between the two arrays

## choice

takes a function that takes two parameters and returns a ternary result

**Parameters**

-   `cnFn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 
-   `a` **any** anything
-   `b` **any** anything

**Examples**

```javascript
import {choice} from 'f-utility'
const max = choice((a, b) => a > b)
max(500, 20) // 500
max(20, 500) // 500
```

Returns **any** result

## filter

array.filter(fn) but inverted order, curried and fast

**Parameters**

-   `predicate` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 
-   `iterable` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

**Examples**

```javascript
import {filter} from 'f-utility'
filter((x) => x % 2 === 0, [1,2,3,4,5,6,7,8]) // [2,4,6,8]
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** filtered iterable

## flip

take a function, flip the two parameters being passed to it, curry it

**Parameters**

-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a function

**Examples**

```javascript
import {flip} from 'f-utility'
const divide = (a, b) => a / b
const ivideday = flip(divide)
divide(1, 5) // 0.2
ivideday(1, 5) // 5
```

Returns **any** the result of invoking function with two inverted parameters

## fork

a delegatee last function for Future.fork ing

**Parameters**

-   `badPath` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a function
-   `goodPath` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a function
-   `future` **Future** 

**Examples**

```javascript
import {pipe, fork, I} from 'f-utility'
import {trace} from 'xtrace'
import F from 'fluture'
const odd = (x) => (x % 2 === 0 ? F.of(x) : F.reject(`${x} is odd`))
const semiSafeOddity = pipe(
  odd,
  trace(`oddity`),
  fork(console.warn, console.log)
)
semiSafeOddity(5) // console.warn(`5 is odd`)
semiSafeOddity(4) // console.log(4)
```

Returns **any** the result of the fork

## iterate

call a function x times and aggregate the result

**Parameters**

-   `total` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a total number of iterations
-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a function to invoke x times

**Examples**

```javascript
import {iterate} from 'f-utility'
iterate(5, () => `x`) // [`x`, `x`, `x`, `x`, `x`]
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** aggregated values from invoking a given function

## map

functor.map(fn) but curried and fast (though will delegate to the functor)

**Parameters**

-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 
-   `functor` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

**Examples**

```javascript
import {map} from 'f-utility'
const add1 = map((x) => x + 1)
add1([1,2,3]) // [2,3,4]
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** mapped iterable

## fold

a delegatee last function for Either.fold ing

**Parameters**

-   `badPath` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a function
-   `goodPath` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a function
-   `either` **(Right | Left)** an Either

**Examples**

```javascript
import {I, I, pipe, fold} from 'f-utility'
import {Left, Right} from 'fantasy-eithers'
const saferDivide = (a, b) => (b !== 0 ? Right(a / b) : Left(`Cannot divide by zero`))
fold(I, I, saferDivide(1, 2)) // 0.5
fold(I, I, saferDivide(1, 0)) // `Cannot divide by zero`
```

Returns **any** the result of the fold

## chain

functor.chain(fn) but curried and fast

**Parameters**

-   `predicate` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 
-   `iterable` **([Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) | Monad)** 

**Examples**

```javascript
import {chain} from 'f-utility'
const split = (x) => x.split(``)
const flatSplit = chain(split)
const a = flatSplit([`chain`, `is`, `flatMap`])
console.log(a) // [ 'c', 'h', 'a', 'i', 'n', 'i', 's', 'f', 'l', 'a', 't', 'M', 'a', 'p' ]
```

Returns **([Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) | Monad)** flat mapped iterable

## equals

=== comparison

**Parameters**

-   `a` **any** anything
-   `b` **any** anything

**Examples**

```javascript
import {equals} from 'f-utility'
const SAFE_ID = 123456
const equalsID = equals(SAFE_ID)
equalsID(200) // false
equalsID(SAFE_ID) // true
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** whether a triple-equals b

## round

convenience method for Math.round

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a number

**Examples**

```javascript
import {round} from 'f-utility'
round(10.3) // 10
round(10.9) // 11
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** rounded number

## add

add things

**Parameters**

-   `a` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a number
-   `b` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** b number

**Examples**

```javascript
import {add} from 'f-utility'
add(4, 2) // 6
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** sum

## subtract

subtract things

**Parameters**

-   `a` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a number
-   `b` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** b number

**Examples**

```javascript
import {subtract} from 'f-utility'
subtract(4, 2) // -2
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** subtracted

## multiply

multiply things

**Parameters**

-   `a` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a number
-   `b` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** b number

**Examples**

```javascript
import {multiply} from 'f-utility'
multiply(4, 2) // 8
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** multiplied

## divide

divide things

**Parameters**

-   `a` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a number
-   `b` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** b number

**Examples**

```javascript
import {divide} from 'f-utility'
divide(4, 2) // 0.5
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** divided

## pow

exponentiate things

**Parameters**

-   `a` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a number
-   `b` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** b number

**Examples**

```javascript
import {pow} from 'f-utility'
pow(4, 2) // 16
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** b to the power of a

## invert

**Parameters**

-   `x` **any** any

**Examples**

```javascript
import {pipe, invert} from 'f-utility'
const isOdd = pipe(
  (x) => x % 2 === 0,
  invert
)
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** !x

## not

return the result of inverting a nullary function

**Parameters**

-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a function to invert the result of

**Examples**

```javascript
import {not, equal} from 'f-utility'
const ID = 12345
const isntID = not(equal(ID))
isntID(ID) // false
isntID(123) // true
```

Returns **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** function

## not1

return the result of inverting a unary function

**Parameters**

-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a function to invert the result of
-   `a` **any** a parameter to pass to the function

**Examples**

```javascript
import {not, equal} from 'f-utility'
const ID = 12345
const isntID = not1(equal, ID)
isntID(ID) // false
isntID(123) // true
```

Returns **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** inverted function

## not2

return the result of inverting a binary function

**Parameters**

-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a function to invert the result of
-   `a` **any** a parameter to pass to the function
-   `b` **any** a parameter to pass to the function

Returns **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** inverted function

## not3

return the result of inverting a tertiary function

**Parameters**

-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a function to invert the result of
-   `a` **any** a parameter to pass to the function
-   `b` **any** a parameter to pass to the function
-   `c` **any** a parameter to pass to the function

Returns **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** inverted function

## reduce

functor.reduce but curried and fast

**Parameters**

-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a reducer
-   `init` **any** an initial value
-   `o` **([Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) | Monad)** iterable

**Examples**

```javascript
import {reduce} from 'f-utility'
const sum = reduce((agg, x) => agg + x, 0)
sum([1, 2, 3, 4, 5]) // 15
```

Returns **any** mixed reduction

## reject

array.filter((x) => !fn(x)) but inverted order, curried and fast

**Parameters**

-   `predicate` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 
-   `iterable` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

**Examples**

```javascript
import {reject} from 'f-utility'
reject((x) => x % 2 !== 0, [1,2,3,4,5,6,7,8]) // [2,4,6,8]
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** filtered iterable

## split

string.split(x) but delegatee last

**Parameters**

-   `delimiter` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `string` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** to split

**Examples**

```javascript
import {split} from `f-utility`
split(`x`, `1x2x3`) // [`1`, `2`, `3`]
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;strings>** 

## trim

string.trim() but delegatee last

**Parameters**

-   `string` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** to trim

**Examples**

```javascript
import {trim} from `f-utility`
trim(`     20932 `) // `20932`
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** trimmed

## ternary

a ternary statement, but curried and lazy

**Parameters**

-   `cn` **any** anything to be evaluated as truthy
-   `a` **any** anything
-   `b` **any** anything

**Examples**

```javascript
import {ternary} from `f-utility`
ternary(true, `a`, `b`) // `a`
ternary(false, `a`, `b`) // `b`
```

Returns **mixed** a / b

## triplet

a ternary statement, but curried and lazy and where each case is a function

**Parameters**

-   `cnFn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** anything to be evaluated as truthy
-   `aFn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a function
-   `bFn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** b function
-   `o` **mixed** input

**Examples**

```javascript
import {triplet} from 'f-utility'
const test = (x) => x % 2 === 0
const double = (x) => x * 2
const half = (x) => x / 2
triplet(test, double, half, 100) // 200
triplet(test, double, half, 5) // 2.5
```

Returns **any** anything

## keys

Object.keys
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys>

**Parameters**

-   `a` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an object

**Examples**

```javascript
import {keys} from 'f-utility'
keys({a: 1, b: 2}) // [`a`, `b`]
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of keys

## freeze

Object.freeze
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze>

**Parameters**

-   `a` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an object

**Examples**

```javascript
import {freeze} from 'f-utility'
const immutable = freeze({a: 1, b: 2})
immutable.a = 5 // throws error
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** a frozen object

## assign

Object.assign
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign>

**Parameters**

-   `a` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** any number of objects

**Examples**

```javascript
import {assign} from 'f-utility'
assign({c: 3}, {a: 1, b: 2}) // {a: 1, b: 2, c: 3}
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** a merged object

## merge

object.assign but enforced as a binary function

**Parameters**

-   `a` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** object a
-   `b` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** object b

**Examples**

```javascript
import {merge} from 'f-utility'
merge({c: 3}, {a: 1, b: 2}) // {a: 1, b: 2, c: 3}
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** c - the results of merging a and b

## entries

Object.entries shim
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries>

**Parameters**

-   `o` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an object

**Examples**

```javascript
import {entries} from 'f-utility'
entries({a: 1, b: 2}) // [[`a`, 1], [`b`, 2]]
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of tuples [key, value] pairs

## toPairs

An alias of `entries`
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries>

**Parameters**

-   `o` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an object

**Examples**

```javascript
import {toPairs} from 'f-utility'
toPairs({a: 1, b: 2}) // [[`a`, 1], [`b`, 2]]
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of tuples [key, value] pairs

## fromPairs

convert a list of key value pairs into an object

**Parameters**

-   `Array`  a list of [key, value] pairs

**Examples**

```javascript
import {fromPairs} from 'f-utility'
fromPairs([[`a`, 1], [`b`, 2]]) // {a: 1, b: 2}
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** merged results

## pathOr

Grab a nested value from an object or return a default

**Parameters**

-   `def` **any** a default value
-   `lenses` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** a list of nested properties
-   `input` **any** an object to grab things from

**Examples**

```javascript
import {pathOr} from 'f-utility'
pathOr(`default`, [`a`, `b`, `c`], {a: {b: {c: `actual`}}}) // `actual`
pathOr(`default`, [`a`, `b`, `c`], {x: {y: {z: `actual`}}}) // `default`
```

Returns **any** a nested value or default

## path

Grab a nested value from an object

**Parameters**

-   `lenses` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** a list of nested properties
-   `input` **any** an object to grab things from

**Examples**

```javascript
import {path} from 'f-utility'
pathOr([`a`, `b`, `c`], {a: {b: {c: `actual`}}}) // `actual`
pathOr([`a`, `b`, `c`], {x: {y: {z: `actual`}}}) // null
```

Returns **any** a nested value or null

## propOr

Grab a property from an object or return a default

**Parameters**

-   `def` **any** a default value
-   `property` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** a property
-   `input` **any** an object to grab things from

**Examples**

```javascript
import {propOr} from 'f-utility'
pathOr(`default`, `c`, {c: `actual`}) // `actual`
pathOr(`default`, `c`, {z: `actual`}) // `default`
```

Returns **any** a property or default

## prop

Grab a property from an object or return null

**Parameters**

-   `property` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** a property
-   `input` **any** an object to grab things from

**Examples**

```javascript
import {prop} from 'f-utility'
path(`c`, {c: `actual`}) // `actual`
path(`c`, {z: `actual`}) // null
```

Returns **any** a property or null

## pathIs

Grab a property from an object and compare it with a given function

**Parameters**

-   `is` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** an assertion function
-   `lenses` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;strings>** a property
-   `input` **any** an object to grab things from

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** a truthy value

## pathEq

Grab a property from an object and compare it with a given value via ===

**Parameters**

-   `equiv` **any** equivalent value
-   `lenses` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;strings>** a property
-   `input` **any** an object to grab things from

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** a truthy value

## propEq

Grab a property from an object and compare it with a given function

**Parameters**

-   `equiv` **any** equivalent value
-   `property` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** a property
-   `input` **any** an object to grab things from

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** a truthy value

## propEq

Grab a property from an object and compare it with a given value via ===

**Parameters**

-   `equiv` **any** equivalent value
-   `property` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** a property
-   `input` **any** an object to grab things from

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** a truthy value

## isTypeof

returns boolean based on type

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `x` **any** anything

**Examples**

```javascript
import {isTypeof} from 'f-utility'
isTypeof(`boolean`, true) // true
isTypeof(`boolean`, `nope`) // false
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** whether x is typeof type

## isBoolean

test whether something is a boolean

**Parameters**

-   `x` **any** anything

**Examples**

```javascript
import {isBoolean} from 'f-utility'
isBoolean(true) // true
isBoolean(1) // false
isBoolean(`a`) // false
isBoolean([`a`]) // false
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if the input is a boolean

## isNumber

test whether something is a number

**Parameters**

-   `x` **any** anything

**Examples**

```javascript
import {isNumber} from 'f-utility'
isNumber(true) // false
isNumber(1) // true
isNumber(`a`) // false
isNumber([`a`]) // false
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if the input is a number

## isFunction

test whether something is a function

**Parameters**

-   `x` **any** anything

**Examples**

```javascript
import {isFunction} from 'f-utility'
isFunction(true) // false
isFunction(1) // false
isFunction(`a`) // false
isFunction([`a`]) // false
isFunction(() => {}) // true
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if the input is a function

## isString

test whether something is a string

**Parameters**

-   `x` **any** anything

**Examples**

```javascript
import {isString} from 'f-utility'
isString(true) // false
isString(1) // false
isString(`a`) // true
isString([`a`]) // false
isString(() => {}) // false
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if the input is a string

## isNil

test whether something is null-ish

**Parameters**

-   `x` **any** anything

**Examples**

```javascript
import {isNil} from 'f-utility'
isNil(true) // false
isNil(1) // false
isNil(`a`) // false
isNil([`a`]) // false
isNil({}) // false
isNil(null) // true
isNil(undefined) // true
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if the input is null-ish

## isObject

test whether something is an object

**Parameters**

-   `x` **any** anything

**Examples**

```javascript
import {isObject} from 'f-utility'
isObject(true) // false
isObject(1) // false
isObject(`a`) // false
isObject([`a`]) // true
isObject({}) // true
isObject(null) // true
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if the input is a object

## isArray

test whether something is an array

**Parameters**

-   `x` **any** anything

**Examples**

```javascript
import {isArray} from 'f-utility'
isArray(true) // false
isArray(1) // false
isArray(`a`) // false
isArray([`a`]) // true
isArray({}) // false
isArray(null) // false
isArray(undefined) // false
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if the input is an array

## isDistinctObject

test whether something is a non-null object which isn't an array

**Parameters**

-   `x` **any** anything

**Examples**

```javascript
import {isDistinctObject} from 'f-utility'
isDistinctObject(true) // false
isDistinctObject(1) // false
isDistinctObject(`a`) // false
isDistinctObject([`a`]) // false
isDistinctObject({}) // true
isDistinctObject(null) // false
isDistinctObject(undefined) // false
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if the input is an object that isn't an array and isn't null

## some

array.some(fn) but curried and lazy

**Parameters**

-   `predicate` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 
-   `iterable` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

**Examples**

```javascript
import {some} from 'f-utility'
some((x) => x === `j`, [`j`, `k`, `l`]) // true
some((x) => x === `z`, [`j`, `k`, `l`]) // false
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## every

array.every(fn) but curried and lazy

**Parameters**

-   `predicate` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 
-   `iterable` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

**Examples**

```javascript
import {isNumber, every} from 'f-utility'
every(isNumber, [0, 1, 2, 3, 4]) // true
every(isNumber, [0, 1, 2, 3, `four`]) // false
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## random

Simple wrap for round( x \* random )

**Parameters**

-   `x` **\[[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)](default 1)** a number

**Examples**

```javascript
import {random} from 'f-utility'
random(5) // 1
random(5) // 3
random(0) // 0
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** x - a rounded and randomized number

## random.floor

Simple wrap for floor( x \* random )

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a number

**Examples**

```javascript
import {random} from 'f-utility'
const {floor} = random
floor(0) // 0
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** x - a rounded number

## random.floorMin

Simple wrap for floor( x \* random ) + min

**Parameters**

-   `min` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a number to be the minimum
-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a number to be randomly rounded

**Examples**

```javascript
import {random} from 'f-utility'
const {floorMin} = random
floor(0, 0) // 0
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a number that is randomly above the min

## random.take

Take values randomly from objects or arrays

**Parameters**

-   `encase` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** do we want to return the unwrapped value?
-   `input` **mixed** an array or object

**Examples**

```javascript
import {random} from 'f-utility'
const {take} = random
const a2e = `abcde`.split(``)
const a2eObject = {a: 1, b: 2, c: 3}
take(true, a2e) // [`a`]
take(true, a2e) // [`d`]
take(false, a2e) // `c`
take(false, a2e) // `b`
take(true, a2eObject) // {b: 2}
take(true, a2eObject) // {c: 3}
take(false, a2eObject) // 1
take(false, a2eObject) // 3
```

Returns **mixed** either random values from the object.values or the array values, possibly wrapped

## random.pick

partially-applied take - pull values randomly from an array or an object

**Parameters**

-   `x` **([Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) \| [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))** something to take values from

**Examples**

```javascript
import {random} from 'f-utility'
const {pick} = random
pick(`abcde`.split(``)) // `a`
pick(`abcde`.split(``)) // `d`
pick(`abcde`.split(``)) // `b`
```

## random.grab

partially-applied take - pull values randomly from an array or an object

**Parameters**

-   `x` **([Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) \| [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))** something to take values from

**Examples**

```javascript
import {random} from 'f-utility'
const {pick} = random
pick(`abcde`.split(``)) // [`a`]
pick(`abcde`.split(``)) // [`d`]
pick(`abcde`.split(``)) // [`b`]
```

## random.allot

pull some number of values from an array or object

**Parameters**

-   `howMany` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** how many values to take
-   `ofThing` **mixed** array or object

**Examples**

```javascript
import {random} from 'f-utility'
const {allot} = random
const a2e = `abcde`.split(``)
allot(3, a2e) // [`d`, `b`, `c`]
allot(3, a2e) // [`a`, `e`, `c`]
allot(3, a2e) // [`e`, `b`, `a`]
const a2eObject = {a: 1, b: 2, c: 3, d: 4, e: 5}
allot(3, a2eObject) // {d: 4, e: 5, a: 1}
allot(3, a2eObject) // {a: 1, c: 3, a: 1}
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** values

## random.wordSource

generate a "word" of some known length

**Parameters**

-   `source` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;strings>** which characters should be used?
-   `howLong` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** how many characters should be used?

**Examples**

```javascript
import {random} from 'f-utility'
const {wordSource} = random
const dna = wordSource([`g`, `a`, `t`, `c`])
dna(7) // `gattaca`
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** word

## random.word

generate a "word" of some known length

**Parameters**

-   `x` **\[[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)](default 5)** how many characters should be used?

**Examples**

```javascript
import {random} from 'f-utility'
const {word} = random
word(5) // `lrmbs`
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** word

## random.shuffle

Shuffle the contents of an array

**Parameters**

-   `list` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array to be shuffled

**Examples**

```javascript
import {random} from 'f-utility'
const {shuffle} = random
const shuffle(`abcde`.split(``)) // randomly shuffled array
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** shuffled
