import F from "../f-utility"

test("bind", () => {
  function hello() {
    return `Hi, my name is ${(this && this.name) || "default"}`
  }
  const O = {
    name: "Brekk"
  }
  expect(hello()).toEqual("Hi, my name is default")
  const bound = F.bind(hello, O)
  expect(bound()).toEqual("Hi, my name is Brekk")
  function goodbye(adjective, noun) {
    return `Bye you ${adjective} ${noun}! ${this.thanks} for all the fish!`
  }
  const B = { thanks: "I'll kill you" }
  expect(F.bind(goodbye, B)("disgusting", "cardboard")).toEqual(
    "Bye you disgusting cardboard! I'll kill you for all the fish!"
  )
  expect(F.bind(goodbye, { thanks: "Thanks" })("cool")("human")).toEqual(
    "Bye you cool human! Thanks for all the fish!"
  )
})
