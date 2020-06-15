import exam from "$build/tester"

exam("min", F => () => {
  expect(F.min(Math.round(Math.random() * 1e6) + 2, 1)).toEqual(1)
})
