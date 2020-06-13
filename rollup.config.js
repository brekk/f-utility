import resolve from "@rollup/plugin-node-resolve"
// import alias from "@rollup/plugin-alias"
import cjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import { terser } from "rollup-plugin-terser"
// import path from "path"

// const local = x => path.resolve(__dirname, x)

const plugins = [
  // alias({
  //   entries: {
  //     types: "types/index.js",
  //     binary: "binary/index.js",
  //     ternary: "ternary/index.js",
  //     quaternary: "quaternary/index.js",
  //     derived: "derived/index.js"
  //   }
  // }),
  json({ namedExports: true, preferConst: true }),
  resolve(),
  cjs({ extensions: [`.js`] })

  // buble()
]

const terserConfig = {
  mangle: {
    keep_fnames: true
  },
  compress: {
    keep_fargs: true,
    hoist_funs: true
  },
  keep_fnames: true
}

const tersePlugs = plugins.concat(terser(terserConfig))
const BUILD = {
  CORE: "src/build/f-utility.js"
}
export default [
  {
    input: BUILD.CORE,
    output: {
      name: `FUTILITY`,
      file: `f-utility.umd.js`,
      format: `umd`
    },
    plugins: tersePlugs
  },
  {
    input: BUILD.CORE,
    output: [
      {
        file: `f-utility.js`,
        format: `cjs`
      }
    ],
    plugins: tersePlugs
  },
  {
    input: BUILD.CORE,
    output: {
      file: `f-utility.es.js`,
      format: `es`
    },
    plugins
  }
  /*
  {
    input: `src/debug.js`,
    output: {
      name: `FUTILITYDEBUG`,
      file: `debug.umd.js`,
      format: `umd`
    },
    plugins
  },
  {
    input: `src/debug.js`,
    external,
    output: [
      { file: `debug.js`, format: `cjs` },
      { file: `debug.es.js`, format: `es` }
    ],
    plugins
  }
  */
]
