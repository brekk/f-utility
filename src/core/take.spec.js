import exam from "$build/tester"
/* eslint-disable func-style */
exam("take", F => () => {
  expect(F.take(5, F.range(0, 10))).toEqual(F.range(0, 4))
  function Taker(x) {
    this.list = x
    this.take = y => x.slice(0, y)
    return this
  }
  expect(F.take(5, new Taker(F.range(0, 10)))).toEqual(F.range(0, 4))
})
