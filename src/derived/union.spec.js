import R from "ramda"
import F from "$build/production"

test("union", () => {
  const one = "abcde".split("")
  const two = "abcdefgijk".split("")
  expect(F.union(one, two)).toEqual(R.union(one, two))
})
