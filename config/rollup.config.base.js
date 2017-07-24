const progress = require(`rollup-plugin-progress`)
const babili = require(`rollup-plugin-babili`)
const commonjs = require(`rollup-plugin-commonjs`)
const cleanup = require(`rollup-plugin-cleanup`)
const resolve = require(`rollup-plugin-node-resolve`)
const buble = require(`rollup-plugin-buble`)
const json = require(`rollup-plugin-json`)
const pkg = require(`../package.json`)
const external = Object.keys(pkg.dependencies)

module.exports = {
  exports: `named`,
  external,
  globals: {
  },
  moduleName: pkg.name,
  plugins: [
    progress(),
    json(),
    commonjs({
      extensions: [`.js`],
      include: `node_modules/**`,
      namedExports: {
      }
    }),
    buble(),
    resolve({
      jsnext: true,
      main: true
    }),
    cleanup({
      comments: `none`
    }),
    babili({
      removeConsole: true
    })
  ]
}
