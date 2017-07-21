[![CircleCI](https://circleci.com/gh/brekk/f-utility.svg?style=shield&circle-token=a9ccfc426e684dc0537090caee2e300a4ad52c78)](https://circleci.com/gh/brekk/f-utility/tree/master)

# f-utility

A collection of common, sometimes functional utilities.

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## join

string.prototype.join but curried

**Parameters**

-   `delimiter` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `list` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** joined

## sort

string.prototype.sort but curried

**Parameters**

-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 
-   `functor` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** sorted

## choice

takes a function that takes two parameters and returns a ternary result

**Parameters**

-   `cnFn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 
-   `a` **any** anything
-   `b` **any** anything

Returns **any** result

## filter

array.filter(fn) but curried and fast

**Parameters**

-   `predicate` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 
-   `iterable` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** filtered iterable

## flip

flip two parameters being passed to a function

**Parameters**

-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a function

Returns **any** the result of invoking function with two inverted parameters

## fork

a delegatee last function for Future.fork ing

**Parameters**

-   `badPath` **fn** 
-   `goodPath` **fn** 
-   `future` **Future** 

Returns **any** the result of the fork

## iterate

call a function x times and aggregate the result

**Parameters**

-   `total` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a total number of iterations
-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a function to invoke x times

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** aggregated values from invoking a given function

## map

functor.map(fn) but curried and fast (though will delegate to the functor)

**Parameters**

-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 
-   `functor` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** mapped iterable

## reduce

array.reduce but curried and fast

**Parameters**

-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a reducer
-   `init` **any** an initial value
-   `o` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** iterable

Returns **any** mixed reduction

## reject

array.filter((x) => !fn(x)) but curried and fast

**Parameters**

-   `predicate` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 
-   `iterable` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** filtered iterable

## split

string.split(x) but delegatee last

**Parameters**

-   `delimiter` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `string` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** to split

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;strings>** 

## trim

string.trim() but delegatee last

**Parameters**

-   `string` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** to trim

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** trimmed

## ternary

a ternary statement, but curried and lazy

**Parameters**

-   `cn` **any** anything to be evaluated as truthy
-   `a` **any** anything
-   `b` **any** anything

Returns **mixed** a / b

## triplet

a ternary statement, but curried and lazy and where each case is a function

**Parameters**

-   `cnFn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** anything to be evaluated as truthy
-   `aFn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a function
-   `bFn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** b function
-   `o` **mixed** input

Returns **any** anything

## isTypeof

returns boolean based on type

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `x` **any** anything

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** whether x is typeof type

## some

array.some(fn) but curried and lazy

**Parameters**

-   `predicate` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 
-   `iterable` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## every

array.every(fn) but curried and lazy

**Parameters**

-   `predicate` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 
-   `iterable` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## random

Simple wrap for round( x \* random )

**Parameters**

-   `x` **\[[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)](default 1)** a number

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** x - a rounded and randomized number

## floor

Simple wrap for floor( x \* random )

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a number

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** x - a rounded number

## floorMin

Simple wrap for floor( x \* random ) + min

**Parameters**

-   `min` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a number to be the minimum
-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a number to be randomly rounded

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a number that is randomly above the min

## pick

partiallyApplied take
[a, b, c] => a|b|c
{a, b, c} => a|b|c

## grab

partiallyApplied take
{a, b, c} => {a}|{b}|{c}
[a, b, c] => [a]\|[b]\|[c]

## allot

pull some number of values from an array or object

**Parameters**

-   `howMany` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** how many values to take
-   `ofThing` **mixed** array or object

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** values

## word

generate a "word" of some known length

**Parameters**

-   `howLong` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** how many characters should be used?

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** word

## shuffle

Shuffle the contents of an array

**Parameters**

-   `list` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array to be shuffled

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** shuffled
