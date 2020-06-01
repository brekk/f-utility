import resolve from "rollup-plugin-node-resolve"
import cjs from "rollup-plugin-commonjs"
import alias from "rollup-plugin-alias"
import buble from "rollup-plugin-buble"
import cleanup from "rollup-plugin-cleanup"
import json from "rollup-plugin-json"
/* import progress from "rollup-plugin-progress" */
import pkg from "./package.json"
import path from "path"

const local = x => path.resolve(__dirname, x)
const external = pkg && pkg.dependencies ? Object.keys(pkg.dependencies) : []

const plugins = [
  /* progress(), */
  json(),
  cjs({ extensions: [`.js`], include: `node_modules/**` }),
  buble(),
  resolve({ jsnext: true, main: true }),
  cleanup({ comments: `none` })
  // babili()
]

export default [
  {
    input: `src/f-utility.js`,
    output: {
      name: `FUTILITY`,
      file: pkg.browser,
      format: `umd`
    },
    plugins
  },
  {
    input: `src/f-utility.js`,
    external,
    output: [
      { file: pkg.main, format: `cjs` },
      { file: pkg.module, format: `es` }
    ],
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
