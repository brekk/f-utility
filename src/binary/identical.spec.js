import exam from "$build/tester"

exam("identical", F => () => {
  const x = {}
  expect(F.identical(x, x)).toBeTruthy()
  expect(F.identical(x, 2)).toBeFalsy()

  expect(F.identical(x, {})).toBeFalsy()
})
