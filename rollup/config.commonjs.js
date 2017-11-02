const pkg = require(`../package.json`)
const {bundle} = require(`germs`)

module.exports = bundle({
  name: pkg.name,
  alias: {
  },
  input: `src/index.js`,
  output: {
    name: `FUTILITY`,
    file: `./${pkg.name}.js`,
    format: `umd`
  }
})
