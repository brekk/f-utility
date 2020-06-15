import exam from "$build/tester"
/* eslint-disable func-style */
exam("map", F => () => {
  expect(F.map(x => x * x, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([
    0,
    1,
    4,
    9,
    16,
    25,
    36,
    49,
    64,
    81
  ])
})
exam("map - unary", F => () => {
  const fiveToOne = "54321".split("")
  expect(F.map(parseInt, fiveToOne)).toEqual([5, 4, 3, 2, 1])
  expect(fiveToOne.map(parseInt)).not.toEqual([5, 4, 3, 2, 1])
})
exam("map - object", F => () => {
  const input = { a: 1, b: 2, c: 3, d: 4, e: 5 }
  const multiplyEven = x => (x % 2 === 0 ? x * 2 : x)
  const evener = F.map(multiplyEven)
  expect(evener(input)).toEqual({ a: 1, b: 4, c: 3, d: 8, e: 5 })
})
