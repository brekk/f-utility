import resolve from "@rollup/plugin-node-resolve"
import alias from "@rollup/plugin-alias"
import cjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import { terser } from "rollup-plugin-terser"
import { map, pipe } from "ramda"
import path from "path"
const mapLocal = pipe(
  map(z =>
    Object.assign({}, z, {
      replacement: path.resolve(__dirname, z.replacement)
    })
  )
)

const plugins = [
  alias({
    entries: mapLocal([
      { find: "$binary", replacement: "src/binary" },
      { find: "$build", replacement: "src/build" },
      { find: "$core", replacement: "src/core" },
      { find: "$derived", replacement: "src/derived" },
      { find: "$helpers", replacement: "src/helpers" },
      { find: "$quaternary", replacement: "src/quaternary" },
      { find: "$ternary", replacement: "src/ternary" },
      { find: "$types", replacement: "src/types" }
    ])
  }),
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
  CHECKED: "src/build/debug.js",
  AUTO: "src/build/f-utility.js",
  UNCHECKED: "src/build/production.js"
}

const buildFor = input => {
  const suffix = input.includes("debug")
    ? ".debug"
    : input.includes("production")
    ? ".unchecked"
    : ""
  return [
    {
      input,
      output: {
        name: `F`,
        file: `f-utility${suffix}.umd.js`,
        format: `umd`
      },
      plugins: tersePlugs
    },
    {
      input,
      output: [
        {
          file: `f-utility${suffix}.js`,
          format: `cjs`
        }
      ],
      plugins: tersePlugs
    },
    {
      input,
      output: {
        file: `f-utility${suffix}.es.js`,
        format: `es`
      },
      plugins
    }
  ]
}

export default [].concat(
  buildFor(BUILD.AUTO),
  buildFor(BUILD.UNCHECKED),
  buildFor(BUILD.CHECKED)
)
