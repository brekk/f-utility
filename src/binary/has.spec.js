import exam from "$build/tester"

exam("has", F => () => {
  expect(F.has("cool", { cool: true })).toBeTruthy()
  expect(F.has("not cool", { dope: true })).toBeFalsy()
})
