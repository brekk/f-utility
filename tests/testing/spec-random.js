import test from 'tape'
import curry from 'lodash/fp/curry'
import equals from 'lodash/fp/equals'
import random from '../../src/testing/random'
import {iterate} from '../../src/fp/iterate'
import {mergePairs} from '../../src/fp/merge-pairs'

const oneToAThousand = () => Math.floor(Math.random() * 1e3) + 1
const characters = [
  `abcdefghijklmnopqrstuvwxyz`,
  `ABCDEFGHIJKLMNOPQRSTUVWXYZ`,
  `1234567890`,
  `~!@#$%^&*(),./;'[]\\<>?:{}|-=_+'\``
].join(``).split(``)

const charactersAsObjectList = mergePairs(characters.map((x, index) => {
  // gotta be valid key names
  return [`_` + x, index]
}))

const aggregateValuesForFunction = curry(function _aggregateValues(
  t, testingFn, args, assert, assertionsPerIteration
) {
  const doitHowManyTimes = oneToAThousand() // min 1
  t.plan((doitHowManyTimes * assertionsPerIteration) + 1)
  t.equal(typeof random, `function`)
  const runner = iterate(doitHowManyTimes)
  let last = -1
  const randomTest = () => {
    const x = Array.isArray(args) ?
      testingFn(...args) :
      testingFn(args)
    assert(x, last)
    last = x
  }
  runner(randomTest)
  t.end()
})

test(`random should return a random number`, (t) => {
  const innerPlan = 2
  aggregateValuesForFunction(t, random, 1e5, (x, last) => {
    // innerPlan should match the number of assertions here
    t.equal(typeof x, `number`)
    t.notEqual(x, last)
  }, innerPlan)
})

test(`random.shuffle should shuffle a list`, (t) => {
  t.plan(2)
  t.equal(typeof random.shuffle, `function`)
  const makeInteger = () => random(1e3)
  const total = 10
  const list = iterate(total, makeInteger)
  const shuffled = random.shuffle(list)
  t.notSame(list, shuffled)
  t.end()
})

test(`random.floor should return a random number floored`, (t) => {
  const innerPlan = 2
  aggregateValuesForFunction(t, random.floor, 1e5, (x, last) => {
    // innerPlan should match the number of assertions here
    t.equal(typeof x, `number`)
    t.notEqual(x, last)
  }, innerPlan)
})

test(`random.floorMin should return a random number floored with a minimum`, (t) => {
  const innerPlan = 3
  const addition = random.floor(100) + 5
  const args = [addition, 1e5]
  aggregateValuesForFunction(t, random.floorMin, args, (x, last) => {
    // innerPlan should match the number of assertions here
    t.equal(typeof x, `number`)
    t.ok(x > addition)
    t.notEqual(x, last)
  }, innerPlan)
})

test(`random.take should fail when given a non-boolean "isWrapped" value`, (t) => {
  t.plan(2)
  t.equal(typeof random.take, `function`)
  t.throws(() => random.take(`whatever`, {}), `Expected useWrapped to be a boolean.`)
  t.end()
})

test(`random.pick should take unwrapped values from arrays`, (t) => {
  const input = characters
  const innerPlan = 2
  let failures = 0
  const threshold = 15
  aggregateValuesForFunction(t, random.pick, [input], (x, last) => {
    // innerPlan should match the number of assertions here
    t.ok(input.indexOf(x) > -1)
    if (!equals(x, last)) {
      t.notSame(x, last)
    } else {
      failures = failures + 1
      // we're doing a thing here which *should* allow us to more reliably prove that this thing
      // is relatively random from run to run, but given the small input set here, we need to have
      // a failure threshold we can use to resolve test flake
      if (failures > threshold) {
        t.fail()
      } else {
        t.pass(`failed random.pick.arrays ${failures} times, still above threshold`)
      }
    }
  }, innerPlan)
})

test(`random.pick should take unwrapped values from objects`, (t) => {
  const input = charactersAsObjectList
  const innerPlan = 2
  let failures = 0
  const threshold = 15
  aggregateValuesForFunction(t, random.pick, input, (x, last) => {
    // innerPlan should match the number of assertions here
    t.ok(Object.values(input).indexOf(x) > -1)
    if (!equals(x, last)) {
      t.notSame(x, last)
    } else {
      failures = failures + 1
      // we're doing a thing here which *should* allow us to more reliably prove that this thing
      // is relatively random from run to run, but given the small input set here, we need to have
      // a failure threshold we can use to resolve test flake
      if (failures > threshold) {
        t.fail()
      } else {
        t.pass(`failed random.pick.objects ${failures} times, still above threshold`)
      }
    }
  }, innerPlan)
})

test(`random.grab should take wrapped values from arrays`, (t) => {
  const input = characters
  const innerPlan = 1
  let failures = 0
  const threshold = 15
  aggregateValuesForFunction(t, random.grab, [input], (x, last) => {
    console.log(`inputs`, x[0], last[0])
    // innerPlan should match the number of assertions here
    if (!equals(x[0], last[0])) {
      t.notSame(x[0], last[0])
    } else {
      failures = failures + 1
      // we're doing a thing here which *should* allow us to more reliably prove that this thing
      // is relatively random from run to run, but given the small input set here, we need to have
      // a failure threshold we can use to resolve test flake
      if (failures > threshold) {
        t.fail()
      } else {
        t.pass(`failed random.grab.arrays ${failures} times, still above threshold`)
      }
    }
  }, innerPlan)
})

test(`random.grab should take wrapped values from objects`, (t) => {
  const input = charactersAsObjectList
  const innerPlan = 1
  let failures = 0
  const threshold = 15
  aggregateValuesForFunction(t, random.grab, [input], (x, last) => {
    // innerPlan should match the number of assertions here
    if (!equals(x, last)) {
      t.notSame(x, last)
    } else {
      failures = failures + 1
      // we're doing a thing here which *should* allow us to more reliably prove that this thing
      // is relatively random from run to run, but given the small input set here, we need to have
      // a failure threshold we can use to resolve test flake
      if (failures > threshold) {
        t.fail()
      } else {
        t.pass(`failed random.grab.objects ${failures} times, still above threshold`)
      }
    }
  }, innerPlan)
})

test(`random.divvy should randomly take a given number of values from a list`, (t) => {
  t.plan(4)
  t.equal(typeof random.divvy, `function`)
  t.equal(typeof random.divvy(2), `function`)
  t.equal(random.divvy(5, characters).length, 5)
  const objectOutcome = random.divvy(5, charactersAsObjectList)
  t.equal(objectOutcome.length, 5)
  t.end()
})

test(`random.word should throw when given a non number`, (t) => {
  t.plan(1)
  t.throws(() => random.word(false))
  t.end()
})

test(`random.word should return a random concatenation of letters`, (t) => {
  const innerPlan = 2
  const args = 10
  aggregateValuesForFunction(t, random.word, args, (x, last) => {
    // innerPlan should match the number of assertions here
    t.equal(typeof x, `string`)
    t.notEqual(x, last)
  }, innerPlan)
})
