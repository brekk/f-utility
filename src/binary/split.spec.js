import exam from "$build/tester"
exam("split", F => () => {
  expect(F.split(".", "a.b.c.d.e.f.g.h")).toEqual("abcdefgh".split(""))
})
