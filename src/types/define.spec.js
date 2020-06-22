import { toString } from "./define"
import exam from "$build/tester"
/* eslint-disable func-style */

test("toString", () => {
  const out = toString("cobra", ["cool"])
  expect(out()).toEqual("curry(cobra)(cool)")
  expect(toString("cobra")()).toEqual("curry(cobra)")
  expect(toString("cobra", ["yeah", "so"])()).toEqual("curry(cobra)(yeah,so)")
  // eslint-disable-next-line
  expect(toString("toString", ["fun", "yes"])()).toEqual(
    "curry(toString)(fun,yes)"
  )
})
exam("curry", F => () => {
  const triple = (a, b, c) => a + b / c
  const c3 = F.curry(triple)
  const ccc = c3(12, 34, 56)
  expect(ccc).toEqual(12 + 34 / 56)
  expect(c3(12)(34)(56)).toEqual(ccc)
  expect(c3(12, 34)(56)).toEqual(ccc)
  expect(c3(12)(34, 56)).toEqual(ccc)
})
exam("curry - placeholder", F => () => {
  const triple = (a, b, c) => a + b / c
  const c3 = F.curry(triple)
  const place = c3(12, F.$, 56)
  expect(place(100)).toEqual(12 + 100 / 56)
})
/* eslint-enable func-style */
