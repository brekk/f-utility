import test from 'ava'
import {join} from './array'

test(`join should be a delegatee laste version of array.join(x)`, (t) => {
  const letters = `abcde`.split(``)
  t.is(join(` `, letters), `a b c d e`)
})
