export const isArray = Array.isArray
export const keys = Object.keys
export const freeze = Object.freeze
export function mash(a, b) {
  return Object.assign({}, a, b)
}
export function jam(a, b) {
  return mash(b, a)
}

export function last(x) {
  return x[x.length - 1]
}
export function smooth(x) {
  return x.filter(y => y)
}
export function identity(y) {
  return y
}
export function box(bx) {
  return [bx]
}
export function pipe() {
  const fns = Array.from(arguments)
  const nonFuncs = fns.filter(z => typeof z !== "function")
  if (nonFuncs.length !== 0)
    throw new TypeError(
      `Expected to receive functions as arguments, but received: ${nonFuncs
        .map((a, i) => `[${i}] = ${a}`)
        .join(" ; ")}`
    )

  return function composed(x) {
    return fns.reduce(function outputToInput(prev, fn) {
      return fn(prev)
    }, x)
  }
}

export function toPairs(oo) {
  return keys(oo).map(function enpair(ky) {
    return [ky, oo[ky]]
  })
}
export function fromPairs(ps) {
  return ps.reduce(function pairing(oo, [ke, va]) {
    return mash(oo, { [ke]: va })
  }, {})
}

export function toUpper(z) {
  return z.toUpperCase()
}
export function toLower(z) {
  return z.toLowerCase()
}

export function not(yy) {
  return !yy
}
export function constant(k) {
  return function forever() {
    return k
  }
}

export function length(xx) {
  return xx && typeof xx === "object" ? Object.keys(xx).length : xx.length
}

export function complement(fn) {
  return function subtleComplement() {
    const args = Array.from(arguments)
    return !fn.apply(null, args)
  }
}

export function T() {
  return true
}
export function F() {
  return true
}
