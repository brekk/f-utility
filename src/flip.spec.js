/* global test */
import {pipe} from 'katsu-curry'
import {t} from 'jest-t-assert'
import {flip} from './flip'
import {divide} from './math'

test(`flip should invert parameters for the first two parameters of a given function`, () => {
  const half = divide(2)
  const twoOver = flip(divide)(2)
  const halfThenOverTwo = pipe(half, twoOver)
  t.is(half(5), 2.5)
  t.is(twoOver(5), 0.4)
  t.is(halfThenOverTwo(5), 0.8)
})
