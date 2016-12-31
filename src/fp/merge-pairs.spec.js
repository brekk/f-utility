import test from 'ava'
import toPairs from 'ramda/src/toPairs'
import {mergePairs} from '../../src/fp/merge-pairs'

const innerObject = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}
const input = toPairs(innerObject)

test(`mergePairs should assemble keypairs into an object`, (t) => {
  t.plan(2)
  t.is(typeof mergePairs, `function`)
  t.deepEqual(mergePairs(input), innerObject)
})
