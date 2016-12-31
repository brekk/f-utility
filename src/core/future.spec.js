import fs from 'fs'

import test from 'ava'
import Future from 'ramda-fantasy/src/Future'
// import Future from 'data.future'
import curry from 'ramda/src/curry'
import toArray from 'lodash.toarray'

import {
  rejectFuture,
  resolveFuture,
  futurify,
  futurifyPromise,
  promiseToFuture,
  futureToPromise,
  writeFile,
  writeData,
  sequence
} from '../../src/core/future'
import random from '../../src/testing/random'

test(`Future.reject should always fail synchronous input future`, (t) => {
  t.plan(4)
  t.is(typeof rejectFuture, `function`, `Future.reject should be a function.`)
  const word = random.word(6)
  const rejecter = () => new TypeError(word)
  const output = rejectFuture(rejecter())
  t.is(typeof output, `object`)
  t.is(typeof output.fork, `function`)
  const p = futureToPromise(output)
  t.throws(p)
})

test(`Future.resolve should always pass synchronous input future`, (t) => {
  t.plan(4)
  t.is(typeof resolveFuture, `function`, `Future.resolve should be a function.`)
  const word = random.word(6)
  const output = resolveFuture(word)
  t.is(typeof output, `object`)
  t.is(typeof output.fork, `function`)
  return futureToPromise(output).then((x) => {
    t.is(x, word, `Future.resolve should return the correct value`)
  })
})

const nodeStyleCBFunction = curry((errorWord, val, fn) => {
  if (val) {
    fn(new Error(errorWord))
    return
  }
  fn(null, errorWord)
})

test(`Future.futurify should convert a node-style callback function to a Future-producing function`,
  (t) => {
    t.plan(2)
    t.is(typeof futurify, `function`)
    const word = random.word(10)
    const hook = nodeStyleCBFunction(word)
    const succeeder = hook(false)
    const futureStyleSucceeder = futurify(succeeder)
    return futureToPromise(futureStyleSucceeder()).then((o) => t.is(o, word))
  }
)

test(`Future.futurify's resulting function should throw when the original callback would`, (t) => {
  t.plan(2)
  t.is(typeof futurify, `function`)
  const word = random.word(10)
  const hook = nodeStyleCBFunction(word)
  const failer = hook(true)
  const futureStyleFailer = futurify(failer)
  t.throws(futureToPromise(futureStyleFailer()))
})
test(
  `Future.futurifyPromise should take a promise-returning function and make it return a Future`,
  (t) => {
    t.plan(4)
    t.is(typeof futurifyPromise, `function`)
    const goodWord = random.word(10)
    const willPass = () => Promise.resolve(goodWord)
    const future = futurifyPromise(willPass)()
    t.is(typeof future, `object`)
    t.is(typeof future.fork, `function`)
    const p = futureToPromise(future)
    return p.then((word) => {
      t.is(word, goodWord)
    })
  }
)
test(
  `Future.futurifyPromise should take a bad promise-returning function and make it return a Future`,
  (t) => {
    t.plan(1)
    const badWord = random.word(10)
    const willFail = () => Promise.reject(badWord)
    t.throws(futureToPromise(futurifyPromise(willFail)()))
  }
)

test(`Future.futureToPromise should fail to convert non futures`, (t) => {
  t.plan(1)
  t.throws(futureToPromise({}))
})

test(`Future.promiseToFuture should not convert an invalid promise`, (t) => {
  t.plan(2)
  t.is(typeof promiseToFuture, `function`)
  t.throws(() => promiseToFuture({}).fork((e) => { throw e }))
})
test(`Future.promiseToFuture should convert an existing Promise into a Future`, (t) => {
  t.plan(3)
  const word = random.word(10)
  const x = Promise.resolve(word)
  const t1 = promiseToFuture(x)
  t.is(typeof t1, `object`)
  t.is(typeof t1.fork, `function`)
  return futureToPromise(t1).then((value) => t.is(value, word)).catch(t.fail)
})

test(`Future.writeFile should provide a future-interface for file writing`, (t) => {
  t.plan(5)
  t.is(typeof writeFile, `function`, `Future.writeFile should be a function.`)
  const inputData = random.word(10)
  const filename = `./fixture.txt`
  const fileWritten = writeFile(filename, inputData)
  t.truthy(fileWritten, `Future.writeFile should return a Future`)
  t.truthy(fileWritten.fork, `Future.writeFile should return a Future with a fork method`)
  const success = (o) => {
    t.truthy(o)
    const value = fs.readFileSync(filename, `utf8`)
    t.is(value, inputData)
  }
  return futureToPromise(fileWritten).then(success)
})

test(`Future.writeFile should know how to fold in existing Future values`, (t) => {
  t.plan(2)
  const forkData = `butts`
  const filename = `./fixture2.txt`
  // const priorValue = fs.readFileSync(filename, `utf8`)
  const consumer = (o) => {
    t.truthy(o)
    const value = fs.readFileSync(filename, `utf8`)
    t.is(value, forkData)
  }
  return futureToPromise(
    writeFile(filename, new Future((_, res) => {
      res(forkData)
    })
  )).then(consumer)
})

test.cb(`Future.writeData should be a curried wrapper for rejection`, (t) => {
  t.plan(2)
  t.is(typeof writeData, `function`, `Future.writeData should be a function.`)
  writeData((e) => {
    t.truthy(e)
    t.end()
  }, () => {
    t.fail(`This write should fail.`)
  }, ``, `barfsauce`)
})

const delayedFuture = (input) => new Future((_, resolve) => {
  setTimeout(() => {
    resolve(input)
  }, 1e2)
})

test(`Future.sequence should provide a sequential interface for consuming a list of futures`,
  (t) => {
    t.plan(2)
    t.is(typeof sequence, `function`, `Future.sequence should be a function.`)
    const errorToThrow = `Expected to be given a list of futures with fork methods.`
    t.throws(() => sequence([]).fork((e) => { throw e }), errorToThrow, `Should throw given [].`)
  }
)

test(`Future.sequence should provide an interface for consuming sequential futures`, (t) => {
  t.plan(4)
  const words = {
    one: random.word(10),
    two: random.word(10),
    three: random.word(10)
  }
  const input = [
    delayedFuture(words.one),
    delayedFuture(words.two),
    delayedFuture(words.three)
  ]
  const sequenceFuture = sequence(input)
  t.truthy(sequenceFuture, `Future.sequence should return a Future`)
  t.truthy(sequenceFuture.fork, `Future.sequence should return a Future with a fork method`)
  const succeed = (output) => {
    t.truthy(output)
    t.deepEqual(output, toArray(words))
  }
  return futureToPromise(sequenceFuture).then(succeed)
})
