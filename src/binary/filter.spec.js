import exam from "$build/tester"
/* eslint-disable func-style */
exam("filter / reject", F => () => {
  const isEven = x => x % 2 === 0
  const input = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const inputO = { a: 0, b: 303, gross: "cool" }
  expect(F.filter(isEven, input)).toEqual([0, 2, 4, 6, 8])
  expect(F.filter(isEven, inputO)).toEqual({ a: 0 })
  expect(F.reject(isEven, input)).toEqual([1, 3, 5, 7, 9])
  expect(F.reject(isEven, inputO)).toEqual({ b: 303, gross: "cool" })
})
