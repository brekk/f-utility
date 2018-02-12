/* global test */
import {t} from 'jest-t-assert'
import {iterate} from './iterate'

test(`iterate`, () => {
  t.deepEqual(iterate(null, null), [])
  t.deepEqual(iterate(5, () => `x`), `xxxxx`.split(``))
})
