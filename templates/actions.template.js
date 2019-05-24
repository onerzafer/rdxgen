const changeCase = require('change-case');

module.exports = options => `${options.actions
  .map(
    action => `
export const ${action} = '${action}';
export const ${action}_${options.OkSuffix} = '${action}_${options.OkSuffix}';
export const ${action}_${options.ErrSuffix} = '${action}_${options.ErrSuffix}';`
  )
  .join('\n')}

${options.actions
  .reduce(
    (actions, action) => [
      ...actions,
      action,
      `${action}_${options.OkSuffix}`,
      `${action}_${options.ErrSuffix}`,
    ],
    []
  )
  .map(
    action => `
export const ${changeCase.pascalCase(action)}Action = (payload) => ({
  type: ${action},
  payload
});
`
  )
  .join('\n')}
`;
