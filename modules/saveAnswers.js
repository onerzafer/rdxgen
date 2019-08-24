const fs = require('fs');
const prettier = require('prettier');
const CONSTANTS = require('./constants');

function saveAnswers(options) {
  const { name, ...answersToSave } = options;
  const prettierConf = prettier.resolveConfig.sync(__dirname, CONSTANTS.prettierFallbackConf);
  prettierConf.parser = 'json';
  fs.writeFileSync(CONSTANTS.savedAnswersPath, prettier.format(JSON.stringify(answersToSave), prettierConf));
}
module.exports = saveAnswers;
