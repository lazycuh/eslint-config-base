const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const eslintConfigJsonFileContent = readFileSync(resolve(__dirname, 'eslint.config.json'));

writeFileSync(resolve(__dirname, 'index.js'), `module.exports = ${eslintConfigJsonFileContent}`);
