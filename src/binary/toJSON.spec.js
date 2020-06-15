import exam from "$build/tester"
exam("toJSON", F => () => {
  const input = { whatever: { cool: "yes" } }
  expect(F.toJSON(4)(input)).toEqual(JSON.stringify(input, null, 4))
})
