import exam from "$build/tester"
/* eslint-disable func-style */
exam("def", F => () => {
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
exam("def - errors", F => () => {
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
exam("def - return type", F => () => {
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
exam("def - union type", F => () => {
  /* eslint-disable no-unused-vars */
  const defIsCool = F.def({
    check: true,
    hm: ["Number", "any", "number|string", "RegExp", "string"]
  })(function defIsSoSoDef(aa, bb, cc, dd) {
    return "so def"
  })
  /* eslint-enable no-unused-vars */
  /* eslint-disable max-len */
  expect(() => defIsCool(1, { cool: true }, false, /regex/, "yes")).toThrow(
    "Given defIsSoSoDef( Number∋number, Object∋object, Boolean∋boolean, RegExp∋object ) but expected defIsSoSoDef( Number∋object, any, Number∋number|String∋string, RegExp∋object )"
  )
  /* eslint-enable max-len */
})
/* eslint-enable func-style */
