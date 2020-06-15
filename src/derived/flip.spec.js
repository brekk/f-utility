import exam from "$build/tester"

exam("flip", F => () => {
  const input = { a: 123, b: 789 }
  const expected = 123 / 789
  const expectedAfterFlip = 789 / 123
  expect(F.divide(input.b, input.a)).toEqual(expected)
  expect(F.flip(F.divide)(input.b, input.a)).toEqual(expectedAfterFlip)
})
