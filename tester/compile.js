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