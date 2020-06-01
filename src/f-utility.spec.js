import OLD from "f-utility"
import R from "ramda"
import { makeTypechecker } from "./type-system"
import { toString } from "./define"
import F from "./f-utility"

/* eslint-disable func-style */
test("methods", () => {
  const jumpsuitMethods = F.keys(F)
  expect(
    jumpsuitMethods.sort((a, b) => (a !== b ? (a > b ? 1 : -1) : 0))
  ).toMatchSnapshot()
  const THE_DIFF = R.difference(jumpsuitMethods, R.keys(R))
  const THE_OTHER_DIFF = R.difference(R.keys(R), jumpsuitMethods)
  /* console.log("what's the diff?", THE_DIFF) */
  /* console.log("what's the other diff?", JSON.stringify(THE_OTHER_DIFF, null, 2)) */
  expect(THE_DIFF).toMatchSnapshot()
  expect(THE_OTHER_DIFF).toMatchSnapshot()
  expect(R.symmetricDifference(jumpsuitMethods, R.keys(OLD))).toMatchSnapshot()
})
test("toPairs / fromPairs", () => {
  const input = { a: 1, b: 2, c: 3, d: 4 }
  const output = [["a", 1], ["b", 2], ["c", 3], ["d", 4]]
  expect(F.toPairs(input)).toEqual(output)
  expect(F.fromPairs(output)).toEqual(input)
})
test("toString", () => {
  function cobra(x, a, b) {
    return "venom-" + x + "-" + a + "::" + b
  }
  const out = toString(cobra, ["cool"])
  expect(out()).toEqual("curry(cobra)(cool)")
  expect(toString(cobra)()).toEqual("curry(cobra)")
  expect(toString(cobra, ["yeah", "so"])()).toEqual("curry(cobra)(yeah,so)")
  // eslint-disable-next-line
  expect(toString((a, b, c) => {}, ["fun", "yes"])()).toEqual(
    "curry(fn)(fun,yes)"
  )
})
test("sideEffect", done => {
  const x = Math.round(Math.random() * 1e3)
  const finalCall = F.sideEffect(given => {
    expect(given).toEqual(x)
    done()
  })
  finalCall(x)
})
test("sideEffect2", done => {
  const x = Math.round(Math.random() * 1e3)
  const finalCall = F.sideEffect2((tag, given) => {
    expect(given).toEqual(x)
    expect(tag).toEqual("whatever")
    done()
  })
  finalCall("whatever", x)
})
test("inspect", done => {
  const object = { id: "it's a living" }
  const look = z => z.id

  const tt = "freitag"
  const cb = (tag, inspected) => {
    expect(tag).toEqual(tt)
    expect(inspected).toEqual(object.id)
    done()
  }
  F.inspect(cb, look, tt, object)
})
test("freeze", () => {
  const frozen = F.freeze({ a: 1, b: 2, c: 3 })
  expect(() => {
    frozen.b = -1
  }).toThrow()
})
test("box", () => {
  expect(F.box("yes")).toEqual(["yes"])
})
test("pathOr and more", () => {
  const fixture = {
    a: { alpha: { anemone: { aardvark: 1000 } } },
    b: { beta: { badger: { bat: 5010 } } }
  }
  expect(F.pathOr("???", ["a", "b", "c"], fixture)).toEqual("???")
  expect(
    F.pathOr("???", ["a", "alpha", "anemone", "aardvark"], fixture)
  ).toEqual(fixture.a.alpha.anemone.aardvark)
  expect(
    F.pathEq(["a", "alpha", "anemone", "aardvark"], 1000, fixture)
  ).toBeTruthy()
  expect(
    F.pathEq(["a", "alpha", "anemone", "aardvark"], "nope", fixture)
  ).toBeFalsy()
  expect(
    F.pathSatisfies(
      x => x === 1000,
      ["a", "alpha", "anemone", "aardvark"],
      fixture
    )
  ).toBeTruthy()
})
test("anyPass", () => {
  const matches = F.anyPass([x => x > 90, x => x < 70])
  expect(matches([71, 79, 81, 89])).toBeFalsy()
  expect(matches([60, 71, 79, 81, 89])).toBeTruthy()
  expect(matches([71, 79, 81, 89, 95])).toBeTruthy()
})
test("smooth", () => {
  expect(F.smooth([0, 10, false, true, "a", "", -1, null, undefined])).toEqual([
    10,
    true,
    "a",
    -1
  ])
})
test("identity", () => {
  const input = Math.round(Math.random() * 1e8)
  expect(F.identity(input)).toEqual(input)
})
test("constant", () => {
  const input = Math.round(Math.random() * 1e8)
  expect(F.constant(input)()).toEqual(input)
})
test("add", () => {
  expect(F.add(123, 456)).toEqual(123 + 456)
})
test("multiply", () => {
  expect(F.multiply(123, 456)).toEqual(123 * 456)
})
test("subtract", () => {
  expect(F.subtract(123, 456)).toEqual(456 - 123)
})

