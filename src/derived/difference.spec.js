import R from "ramda"
import F from "$build/production"

test("difference", () => {
  const one = "abcdefghi".split("")
  const two = "abcdefgijk".split("")
  expect(F.difference(one, two)).toEqual(R.difference(one, two))
})
