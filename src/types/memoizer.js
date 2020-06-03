import symbolToString from "./symbolToString"

export function defaultMemoizer(raw) {
  let [x, y] = raw
  return x
    .concat(y)
    .map(z => (typeof z === "symbol" ? symbolToString(z) : z))
    .join("-")
}

export default defaultMemoizer
