/* global test */
import {t} from './test-helpers'
import {trim, split} from './string'

test(`trim`, () => {
  t.is(trim(` cooool `), `cooool`)
})
test(`split`, () => {
  t.deepEqual(split(``, `abcde`), `abcde`.split(``))
})
