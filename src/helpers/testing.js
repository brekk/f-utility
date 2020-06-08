function testCurriedFunctionEqual(arity) {
  return function matching(expected, fn) {
    const INVOKER = {
      0: () => expect(fn()).toEqual(expected),
      1: a => expect(fn(a)).toEqual(expected),
      2: (a, b) => {
        expect(fn(a, b)).toEqual(expected)
        expect(fn(a)(b)).toEqual(expected)
      },
      3: (a, b, c) => {
        expect(fn(a, b, c)).toEqual(expected)
        expect(fn(a)(b)(c)).toEqual(expected)
      },
      4: (a, b, c, d) => {
        expect(fn(a, b, c, d)).toEqual(expected)
        expect(fn(a)(b)(c)(d)).toEqual(expected)
      },
      5: (a, b, c, d, e) => {
        expect(fn(a, b, c, d, e)).toEqual(expected)
        expect(fn(a)(b)(c)(d)(e)).toEqual(expected)
      },
      6: (a, b, c, d, e, f) => {
        expect(fn(a, b, c, d, e, f)).toEqual(expected)
        expect(fn(a)(b)(c)(d)(e)(f)).toEqual(expected)
      },
      7: (a, b, c, d, e, f, g) => {
        expect(fn(a, b, c, d, e, f, g)).toEqual(expected)
        expect(fn(a)(b)(c)(d)(e)(f)(g)).toEqual(expected)
      },
      8: (a, b, c, d, e, f, g, h) => {
        expect(fn(a, b, c, d, e, f, g, h)).toEqual(expected)
        expect(fn(a)(b)(c)(d)(e)(f)(g)(h)).toEqual(expected)
      },
      9: (a, b, c, d, e, f, g, h, i) => {
        expect(fn(a, b, c, d, e, f, g, h, i)).toEqual(expected)
        expect(fn(a)(b)(c)(d)(e)(f)(g)(h)(i)).toEqual(expected)
      },
      10: (a, b, c, d, e, f, g, h, i, j) => {
        expect(fn(a, b, c, d, e, f, g, h, i, j)).toEqual(expected)
        expect(fn(a)(b)(c)(d)(e)(f)(g)(h)(i)(j)).toEqual(expected)
      }
    }
    return INVOKER[arity]
  }
}
