import R from "ramda"
import F from "../build/f-utility"

test("difference", () => {
  const one = "abcdefghi".split("")
  const two = "abcdefgijk".split("")
  expect(F.difference(one, two)).toEqual(R.difference(one, two))
})
