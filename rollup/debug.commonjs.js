const pkg = require(`../package.json`)
const commonjs = require(`rollup-plugin-commonjs`)
const {bundle} = require(`germs`)

module.exports = bundle({
  name: pkg.name,
  alias: {
  },
  input: `src/debug.js`,
  output: {
    name: `FUTILITYDEBUG`,
    file: `./debug.js`,
    format: `umd`
  },
  alterPlugins: (plug) => {
    const katsuExports = [
      `pipe`,
      `compose`,
      `$`,
      `PLACEHOLDER`,
      `curryify`,
      `curry`,
      `curryObjectK`,
      `curryObjectN`,
      `curryObjectKN`,
      `remap`,
      `remapArray`,
      `K`,
      `I`
    ]
    plug[3] = commonjs({
      extensions: [`.js`],
      include: `node_modules/**`,
      namedExports: {
        'node_modules/katsu-curry/katsu-curry.js': katsuExports,
        'node_modules/katsu-curry/debug.js': katsuExports,
        'node_modules/entrust/entrust.js': [
          `e0`,
          `e1`,
          `e2`,
          `e3`,
          `e4`,
          `e5`,
          `e6`,
          `e7`,
          `e8`,
          `e9`,
          `e10`,
          `eD`,
          `eN`,
          `custom`
        ]
      }
    })
    plug.splice(7, 1)
    return plug
  }
})
