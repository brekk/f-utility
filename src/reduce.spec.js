import test from 'ava'
import {reduce} from './reduce'

test(`reduce`, (t) => {
  const out = reduce((a, b) => a.concat(b), [], [[`a`], [`b`, `c`], [`d`, `e`]])
  t.deepEqual(out, `abcde`.split(``))
})
