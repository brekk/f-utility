/* global test */
/* global expect */
import R from "ramda"

import {
  pipe,
  compose,
  curry,
  concat,
  join,
  sort,
  symmetricDifference,
  difference,
  filter,
  flip,
  map,
  ap,
  chain,
  equals,
  add,
  subtract,
  divide,
  multiply,
  not,
  invert,
  reduce,
  reject,
  endsWith,
  indexOf,
  lastIndexOf,
  match,
  repeat,
  replace,
  split,
  startsWith,
  trim,
  range,
  keys,
  merge,
  fromPairs,
  toPairs,
  path,
  pathOr,
  prop,
  propOr,
  pathEq,
  propIs,
  propEq,
  isNil,
  length,
  random
} from "./index"
const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const add2 = x => x + 2
const times10 = x => x * 10
const aNumber = () => random.floorMin(1, 100)

test(`equals`, () => {
  const five = equals(5)
  const five2 = R.equals(5)
  expect(five(10)).toEqual(five2(10))
  expect(five(5)).toEqual(five2(5))
})
test(`subtract`, () => {
  const a = aNumber()
  const b = aNumber()
  expect(subtract(a)(b)).toEqual(R.subtract(a)(b))
})
test(`add`, () => {
  const a = aNumber()
  const b = aNumber()
  expect(add(a)(b)).toEqual(R.add(a)(b))
})
test(`multiply`, () => {
  const a = aNumber()
  const b = aNumber()
  expect(multiply(a)(b)).toEqual(R.multiply(a)(b))
})
test(`divide`, () => {
  const a = aNumber()
  const b = aNumber()
  expect(divide(a)(b)).toEqual(R.divide(a)(b))
})

test(`invert`, () => {
  const input = { a: `alpha`, b: `beta`, c: `alpha` }
  expect(invert(input)).toEqual(R.invert(input))
})

test(`not`, () => {
  expect(not(true)).toEqual(R.not(true))
  expect(not(false)).toEqual(R.not(false))
})

test(`reduce`, () => {
  expect(reduce(add, 0, oneToTen)).toEqual(R.reduce(R.add, 0, oneToTen))
  expect(reduce(subtract, 0, oneToTen)).toEqual(
    R.reduce(R.subtract, 0, oneToTen)
  )
})

test(`reject`, () => {
  const isEven = x => x % 2 === 0
  expect(reject(isEven, oneToTen)).toEqual(R.reject(isEven, oneToTen))
})

test(`endsWith`, () => {
  expect(endsWith(`c`, `abc`)).toBeTruthy()
  expect(endsWith(`c`, `abc`)).toEqual(R.endsWith(`c`, `abc`))
  expect(endsWith([`c`], `abc`.split(``))).toEqual(
    R.endsWith([`c`], `abc`.split(``))
  )
})

test(`startsWith`, () => {
  expect(startsWith(`a`, `abc`)).toBeTruthy()
  expect(startsWith(`a`, `abc`)).toEqual(R.startsWith(`a`, `abc`))
  expect(startsWith([`a`], `abc`.split(``))).toEqual(
    R.startsWith([`a`], `abc`.split(``))
  )
})
test(`trim`, () => {
  expect(trim(`         a `)).toEqual(R.trim(`      a       `))
})

test(`indexOf`, () => {
  expect(indexOf(`2`, `100000000200000`)).toEqual(
    R.indexOf(`2`, `100000000200000`)
  )
  expect(indexOf(`2`, `100000000200000`.split(``))).toEqual(
    R.indexOf(`2`, `100000000200000`.split(``))
  )
})
test(`lastIndexOf`, () => {
  expect(lastIndexOf(`0`, `100000000200000`)).toEqual(
    R.lastIndexOf(`0`, `100000000200000`)
  )
  expect(lastIndexOf(`0`, `100000000200000`.split(``))).toEqual(
    R.lastIndexOf(`0`, `100000000200000`.split(``))
  )
})
test(`match`, () => {
  expect(match(/([a-z]a)/g, `bananas`)).toEqual(R.match(/([a-z]a)/g, `bananas`))
  expect(match(/a/, `b`)).toEqual(R.match(/a/, `b`))
  expect(() => match(/a/, null)).toThrow()
  expect(() => R.match(/a/, null)).toThrow()
})
test(`repeat`, () => {
  const output = [`na`, `na`, `na`, `na`, `na`]
  expect(repeat(`na`, 5)).toEqual(output)
  expect(repeat(`na`, 5)).toEqual(R.repeat(`na`, 5))
  expect(repeat({}, 5)).toEqual(R.repeat({}, 5))
})

