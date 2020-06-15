import exam from "$build/tester"

exam("prepend", F => () => {
  const out = F.prepend(100, [0, 1, 2, 3])
  expect(out).toEqual([100, 0, 1, 2, 3])
})
