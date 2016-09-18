import fs from 'fs'

import test from 'ava'
import Data from 'folktale/data'
export const {Task} = Data
// import Task from 'data.task'
import curry from 'lodash/fp/curry'
import toArray from 'lodash/fp/toArray'
import id from 'lodash/fp/identity'

import {
  rejectTask,
  resolveTask,
  taskify,
  taskifyPromise,
  promiseToTask,
  writeFile,
  writeData,
  sequence
} from '../../src/core/task'
import random from '../../src/testing/random'
import trace from '../../src/dev/trace'

const randomPromise = (bool, eventualValue) => () => {
  return new Promise((resolve, reject) => {
    if (bool) {
      resolve(eventualValue)
      return
    }
    reject(new Error(eventualValue))
  })
}

test(`Task.reject should always fail synchronous input task`, (t) => {
  t.plan(2)
  t.is(typeof rejectTask, `function`, `Task.reject should be a function.`)
  const word = random.word(6)
  const rejecter = () => new TypeError(word)
  const output = rejectTask(rejecter())
  output.fork((x) => {
    t.is(x.message, word, `Task should return the correct error`)
  })
})

test(`Task.resolve should always pass synchronous input task`, (t) => {
  t.plan(2)
  t.is(typeof resolveTask, `function`, `Task.resolve should be a function.`)
  const word = random.word(6)
  const output = resolveTask(word)
  output.fork((e) => {
    throw e
  }, (x) => {
    t.is(x, word, `Task.resolve should return the correct value`)
  })
})

const nodeStyleCBFunction = curry((errorWord, val, fn) => {
  if (val) {
    fn(new Error(errorWord))
    return
  }
  fn(null, errorWord)
})

test(`Task.taskify should convert a node-style callback function to a Task-producing function`,
  (t) => {
    t.plan(3)
    t.is(typeof taskify, `function`)
    const errorWord = random.word(10)
    const hook = nodeStyleCBFunction(errorWord)
    const assert = {
      aboutFailure: (e) => {
        t.is(e.message, errorWord)
      },
      aboutSuccess: (o) => {
        t.is(o, errorWord)
      }
    }
    const failer = hook(true)
    const taskStyleFailer = taskify(failer)
    taskStyleFailer().fork(assert.aboutFailure, trace(`invalid success`))
    const succeeder = hook(false)
    const taskStyleSucceeder = taskify(succeeder)
    taskStyleSucceeder().fork(trace(`invalid failure`), assert.aboutSuccess)
  }
)

test.cb(
  `Task.taskifyPromise should take a promise-returning function and make it return a Task`,
  (t) => {
    t.plan(3)
    t.is(typeof taskifyPromise, `function`)
    const goodWord = random.word(10)
    const badWord = random.word(10)
    const willPass = () => Promise.resolve(goodWord)
    const willFail = () => Promise.reject(badWord)
    taskifyPromise(willPass)().fork(t.fail, (word) => {
      t.is(word, goodWord)
    })
    taskifyPromise(willFail)().fork((word) => {
      t.is(word, badWord)
      t.end()
    }, t.fail)
  }
)

test.cb(`Task.promise should provide a task-interface given a promise`, (t) => {
  t.plan(4)
  t.is(typeof promiseToTask, `function`, `Task.promiseToTask should be a function`)
  const word = random.word(10)
  const alwaysPass = randomPromise(true, word)
  const alwaysFail = randomPromise(false, word)
  t.throws(
    () => promiseToTask(false).fork((e) => { throw e }, id),
    `Expected to be given a promise.`,
    `Task.promiseToTask should throw when it receives not-a-promise.`
  )
  const alwaysPassTask = promiseToTask(alwaysPass())
  console.log(`alwaysPassTask`, alwaysPassTask)
  const alwaysFailTask = promiseToTask(alwaysFail())
  alwaysPassTask.fork(id, (x) => {
    t.is(x, word)
  })
  alwaysFailTask.fork((e) => {
    t.is(e.message, word)
    t.end()
  }, id)
})

const crapout = curry((t, e) => {
  t.fail(`This method should be able to write a local file. ${e.toString()}`)
})

test.cb(`Task.writeFile should provide a task-interface for file writing`, (t) => {
  t.plan(5)
  t.is(typeof writeFile, `function`, `Task.writeFile should be a function.`)
  const inputData = random.word(10)
  const filename = `./fixture.txt`
  const fileWritten = writeFile(filename, inputData)
  t.truthy(fileWritten, `Task.writeFile should return a Task`)
  t.truthy(fileWritten.fork, `Task.writeFile should return a Task with a fork method`)
  const success = (o) => {
    t.truthy(o)
    const value = fs.readFileSync(filename, `utf8`)
    t.is(value, inputData)
    t.end()
  }
  fileWritten.fork(crapout(t), success)
})

test.cb(`Task.writeFile should know how to fold in existing Task values`, (t) => {
  t.plan(2)
  const forkData = `butts`
  const filename = `./fixture2.txt`
  // const priorValue = fs.readFileSync(filename, `utf8`)
  writeFile(filename, new Task((_, res) => {
    res(forkData)
  })).fork(crapout(t), (o) => {
    t.truthy(o)
    const value = fs.readFileSync(filename, `utf8`)
    t.is(value, forkData)
    t.end()
  })
})

test.cb(`Task.writeData should be a curried wrapper for rejection`, (t) => {
  t.plan(2)
  t.is(typeof writeData, `function`, `Task.writeData should be a function.`)
  writeData((e) => {
    t.truthy(e)
    t.end()
  }, () => {
    t.fail(`This write should fail.`)
  }, ``, `barfsauce`)
})

const delayedTask = (input) => new Task((_, resolve) => {
  setTimeout(() => {
    resolve(input)
  }, 1e2)
})

test.cb(`Task.sequence should provide a sequential interface for consuming a list of tasks`,
  (t) => {
    t.plan(6)
    t.is(typeof sequence, `function`, `Task.sequence should be a function.`)
    const errorToThrow = `Expected to be given a list of tasks with fork methods.`
    t.throws(() => sequence([]).fork((e) => { throw e }), errorToThrow, `Should throw given [].`)
    const words = {
      one: random.word(10),
      two: random.word(10),
      three: random.word(10)
    }
    const input = [
      delayedTask(words.one),
      delayedTask(words.two),
      delayedTask(words.three)
    ]
    const sequenceTask = sequence(input)
    t.truthy(sequenceTask, `Task.sequence should return a Task`)
    t.truthy(sequenceTask.fork, `Task.sequence should return a Task with a fork method`)
    const fail = (e) => {
      t.fail(`This case should not occur: ${e}`)
    }
    const succeed = (output) => {
      t.truthy(output)
      t.deepEqual(output, toArray(words))
    }
    sequenceTask.fork(fail, succeed)
  }
)
