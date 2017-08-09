/* global test */
import {t} from './test-helpers'
import {iterate} from './iterate'

test(`iterate`, () => {
  t.deepEqual(iterate(null, null), [])
  t.deepEqual(iterate(5, () => `x`), `xxxxx`.split(``))
})
