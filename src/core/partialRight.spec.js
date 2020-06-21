import exam from "$build/tester"
/* eslint-disable func-style */
exam("partialRight", F => () => {
  const quaternary = (a, b, c, d) => (a + b) / (c + d)
  const threeOver = F.partialRight(quaternary, [1, 8])
  expect(threeOver(1, 2)).toEqual(1 / 3)
  expect(threeOver(3, 0)).toEqual(1 / 3)
})
