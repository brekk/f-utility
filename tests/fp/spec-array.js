import test from 'ava'
import {join} from '../../src/fp/array'

const nospace = ``
const comma = `,`

test(`join should be an fp-version of array.prototype.join`, (t) => {
  t.plan(6)
  t.is(typeof join, `function`)
  t.is(typeof join(comma), `function`)
  const flatAlpha = `abcde`
  const aThroughE = flatAlpha.split(nospace)
  const output = join(nospace, aThroughE)
  t.is(output, flatAlpha)
  const out = join(comma, aThroughE)
  const joined = aThroughE.join(comma)
  t.is(out, joined)
  t.throws(() => join(null, null), `Expected joiner to be string.`)
  t.throws(() => join(`,`, null), `Expected array to be given.`)
  
})
