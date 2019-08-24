const changeCase = require('change-case/change-case');

module.exports = options => `export interface ${options.name} {
  [key: string]: any;
}

export interface ${options.name}State {
  pending: boolean;
  data?: ${options.name};
  error?: string;
}

${options.actions
  .reduce(
    (actions, action) => [...actions, action, `${action}_${options.OkSuffix}`, `${action}_${options.ErrSuffix}`],
    []
  )
  .map(action => changeCase.pascalCase(action)).map(action => `
  export interface ${action}Payload {
  }
  `).join('\n')}
`;
