/* global test */
import {pipe} from 'katsu-curry'
import {t} from 'germs'

import {equals, add, subtract, divide, multiply, pow, round} from './math'

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
