import _debug from 'debug'
import curry from 'ramda/src/curry'
import {join} from '../fp/array'
import {xtrace} from './trace'

/**
 * Simple pattern for generating `"a:b:c"` from `("a", ["b": "c"])`.
 * @function namespace
 * @curried
 * @param {string} pkg - root path
 * @param {Array.string} parts - additional parts to add to the namespace
 * @return {string} colonDelimitedString
 */
export const namespace = curry(function _namespace(pkg, parts) {
  if (!Array.isArray(pkg)) {
    pkg = [pkg]
  }
  return parts && parts.length > 0 ?
    join(`:`, pkg.concat(parts)) :
    pkg[0]
})

/**
 * Essentially a `namespace` invocation that gets passed to `debug`.
 * @uses _debug
 * @uses namespace
 * @function debug
 * @curried
 * @param {string} pkg - root path
 * @param {Array.string} parts - additional parts to add to the namespace
 * @return {function} debugInstance
 */
export const debug = curry(function _makeDebugger(pkg, parts) {
  return _debug(namespace(pkg, parts))
})

export const makeTracer = curry(function _makeTracer(pkg, parts) {
  return xtrace(debug(pkg, parts))
})

/**
 * Invoke a logging function with the arguments to a function, and log the output of the function.
 * @function wrapWithLog
 * @curried
 * @pure
 * @param {function} log - a logging function
 * @param {function} fn - a function that we want to see the inputs to and output of
 * @return {function} fn - a modified function which logs the inputs to and output of our input fn.
 */
export const wrapWithLog = curry(function _wrapWithLog(
  log, fn
) {
  // impure
  return function _debugWrapper() {
    log(`# input`, arguments)
    const outcome = fn(...arguments)
    log(`# output`, outcome)
    return outcome
  }
})

/**
 * Utility function for creating higher order "annotated" functions which log their input and
 * output.
 * @function namespaceAndAnnotate
 * @curried
 * @pure
 * @param {function} log - a function that logs. Can be bound console.log, debug function, whatever.
 * @param {string} pkg - the base namespace for the annotations. Useful in partial application.
 * @param {Array.string} namespaceList - an array of strings to differentiate between invocations.
 * @param {function} fn - the function we want to annotate
 * @return {function} fn - an annotated function
 */
export const namespaceAndAnnotate = curry(function _namespaceAndAnnotate(
  log, pkg, namespaceList, fn
) {
  if (!Array.isArray(namespaceList)) {
    namespaceList = [namespaceList]
  }
  const annotation = log(namespace(pkg, namespaceList))
  return wrapWithLog(annotation, fn)
})

/**
 * Default export, a partially-applied form of namespaceAndAnnotate with the logger filled in with
 * a modified debug instance.
 * @function annotate
 * @partiallyApplied namespaceAndAnnotate
 */
export const annotate = namespaceAndAnnotate(_debug)
