import curry from 'lodash/fp/curry'

/**
 * The trace function, written with the logging function as the first param
 * @function xtrace
 * @param {function} log - the log function
 * @param {mixed} a - anything, but probably a string
 * @param {mixed} b - anything
 * @return {mixed} b
 */
export const xtrace = curry(function _xtrace(
  log, a, b
) {
  if (typeof log !== `function`) {
    throw new TypeError(`Expected to be given log function.`)
  }
  log(a, b)
  return b
})
const {log: _log} = console
export const trace = xtrace(_log.bind(console))
