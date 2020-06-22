import exam from "$build/tester"
/* eslint-disable func-style */
exam("product", F => () => {
  expect(F.product(F.range(1, 10))).toEqual(3628800)
})
