import exam from "$build/tester"

exam("match", F => () => {
  expect(F.match(/!$/, "YEAH!")).toBeTruthy()
  expect(F.match(/!$/, "nah.")).toEqual(null)
})
