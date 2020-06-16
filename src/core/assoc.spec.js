import exam from "$build/tester"

exam("assoc", F => () => {
  expect(F.assoc("key", "value", { cool: true })).toEqual({
    cool: true,
    key: "value"
  })
})
