console.log('Loading Babel configs...');

module.exports = function (api) {
  console.log('Processing Babel configs...');

  api.cache(true)

  return {
    env: {
      test: {
        plugins: ['@babel/plugin-transform-modules-commonjs'],
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: 'current'
              }
            }
          ]
        ]
      }
    }
  }
}
