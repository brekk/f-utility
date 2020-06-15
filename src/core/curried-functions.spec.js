import exam from "$build/tester"

exam("all f-utility functions of arity > 1 are curried!", F => () => {
  F.pipe(
    F.filter(F.is(Function)),
    F.map(
      F.when(F.pipe(F.length, F.gt(1)), fn => {
        expect(fn.name).toEqual("curried")
        expect(fn.toString()).toMatch(/curry/)
      })
    )
  )(F)
})
