import { toString } from "./define"

test("toString", () => {
  function cobra(x, a, b) {
    return "venom-" + x + "-" + a + "::" + b
  }
  const out = toString(cobra, ["cool"])
  expect(out()).toEqual("curry(cobra)(cool)")
  expect(toString(cobra)()).toEqual("curry(cobra)")
  expect(toString(cobra, ["yeah", "so"])()).toEqual("curry(cobra)(yeah,so)")
  // eslint-disable-next-line
  expect(toString((a, b, c) => {}, ["fun", "yes"])()).toEqual(
    "curry(fn)(fun,yes)"
  )
})
