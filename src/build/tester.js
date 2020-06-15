import F from "$build/production"
import E from "$build/f-utility"
import D from "$build/debug"

export function testFunctionForBuild(build) {
  return function ____test(name, injectable) {
    test(
      `${name} [ENV: ${
        build === F ? "production" : build === E ? "default" : "debug"
      }]`,
      injectable(build)
    )
  }
}

const [testProduction, testDefault, testDebug] = [F, E, D].map(
  testFunctionForBuild
)
/* eslint-disable-next-line func-style */
export const exam = (n, x) => {
  testProduction(n, x)
  testDefault(n, x)
  testDebug(n, x)
}

export default exam
