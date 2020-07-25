const fs = require('fs');
const path = require('path');

function readTemplates(templateDir) {
  if (fs.existsSync(templateDir)) {
    const filesInTheTemplateFolder = fs.readdirSync(templateDir);
    if (filesInTheTemplateFolder && filesInTheTemplateFolder.length) {
      const filePathsInTemplateFolder = filesInTheTemplateFolder
        .filter(fileName => fileName.includes('.template'))
        .map(fileName => ({ name: fileName.replace('.template', ''), path: path.join(templateDir, fileName) }));
      return filePathsInTemplateFolder.map(({ name, path }) => ({
        name,
        path,
        template: fs.readFileSync(path, 'utf8'),
      }));
    }
    return undefined;
  } else {
    return undefined;
  }
}

module.exports = readTemplates;
