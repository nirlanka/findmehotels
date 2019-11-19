// const rollup = require('rollup');
// const esm = require('esm');

// const config = esm(module)('../rollup.config');

// function generateOptions(filePath, name) {
//   return {
//     input: { input: filePath, },
//     output: {
//       format: 'iife',
//       name: 'app',
//       file: `public/test/${name}.js`,
//     },
//   };
// }

// function compile(filePath, name) {
//   const { input, output } = generateOptions(filePath, name);

//   return rollup.rollup(input)
//     .then(bundle => bundle.generate(output));
// }

// module.exports = { compile };

const svelte = require('svelte/compiler')

console.log('svelte/compiler -->', svelte);

function process(src, filename) {
  const result = svelte.compile(src, {
    filename,
    // Allow tests to set component props.
    accessors: true,
    // Debugging and runtime checks.
    dev: true,
    format: 'cjs'
  })

  return {
    code: result.js.code,
    map: result.js.map
  }
}

exports.process = process
exports.compile = function compile(filename) { return process('', filename); }