test(`pipe`, () => {
  expect(
    pipe(
      add2,
      times10
    )(123)
  ).toEqual(1250)
  expect(
    R.pipe(
      add2,
      times10
    )(123)
  ).toEqual(1250)
})
test(`R.compose is R.pipe with reversed args`, () => {
  expect(
    R.pipe(
      add2,
      times10
    )(123)
  ).toEqual(
    R.compose(
      times10,
      add2
    )(123)
  )
})
test(`compose is pipe with reversed args`, () => {
  const piped = pipe(
    add2,
    times10
  )(123)
  const composed = compose(
    times10,
    add2
  )(123)
  expect(piped).toEqual(composed)
})
test(`compose`, () => {
  const over3 = x => x / 3
  const minus10 = x => x - 10
  expect(
    compose(
      minus10,
      over3
    )(123)
  ).toEqual(
    R.compose(
      minus10,
      over3
    )(123)
  )
})

test(`curry`, () => {
  const ternary = (a, b, c) => a + b / c
  const three = curry(ternary)
  const three2 = R.curry(ternary)
  expect(three(1, 2, 3)).toEqual(three2(1, 2, 3))
  expect([3, 4, 5].map(three(1, 2))).toEqual([3, 4, 5].map(three2(1, 2)))
})

test(`concat`, () => {
  const input = Math.random() * 1000 + ``
  expect(concat(input, `pants`)).toEqual(R.concat(input, `pants`))
  expect(concat(`pants`, input)).not.toEqual(R.concat(input, `pants`))
})

test(`join`, () => {
  expect(join(`x`, [1, 2, 3])).toEqual(R.join(`x`, [1, 2, 3]))
})

test(`sort`, () => {
  const input = [
    10,
    -10,
    9,
    -9,
    8,
    -8,
    7,
    -7,
    6,
    -6,
    5,
    -5,
    4,
    -4,
    3,
    -3,
    2,
    -2,
    1,
    -1
  ]
  const abs = (a, b) => a - b
  const sorted = sort(abs, input)
  expect(sorted).toEqual(R.sort(abs, input))
})

test(`symmetricDifference`, () => {
  const a = [1, 2, 3, 4, 5]
  const b = [3, 4, 5, 6, 7]
  expect(symmetricDifference(a, b)).toEqual(R.symmetricDifference(a, b))
  expect(symmetricDifference(b, a)).not.toEqual(R.symmetricDifference(a, b))
})
test(`difference`, () => {
  const a = [1, 2, 3, 4, 5]
  const b = [3, 4, 5, 6, 7]
  // current API is flipped order
  expect(difference(b, a)).not.toEqual(R.difference(a, b))
  expect(difference(a, b)).toEqual(R.difference(a, b))
})

test(`filter`, () => {
  const input = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const filterer = i => i % 2 === 0
  expect(filter(filterer, input)).toEqual(R.filter(filterer, input))
})

test(`flip`, () => {
  const over = (a, b) => a / b
  expect(flip(over)(10, 2)).toEqual(R.flip(over)(10, 2))
})

test(`map`, () => {
  const change = x => x * 2
  expect(map(change, { a: 2, b: 4 })).toEqual(R.map(change, { a: 2, b: 4 }))
})

// const trace = sideEffect(console.log, $, (e) => e.r || e.l || e, $)

test(`ap`, () => {
  const output = ap([multiply(3), add(6)], [1, 2, 3])
  expect(output).toEqual([3, 6, 9, 7, 8, 9])
  const output2 = ap(
    [x => x.toUpperCase(), x => x + ` battery`],
    `abc`.split(``)
  )
  expect(output2).toEqual(
    R.ap([x => x.toUpperCase(), x => x + ` battery`], `abc`.split(``))
  )
})

