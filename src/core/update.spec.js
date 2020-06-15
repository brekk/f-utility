import exam from "$build/tester"

exam("update", F => () => {
  const out = F.update(-1, -100, [0, 1, 2, 3, 5])
  const out2 = F.update(3, -100, [0, 1, 2, 3, 5])
  expect(out).toEqual([0, 1, 2, 3, -100])
  expect(out2).toEqual([0, 1, 2, -100, 5])
})
