import config from "./config"

test("config", () => {
  expect(config).toMatchSnapshot()
  expect(config.UNCHECKED.ts()).toEqual("any")
})
