const fs = require('fs');
const prettier = require('prettier');
const reducerFileGenerator = require('../templates/reducer.template');
const reducerTestFileGenerator = require('../templates/reducer.test.template');
const actionsFileGenerator = require('../templates/actions.template');
const actionsTestFileGenerator = require('../templates/actions.test.template');

const prettierConf = {
  bracketSpacing: true,
  jsxBracketSameLine: true,
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  parser: 'babel',
};

function generateReducer(options) {
  options.actions = options.actions.split(' ');

  const dir = options.path + '/' + options.name;

  const reducerPath = dir + '/' + options.name + '.reducer.js';
  const reducerTestPath = dir + '/' + options.name + '.reducer.test.js';
  const actionsPath = dir + '/' + options.name + '.actions.js';
  const actionsTestPath = dir + '/' + options.name + '.actions.test.js';

  const reducerFile = prettier.format(
    reducerFileGenerator(options),
    prettierConf
  );

  const reducerTestFile = prettier.format(
    reducerTestFileGenerator(options),
    prettierConf
  );

  const actionsFile = prettier.format(
    actionsFileGenerator(options),
    prettierConf
  );

  const actionsTestFile = prettier.format(
    actionsTestFileGenerator(options),
    prettierConf
  );

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFile(reducerPath, reducerFile, { flag: 'wx' }, function(err) {
    if (err) throw err;
  });

  fs.writeFile(reducerTestPath, reducerTestFile, { flag: 'wx' }, function(err) {
    if (err) throw err;
  });

  fs.writeFile(actionsPath, actionsFile, { flag: 'wx' }, function(err) {
    if (err) throw err;
  });

  fs.writeFile(actionsTestPath, actionsTestFile, { flag: 'wx' }, function(err) {
    if (err) throw err;
  });
}

module.exports = generateReducer;
