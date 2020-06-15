import exam from "$build/tester"

exam("append", F => () => {
  const out = F.append(100, [0, 1, 2, 3])
  expect(out).toEqual([0, 1, 2, 3, 100])
})
