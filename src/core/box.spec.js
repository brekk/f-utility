import exam from "$build/tester"
exam("box", F => () => {
  expect(F.box("yes")).toEqual(["yes"])
})
