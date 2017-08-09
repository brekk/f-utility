/* global test */
import {curry} from 'katsu-curry'
import {t} from './test-helpers'
import {invert, not, not1, not2, not3} from './invert'
import {equal} from './math'

test(`invert`, () => {
  t.falsy(invert(true))
  t.truthy(invert(false))
})

test(`not`, () => {
  const notAHundo = not(equal(100))
  t.truthy(notAHundo(200))
  t.falsy(notAHundo(100))
})

test(`not1`, () => {
  const notAHundo = not1(equal, 100)
  t.truthy(notAHundo(200))
  t.falsy(notAHundo(100))
})

test(`not2`, () => {
  const ascending = curry((a, b, c) => ((a < b) && (b < c)))
  const isDescending = not2(ascending, 1, 10)
  t.truthy(isDescending(1))
  t.falsy(isDescending(100))
})

test(`not3`, () => {
  const ascending = curry((a, b, c, d) => ((a < b) && (b < c) && (c < d)))
  const isDescending = not3(ascending, 1, 10, 100)
  t.truthy(isDescending(1))
  t.falsy(isDescending(1000))
})
