const { join, resolve } = require('path')
const { createTransformer } = require('babel-jest')

console.log('Loading Babel transformer...')

const packagePath = resolve('../')
const packageGlob = join(packagePath, '*')

module.exports = createTransformer({
  babelrcRoots: packageGlob,
})