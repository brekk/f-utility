import R from "ramda"
import exam from "$build/tester"

exam("difference", F => () => {
  const one = "abcdefghi".split("")
  const two = "abcdefgijk".split("")
  expect(F.difference(one, two)).toEqual(R.difference(one, two))
})
