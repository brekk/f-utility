import F from "$build/production"
/* eslint-disable func-style */
test("chain", () => {
  // chain maps a function over a list and concatenates the results. chain is also known as flatMap in some libraries.
  const fn = x => [x, x * 2]
  const input = { a: 1, b: 2, c: 3 }
  expect(F.chain(fn, input)).toEqual([1, 2, 2, 4, 3, 6])
  /* Dispatches to the chain method of the second argument, if present, according to the FantasyLand Chain spec. */
  /* If second argument is a function, chain(f, g)(x) is equivalent to f(g(x), x). */
  /* Acts as a transducer if a transformer is given in list position. */
})
test("chain - functions", () => {
  const binary = (a, b) => `${a} :: ${b}`
  const alterFirst = aa => aa.toUpperCase()
  expect(F.chain(binary, alterFirst)("cool")).toEqual("COOL :: cool")
})
test("chain - delegate", () => {
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
