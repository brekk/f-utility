import test from 'ava'
import {iterate} from './iterate'

test(`iterate`, (t) => {
  t.deepEqual(iterate(null, null), [])
})
