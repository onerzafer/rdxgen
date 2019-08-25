const changeCase = require('change-case/change-case');

module.exports = options => `import {
${options.actions
  .reduce(
    (actions, action) => [...actions, action, `${action}_${options.OkSuffix}`],
    []
  )
  .map(action => changeCase.pascalCase(action))
  .map(action => `${options.name}${action}Payload,`)
  .join('\n')}
  ${options.name}Action,
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
export const ${options.name}${changeCase.pascalCase(action)}Action = (payload: ${action.includes(options.ErrSuffix) ? 'string' : `${options.name}${changeCase.pascalCase(action)}Payload`}):${options.name}Action => ({
  type: ${options.name}ActionTypes.${action},
  payload
})
`
  )
  .join('\n')}
`;
