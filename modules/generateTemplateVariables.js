const changeCase = require('change-case/change-case');

function generateTemplateVariables(options, fileName, templates) {
  const filePaths = templates.reduce(
    (paths, { name }) => ({
      ...paths,
      [name]: `./${fileName}.${name}`,
    }),
    {},
  );

  return {
    name: changeCase.lowerCase(options.name),
    actions: options.actions.split(' ').map(action => {
      const a = action.trim();
      return {
        init: changeCase.lowerCase(a),
        ok: changeCase.lowerCase(`${a} ${options.OkSuffix}`),
        err: changeCase.lowerCase(`${a} ${options.ErrSuffix}`),
      };
    }),
    filePaths,
  };
}

module.exports = generateTemplateVariables;
