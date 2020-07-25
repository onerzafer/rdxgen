const fs = require('fs');
const prettier = require('prettier');
const CONSTANTS = require('./constants');

function saveAnswers(options) {
  const { name, ...answersToSave } = options;
  const prettierConf = prettier.resolveConfig.sync(__dirname, CONSTANTS.prettierFallbackConf);
  prettierConf.parser = 'json';
  fs.writeFileSync(CONSTANTS.savedAnswersPath, prettier.format(JSON.stringify(answersToSave), prettierConf));
  console.log(`Your answers are saved and that means next time you will be asked only the name of the reducer. 🎉`);
  console.log(`it's better to add rdxgen.json to your .gitignore file. Or you can keep it. 😉`);
}
module.exports = saveAnswers;
