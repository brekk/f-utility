import exam from "$build/tester"

exam("find", F => () => {
  expect(F.find(x => x % 2 === 0, [1, 3, 5, 7, 9, 10, 11, 13])).toEqual(10)
  expect(F.find(x => x % 2 === 0, [1, 3, 5, 7, 9, 11, 13])).toBeFalsy()
  expect(F.find(x => x % 2 === 0, { a: 1, b: 3, c: 4 })).toEqual(4)
})
