import exam from "$build/tester"

exam("findIndex", F => () => {
  const output = F.findIndex(x => x % 2 === 0, [1, 3, 5, 7, 9, 10, 11, 13])
  expect(output).toEqual(5)
  const output2 = F.findIndex(x => x % 2 === 0, [1, 3, 5, 7, 9, 11, 13])
  expect(output2).toEqual(-1)
})
