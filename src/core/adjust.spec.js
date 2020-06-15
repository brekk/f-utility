import exam from "$build/tester"

exam("adjust", F => () => {
  const out = F.adjust(-1, F.multiply(2), [0, 1, 2, 3, 5])
  const out2 = F.adjust(3, F.multiply(-2), [0, 1, 2, 3, 5])
  expect(out).toEqual([0, 1, 2, 3, 10])
  expect(out2).toEqual([0, 1, 2, -6, 5])
})
