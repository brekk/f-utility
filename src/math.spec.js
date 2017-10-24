/* global test */
import {pipe} from 'katsu-curry'
import {t} from 'germs'

import {equals, add, subtract, divide, multiply, pow, round, gt, gte, lt, lte} from './math'

test(`math is like, mathy`, () => {
  const doNothing = pipe(
    divide(10),
    add(5),
    subtract(10),
    add(5),
    multiply(10),
    pow(1),
    round
  )
  t.is(doNothing(100), 100)
  t.is(doNothing(-7), -7)
})

test(`equals is a function`, () => {
  t.truthy(equals(100, 100))
  t.falsy(equals(200, 100))
})

test(`gt, gte, lt are curried comparisons`, () => {
  const underAHundy = lt(100)
  const overAThrundy = gt(300)
  const exactlyAGrundyOrMore = gte(1000)
  const underAndUpToFiveHundy = lte(500)
  t.truthy(underAHundy(Math.round(Math.random() * 99)))
  t.truthy(overAThrundy(300 + Math.round(Math.random() * 99)))
  t.truthy(exactlyAGrundyOrMore(1000))
  t.truthy(underAndUpToFiveHundy(500))
})
