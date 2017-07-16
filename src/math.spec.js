import test from 'ava'
import {pipe} from 'katsu-curry'

import {add, subtract, divide, multiply, pow, round} from './math'

test(`math is like, mathy`, (t) => {
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
