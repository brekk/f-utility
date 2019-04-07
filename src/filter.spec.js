/* global test */
import { t } from "jest-t-assert"
import { filter } from "./filter"

const mod2 = x => !(x % 2)

test(`filter`, () => {
  t.is(typeof filter, `function`)
  const flt = filter(mod2)
  t.deepEqual(flt([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), [0, 2, 4, 6, 8])
  const inputO = { a: 0, b: 1, c: 2, d: 3, e: 4 }
  t.deepEqual(flt(inputO), { a: 0, c: 2, e: 4 })
})

test(`filter should delegate to a given functor's method, if present`, () => {
  function MyFunctor(x) {
    if (!(this instanceof MyFunctor)) {
      return new MyFunctor(x)
    }
    this.value = [].concat(x)
    return this
  }
  MyFunctor.prototype.filter = function customFilter(fn) {
    return MyFunctor(
      this.value.reduce((agg, x) => (fn(x) ? agg.concat(x) : agg), [])
    )
  }
  const custom = MyFunctor([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5])
  const expected = MyFunctor([-4, -2, 0, 2, 4])
  t.deepEqual(custom.filter(mod2), expected)
  const filtered = filter(mod2, custom)
  t.deepEqual(filtered, expected)
})
