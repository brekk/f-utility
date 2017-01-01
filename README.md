[![CircleCI](https://circleci.com/gh/brekk/f-utility.svg?style=shield&circle-token=a9ccfc426e684dc0537090caee2e300a4ad52c78)](https://circleci.com/gh/brekk/f-utility/tree/master)

# f-utility

A collection of common, sometimes functional utilities.

## Dependencies:

* [folktale](https://www.npmjs.com/package/folktale)
* [lodash.compact](https://www.npmjs.com/package/lodash.compact)
* [lodash.toarray](https://www.npmjs.com/package/lodash.toarray)
* [ramda](https://www.npmjs.com/package/ramda)
* [ramda-fantasy](https://www.npmjs.com/package/ramda-fantasy)

_For in-depth discussion, see both the files themselves and their tests._

* `src/core`:
  + `error` - useful tools for asserting the shape of an object
    - [file](https://github.com/brekk/f-utility/blob/master/src/core/error.js)
    - [test](https://github.com/brekk/f-utility/blob/master/src/core/error.spec.js)
  + `future` - tools for interacting with [Futures](https://github.com/ramda/ramda-fantasy/blob/master/src/Future.js)
    - [file](https://github.com/brekk/f-utility/blob/master/src/core/future.js)
    - [test](https://github.com/brekk/f-utility/blob/master/src/core/future.spec.js)
  + `validators` - common utilities for validating types simply in both null-safe and `throw`-y ways
    - [file](https://github.com/brekk/f-utility/blob/master/src/core/validators.js)
    - [test](https://github.com/brekk/f-utility/blob/master/src/core/validators.spec.js)
* `src/dev`:
  + `debug` - simple utilities for adding [debug](https://www.npmjs.com/package/debug)
    - [file](https://github.com/brekk/f-utility/blob/master/src/dev/debug.js)
    - [test](https://github.com/brekk/f-utility/blob/master/src/dev/debug.spec.js)
  + `trace` - simple curried form of `(a, b) => { log(a, b); return b }`
    - [file](https://github.com/brekk/f-utility/blob/master/src/dev/trace.js)
    - [test](https://github.com/brekk/f-utility/blob/master/src/dev/trace.spec.js)
* `src/fp`:
  + `array` - curried iterator-first functions for manipulating arrays
    - [file](https://github.com/brekk/f-utility/blob/master/src/fp/array.js)
    - [test](https://github.com/brekk/f-utility/blob/master/src/fp/array.spec.js)
  + `filter-object` - a utility for filtering [key, value] pairs
    - [file](https://github.com/brekk/f-utility/blob/master/src/fp/filter-object.js)
    - [test](https://github.com/brekk/f-utility/blob/master/src/fp/filter-object.spec.js)
  + `get-potential` - a tool for finding the first matching key in an object
    - [file](https://github.com/brekk/f-utility/blob/master/src/fp/array.js)
    - [test](https://github.com/brekk/f-utility/blob/master/src/fp/array.spec.js)
  + `iterate` - a utility for invoking a function x times and returning the results
    - [file](https://github.com/brekk/f-utility/blob/master/src/fp/iterate.js)
    - [test](https://github.com/brekk/f-utility/blob/master/src/fp/iterate.spec.js)
  + `merge-pairs` - a utility for taking a series of [key, value] pairs and reducing them into an object
    - [file](https://github.com/brekk/f-utility/blob/master/src/fp/merge-pairs.js)
    - [test](https://github.com/brekk/f-utility/blob/master/src/fp/merge-pairs.spec.js)
  + `string` - curried iterator-first functions for manipulating strings
    - [file](https://github.com/brekk/f-utility/blob/master/src/fp/string.js)
    - [test](https://github.com/brekk/f-utility/blob/master/src/fp/string.spec.js)
* `src/testing`:
  + `random` - some convenient utilities for managing random things
    - [file](https://github.com/brekk/f-utility/blob/master/src/testing/random.js)
    - [test](https://github.com/brekk/f-utility/blob/master/src/testing/random.spec.js)
