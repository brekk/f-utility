import test from 'ava'
import {
  available,
  getPotential
} from '../../src/fp/get-potential'
import random from '../../src/testing/random'

test(
  `available`, (t) => {
    t.plan(6)
    // curried function
    t.is(typeof available, `function`)
    t.is(typeof available(1), `function`)
    t.is(typeof available(1, 1), `function`)
    t.is(typeof available(1, 1, 1), `function`)
    const word = random.word(5)
    t.deepEqual(
      available(word, {x: 1}, {matched: false}, `a`),
      {matched: false, defaultValue: word}
    )
    const number = random.floorMin(1, 1e3)
    t.deepEqual(
      available(word, {x: number}, {matched: false}, `x`),
      {matched: true, defaultValue: word, match: number}
    )
  }
)

test(
  `getPotential should follow the same pattern as lodash/fp/getOr with static values`,
  (t) => {
    t.plan(4)
    t.is(typeof getPotential, `function`)
    const word = random.word(10)
    t.is(getPotential(word, `a`, {c: `c`}), word)
    t.is(getPotential(word, `c`, {c: `c`}), `c`)
    t.is(getPotential(word, [`c`], {c: `c`}), `c`)
  }
)

test(
  `getPotential should invoke a default function when given static values and a fn`,
  (t) => {
    t.plan(3)
    let saved = null
    const impureSlop = () => {
      const copy = random.word(10)
      saved = copy
      return copy
    }
    t.is(getPotential(impureSlop, `a`, {c: `c`}), saved)
    t.is(getPotential(impureSlop, `c`, {c: `c`}), `c`)
    t.is(getPotential(impureSlop, [`c`], {c: `c`}), `c`)
  }
)

test(
  `getPotential should find the first available matcher when given a list`,
  (t) => {
    t.plan(4)
    const word = random.word(10)
    t.is(getPotential(word, [`a`, `b`, `c`], {c: `c`}), `c`)
    t.is(getPotential(word, [`a`, `b`], {c: `c`}), word)
    t.is(getPotential(word, [`a`, `b`, `c`, `d`], {c: `c`, d: `d`}), `c`)
    t.is(getPotential(word, [`a`, `b`, `d`, `e`], {c: `c`, d: `d`}), `d`)
  }
)

test(
  `getPotential should find the first available matcher when given a list and invoke a dynamic fn`,
  (t) => {
    t.plan(4)
    let saved = null
    const impureSlop = () => {
      const copy = random.word(10)
      saved = copy
      return copy
    }
    t.is(getPotential(impureSlop, [`a`, `b`, `c`], {c: `c`}), `c`)
    t.is(getPotential(impureSlop, [`a`, `b`], {c: `c`}), saved)
    t.is(getPotential(impureSlop, [`a`, `b`, `c`, `d`], {c: `c`, d: `d`}), `c`)
    t.is(getPotential(impureSlop, [`a`, `b`, `d`, `e`], {c: `c`, d: `d`}), `d`)
  }
)
