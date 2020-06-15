import exam from "$build/tester"
exam("equals", F => () => {
  expect(F.equals(123, 123)).toBeTruthy()
  expect(F.equals(321, 123)).toBeFalsy()
})
