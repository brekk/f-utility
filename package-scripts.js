const germs = require(`germs`)
const pkg = require(`./package.json`)

module.exports = germs.build(pkg.name, {
  readme: `documentation readme -s "API" src/*.js`
})
