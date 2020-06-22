export function arity(given, fn) {
  const LOOKUP = {
    0: function nullary() {
      return fn.apply(this, arguments)
    },
    /* eslint-disable no-unused-vars */
    1: function unary(a) {
      return fn.apply(this, arguments)
    },
    2: function binary(a, b) {
      return fn.apply(this, arguments)
    },
    3: function ternary(a, b, c) {
      return fn.apply(this, arguments)
    },
    4: function quaternary(a, b, c, d) {
      return fn.apply(this, arguments)
    },
    5: function quinary(a, b, c, d, e) {
      return fn.apply(this, arguments)
    },
    6: function senary(a, b, c, d, e, f) {
      return fn.apply(this, arguments)
    },
    7: function septenary(a, b, c, d, e, f, g) {
      return fn.apply(this, arguments)
    },
    8: function octonary(a, b, c, d, e, f, g, h) {
      return fn.apply(this, arguments)
    },
    9: function novenary(a, b, c, d, e, f, g, h, i) {
      return fn.apply(this, arguments)
    },
    10: function denary(a, b, c, d, e, f, g, h, i, j) {
      return fn.apply(this, arguments)
    }
    /* eslint-disable no-unused-vars */
  }
  const match = LOOKUP[given]
  if (!match) {
    throw Error(`Unable to find a matching arity, given ${given}`)
  }
  return match
}
export default arity
