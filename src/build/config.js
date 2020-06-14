import { system as ts } from "$types/system"
export const CONFIG = Object.freeze({
  UNCHECKED: {
    name: "@@FUTILITY::config.unchecked",
    ts: () => "any",
    check: false
  },
  CHECKED: {
    name: "@@FUTILITY::config.checked",
    ts,
    check: true
  },
  AUTO: {
    name: "@@FUTILITY::config.auto",
    ts,
    check:
      /* istanbul ignore next */
      (typeof process !== "undefined" &&
        typeof process.env !== "undefined" &&
        typeof process.env.NODE_ENV !== "undefined" &&
        process.env.NODE_ENV !== "production") ||
      /* istanbul ignore next */
      (typeof window !== "undefined" &&
        typeof window.__FUTILITY_TYPE_CHECK === "boolean" &&
        window.__FUTILITY_TYPE_CHECK)
  }
})

export default CONFIG
