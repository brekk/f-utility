import exam from "$build/tester"
exam("identity", F => () => {
  const input = Math.round(Math.random() * 1e8)
  expect(F.identity(input)).toEqual(input)
})
