const deasync = require('deasync');
const compile = require('./compile').compile;

function transform(filePath) {
  const { code, map } = compile(filePath);

  deasync.loopWhile(() => !code && !map);

  return { code, map };
}

module.exports.process = function process(_s, filePath, _c, _o) {
  return transform(filePath);
}