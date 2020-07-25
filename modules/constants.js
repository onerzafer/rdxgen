const path = require('path');

module.exports = {
  savedAnswersPath: `${process.cwd()}/rdxgen.json`,
  overrideTemplatesPath: `${process.cwd()}/rdxgen`,
  templatePaths: {
    ts: path.join(__dirname, `../templates/ts`),
    js: path.join(__dirname, `../templates/js`)
  },
  defaultQuestions: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of new reducer:',
    },
    {
      type: 'input',
      name: 'path',
      message: 'path of store:',
    },
    {
      type: 'input',
      name: 'actions',
      message: 'Enter actions with space separated:',
    },
    {
      type: 'input',
      name: 'OkSuffix',
      message: 'Success suffix:',
    },
    {
      type: 'input',
      name: 'ErrSuffix',
      message: 'Error suffix:',
    },
  ],
  prettierFallbackConf: {
    bracketSpacing: true,
    jsxBracketSameLine: true,
    printWidth: 80,
    singleQuote: true,
    trailingComma: 'es5',
    parser: 'babel',
  },
};
