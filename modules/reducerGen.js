const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const changeCase = require('change-case/change-case');
const Handlebars = require('handlebars');
const readTemplates = require('./readTemplates');
const CONSTANTS = require('./constants');

function generateReducer(options, isTypescript = false, overrideTemplates) {
  const prettierConf = prettier.resolveConfig.sync(__dirname, CONSTANTS.prettierFallbackConf);
  prettierConf.parser = isTypescript ? 'typescript' : 'babel';

  const fileNameSuffix = isTypescript ? 'ts' : 'js';
  const templates =
    overrideTemplates && overrideTemplates.length ? overrideTemplates : readTemplates(CONSTANTS.templatePaths[fileNameSuffix]);

  options.actions = typeof options.actions === 'string' ? options.actions.split(' ') : options.actions;
  const fileName = changeCase.kebabCase(options.name);
  const dir = path.join(process.cwd(), options.path, fileName);
  const actionTypes = options.actions.reduce(
    (types, action) => [
      ...types,
      changeCase.constantCase(`${options.name} ${action}`),
      changeCase.constantCase(`${options.name} ${action} ${options.OkSuffix}`),
      changeCase.constantCase(`${options.name} ${action} ${options.ErrSuffix}`),
    ],
    []
  );
  const groupedActionTypes = options.actions.reduce(
    (types, action) => [
      ...types,
      {
        actionName: changeCase.camelCase(action),
        service: changeCase.pascalCase(`${action} ${options.name}`),
        serviceAsFunction: changeCase.camelCase(`${action} ${options.name}`),
        initType: changeCase.constantCase(`${options.name} ${action}`),
        initTypeValue: `[${changeCase.titleCase(options.name)}] ${changeCase.constantCase(action)}`,
        initAction: changeCase.pascalCase(`${options.name} ${action} Action`),
        okType: changeCase.constantCase(`${options.name} ${action} ${options.OkSuffix}`),
        okTypeValue: `[${changeCase.titleCase(options.name)}] ${changeCase.constantCase(
          action
        )} ${changeCase.constantCase(options.OkSuffix)}`,
        okAction: changeCase.pascalCase(`${options.name} ${action} ${options.OkSuffix} Action`),
        errType: changeCase.constantCase(`${options.name} ${action} ${options.ErrSuffix}`),
        errTypeValue: `[${changeCase.titleCase(options.name)}] ${changeCase.constantCase(
          action
        )} ${changeCase.constantCase(options.ErrSuffix)}`,
        errAction: changeCase.pascalCase(`${options.name} ${action} ${options.ErrSuffix} Action`),
      },
    ],
    []
  );
  const templateVariables = {
    name: changeCase.titleCase(options.name),
    actionTypes,
    groupedActionTypes,
    actionNames: actionTypes.map(action => changeCase.pascalCase(`${action} Action`)),
    pascalName: changeCase.pascalCase(options.name),
    camelName: changeCase.camelCase(options.name),
    filePaths: templates.reduce(
      (paths, { name }) => ({
        ...paths,
        [name]: `./${fileName}.${name}`,
      }),
      {}
    ),
  };

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

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
