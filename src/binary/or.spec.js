import exam from "$build/tester"
exam("or", F => () => {
  expect(F.or(true, true)).toBeTruthy()
  expect(F.or(false, true)).toBeTruthy()
  expect(F.or(true, false)).toBeTruthy()
  expect(F.or(false, false)).toBeFalsy()
})
