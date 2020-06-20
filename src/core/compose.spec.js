import exam from "$build/tester"
/* eslint-disable func-style */
exam("pipe", F => () => {
  const a = x => x / 10
  const b = y => y + 24
  const c = z => z - 101
  const comp = F.compose(c, b, a)
  expect(comp(100)).toEqual(-67)
  expect(() => F.compose(false)).toThrow()
})
