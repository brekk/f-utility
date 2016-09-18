import fs from 'fs'

import Data from 'folktale/data'
export const {Task} = Data
import reduce from 'lodash/fp/reduce'
import filter from 'lodash/fp/filter'
import curry from 'lodash/fp/curry'
import _debug from 'debug'
const debug = _debug(`glass:util:task`)

/**
 * @namespace util.Task
 * @function assertTasks
 * @desc asserts that everything in a list has a fork key on it
 * @param {Array.object} array
 * @return {Array.object} array
 */
const assertTasks = filter(function _filterByFork(x) {
  return !!x.fork
})

/**
 * @namespace util.Task
 * @function sequence
 * @desc given a list of valid Tasks, order their behavior in sequence and return a new Task
 * @param {Array.Task} listOfTasks - an array of Tasks
 * @return {Task} Task
 */
export const sequence = (listOfTasks) => {
  if (listOfTasks.length === 0 || assertTasks(listOfTasks).length !== listOfTasks.length) {
    throw new TypeError(`Expected to be given a list of tasks with fork methods.`)
  }
  const [initial, ...remaining] = listOfTasks
  return reduce((lastTask, newTask) => {
    return lastTask.chain((a) => {
      return newTask.map((b) => {
        if (!Array.isArray(a)) {
          a = [a]
        }
        return a.concat(b)
      })
    }, newTask)
  }, initial, remaining)
}

/**
 * @namespace util.Task
 * @function promiseToTask
 * @desc convert a Promise into a Task
 * @param {Promise} promise - a promise
 * @return {Task} Task
 */
export const promiseToTask = (promise) => {
  return new Task(function _promiseToTask(reject, resolve) {
    if (!promise || !promise.then) {
      return reject(new TypeError(`Expected to be given a promise.`))
    }
    promise.then(resolve)
           .catch(reject)
  })
}

/**
 * @namespace util.Task
 * @function taskToPromise
 * @desc convert a Task into a Promise
 * @param {Task} task - a task
 * @return {Promise} promise
 */
export const taskToPromise = (task) => {
  return new Promise(function _taskToPromise(resolve, reject) {
    if (task && task.fork) {
      task.fork(reject, resolve)
      return
    }
    return reject(`Unable to find fork method on supposed Task.`)
  })
}

/**
 * @namespace util.Task
 * @function taskify
 * @desc convert a node-style callback into a function which returns a Task
 * @param {function} func - a function which takes a node-style callback as its last param
 * @return {function} taskifiedFunction
 */
export const taskify = (func) => {
  return function taskifiedFunction(...args) {
    return new Task(function _cbToTask(reject, resolve) {
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
 * @namespace util.Task
 * @function taskifyPromise
 * @desc convert a function which returns a Promise into a function which returns a Task
 * @param {function} func - a function which returns a Promise
 * @return {function} taskifiedFunction
 */
export const taskifyPromise = (func) => {
  return function taskifiedPromise(...args) {
    return new Task(function _promiseToTask(reject, resolve) {
      return func(...args).then(resolve).catch(reject)
    })
  }
}

/**
 * @namespace util.Task
 * @function resolveTask
 * @desc equivalent to Promise.resolve; a forced resolution to a Task
 * @param {mixed} x - anything
 * @return {Task} Task
 */
export const resolveTask = (x) => {
  return new Task(function _resolveTask(_, resolve) {
    resolve(x)
  })
}

/**
 * @namespace util.Task
 * @function rejectTask
 * @desc equivalent to Promise.reject; a forced rejection of a Task
 * @param {mixed} x - anything
 * @return {Task} Task
 */
export const rejectTask = (x) => {
  return new Task(function _rejectTask(reject) {
    reject(x)
  })
}

/**
 * @namespace util.Task
 * @function writeData
 * @curried
 * @desc a curried internal wrapper over `fs.writeFile`
 * @param {function} reject - a function called when the task fails
 * @param {function} resolve - a function called when the task succeeds
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
 * @namespace util.Task
 * @function writeFile
 * @curried
 * @desc a curried Task wrapper over `fs.writeFile`, will unwrap Tasks if given
 * @param {string} filename - file path
 * @param {Task|string} source
 * @return {Task} Task
 */
export const writeFile = curry(function _writeFile(filename, data) {
  return new Task(function writeFileTaskRR(reject, resolve) {
    if (data && data.fork) {
      data.fork(reject, writeData(reject, resolve, filename))
      return
    }
    writeData(reject, resolve, filename, data)
  })
})
