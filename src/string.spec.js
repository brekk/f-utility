import test from 'ava'
import {trim, split} from './string'

test(`trim`, (t) => {
  t.is(trim(` cooool `), `cooool`)
})
test(`split`, (t) => {
  t.deepEqual(split(``, `abcde`), `abcde`.split(``))
})
