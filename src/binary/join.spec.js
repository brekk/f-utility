import exam from "$build/tester"
exam("join", F => () => {
  expect(F.join(".", "abcdefgh".split(""))).toEqual("a.b.c.d.e.f.g.h")
})
