import F from "$build/production"

/* eslint-disable func-style */
test("call", () => {
  const ternary = (x, y, z) => (x + y) / z
  expect(F.call([ternary, 1, 2, 3])).toEqual(1)
  expect(F.call([ternary, 4, 2, 3])).toEqual(2)
})
/* eslint-enable func-style */
