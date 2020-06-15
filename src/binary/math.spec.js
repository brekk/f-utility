import exam from "$build/tester"
exam("add", F => () => {
  expect(F.add(123, 456)).toEqual(123 + 456)
})
exam("multiply", F => () => {
  expect(F.multiply(123, 456)).toEqual(123 * 456)
})
exam("subtract", F => () => {
  expect(F.subtract(123, 456)).toEqual(456 - 123)
})
exam("divide", F => () => {
  expect(F.divide(123, 456)).toEqual(456 / 123)
})
