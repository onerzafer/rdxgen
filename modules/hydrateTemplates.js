const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const changeCase = require('change-case/change-case');
const Handlebars = require('handlebars');
const readTemplates = require('./readTemplates');
const CONSTANTS = require('./constants');
const generateTemplateVariables = require('./generateTemplateVariables');

function generateReducer(options, isTypescript = false, overrideTemplates) {
  const prettierConf = prettier.resolveConfig.sync(__dirname, CONSTANTS.prettierFallbackConf);
  prettierConf.parser = isTypescript ? 'typescript' : 'babel';

  const fileNameSuffix = isTypescript ? 'ts' : 'js';
  const templates =
    overrideTemplates && overrideTemplates.length ? overrideTemplates : readTemplates(CONSTANTS.templatePaths[fileNameSuffix]);
  const fileName = changeCase.kebabCase(options.name);
  const dir = path.join(process.cwd(), options.path, fileName);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const templateVariables = generateTemplateVariables(options, fileName, templates);

  const helperFunctions = [
    'noCase',
    'dotCase',
    'swapCase',
    'pathCase',
    'upperCase',
    'lowerCase',
    'camelCase',
    'snakeCase',
    'titleCase',
    'paramCase',
    'headerCase',
    'pascalCase',
    'constantCase',
    'sentenceCase',
    'upperCaseFirst',
    'lowerCaseFirst',
    'kebabCase',
  ].reduce((cumulative, helperName) => ({
    ...cumulative,
    [helperName]: (...stringValues) => changeCase[helperName](stringValues.filter(v => typeof v === 'string').join(' ')),
  }), {});

  Handlebars.registerHelper(helperFunctions);
  Handlebars.registerHelper('ifEquals', (arg1, arg2, options) => {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
  });

  templates.forEach(({ name, template }) => {
    const t = Handlebars.compile(template);
    const filePath = path.join(dir, `${fileName}.${name}.${fileNameSuffix}`);
    const file = prettier.format(t(templateVariables), prettierConf);
    fs.writeFile(filePath, file, { flag: 'wx' }, function(err) {
      if (err) throw err;
      console.log(`rdxgen created: ${filePath}`);
    });
  });

  return options;
}

module.exports = generateReducer;
