import fs from 'fs'

import Future from 'ramda-fantasy/src/future'
import reduce from 'lodash/fp/reduce'
import filter from 'lodash/fp/filter'
import curry from 'lodash/fp/curry'
import _debug from 'debug'
const debug = _debug(`glass:util:future`)

/**
 * @namespace util.Future
 * @function assertFutures
 * @desc asserts that everything in a list has a fork key on it
 * @param {Array.object} array
 * @return {Array.object} array
 */
const assertFutures = filter(function _filterByFork(x) {
  return !!x.fork
})

/**
 * @namespace util.Future
 * @function sequence
 * @desc given a list of valid Future, order their behavior in sequence and return a new Future
 * @param {Array.Future} listOfFutures - an array of Future
 * @return {Future} Future
 */
export const sequence = (listOfFutures) => {
  if (listOfFutures.length === 0 || assertFutures(listOfFutures).length !== listOfFutures.length) {
    throw new TypeError(`Expected to be given a list of futures with fork methods.`)
  }
  const [initial, ...remaining] = listOfFutures
  return reduce((lastFuture, newFuture) => {
    return lastFuture.chain((a) => {
      return newFuture.map((b) => {
        if (!Array.isArray(a)) {
          a = [a]
        }
        return a.concat(b)
      })
    }, newFuture)
  }, initial, remaining)
}

/**
 * @namespace util.Future
 * @function promiseToFuture
 * @desc convert a Promise into a Future
 * @param {Promise} promise - a promise
 * @return {Future} Future
 */
export const promiseToFuture = (promise) => {
  return new Future(function _promiseToFuture(reject, resolve) {
    if (!promise || !promise.then) {
      return reject(new TypeError(`Expected to be given a promise.`))
    }
    promise.then(resolve)
           .catch(reject)
  })
}

/**
 * @namespace util.Future
 * @function futureToPromise
 * @desc convert a Future into a Promise
 * @param {Future} future - a future
 * @return {Promise} promise
 */
export const futureToPromise = (future) => {
  return new Promise(function _futureToPromise(resolve, reject) {
    if (future && future.fork) {
      future.fork(reject, resolve)
      return
    }
    return reject(`Unable to find fork method on supposed Future.`)
  })
}

/**
 * @namespace util.Future
 * @function futurify
 * @desc convert a node-style callback into a function which returns a Future
 * @param {function} func - a function which takes a node-style callback as its last param
 * @return {function} futureifiedFunction
 */
export const futurify = (func) => {
  return function futureifiedFunction(...args) {
    return new Future(function _cbToFuture(reject, resolve) {
      func(...[...args, (e, value) => {
        if (e) {
          reject(e)
          return
        }
        resolve(value)
      }])
    })
  }
}

/**
 * @namespace util.Future
 * @function futurifyPromise
 * @desc convert a function which returns a Promise into a function which returns a Future
 * @param {function} func - a function which returns a Promise
 * @return {function} futureifiedFunction
 */
export const futurifyPromise = (func) => {
  return function futureifiedPromise(...args) {
    return new Future(function _promiseToFuture(reject, resolve) {
      return func(...args).then(resolve).catch(reject)
    })
  }
}

/**
 * @namespace util.Future
 * @function resolveFuture
 * @desc equivalent to Promise.resolve; a forced resolution to a Future
 * @param {mixed} x - anything
 * @return {Future} Future
 */
export const resolveFuture = (x) => {
  return new Future(function _resolveFuture(_, resolve) {
    resolve(x)
  })
}

/**
 * @namespace util.Future
 * @function rejectFuture
 * @desc equivalent to Promise.reject; a forced rejection of a Future
 * @param {mixed} x - anything
 * @return {Future} Future
 */
export const rejectFuture = (x) => {
  return new Future(function _rejectFuture(reject) {
    reject(x)
  })
}

/**
 * @namespace util.Future
 * @function writeData
 * @curried
 * @desc a curried internal wrapper over `fs.writeFile`
 * @param {function} reject - a function called when the future fails
 * @param {function} resolve - a function called when the future succeeds
 * @param {string} filename - file path
 * @param {string} raw - data to write
 * @return {Error|boolean} true or an Error
 */
export const writeData = curry(function _writeData(reject, resolve, filename, raw) {
  debug(`attempting to write to ${filename}: ${raw}`)
  fs.writeFile(filename, raw, `utf8`, (err) => {
    debug(err || `outcome: success`)
    if (err) {
      return reject(err)
    }
    resolve(true)
  })
})

/**
 * @namespace util.Future
 * @function writeFile
 * @curried
 * @desc a curried Future wrapper over `fs.writeFile`, will unwrap Future if given
 * @param {string} filename - file path
 * @param {Future|string} source
 * @return {Future} Future
 */
export const writeFile = curry(function _writeFile(filename, data) {
  return new Future(function writeFileFutureRR(reject, resolve) {
    if (data && data.fork) {
      data.fork(reject, writeData(reject, resolve, filename))
      return
    }
    writeData(reject, resolve, filename, data)
  })
})
