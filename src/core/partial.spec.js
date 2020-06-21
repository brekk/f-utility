import exam from "$build/tester"
/* eslint-disable func-style */
exam("partial", F => () => {
  const quaternary = (a, b, c, d) => (a + b) / (c + d)
  const threeOver = F.partial(quaternary, [1, 8])
  expect(threeOver(1, 2)).toEqual(3)
  expect(threeOver(3, 0)).toEqual(3)
})
