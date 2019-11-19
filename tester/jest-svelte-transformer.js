const deasync = require('deasync');
const compile = require('./compile').compile;

console.log('Starting Svelte transform module...');

function transform(filePath) {
  console.log('Processing Svelte transform module...');

  const { code, map } = compile(filePath);

  deasync.loopWhile(() => !code && !map);

  return { code, map };
}

module.exports.process = function process(_s, filePath, _c, _o) {
  return transform(filePath);
}