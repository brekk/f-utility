import exam from "$build/tester"
/* eslint-disable func-style */
exam("omit", F => () => {
  expect(F.omit(["a", "b", "c"], { a: 1, b: 2, c: 3, d: 4 })).toEqual({ d: 4 })
})
