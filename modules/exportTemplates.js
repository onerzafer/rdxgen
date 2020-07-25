const fs = require('fs');
const ncp = require('ncp').ncp;
const CONSTANTS = require('./constants');

function exportTemplates(isTypescript) {
  const fileNameSuffix = isTypescript ? 'ts' : 'js';
  const destination = CONSTANTS.overrideTemplatesPath;
  const source = CONSTANTS.templatePaths[fileNameSuffix];
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
    ncp(source, destination, function(err) {
      if (err) {
        console.log(err);
      }
      console.log('*******************************************');
      console.log(`Templates are exported -> ${destination}`);
      console.log(`it's better to add rdxgen to your .gitignore file. Or you can keep it.`);
      console.log(`How to update the templates?🤔`);
      console.log(`👉 Check the repository to find out -> https://github.com/onerzafer/rdxgen`);
      console.log('\n');
      console.log("Here's a potato!");
      console.log('🥔');
      console.log('*******************************************');
    });
  } else {
    console.log(`Templates are already exported -> ${destination}`);
  }
}

module.exports = exportTemplates;
