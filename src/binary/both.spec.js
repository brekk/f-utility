import exam from "$build/tester"
exam("both", F => () => {
  expect(
    F.both(
      () => true,
      () => true
    )("")
  ).toBeTruthy()
  expect(
    F.both(
      () => false,
      () => true
    )("")
  ).toBeFalsy()
  expect(
    F.both(
      () => true,
      () => false
    )("")
  ).toBeFalsy()
})