test(`chain`, () => {
  const duplicate = n => [n, n]
  expect(chain(duplicate, [1, 2, 3])).toEqual(R.chain(duplicate, [1, 2, 3]))
})

test(`replace`, () => {
  expect(replace(`foo`, `bar`, `foo foo foo`)).toEqual(
    R.replace(`foo`, `bar`, `foo foo foo`)
  )
  expect(replace(/foo/g, `bar`, `foo foo foo`)).toEqual(
    R.replace(/foo/g, `bar`, `foo foo foo`)
  )
})

test(`split`, () => {
  expect(split(``, `abcde`)).toEqual(R.split(``, `abcde`))
})

test(`range`, () => {
  expect(range(1, 5)).toEqual(R.range(1, 5))
  expect(range(50, 53)).toEqual(R.range(50, 53))
})

test(`keys`, () => {
  const input = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }
  expect(keys(input)).toEqual(R.keys(input))
})

test(`merge`, () => {
  const inputs = [{ a: 1 }, { b: 2 }, { c: 3, x: 100 }, { d: 4, x: 200 }]
  expect(merge(inputs[0], inputs[1])).toEqual(R.merge(inputs[0], inputs[1]))
  expect(merge(inputs[2], inputs[3])).toEqual(R.merge(inputs[2], inputs[3]))
})

test(`fromPairs`, () => {
  const inputs = [[`a`, 1], [`b`, 2], [`c`, 3], [`d`, 4], [`e`, 5]]
  expect(fromPairs(inputs)).toEqual(R.fromPairs(inputs))
})

test(`toPairs`, () => {
  const input = { a: 1, b: 2, c: 3, d: 4, e: 5 }
  expect(toPairs(input)).toEqual(R.toPairs(input))
})

test(`path`, () => {
  const input = { a: { b: { c: { d: aNumber() } } } }
  expect(path(`abcd`.split(``), input)).toEqual(R.path(`abcd`.split(``), input))
})
test(`pathEq`, () => {
  const d = aNumber()
  const input = { a: { b: { c: { d } } } }
  const pathTo = `abcd`.split(``)
  expect(pathEq(pathTo, d, input)).toEqual(R.pathEq(pathTo, d, input))
})

test(`pathOr`, () => {
  const input = { a: { b: { c: { d: aNumber() } } } }
  const pathTo = `abcd`.split(``)
  const pathTo2 = `efgh`.split(``)
  expect(pathOr(100, pathTo, input)).toEqual(R.pathOr(100, pathTo, input))
  expect(pathOr(100, pathTo2, input)).toEqual(R.pathOr(100, pathTo2, input))
})

test(`prop`, () => {
  const input = { a: aNumber() }
  expect(prop(`a`, input)).toEqual(R.prop(`a`, input))
})

test(`propOr`, () => {
  const input = { a: aNumber() }
  const propTo = `a`
  const propTo2 = `e`
  expect(propOr(100, propTo, input)).toEqual(R.propOr(100, propTo, input))
  expect(propOr(100, propTo2, input)).toEqual(R.propOr(100, propTo2, input))
})
test(`propEq`, () => {
  const d = aNumber()
  const input = { d }
  const propTo = `d`
  expect(propEq(propTo, d, input)).toEqual(R.propEq(propTo, d, input))
})

test(`propIs`, () => {
  expect(propIs(Number, `d`, { d: 100 })).toEqual(
    R.propIs(Number, `d`, { d: 100 })
  )
})

test(`isNil`, () => {
  const inputs = [null, undefined, false, true, 1, `nope`, ``]
  inputs.map(z => {
    expect(isNil(z)).toEqual(R.isNil(z))
  })
})

test(`length`, () => {
  const z = `091283019283`
  expect(length(z)).toEqual(R.length(z))
  const z2 = `091283019283`.split(``)
  expect(length(z2)).toEqual(R.length(z2))
})
