import exam from "$build/tester"

exam("none", F => () => {
  const noneEven = F.none(x => x % 2 !== 0)
  expect(noneEven({ a: 101 })).toBeTruthy()
  expect(noneEven({ a: 98, b: 100, c: 101 })).toBeFalsy()
  expect(noneEven([2, 4, 6, 8, 10, 12, 14])).toBeFalsy()
  expect(noneEven([2, 4, 6, 8, 10, 12, 14, 101])).toBeFalsy()
})
