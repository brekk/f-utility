/* global test */
import {t} from 'jest-t-assert'
import * as DEBUG from './debug'

export const harness = (F) => {
  const zort = (x) => x.sort() // eslint-disable-line

  const {
    symmetricDifference,
    pipe,
    keys,
    invert,
    not1,
    not,
    not2,
    not3,
    equal,
    curry,
    divide,
    flip
  } = F

  const keySort = pipe(keys, zort)
  test(`flip should invert parameters for the first two parameters of a given function`, () => {
    const half = divide(2)
    const twoOver = flip(divide)(2)
    const halfThenOverTwo = pipe(half, twoOver)
    t.is(half(5), 2.5)
    t.is(twoOver(5), 0.4)
    t.is(halfThenOverTwo(5), 0.8)
  })

  test(`invert`, () => {
    t.falsy(invert(true))
    t.truthy(invert(false))
  })

  test(`not`, () => {
    const notAHundo = not(equal(100))
    t.truthy(notAHundo(200))
    t.falsy(notAHundo(100))
  })

  test(`not1`, () => {
    const notAHundo = not1(equal, 100)
    t.truthy(notAHundo(200))
    t.falsy(notAHundo(100))
  })

  test(`not2`, () => {
    const ascending = curry((a, b, c) => ((a < b) && (b < c)))
    const isDescending = not2(ascending, 1, 10)
    t.truthy(isDescending(1))
    t.falsy(isDescending(100))
  })

  test(`not3`, () => {
    const ascending = curry((a, b, c, d) => ((a < b) && (b < c) && (c < d)))
    const isDescending = not3(ascending, 1, 10, 100)
    t.truthy(isDescending(1))
    t.falsy(isDescending(1000))
  })

  test(`length`, () => {
    t.is(F.length({a: 1, b: 2, c: 3}), 3)
    t.is(F.length(`abc`), 3)
    t.is(F.length([1, 2, 3]), 3)
  })

  test(`index`, () => {
    t.is(typeof F, `object`)
    const futilityKeys = keySort(F)
    const expected = zort([
      `$`,
      `I`,
      `K`,
      `PLACEHOLDER`,
      `add`,
      `alterFirstIndex`,
      `alterIndex`,
      `alterLastIndex`,
      `ap`,
      `assign`,
      `chain`,
      `charAt`,
      `choice`,
      `codePointAt`,
      `compose`,
      `concat`,
      `curryObjectKN`,
      `curryObjectK`,
      `curryObjectN`,
      `curry`,
      `curryify`,
      `difference`,
      `divide`,
      `endsWith`,
      `entries`,
      `equal`,
      `equals`,
      `every`,
      `filter`,
      `flatMap`,
      `flip`,
      `fold`,
      `fork`,
      `freeze`,
      `fromPairs`,
      `indexOf`,
      `invert`,
      `isArray`,
      `isBoolean`,
      `isDistinctObject`,
      `isFunction`,
      `isNil`,
      `isNumber`,
      `isObject`,
      `isPOJO`,
      `isString`,
      `isTypeof`,
      `iterate`,
      `join`,
      `keys`,
      `lastIndexOf`,
      `length`,
      `mapKeys`,
      `mapTuple`,
      `mapTuples`,
      `map`,
      `match`,
      `merge`,
      `multiply`,
      `not1`,
      `not2`,
      `not3`,
      `not`,
      `padEnd`,
      `padStart`,
      `pairwiseObject`,
      `pairwise`,
      `pathEq`,
      `pathIs`,
      `pathOr`,
      `path`,
      `pipe`,
      `pow`,
      `propEq`,
      `propIs`,
      `propOr`,
      `prop`,
      `random`,
      `range`,
      `reduce`,
      `reject`,
      `relativeIndex`,
      `remapArray`,
      `remap`,
      `repeat`,
      `replace`,
      `round`,
      `search`,
      `some`,
      `sort`,
      `split`,
      `startsWith`,
      `substr`,
      `subtract`,
      `symmetricDifference`,
      `ternary`,
      `toPairs`,
      `trim`,
      `triplet`,
      `which`
    ])
    const sillyPowerAssert = symmetricDifference(expected, futilityKeys)
    t.deepEqual(sillyPowerAssert, [])
    t.deepEqual(
      futilityKeys,
      expected
    )
  })
  test(`toString`, () => {
    t.is(F.curry.toString(), `🍛 (?)`)
    t.is(F.isNil.toString(), `curry(__isTypeof)(null)(?)`)
    t.is(F.round.toString(), `~(?)`)
    t.is(F.random.toString(), `👾 (?)`)
    t.is(F.toPairs.toString(), `ᗕ(?)`)
    t.is(F.fromPairs.toString(), `ᗒ(?)`)
    t.is(F.flip.toString(), `🙃 🍛 (?)`)
    t.is(F.not.toString(), `❗️(?)`)
    t.is(F.not1.toString(), `❗️1(?,?)`)
    t.is(F.not2.toString(), `❗️2(?,?,?)`)
    t.is(F.not3.toString(), `❗️3(?,?,?,?)`)
    t.is(F.length.toString(), `length(?)`)
    t.is(F.pipe.toString(), `🍡 (?)`)
    t.is(F.compose.toString(), `🙃 🍡 (?)`)
    t.is(F.isDistinctObject.toString(), `isTrueObject(?)`)
    t.is(F.isPOJO.toString(), `isTrueObject(?)`)
    t.is(F.chain.toString(), `curry(__chain)(?,?)`)
    t.is(F.filter.toString(), `curry(__filter)(?,?)`)
    t.is(F.reduce.toString(), `curry(__reduce)(?,?,?)`)
    t.is(F.which.toString(), `curry(__which)(?,?,?)`)
    t.is(F.some.toString(), `curry(__which)(some)(?,?)`)
    t.is(F.every.toString(), `curry(__which)(every)(?,?)`)
  })
  test(`some`, () => {
    t.truthy(F.some((x) => x === `j`, [`j`, `k`, `l`]))
    t.falsy(F.some((x) => x === `j`, [`k`, `l`, `m`]))
  })
  test(`every`, () => {
    t.truthy(F.every((x) => typeof x === `number`, [0, 1, 2, 3, 4]))
    t.falsy(F.every((x) => typeof x === `number`, [0, 1, `twenty`, 3, 4]))
  })

  test(`mapKeys`, () => {
    const input = {
      a: 1,
      b: 2,
      c: 3
    }
    const fn = (v) => `__${v}`
    const output = F.mapKeys(fn, input)
    t.deepEqual(output, {__a: 1, __b: 2, __c: 3})
  })
  const mod2 = (x) => !(x % 2)
  const {filter, chain, reduce, I} = F
  test(`filter`, () => {
    t.is(typeof filter, `function`)
    const flt = filter(mod2)
    t.deepEqual(flt([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), [0, 2, 4, 6, 8])
    const inputO = {a: 0, b: 1, c: 2, d: 3, e: 4}
    t.deepEqual(flt(inputO), {a: 0, c: 2, e: 4})
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
      return MyFunctor(this.value.reduce(
        (agg, x) => (
          fn(x) ?
            agg.concat(x) :
            agg
        ),
        []
      ))
    }
    const custom = MyFunctor([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5])
    const expected = MyFunctor([-4, -2, 0, 2, 4])
    t.deepEqual(custom.filter(mod2), expected)
    const filtered = filter(mod2, custom)
    t.deepEqual(filtered, expected)
  })

  test(`chain`, () => {
    t.is(typeof chain, `function`)
    t.is(typeof chain(I), `function`)
    const double = (x) => x.map((y) => y * 2)
    const split = (x) => x.split(``)
    const flatSplit = chain(split)
    const flatDouble = chain(double)
    const nine = [
      [1, 2],
      [3, 4, 5],
      [6, 7, 8, 9]
    ]
    const nested = [
      `alpha`,
      `beta`,
      `gamma`,
      `omega`,
      `whatever`
    ]
    t.deepEqual(flatSplit(nested), `alphabetagammaomegawhatever`.split(``))
    t.deepEqual(flatDouble(nine), [2, 4, 6, 8, 10, 12, 14, 16, 18])
  })
  test(`reduce`, () => {
    const out = reduce((a, b) => a.concat(b), [], [[`a`], [`b`, `c`], [`d`, `e`]])
    t.deepEqual(out, `abcde`.split(``))
  })

  const mod2Reduce = (agg, i) => (!(i % 2) ? agg.concat(i) : agg)

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
    t.deepEqual(custom.reduce(mod2Reduce, []), expected)
    const reduced = reduce(mod2Reduce, [], custom)
    t.deepEqual(reduced, expected)
  })
}
harness(DEBUG)
