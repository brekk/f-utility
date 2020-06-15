import exam from "$build/tester"

exam("inc", F => () => {
  expect(F.inc(100)).toEqual(101)
})
