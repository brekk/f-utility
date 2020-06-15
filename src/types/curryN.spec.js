import exam from "$build/tester"
exam("curryN", F => () => {
/* eslint-disable-next-line func-style */
  const triple = (a, b, c) => a + b / c
  const c3 = F.curryN(3, triple)
  const ccc = c3(12, 34, 56)
  expect(ccc).toEqual(12 + 34 / 56)
  expect(c3(12)(34)(56)).toEqual(ccc)
  expect(c3(12, 34)(56)).toEqual(ccc)
  expect(c3(12)(34, 56)).toEqual(ccc)
  const c4 = F.curryN(3, (a, b) => a + b / 1)
  expect(c4(12 + 34 / 56, 0)(undefined)).toEqual(ccc)
})