test("divide", () => {
  expect(F.divide(123, 456)).toEqual(456 / 123)
})
test("uniq", () => {
  expect(F.uniq("bananasplitfiresunday".split(""))).toEqual(
    "bansplitfreudy".split("")
  )
})
test("equals", () => {
  expect(F.equals(123, 123)).toBeTruthy()
  expect(F.equals(321, 123)).toBeFalsy()
})
test("or", () => {
  expect(F.or(true, true)).toBeTruthy()
  expect(F.or(false, true)).toBeTruthy()
  expect(F.or(true, false)).toBeTruthy()
  expect(F.or(false, false)).toBeFalsy()
})
test("either", () => {
  expect(F.either(() => true, () => false, "")).toBeTruthy()
  expect(F.either(() => false, () => true, "")).toBeTruthy()
  expect(F.either(() => true, () => true, "")).toBeTruthy()
  expect(F.either(() => false, () => false, "")).toBeFalsy()
})
test("and", () => {
  expect(F.and(true, true)).toBeTruthy()
  expect(F.and(false, true)).toBeFalsy()
  expect(F.and(true, false)).toBeFalsy()
})
test("both", () => {
  expect(F.both(() => true, () => true)("")).toBeTruthy()
  expect(F.both(() => false, () => true)("")).toBeFalsy()
  expect(F.both(() => true, () => false)("")).toBeFalsy()
})
test("not", () => {
  expect(F.not(true)).toBeFalsy()
  expect(F.not(false)).toBeTruthy()
})
test("complement", () => {
  const isEven = x => x % 2 === 0
  const onlyOdd = F.filter(F.complement(isEven))
  expect(onlyOdd([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([1, 3, 5, 7, 9])
})
test("toUpper / toLower", () => {
  expect(F.toUpper("WhAtEverman")).toEqual("WHATEVERMAN")
  expect(F.toLower("WhAtEverman")).toEqual("whateverman")
})
test("curryN", () => {
  const triple = (a, b, c) => a + b / c
  const c3 = F.curryN(3, triple)
  const ccc = c3(12, 34, 56)
  expect(ccc).toEqual(12 + 34 / 56)
  expect(c3(12)(34)(56)).toEqual(ccc)
  expect(c3(12, 34)(56)).toEqual(ccc)
  expect(c3(12)(34, 56)).toEqual(ccc)
  const c4 = F.curryN(3, (a, b) => a + b / 1)
  expect(c4(12 + 34 / 56, 0)(undefined)).toEqual(ccc)
})
test("range", () => {
  expect(F.range(0, 10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  expect(F.range(10, 0)).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
  expect(F.range(0, -10)).toEqual([0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10])
  expect(F.range(-5, 5)).toEqual([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5])
})
test("curry", () => {
  const triple = (a, b, c) => a + b / c
  const c3 = F.curry(triple)
  const ccc = c3(12, 34, 56)
  expect(ccc).toEqual(12 + 34 / 56)
  expect(c3(12)(34)(56)).toEqual(ccc)
  expect(c3(12, 34)(56)).toEqual(ccc)
  expect(c3(12)(34, 56)).toEqual(ccc)
})
test("curry - placeholder", () => {
  const triple = (a, b, c) => a + b / c
  const c3 = F.curry(triple)
  const place = c3(12, F.$, 56)
  expect(place(100)).toEqual(12 + 100 / 56)
})
test("pipe", () => {
  const a = x => x / 10
  const b = y => y + 24
  const c = z => z - 101
  const comp = F.pipe(
    a,
    b,
    c
  )
  expect(comp(100)).toEqual(-67)
})
test("keys", () => {
  expect(F.keys({ a: 1, b: 2, c: 3 })).toEqual("abc".split(""))
})
test("concat", () => {
  expect(F.concat(["a"], "b")).toEqual("ab".split(""))
})
test("map", () => {
  expect(F.map(x => x * x, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([
    0,
    1,
    4,
    9,
    16,
    25,
    36,
    49,
    64,
    81
  ])
})
test("map - unary", () => {
  const fiveToOne = "54321".split("")
  expect(F.map(parseInt, fiveToOne)).toEqual([5, 4, 3, 2, 1])
  expect(fiveToOne.map(parseInt)).not.toEqual([5, 4, 3, 2, 1])
})
test("map - object", () => {
  const input = { a: 1, b: 2, c: 3, d: 4, e: 5 }
  const multiplyEven = x => (x % 2 === 0 ? x * 2 : x)
  const evener = F.map(multiplyEven)
  expect(evener(input)).toEqual({ a: 1, b: 4, c: 3, d: 8, e: 5 })
})

test("filter / reject", () => {
  const isEven = x => x % 2 === 0
  const input = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  expect(F.filter(isEven, input)).toEqual([0, 2, 4, 6, 8])
  expect(F.reject(isEven, input)).toEqual([1, 3, 5, 7, 9])
})
test("reduce", () => {
  expect(
    F.reduce((agg, x) => agg + x, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  ).toEqual(1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9)
})
test("any", () => {
  const even = x => x % 2 === 0
  const eves = F.any(even)([1, 2, 3])
  expect(eves).toBeTruthy()
  expect(F.any(even)([1, 3])).toBeFalsy()
})
test("flip", () => {
  const input = { a: 123, b: 789 }
  const expected = 123 / 789
  const expectedAfterFlip = 789 / 123
  expect(F.divide(input.b, input.a)).toEqual(expected)
  expect(F.flip(F.divide)(input.b, input.a)).toEqual(expectedAfterFlip)
})

test("def", () => {
  const abc = (a, b, c) => a + b / c
  const triple = F.def({
    check: true,
    hm: ["number", "number", "number", "number"]
  })(abc)
  expect(triple(1, 2, 3)).toEqual(1 + 2 / 3)
  expect(triple(1)(2)(3)).toEqual(1 + 2 / 3)
  expect(triple(1, 2)(3)).toEqual(1 + 2 / 3)
  expect(triple(1)(2, 3)).toEqual(1 + 2 / 3)
})
test("def - errors", () => {
  const abcz = (a, b, c, d) => a(b, c, d)
  const triplez = F.def({
    check: true,
    hm: ["function", "number", "any", "string", "boolean"]
  })(abcz)
  expect(() => triplez(() => false, 1, "next param fails", 100)).toThrow()
  expect(() => F.def({ check: true, ts: false })).toThrow(
    "Expected typeSystem to be a function."
  )
  expect(() => F.def({ ts: () => {}, check: true })).toThrow(
    "Expected hm to be an array of strings."
  )
})
test("def - return type", () => {
  const abcString = (a, b, c) => "" + (a + b) / c
  const tripleS = F.def({
    check: true,
    hm: ["number", "number", "number", "number"]
  })(abcString)
  expect(() => tripleS(1, 2, 3)).toThrow(
    "Expected abcString to return Number∋number but got String∋string."
  )
  const tripleSCorrect = F.def({
    check: true,
    hm: ["number", "number", "number", "string"]
  })(abcString)
  expect(tripleSCorrect(1, 2, 3)).toEqual("1")
})
test("def - union type", () => {
  const defIsCool = F.def({
    check: true,
    hm: ["Number", "any", "number|string", "RegExp", "any"]
  })(function defIsSoSoDef(aa, bb, cc, dd, ee) {
    return "so def"
  })
  expect(() => defIsCool(1, { cool: true }, false, /regex/, "yes")).toThrow(
    "Given defIsSoSoDef( Number∋number, Object∋object, Boolean∋boolean, RegExp∋object ) but expected defIsSoSoDef( Number, any, Number∋number,String∋string, RegExp )"
  )
})
test("slice", () => {
  expect(F.slice(1, Infinity, "abcde".split(""))).toEqual("bcde".split(""))
})

test("makeTypechecker", () => {
  expect(() => makeTypechecker(z => typeof z, x => x)(1, 1)).toThrow(
    "makeTypechecker needs two valid lists of types to run"
  )
  const copy = {}
  const saver = ([a, b]) => {
    copy[a.concat(b).join("-")] = [a, b]
    return a.concat(b).join("-")
  }
  expect(
    makeTypechecker(z => typeof z, saver)(["boolean", "boolean"], [true, false])
  ).toEqual({
    failures: false,
    given: [true, false],
    invalid: [],
    params: ["boolean"],
    returnType: "boolean",
    rawParams: [
      {
        actual: "boolean",
        expected: "boolean",
        idx: 0,
        raw: { value: true },
        success: true
      }
    ],
    signature: "boolean -> boolean",
    valid: [
      {
        actual: "boolean",
        expected: "boolean",
        idx: 0,
        raw: { value: true },
        success: true
      }
    ]
  })
  expect(copy).toEqual({
    "boolean-boolean-true-false": [["boolean", "boolean"], [true, false]]
  })
})

test("memoizeWith", () => {
  const lockbox = {}
  const triple = (a, b, c) => {
    const value = (a + b) / c
    lockbox[[a, b, c].join("-")] = value
    return value
  }
  const mTriple = F.memoizeWith(([o, t, h]) => `${o}-${t}-${h}`)(triple)
  expect(mTriple(1, 2, 3)).toEqual((1 + 2) / 3)
  expect(mTriple(2, 3, 4)).toEqual((2 + 3) / 4)
  expect(mTriple(1, 2, 3)).toEqual((1 + 2) / 3)
  expect(lockbox).toEqual({ "1-2-3": 1, "2-3-4": 5 / 4 })
})

test("nth", () => {
  const THE_LIST = "abcdef".split("")
  expect(F.nth(1, THE_LIST)).toEqual("b")
  expect(F.nth(-1, THE_LIST)).toEqual("f")
  expect(F.nth(-2, THE_LIST)).toEqual("e")
  expect(F.nth(2, THE_LIST)).toEqual("c")
  expect(F.nth(100, THE_LIST)).toBeFalsy()
})

test("ap", () => {
  const aa = [F.toUpper, F.toLower, z => F.toUpper(z[0]) + z.substr(1)]
  const bb = ["cool", "shit"]
  expect(F.ap(aa, bb)).toEqual(["COOL", "SHIT", "cool", "shit", "Cool", "Shit"])
})

test("addIndex", () => {
  const imap = F.addIndex(F.map)
  const imap2 = R.addIndex(R.map)
  expect(imap2((a, b) => b, "abcdef".split(""))).toEqual([0, 1, 2, 3, 4, 5])
  expect(imap((a, b) => b, "abcdef".split(""))).toEqual([0, 1, 2, 3, 4, 5])
})

test("cond", () => {
  const celsius = F.cond([
    [z => z === 0, () => "freeze"],
    [z => z === 100, () => "boil"],
    [F.T, () => "nothing"]
  ])
  expect(celsius(100)).toEqual("boil")
  expect(celsius(0)).toEqual("freeze")
  expect(celsius(1 + Math.random() * 98)).toEqual("nothing")
})

test("T / F", () => {
  expect(F.T()).toBeTruthy()
  expect(F.F()).toBeTruthy()
})

/* eslint-enable func-style */