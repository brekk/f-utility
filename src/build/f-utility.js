import custom from "./core-with-types"
import BUILD from "./config"

const FUTILITY = custom(BUILD.AUTO)
export default FUTILITY.temper(FUTILITY, {
  custom,
  version: "4.0.0",
  configuration: BUILD.AUTO
})
