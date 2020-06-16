import exam from "$build/tester"

exam("assoc", F => () => {
  expect(F.dissoc("cool", { cool: true, annoying: "yes" })).toEqual({
    annoying: "yes"
  })
})
