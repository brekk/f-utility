import R from "ramda"
import exam from "$build/tester"

exam("union", F => () => {
  const one = "abcde".split("")
  const two = "abcdefgijk".split("")
  expect(F.union(one, two)).toEqual(R.union(one, two))
})
