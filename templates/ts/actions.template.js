const changeCase = require('change-case/change-case');

module.exports = options => `import {
${options.actions
  .reduce(
    (actions, action) => [...actions, action, `${action}_${options.OkSuffix}`, `${action}_${options.ErrSuffix}`],
    []
  )
  .map(action => changeCase.pascalCase(action))
  .map(action => `${action}Payload,`)
  .join('\n')}
} from './${options.name}.interface';

export enum ${options.name}ActionTypes {
${options.actions
  .map(
    action => `
  ${action} = '${action}',
  ${action}_${options.OkSuffix} = '${action}_${options.OkSuffix}',
  ${action}_${options.ErrSuffix} = '${action}_${options.ErrSuffix}',`
  )
  .join('\n')}
}

${options.actions
  .reduce(
    (actions, action) => [...actions, action, `${action}_${options.OkSuffix}`, `${action}_${options.ErrSuffix}`],
    []
  )
  .map(
    action => `
export class ${changeCase.pascalCase(action)}Action {
  readonly type = ${options.name}ActionTypes.${action};
  constructor(public payload: ${changeCase.pascalCase(action)}Payload) {}
}
`
  )
  .join('\n')}
  
export type ${options.name}Actions = ${options.actions
  .reduce(
    (actions, action) => [...actions, action, `${action}_${options.OkSuffix}`, `${action}_${options.ErrSuffix}`],
    []
  )
  .map(
    action => `${changeCase.pascalCase(action)}Action`
  )
  .join('|\n')};
`;
