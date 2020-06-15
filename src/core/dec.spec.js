import exam from "$build/tester"

exam("dec", F => () => {
  expect(F.dec(100)).toEqual(99)
})
