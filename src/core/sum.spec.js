import exam from "$build/tester"
/* eslint-disable func-style */
exam("sum", F => () => {
  expect(F.sum(F.range(0, 10))).toEqual(55)
})
