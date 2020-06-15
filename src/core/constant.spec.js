import exam from "$build/tester"
exam("constant", F => () => {
  const input = Math.round(Math.random() * 1e8)
  expect(F.constant(input)()).toEqual(input)
})
