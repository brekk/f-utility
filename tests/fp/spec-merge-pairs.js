import test from 'tape'
import toPairs from 'lodash/fp/toPairs'
import {mergePairs} from '../../src/fp/merge-pairs'

const innerObject = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}
const input = toPairs(innerObject)

test(`mergePairs should assemble keypairs into an object`, (assert) => {
  assert.plan(2)
  assert.equal(typeof mergePairs, `function`)
  assert.same(mergePairs(input), innerObject)
  assert.end()
})
