import exam from "$build/tester"
/* eslint-disable func-style */
exam("takeLast", F => () => {
  expect(F.takeLast(5, F.range(0, 10))).toEqual(F.range(6, 10))
  function TakeLaster(x) {
    this.list = x
    this.takeLast = y => x.slice(0, y)
    return this
  }
  expect(F.takeLast(5, new TakeLaster(F.range(0, 10)))).toEqual(F.range(0, 4))
})
