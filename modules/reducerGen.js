const fs = require('fs');
const prettier = require('prettier');
const changeCase = require('change-case/change-case');
const CONSTANTS = require('./constants');

function generateReducer(options, isTypescript = false) {
  const reducerFileGenerator = require(`../templates/${isTypescript ? 'ts' : 'js'}/reducer.template`);
  const reducerTestFileGenerator = require(`../templates/${isTypescript ? 'ts' : 'js'}/reducer.test.template`);
  const actionsFileGenerator = require(`../templates/${isTypescript ? 'ts' : 'js'}/actions.template`);
  const actionsTestFileGenerator = require(`../templates/${isTypescript ? 'ts' : 'js'}/actions.test.template`);

  options.actions = typeof options.actions === 'string' ? options.actions.split(' ') : options.actions;
  options.name = changeCase.ucFirst(changeCase.camel(options.name));

  const dir = options.path + '/' + options.name;
  const fileNamePrefix = dir + '/' + options.name;

  const prettierConf = prettier.resolveConfig.sync(__dirname, CONSTANTS.prettierFallbackConf);
  prettierConf.parser = isTypescript ? 'typescript' : 'babel';

  const reducerPath = fileNamePrefix + '.reducer.' + (isTypescript ? 'ts' : 'js');
  const reducerTestPath = fileNamePrefix + '.reducer.test.' + (isTypescript ? 'ts' : 'js');
  const actionsPath = fileNamePrefix + '.actions.' + (isTypescript ? 'ts' : 'js');
  const actionsTestPath = fileNamePrefix + '.actions.test.' + (isTypescript ? 'ts' : 'js');

  const reducerFile = prettier.format(reducerFileGenerator(options), prettierConf);
  const reducerTestFile = prettier.format(reducerTestFileGenerator(options), prettierConf);
  const actionsFile = prettier.format(actionsFileGenerator(options), prettierConf);
  const actionsTestFile = prettier.format(actionsTestFileGenerator(options), prettierConf);

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

  if (isTypescript) {
    const interfacesFileGenerator = require(`../templates/ts/interfaces.template`);
    const interfacesFile = prettier.format(interfacesFileGenerator(options), prettierConf);
    const interfacesTestPath = fileNamePrefix + '.interface.ts';

    fs.writeFile(interfacesTestPath, interfacesFile, { flag: 'wx' }, function(err) {
      if (err) throw err;
    });
  }

  return options;
}

module.exports = generateReducer;
