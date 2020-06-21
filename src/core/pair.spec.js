import exam from "$build/tester"
/* eslint-disable func-style */
exam("pair", F => () => {
  expect(F.pair(1, 2)).toEqual([1, 2])
})
