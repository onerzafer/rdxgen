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
    (actions, action) => [...actions, action, `${action}_${options.OkSuffix}`],
    []
  )
  .map(action => changeCase.pascalCase(action)).map(action => `
  export interface ${options.name}${action}Payload {
  }
  `).join('\n')}
  
export interface ${options.name}Action {
  type: string;
  payload?: any;
}
`;
