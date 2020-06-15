import F from "$build/production"
import E from "$build/debug"

export function testFunctionForBuild(build) {
  return function ____test(name, injectable) {
    test(
      `${name} [ENV: ${build === F ? "production" : "debug"}]`,
      injectable(build)
    )
  }
}

const [testProduction, testDebug] = [F, E].map(testFunctionForBuild)
/* eslint-disable-next-line func-style */
export const exam = (n, x) => {
  testProduction(n, x)
  testDebug(n, x)
}

export default exam
