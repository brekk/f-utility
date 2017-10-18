const germs = require(`germs`)
const pkg = require(`./package.json`)

const GERMS = germs.build(pkg.name, {
  readme: `documentation readme -s "API" src/*.js`
})

GERMS.scripts.lint.jsdoc = `documentation lint src/*`

module.exports = GERMS
