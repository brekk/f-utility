import exam from "$build/tester"
exam("either", F => () => {
  expect(
    F.either(
      () => true,
      () => false,
      ""
    )
  ).toBeTruthy()
  expect(
    F.either(
      () => false,
      () => true,
      ""
    )
  ).toBeTruthy()
  expect(
    F.either(
      () => true,
      () => true,
      ""
    )
  ).toBeTruthy()
  expect(
    F.either(
      () => false,
      () => false,
      ""
    )
  ).toBeFalsy()
})
exam("and", F => () => {
  expect(F.and(true, true)).toBeTruthy()
  expect(F.and(false, true)).toBeFalsy()
  expect(F.and(true, false)).toBeFalsy()
})
