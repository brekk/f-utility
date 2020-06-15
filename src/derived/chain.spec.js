import exam from "$build/tester"
/* eslint-disable func-style */
exam("chain", F => () => {
  const fn = x => [x, x * 2]
  const input = { a: 1, b: 2, c: 3 }
  expect(F.chain(fn, input)).toEqual([1, 2, 2, 4, 3, 6])
})
exam("chain - functions", F => () => {
  const binary = (a, b) => `${a} :: ${b}`
  const alterFirst = aa => aa.toUpperCase()
  expect(F.chain(binary, alterFirst)("cool")).toEqual("COOL :: cool")
})
exam("chain - delegate", F => () => {
  function Chained(val) {
    if (!(this instanceof Chained)) return new Chained(val)
    this.value = F.isArray(val) ? val : [val]
    this.chain = fun => F.map(fun, this.value).reduce(F.concat, [])
    return this
  }
  const fn = x => [x, x * 2]
  expect(F.chain(fn, Chained([1, 2, 3]))).toEqual([1, 2, 2, 4, 3, 6])
})

/* eslint-enable func-style */
