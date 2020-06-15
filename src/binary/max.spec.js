import exam from "$build/tester"

exam("max", F => () => {
  expect(F.max(Math.round(Math.random() * -1 * 1e6) + 2, 1)).toEqual(1)
})
