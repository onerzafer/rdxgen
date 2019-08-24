const fs = require('fs');
const CONSTANTS = require('./constants');

function readAnswers() {
  if (fs.existsSync(CONSTANTS.savedAnswersPath)) {
    return JSON.parse(fs.readFileSync(CONSTANTS.savedAnswersPath, 'utf8'));
  } else {
    return undefined;
  }
}

module.exports = readAnswers;
