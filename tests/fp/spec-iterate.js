import test from 'tape'
import {iterate, ERROR_CODES} from '../../src/fp/iterate'

test(`iterate should be a binary curried function`, (t) => {
  t.plan(2)
  t.equal(typeof iterate, `function`)
  t.equal(typeof iterate(1), `function`)
  t.end()
})
test(`iterate should throw when 'howMany' is not an integer`, (t) => {
  t.plan(4)
  const one = () => 1
  const {expectInteger} = ERROR_CODES
  t.throws(() => iterate({}, one), expectInteger)
  t.throws(() => iterate(5.7, one), expectInteger)
  t.throws(() => iterate(`uh`, one), expectInteger)
  t.throws(() => iterate(false, one), expectInteger)
  t.end()
})
test(`iterate should throw when 'cb' is not a function`, (t) => {
  t.plan(5)
  const {callbackAintNoFunction} = ERROR_CODES
  t.throws(() => iterate(1, `1`), callbackAintNoFunction)
  t.throws(() => iterate(2, 2), callbackAintNoFunction)
  t.throws(() => iterate(3, null), callbackAintNoFunction)
  t.throws(() => iterate(4, {}), callbackAintNoFunction)
  t.throws(() => iterate(5, []), callbackAintNoFunction)
  t.end()
})
test(`iterate aggregate values by mapping over a range`, (t) => {
  t.plan(3)
  const one = () => 1
  t.same(iterate(2, one), [1, 1])
  t.same(iterate(5, one), [1, 1, 1, 1, 1])
  t.same(iterate(2, () => `x`), [`x`, `x`])
  t.end()
})
test(`iterate should treat negative iterations values as positive`, (t) => {
  t.plan(2)
  const one = () => 1
  t.same(iterate(-1, one), [1])
  t.same(iterate(-2, one), [1, 1])
  t.end()
})
