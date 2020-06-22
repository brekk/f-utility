import exam from "$build/tester"
/* eslint-disable no-unused-vars */
/* eslint-disable func-style */
exam("KITCHEN SINK", F => () => {
  let funks = {}
  const getFuncs = () => funks

  const onlyFunctions = F.filter(F.is(Function))
  const generateFuncs = F.pipe(
    onlyFunctions,
    F.map(fn => {
      const name = fn.toString(true)
      const wrapped = F.curryN(fn.length, function proxied() {
        delete funks[name]
        return fn.apply(null, Array.prototype.slice.call(arguments))
      })
      return wrapped
    }),
    F.once(F.sideEffect(x => (funks = x)))
  )
  const G = generateFuncs(F)

  const {
    pipe,
    negate,
    subtract,
    divide,
    add,
    multiply,
    of,
    prepend,
    append,
    split,
    map,
    toUpper,
    trim,
    smooth,
    join,
    replace,
    addIndex,
    invert,
    keys,
    omit,
    sum
  } = G
  const logTotes = F.sideEffect(() => {
    // console.log("yo!", F.union(F.keys(onlyFunctions(F)), F.keys(funks)))
  })
  const imap = addIndex(map)
  const theKitchenSink = pipe(
    omit(["e"]),
    invert,
    keys,
    imap((x, i) => parseInt(x) * Math.pow(10, 4 - (i + 1))),
    sum,
    negate,
    subtract(5678),
    divide(4),
    add(400),
    multiply(392 / -711),
    of,
    pipe(
      replace(/~/g, " "),
      split(" "),
      map(pipe(toUpper, trim)),
      smooth,
      join(""),
      prepend
    )("~~~~~~~~~~~k~~~~~~~F~~~b~R~~~"),
    append("!"),
    logTotes
  )
  expect(theKitchenSink({ a: -1, b: -2, c: -3, d: -4, e: -5 })).toEqual([
    "KFBR",
    392,
    "!"
  ])
})
