/* global test */
import { t } from "jest-t-assert"
import { reduce } from "./reduce"

test(`reduce`, () => {
  const out = reduce((a, b) => a.concat(b), [], [[`a`], [`b`, `c`], [`d`, `e`]])
  t.deepEqual(out, `abcde`.split(``))
})

const mod2 = (agg, i) => (!(i % 2) ? agg.concat(i) : agg)

test(`reduce should delegate to a given functor's method, if present`, () => {
  function MyFunctor(x) {
    if (!(this instanceof MyFunctor)) {
      return new MyFunctor(x)
    }
    this.value = [].concat(x)
    return this
  }
  MyFunctor.prototype.reduce = function customReduce(fn, init) {
    return MyFunctor(this.value.reduce(fn, init))
  }
  const custom = MyFunctor([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5])
  const expected = MyFunctor([-4, -2, 0, 2, 4])
  t.deepEqual(custom.reduce(mod2, []), expected)
  const reduced = reduce(mod2, [], custom)
  t.deepEqual(reduced, expected)
})
