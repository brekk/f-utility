import fs from 'fs'

import test from 'ava'
import Data from 'folktale/data'
export const {Task} = Data
// import Task from 'data.task'
import curry from 'lodash/fp/curry'
import toArray from 'lodash/fp/toArray'

import {
  rejectTask,
  resolveTask,
  taskify,
  taskifyPromise,
  promiseToTask,
  taskToPromise,
  writeFile,
  writeData,
  sequence
} from '../../src/core/task'
import random from '../../src/testing/random'

test(`Task.reject should always fail synchronous input task`, (t) => {
  t.plan(4)
  t.is(typeof rejectTask, `function`, `Task.reject should be a function.`)
  const word = random.word(6)
  const rejecter = () => new TypeError(word)
  const output = rejectTask(rejecter())
  t.is(typeof output, `object`)
  t.is(typeof output.fork, `function`)
  const p = taskToPromise(output)
  t.throws(p)
})

test(`Task.resolve should always pass synchronous input task`, (t) => {
  t.plan(4)
  t.is(typeof resolveTask, `function`, `Task.resolve should be a function.`)
  const word = random.word(6)
  const output = resolveTask(word)
  t.is(typeof output, `object`)
  t.is(typeof output.fork, `function`)
  return taskToPromise(output).then((x) => {
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
    t.plan(2)
    t.is(typeof taskify, `function`)
    const word = random.word(10)
    const hook = nodeStyleCBFunction(word)
    const succeeder = hook(false)
    const taskStyleSucceeder = taskify(succeeder)
    return taskToPromise(taskStyleSucceeder()).then((o) => t.is(o, word))
  }
)

test(`Task.taskify's resulting function should throw when the original callback would`, (t) => {
  t.plan(2)
  t.is(typeof taskify, `function`)
  const word = random.word(10)
  const hook = nodeStyleCBFunction(word)
  const failer = hook(true)
  const taskStyleFailer = taskify(failer)
  t.throws(taskToPromise(taskStyleFailer()))
})
test(
  `Task.taskifyPromise should take a good promise-returning function and make it return a Task`,
  (t) => {
    t.plan(4)
    t.is(typeof taskifyPromise, `function`)
    const goodWord = random.word(10)
    const willPass = () => Promise.resolve(goodWord)
    const task = taskifyPromise(willPass)()
    t.is(typeof task, `object`)
    t.is(typeof task.fork, `function`)
    const p = taskToPromise(task)
    return p.then((word) => {
      t.is(word, goodWord)
    })
  }
)
test(
  `Task.taskifyPromise should take a bad promise-returning function and make it return a Task`,
  (t) => {
    t.plan(1)
    const badWord = random.word(10)
    const willFail = () => Promise.reject(badWord)
    t.throws(taskToPromise(taskifyPromise(willFail)()))
  }
)

test(`Task.taskToPromise should fail to convert non tasks`, (t) => {
  t.plan(1)
  t.throws(taskToPromise({}))
})

test(`Task.promiseToTask should not convert an invalid promise`, (t) => {
  t.plan(2)
  t.is(typeof promiseToTask, `function`)
  t.throws(() => promiseToTask({}).fork((e) => { throw e }))
})
test(`Task.promiseToTask should convert an existing Promise into a Task`, (t) => {
  t.plan(3)
  const word = random.word(10)
  const x = Promise.resolve(word)
  const t1 = promiseToTask(x)
  t.is(typeof t1, `object`)
  t.is(typeof t1.fork, `function`)
  return taskToPromise(t1).then((value) => t.is(value, word)).catch(t.fail)
})

const crapout = curry((t, e) => {
  t.fail(`This method should be able to write a local file. ${e.toString()}`)
})

test(`Task.writeFile should provide a task-interface for file writing`, (t) => {
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
  }
  return taskToPromise(fileWritten).then(success)
})

test(`Task.writeFile should know how to fold in existing Task values`, (t) => {
  t.plan(2)
  const forkData = `butts`
  const filename = `./fixture2.txt`
  // const priorValue = fs.readFileSync(filename, `utf8`)
  const consumer = (o) => {
    t.truthy(o)
    const value = fs.readFileSync(filename, `utf8`)
    t.is(value, forkData)
  }
  return taskToPromise(
    writeFile(filename, new Task((_, res) => {
      res(forkData)
    })
  )).then(consumer)
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

test(`Task.sequence should provide a sequential interface for consuming a list of tasks`,
  (t) => {
    t.plan(2)
    t.is(typeof sequence, `function`, `Task.sequence should be a function.`)
    const errorToThrow = `Expected to be given a list of tasks with fork methods.`
    t.throws(() => sequence([]).fork((e) => { throw e }), errorToThrow, `Should throw given [].`)
  }
)

test(`Task.sequence should provide an interface for consuming sequential tasks`, (t) => {
  t.plan(4)
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
  const succeed = (output) => {
    t.truthy(output)
    t.deepEqual(output, toArray(words))
  }
  return taskToPromise(sequenceTask).then(succeed)
})
