import exam from "$build/tester"
/* eslint-disable func-style */
exam("negate", F => () => {
  expect(F.negate(100)).toEqual(-100)
  expect(F.negate(-100)).toEqual(100)
})
