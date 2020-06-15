import R from "ramda"
import exam from "$build/tester"
exam("addIndex", F => () => {
  const imap = F.addIndex(F.map)
  const imap2 = R.addIndex(R.map)
  expect(imap2((a, b) => b, "abcdef".split(""))).toEqual([0, 1, 2, 3, 4, 5])
  expect(imap((a, b) => b, "abcdef".split(""))).toEqual([0, 1, 2, 3, 4, 5])
})
