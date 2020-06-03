import makeIterable from "./iterable"

test("makeIterable - error", () => {
  const throwable =
    "Expected iterable initial value to be either an array or an object."
  expect(() => makeIterable(null)).toThrow(throwable)
  expect(() => makeIterable(undefined)).toThrow(throwable)
})
test("makeIterable", () => {
  const iter = makeIterable({ one: 1, two: 2, three: 3 })
  expect(iter.length).toEqual(3)
  expect(iter.iterate(0)).toEqual({ key: "one", value: 1 })
  expect(iter.init).toEqual({})
  expect(iter.isArray).toBeFalsy()
})
test("makeIterable - array", () => {
  const iter2 = makeIterable("abcd".split(""))
  expect(iter2.length).toEqual(4)
  expect(iter2.iterate(0)).toEqual({ key: 0, value: "a" })
  expect(iter2.init).toEqual(Array(4))
  expect(iter2.isArray).toBeTruthy()
})
