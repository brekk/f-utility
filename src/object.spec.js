import test from 'ava'

import {map} from './map'
import {merge} from './object'
import {word} from './random-word'
import {floorMin} from './random-floor'

test(`merge`, (t) => {
  const [a, b] = map(word, [1, 1])
  const [x, y] = map(floorMin, [1e3, 1e3])
  const aObject = {[a]: x}
  const bObject = {[b]: y}
  t.deepEqual(merge(aObject, bObject), {...aObject, ...bObject})
})
