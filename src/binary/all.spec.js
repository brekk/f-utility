import F from "../f-utility"

test("all", () => {
  const allEven = F.all(x => x % 2 === 0)
  expect(allEven({ b: 2, d: 4, f: 6, h: 8, i: 10 })).toBeTruthy()
  expect(allEven({ a: 101 })).toBeFalsy()
  expect(allEven({ a: 98, b: 100, c: 101 })).toBeFalsy()
  expect(allEven([2, 4, 6, 8, 10, 12, 14])).toBeTruthy()
  expect(allEven([2, 4, 6, 8, 10, 12, 14, 101])).toBeFalsy()
})
