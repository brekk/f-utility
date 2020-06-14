import custom from "./core"
import BUILD from "./config"

const FUTILITY = custom(BUILD.UNCHECKED)
export default FUTILITY.temper(FUTILITY, {
  version: "4.0.0",
  configuration: BUILD.UNCHECKED
})
