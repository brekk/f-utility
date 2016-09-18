import test from 'ava'
import id from 'lodash/fp/identity'
import random from '../../src/testing/random'
import {xtrace} from '../../src/dev/trace'

const a = random.word(5)
const b = random.word(5)

test(`xtrace must return the last of three potential arguments`, (t) => {
  const output = xtrace(id, a, b)
  t.plan(3)
  t.is(output, b)
  // partially apply curried functions
  t.is(typeof xtrace(id), `function`)
  t.is(typeof xtrace(id, a), `function`)
  
})
