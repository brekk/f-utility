[![CircleCI](https://circleci.com/gh/brekk/f-utility.svg?style=shield&circle-token=a9ccfc426e684dc0537090caee2e300a4ad52c78)](https://circleci.com/gh/brekk/f-utility/tree/master)

# f-utility

A collection of common, sometimes functional utilities.

For in-depth discussion, see both the files themselves and their tests.

* `src/core`:
  + `fs.js` - minor utilities on top of `fs`
    - ([file](https://github.com/brekk/f-utility/blob/master/src/core/fs.js))
  + `task.js` - tools for interacting with `data.task` (likely to change in [the near future](https://github.com/origamitower/folktale/tree/patch/data.task))
    - ([file](https://github.com/brekk/f-utility/blob/master/src/core/task.js) + [test](https://github.com/brekk/f-utility/blob/master/tests/core/spec-task.js))
  + `validators.js` - common utilities for validating types in various null-safe and `throw`-y ways
    - ([file](https://github.com/brekk/f-utility/blob/master/src/core/validators.js) + [test](https://github.com/brekk/f-utility/blob/master/tests/core/spec-validators.js))
* `src/dev`:
  + `debug.js` - simple utilities for adding [debug](https://www.npmjs.com/package/debug)
    - ([file](https://github.com/brekk/f-utility/blob/master/src/dev/debug.js) + tests forthcoming)
  + `trace.js` - simple curried form of `(a, b) => { log(a, b); return b }`
    - ([file](https://github.com/brekk/f-utility/blob/master/src/dev/trace.js) + [test](https://github.com/brekk/f-utility/blob/master/tests/dev/spec-trace.js))
* `src/fp`:
  + `array.js` - curried iterator-first functions for manipulating arrays
    - ([file](https://github.com/brekk/f-utility/blob/master/src/fp/array.js) + [test](https://github.com/brekk/f-utility/blob/master/tests/fp/spec-array.js))
  + `filter-object.js` - a utility for filtering [key, value] pairs
    - ([file](https://github.com/brekk/f-utility/blob/master/src/fp/filter-object.js) + tests pending)
  + `iterate.js` - a utility for invoking a function x times and returning the results
    - ([file](https://github.com/brekk/f-utility/blob/master/src/fp/iterate.js) + [test](https://github.com/brekk/f-utility/blob/master/tests/fp/spec-iterate.js))
  + `merge-pairs.js` - a utility for taking a series of [key, value] pairs and reducing them into an object
    - ([file](https://github.com/brekk/f-utility/blob/master/src/fp/merge-pairs.js) + [test](https://github.com/brekk/f-utility/blob/master/tests/fp/spec-merge-pairs.js))
  + `string.js` - curried iterator-first functions for manipulating strings
    - ([file](https://github.com/brekk/f-utility/blob/master/src/fp/string.js) + [test](https://github.com/brekk/f-utility/blob/master/tests/fp/spec-string.js))
* `src/testing`:
  + `random.js` - some convenient utilities for managing random things
    - ([file](https://github.com/brekk/f-utility/blob/master/src/testing/random.js) + [test](https://github.com/brekk/f-utility/blob/master/tests/testing/spec-random.js))
