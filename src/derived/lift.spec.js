import exam from "$build/tester"
/* eslint-disable func-style */
exam("lift", F => () => {
  const madd3 = F.lift((a, b, c) => a + b + c)
  expect(madd3([1, 2, 3], [1, 2, 3], [1])).toEqual([3, 4, 5, 4, 5, 6, 5, 6, 7])
})
