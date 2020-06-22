import exam from "$build/tester"

/* eslint-disable func-style */
exam("call", F => () => {
  const ternary = (x, y, z) => (x + y) / z
  expect(F.call([ternary, 1, 2, 3])).toEqual(1)
  expect(F.call([ternary, 4, 2, 3])).toEqual(2)
})

exam("freeze", F => () => {
  const frozen = F.freeze({ a: 1, b: 2, c: 3 })
  expect(() => {
    frozen.b = -1
  }).toThrow()
})
exam("trim", F => () => {
  expect(F.trim("                      dope          ")).toEqual("dope")
})
