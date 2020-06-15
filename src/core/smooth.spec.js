import exam from "$build/tester"
exam("smooth", F => () => {
  expect(F.smooth([0, 10, false, true, "a", "", -1, null, undefined])).toEqual([
    10,
    true,
    "a",
    -1
  ])
})
