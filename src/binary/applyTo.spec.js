import exam from "$build/tester"

exam("applyTo", F => () => {
  const fourtytwo = F.applyTo(42)
  expect(fourtytwo(F.identity)).toEqual(42)
})
